const db = require("../db");
const { User, Operation } = db;
const { Router } = require("express");
const operationRoute = Router();
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////GET ALL////////////////////////////////////////////////////////

operationRoute.get("/", async (req, res, next) => {
  const { user_id } = req.query;
  try {
    const user = await User.findByPk(user_id, { include: Operation });
    if (!user) return res.status(404).json({ error: "error, User inexist" });
    return res.json(user.operations);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////////////GET ONE////////////////////////////////////////////////////////

operationRoute.get("/:operation_id", async (req, res, next) => {
  const { operation_id } = req.params;
  try {
    const operation = await Operation.findByPk(operation_id);
    if (!operation)
      return res.status(404).json({ error: "error, operation inexist" });

    // const user = await User.findByPk(user_id, { include: Operation });

    // const operation = user.operations?.filter((u) => u.id === operation_id);
    return res.json(operation);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////////////POST////////////////////////////////////////////////////////

operationRoute.post("/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  const { concept, amount, date, type } = req.body;

  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "error, User incorrect" });

    const newOperation = await Operation.create({
      concept,
      amount,
      date,
      type,
    });
    const typeOperation = newOperation.type;
    typeOperation === "entry"
      ? (user.balance = Number(user.balance) + Number(amount))
      : (user.balance = Number(user.balance) - Number(amount));

    await user.update({
      balance: user.balance,
    });
    newOperation.setUser(user);
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////PATCH////////////////////////////////

operationRoute.patch("/", async (req, res, next) => {
  const { user_id, operation_id } = req.query;
  const { concept, amount, date } = req.body;

  try {
    const user = await User.findByPk(user_id);
    const operation = await Operation.findByPk(operation_id);
    if (!operation)
      return res.status(404).json({ error: "error, operation inexist" });
    if (amount) {
      const oldAmount = operation.amount;
      const type = operation.type;
      type === "entry"
        ? (user.balance = Number(user.balance) - oldAmount + Number(amount))
        : (user.balance = Number(user.balance) + oldAmount - Number(amount));
    }
    await user.update({
      balance: user.balance,
    });
    const newOperation = await operation.update({
      concept,
      amount,
      date,
    });
    res.json(newOperation);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////DELETE////////////////////////////////

operationRoute.delete("/", async (req, res, next) => {
  try {
    const { user_id, operation_id } = req.query;
    const user = await User.findByPk(user_id, { include: Operation });
    const operationDeleted = await Operation.findByPk(operation_id);

    if (operationDeleted) {
      const oldAmount = operationDeleted.amount;
      const type = operationDeleted.type;
      Operation.destroy({ where: { id: operation_id } });
      type === "entry"
        ? (user.balance = user.balance - oldAmount)
        : (user.balance = user.balance + oldAmount);
      await user.update({
        balance: user.balance,
      });
      res.json(user);
    } else {
      return res.json(new Error("error, operation not found"));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = operationRoute;
