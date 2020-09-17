const supertest = require("supertest");
const server = require("../../api/app.js");

//GET TESTING
describe("Can retrieve info on threads", () => {
  it("can pull thread data", () => {
    return supertest(server)
      .get("/thread")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});

describe("GET Can retrieve data on thread", () => {
  it("Can return status code of 200", () => {
    return supertest(server)
      .get("/thread")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  it("Can retrieve object from thread endpoint", () => {
    return supertest(server)
      .get("/thread")
      .then((res) => {
        expect(res.body).toMatchObject([
          {
            id: 1,
            responseid: 1,
            reply: "This reply is for your responsein my topic",
            repliedby: "00ulthapbErVUwVJy4x6",
            created_at: "2020-09-15T16:27:11.136Z",
            updated_at: "2020-09-15T16:27:11.136Z",
          },
        ]);
      });
  });
});

// POST TESTING
describe("POST / can post to API", () => {
  it("should return status code 500", () => {
    return supertest(server)
      .post("/thread")
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });
  it("should return status code 400, already created thread", () => {
    return supertest(server).post("/thread").send({
      id: 1,
    });
    expect(res.body).toMatchObject({
      message: "thread already exists",
    });
  });
});

// PUT TESTING
describe("PUT / can update data", () => {
  it("can return status code 500", () => {
    return supertest(server).put("/thread").send({});
    expect(res.status).toBe(500);
  });
  it("can return status code of 404", () => {
    return supertest(server).put("/thread/1").send({});
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Not Found" });
  });
});

// DELETE TESTING
describe("DELETE / can delete a thread", () => {
  it("can post a new thread", () => {
    return supertest(server).post("/thread").send({
      id: 2,
      responseid: 1,
      reply: "This reply is for your responsein my topic",
      repliedby: "00ulthapbErVUwVJy4x6",
      created_at: "2020-09-15T16:27:11.136Z",
      updated_at: "2020-09-15T16:27:11.136Z",
    });
    expect(res.status).toBe(200);
  });
  it("can delete newly added thread", () => {
    return supertest(server).delete("/thread/2");
    expect(res.status).toBe(200);
    expect(res.message).toBe("thread '2' was deleted.");
  });
});
