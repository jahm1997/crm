/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Boss, conn } = require("../../src/db.js");

const agent = session(app);
const boss = {
  id: "00d4cf20-b761-40cc-baf2-7c40aa53caf9",
  name: "Robert Pickman",
  username: "Rob",
  company: "Great Company City",
  company_description: "The first company of the citynetwork",
  commercial_register: "RobJobMarket",
  address: "Av Manco Capac, Calle 13, Colombia",
  email: "robpick@gmail.com",
  password: "12345",
  phone: "982654357",
  logo: "GreatCity.org",
  enable: true,
  role: "admin",
};
jahm1997;
describe("rutas de crm", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Boss.sync({ force: false }).then(() => Boss.create(boss)));
  describe("GET /api/dogs", () => {
    it("should get 200", () => agent.get("api/boss").expect(200));
  });
});
