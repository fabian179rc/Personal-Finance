const db = require("../db");
const { User, Operation } = db;
const bcrypt = require("bcryptjs");
const { Router } = require("express");
const userRoute = Router();
////////////////////////////////////////////////////////////////////////////////////////////////

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(11);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

////////////////////////////////GET ONE////////////////////////////////

userRoute.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id); //add includes operation
    if (!user) return res.status(404).json({ error: "error, User Not Found" });
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////POST////////////////////////////////

userRoute.post("/", async (req, res, next) => {
  const { email, username, img, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (user)
      return res.status(404).json({ error: "error, User already exist" });

    const newUser = await User.create({
      email,
      username,
      img,
      password: await hashPassword(password),
    });
    // await newUser.setRol("user");    verificar esto
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////PATCH////////////////////////////////

userRoute.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "error, User Not Found" });

    await user.update({
      username,
      password,
      email,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////DELETE////////////////////////////////

userRoute.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.send({ err: "error, User Not Found" });

    // const userDeleted = await User.findOne({ where: { id } });
    // if (userDeleted) {
    //   User.destroy({ where: { id } });
    //   res.json({ msg: "user removed" });
    // } else {
    //   const users = await User.findAll();
    //   if (users) return res.json(users);
    //   return res.json(new Error("error"));
    // }
  } catch (error) {
    next(error);
  }
});

// ///////////////////////Routes Modify Profile//////////////////////////////////////////

// userRoute.patch("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     let {
//       username,
//       verifyPassword,
//       password,
//       email,
//       profileImg,
//       coverImg,
//       RolId,
//       StatusId,
//       items,
//     } = req.body;
//     const user = await User.findByPk(id);

//     if (!user) return res.status(404).send({ error: "User not found" });

//     let stars = 0;

//     if (items?.length)
//       stars = items.reduce((acc, item) => {
//         return acc + Number(item.description) * Number(item.quantity);
//       }, 0);

//     if (RolId) await user.setRol(RolId);
//     if (StatusId) await user.setStatus(StatusId);

//     if (!verifyPassword && password) {
//       password = await User.prototype.hashPassword(password);
//     }

//     if (verifyPassword) {
//       const isValidPassword = await User.prototype.comparePassword(
//         verifyPassword,
//         user.password
//       );
//       if (isValidPassword) {
//         password = await User.prototype.hashPassword(password);
//       } else {
//         return res.send("Incorrect");
//       }
//     }
//     await user.update({
//       username,
//       password,
//       email,
//       profileImg,
//       coverImg,
//       stars: Number(user.stars) + Number(stars),
//     });
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = userRoute;
