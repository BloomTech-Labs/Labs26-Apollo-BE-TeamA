const supertest = require("supertest");
const server = require("../../api/app.js");

//GET TESTING
describe("Can retrieve info on response", () => {
  it("can pull response data", () => {
    return supertest(server)
      .get("/response")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});

describe("GET Can retrieve data on responses", () => {
  it("Can return status code of 200", () => {
    return supertest(server)
      .get("/response")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  it("Can retrieve object from response endpoint", () => {
    return supertest(server)
      .get("/response")
      .then((res) => {
        expect(res.body).toMatchObject([
          {
            id: 1,
            questionid: 1,
            response: "This is my response.",
            respondedby: "00ulthapbErVUwVJy4x6",
            topicid: 1,
            created_at: "2020-09-15T16:27:11.031Z",
            updated_at: "2020-09-15T16:27:11.031Z",
          },
        ]);
      });
  });
});

// POST TESTING
describe("POST / can post to API", () => {
  it("should return status code 500", () => {
    return supertest(server)
      .post("/response")
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });
  it("should return status code 400, already created response", () => {
    return supertest(server).post("/response").send({
      id: 1,
    });
    expect(res.body).toMatchObject({
      message: "response already exists",
    });
  });
});

// PUT TESTING
describe("PUT / can update data", () => {
  it("can return status code 500", () => {
    return supertest(server).put("/response").send({});
    expect(res.status).toBe(500);
  });
  it("can return status code of 404", () => {
    return supertest(server).put("/response/1").send({});
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Not Found" });
  });
});

// DELETE TESTING
describe("DELETE / can delete a response", () => {
  it("can post a new response", () => {
    return supertest(server).post("/response").send({
      id: 2,
      questionid: 1,
      response: "This is my response.",
      respondedby: "00ulthapbErVUwVJy4x6",
      topicid: 1,
      created_at: "2020-09-15T16:27:11.031Z",
      updated_at: "2020-09-15T16:27:11.031Z",
    });
    expect(res.status).toBe(200);
  });
  it("can delete newly added response", () => {
    return supertest(server).delete("/response/2");
    expect(res.status).toBe(200);
    expect(res.message).toBe("response '2' was deleted.");
  });
});
