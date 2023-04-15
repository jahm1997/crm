const { Salesman, Boss } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (data) => {
  const { myToken } = data;
  const secret = "secret";
  const decodificacion = jwt.verify(myToken, secret);
  const { email, password } = decodificacion;

  let salesman = await Salesman.findOne({ where: { email: email } });
  if (salesman !== null) {
    if (password !== null) {
      if (bcrypt.compareSync(password, salesman["password"])) {
        return salesman.salesman.dataValues;
      }
    }
  }
  let boss = await Boss.findOne({ where: { email: email } });
  if (boss.dataValues !== null) {
    if (password !== null) {
      let veamos = bcrypt.compareSync(password, boss.dataValues.password);
      console.log(veamos);
      // if (bcrypt.compareSync(password, boss.dataValues.password)) {
      //   console.log("se ejecutó linea 24", boss.dataValues);
      // }
    }
  }

  //   if (nickname) {
  //     let boss = await createBoss({ name, username: nickname, email, password });
  //     return createToken(boss, 'admin')
  //   }

  //   throw new Error('User Not Exist')
};
