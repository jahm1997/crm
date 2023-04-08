//Aca deberiamos de importar nuestros controllers
const allProducts = require("../controllers/products/getAllProducts.js");
const createProduct = require("../controllers/products/createProduct.js");
const updateProduct = require("../controllers/products/modifyProduct.js");
const uploadFile = require("../configFirebase/firebase.js");
const fs = require("fs");
//Aca deberiamos de importar nuestros controllers

//----------------------------------- HANDLERS GETS -----------------------------------\\
const getProducts = async (req, res) => {
  const data = req.query;
  try {
    let products = await allProducts(data);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----------------------------------- HANDLERS POST -----------------------------------\\
const postProduct = async (req, res) => {
  const {
    name,
    quantity,
    enable,
    cost_price,
    sale_price,
    discount,
    category,
    bossId,
  } = req.body;
  const { path } = req.file;
  try {
    const img = fs.readFileSync(path).buffer;
    // console.log("Esto es productsHandler!", req.file);
    const image = await uploadFile(img, "products");
    // console.log("Esto es image de la linea37 productHandler!", image);
    // const image = buffer.buffer;
    if (bossId) {
      const response = await createProduct({
        name,
        quantity: Number(quantity),
        enable: Boolean(enable),
        cost_price: Number(cost_price),
        sale_price: Number(sale_price),
        discount: Number(discount),
        category,
        bossId,
        image,
      });
    }
    res.status(200).send("Producto creado/agregado correctamente!");
    //   res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----------------------------------- HANDLERS PUT -----------------------------------\\
const putProduct = async (req, res) => {
  const data = req.body;
  try {
    const response = await updateProduct(data);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  postProduct,
  putProduct,
};
