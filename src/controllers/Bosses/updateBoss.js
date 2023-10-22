const { Boss } = require("../../db.js");
const getBossById = require("./getBossById.js");
const fs = require("fs");
const uploadFile = require("../../firebase.js");
const bcrypt = require("bcrypt");

const updateBoss = async (data, path) => {
  console.log("ESTO ES UPDATE-BOSS", data);
  if (path) {
    const img = fs.readFileSync(path).buffer;
    const logo = await uploadFile(img, "boss");
    const dataAct = { ...data, logo };
    var id = dataAct.id;
    delete dataAct.id;
    delete dataAct.createdAt;
    delete dataAct.updatedAt;
    // if (data["password"]) {
    //   dataAct.password = bcrypt.hashSync(data["password"], 10);
    // }
    var resultado = await Boss.update(dataAct, {
      where: {
        id,
      },
    });
  } else {
    const dataAct = { ...data };
    var id = dataAct.id;
    delete dataAct.id;
    delete dataAct.createdAt;
    delete dataAct.updatedAt;
    console.log(data);
    // if (data["password"].length < 5) {
    //   dataAct.password = bcrypt.hashSync(data["password"], 10);
    // }

    var resultado = await Boss.update(dataAct, {
      where: {
        id,
      },
    });
  }

  if (resultado) {
    const boss = await getBossById(id);
    return {
      ...boss,
      role: "admin",
    };
  } else throw new Error("Failed to update, missing information");
};

module.exports = updateBoss;
