const db = require("../db");
const { User, Operation } = db;
const { Router } = require("express");
const operationRoute = Router();
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////GET ALL////////////////////////////////////////////////////////

operationRoute.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { include: Operation });
    if (!user) return res.status(404).json({ error: "error, User inexist" });
    return res.json(user.operations_user);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////////////GET ONE////////////////////////////////////////////////////////

operationRoute.get("/", async (req, res, next) => {
  const { user_id, operation_id } = req.query;
  // console.log(user_id, operation_id);
  try {
    const user = await User.findByPk(user_id, { include: Operation });
    if (!user) return res.status(404).json({ error: "error, User inexist" });

    const operation = user.operations?.filter((u) => u.id === operation_id);
    return res.json(operation);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////////////POST////////////////////////////////////////////////////////

operationRoute.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { concept, amount, date, type } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "error, User incorrect" });

    const newOperation = await Operation.create({
      concept,
      amount,
      date,
      type,
    });
    console.log(newOperation);

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
    const user = await User.findByPk(user_id, { include: Operation });
    if (!user) return res.status(404).json({ error: "error, User Not Found" });

    let operation = user.operations?.filter((u) => u.id === operation_id);
    // operation.concept = concept;

    // console.log(operation);
    const newOperation = await Operation.update({
      concept,
      amount,
      date,
    });
    newOperation.setUser(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////DELETE////////////////////////////////

// userRoute.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (!id) return res.send({ err: "error, User Not Found" });

//     const userDeleted = await User.findOne({ where: { id } });
//     if (userDeleted) {
//       User.destroy({ where: { id } });
//       res.json({ msg: "user removed" });
//     } else {
//       const users = await User.findAll();
//       if (users) return res.json(users);
//       return res.json(new Error("error"));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = operationRoute;
