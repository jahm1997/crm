const { Boss } = require("../../db.js");
const { sendMail } = require("../email/email.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const uploadFile = require("../../firebase.js");

const createBoss = async (data, path) => {
  if (data.password === null) data.password = "12345";
  if (path) {
    const img = fs.readFileSync(path).buffer;
    const logo = await uploadFile(img, "boss");
    var newBoss = await Boss.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10),
      logo,
    });
  } else {
    console.log("bos en la linea 18", data);
    var newBoss = await Boss.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10),
    });
  }
  console.log(newBoss);
  sendMail(newBoss);
  return {
    ...newBoss.datavalues,
    role: "admin",
  };
};

module.exports = createBoss;
