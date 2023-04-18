const { Client } = require("../../db");

module.exports = async (data) => {
  console.log("ESTO ES CREATECLIENT", data);
  //data={ name, email, phone, vip, enable, salesmanId }
  if (data.salesmanId != null) {
    const nC = await Client.create(data);
    return nC;
  } else {
    throw new Error("salesmanId is undefined");
  }
};
