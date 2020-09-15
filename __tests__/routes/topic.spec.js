const supertest = require("supertest");
const server = require("../../api/app.js");

describe("Can retrieve info on questions", () => {
  it("can pull question data", () => {
    return supertest(server)
      .get("/topic")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
