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
    return res.json(operation);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////////////POST////////////////////////////////////////////////////////

operationRoute.post("/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  const { concept, amount, date, type } = req.body;
  console.log(amount);
  try {
    const user = await User.findByPk(user_id, { include: Operation });
    if (!user) return res.status(404).json({ error: "error, User incorrect" });

    const newOperation = await Operation.create({
      concept,
      amount,
      date,
      type,
    });
    user.balance = Number(user.balance) + Number(amount);

    await user.update({
      balance: user.balance,
    });

    await newOperation.setUser(user);
    const userNew = await User.findByPk(user_id, { include: Operation });

    return res.json(userNew);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////PATCH////////////////////////////////

operationRoute.patch("/", async (req, res, next) => {
  const { user_id, operation_id } = req.query;
  const { concept, amount, date } = req.body;
  // console.log(user_id, operation_id);
  let newConcept, newAmount, newDate;
  if (concept !== "") {
    newConcept = concept;
  }
  if (amount !== 0) {
    newAmount = amount;
  }
  if (date !== "") {
    newDate = date;
  }

  try {
    const user = await User.findByPk(user_id);
    const operation = await Operation.findByPk(operation_id);
    if (!operation)
      return res.status(404).json({ error: "error, operation inexist" });
    if (amount > 0) {
      const oldAmount = operation.amount;
      const type = operation.type;
      type === "entry"
        ? (user.balance = Number(user.balance) - oldAmount + Number(amount))
        : (user.balance = Number(user.balance) + oldAmount + Number(amount));
      await user.update({
        balance: user.balance,
      });
    }
    await operation.update({
      concept: newConcept,
      amount: newAmount,
      date: newDate,
    });
    const userModify = await User.findByPk(user_id, { include: Operation });
    console.log(userModify);
    res.json(userModify); /////////////al modificar 2 veces el amount no muestra operaciones si no recargas
  } catch (error) {
    next(error);
  }
});

////////////////////////////////DELETE////////////////////////////////

operationRoute.delete("/", async (req, res, next) => {
  try {
    const { user_id, operation_id } = req.query;
    console.log(user_id, operation_id);
    const user = await User.findByPk(user_id, { include: Operation });
    const operationDeleted = await Operation.findByPk(operation_id);

    if (operationDeleted) {
      const oldAmount = operationDeleted.amount;
      const type = operationDeleted.type;
      Operation.destroy({ where: { id: operation_id } });
      type === "entry"
        ? (user.balance = user.balance - oldAmount)
        : (user.balance = user.balance - oldAmount);
      await user.update({
        balance: user.balance,
      });

      const newUser = await User.findByPk(user_id, { include: Operation });

      res.json(newUser);
    } else {
      return res.json(new Error("error, operation not found"));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = operationRoute;
