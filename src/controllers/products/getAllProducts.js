const { where } = require("sequelize");
const { Product } = require("../../db.js");
const Buffer = require("buffer").Buffer;
const base64 = require("base64-js");

module.exports = async ({ bossId }) => {
  if (!bossId) throw new Error("bossId required");

  const allProducts = await Product.findAll({ where: { bossId } });
  return allProducts;
};
