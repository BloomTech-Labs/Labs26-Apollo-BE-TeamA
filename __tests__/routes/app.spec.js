const supertest = require("supertest");

const server = require("../../api/app.js");

describe("server.js", () => {
  describe("GET /", () => {
    it("should return status of 200", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  it("should return message api:up", () => {
    return supertest(server)
      .get("/")
      .then((res) => {
        expect(res.body.api).toBe("up");
      });
  });
});
