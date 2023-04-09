const { Product } = require("../../db.js");
const getProductById = require("./getProductById.js");
const fs = require("fs");
const uploadFile = require("../../firebase.js");

const updateProduct = async (data, path) => {
  if (path) {
    const img = fs.readFileSync(path).buffer;
    const image = await uploadFile(img, "products");
    const dataAct = { ...data, image };
    console.log("En linea 11 modifyproduct", dataAct);
    var id = dataAct.id;
    delete dataAct.id;
    console.log("En linea 13 modifyproduct el id =", id);
    var [resultado] = await Product.update(dataAct, {
      where: {
        id,
      },
    });
  } else {
    const dataAct = { ...data };
    console.log("En linea 21 modifyproduct", dataAct);
    var id = dataAct.id;
    delete dataAct.id;
    var [resultado] = await Product.update(dataAct, {
      where: {
        id,
      },
    });
  }

  if (resultado) {
    const product = await getProductById(id);
    return product;
  } else throw new Error("Failed to update, missing information");
};

module.exports = updateProduct;
