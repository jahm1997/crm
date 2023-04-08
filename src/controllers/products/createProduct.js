const { Product } = require("../../db.js");

module.exports = async (data) => {
  if (data["bossId"] != null) {
    console.log(data);
    const newProduct = await Product.create(data);
  } else {
    throw new Error("bossId is undefined");
  }
};
