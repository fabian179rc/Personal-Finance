const db = require("../db");
const { User, Operation } = db;
const bcrypt = require("bcryptjs");
const { Router } = require("express");
const userRoute = Router();
// const jwt = require("jsonwebtoken");
const config = require("../config/config");

////////////////////////////////////////////////////////////////////////////////////////////////

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(11);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
////////////////////////////////GET ALL////////////////////////////////

userRoute.get("/", async (req, res, next) => {
  try {
    const allUser = await User.findAll({ include: Operation });
    if (!allUser)
      return res.status(404).json({ error: "error, Users Not Found" });
    return res.json(allUser);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////GET ONE////////////////////////////////

userRoute.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findByPk(id, { include: Operation });
    if (!user) return res.status(404).json({ error: "error, User Not Found" });
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////POST////////////////////////////////

userRoute.post("/", async (req, res, next) => {
  const { email, username, img } = req.body;
  console.log(email, username, img);
  const newpassword = "asd123";
  try {
    let user = await User.findOne({
      where: { email: email },
      include: Operation,
    });

    if (!user) {
      user = await User.create({
        email,
        username,
        img,
        password: await hashPassword(newpassword),
      });
    }

    // const token = jwt.sign({ id: user.id }, config.SECRET, {
    //   expiresIn: 86400,
    // });
    // return res.json(user);
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////PATCH////////////////////////////////

userRoute.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const user = await User.findByPk(id, { include: Operation });
    if (!user) return res.status(404).json({ error: "error, User Not Found" });

    await user.update({
      username,
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
    const user = await User.findByPk(id);

    if (!user) return res.send({ err: "error, User Not Found" });

    User.destroy({ where: { id } });
    res.json({ msg: "user removed" });
  } catch (error) {
    next(error);
  }
});

////////////////////////////////////////////////////////
// userRoute.get("/:token", async (req, res) => {
//   const { token } = req.params;
//   const { id } = req.query;

//   try {
//     if (!id) {
//       return res.send("token loss");
//     } else {
//       const tokenData = jwt.verify(token, config.SECRET);
//       const user = await User.findByPk(tokenData.id);
//       if (!user) return res.send(false);

//       return res.send(tokenData.id === id);
//     }
//   } catch (err) {
//     console.error(err.data);
//   }
// });

module.exports = userRoute;
