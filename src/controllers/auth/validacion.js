const { Salesman, Boss } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createBoss = require("../Bosses/CreateBoss.js");

const createToken = (user, role) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 7,
      ...user.dataValues,
      role,
    },
    "secret"
  );
  return { success: true, token };
};

module.exports = async (data) => {
  const { myToken } = data;
  const secret = "secret";

  const decodificacion = jwt.verify(myToken, secret);
  console.log(decodificacion);
  //   const { email, password, name, nickname } = data

  //   let salesman = await Salesman.findOne({ where: { email: email } });
  //   if (salesman !== null) {
  //     if (password !== null) {
  //       if (bcrypt.compareSync(password, salesman['password']))
  //         return createToken(salesman, 'seller');
  //       else
  //         throw new Error('Salesman Password Incorrect')
  //     }
  //   }

  //   let boss = await Boss.findOne({ where: { email: email } });
  //   if (boss !== null) {
  //     if (password !== null) {
  //       if (bcrypt.compareSync(password, boss['password']))
  //         return createToken(boss, 'admin');
  //       else
  //         throw new Error('Boss Password Incorrect')
  //     } else {
  //       return createToken(boss, 'admin')
  //     }
  //   }

  //   if (nickname) {
  //     let boss = await createBoss({ name, username: nickname, email, password });
  //     return createToken(boss, 'admin')
  //   }

  //   throw new Error('User Not Exist')
};
