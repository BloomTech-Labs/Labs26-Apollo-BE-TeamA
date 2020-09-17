const supertest = require("supertest");
const server = require("../../api/app.js");

//GET TESTING
describe("Can retrieve info on topics", () => {
  it("can pull topic data", () => {
    return supertest(server)
      .get("/topic")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});

describe("GET Can retrieve data on topic", () => {
  it("Can return status code of 200", () => {
    return supertest(server)
      .get("/topic")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  it("Can retrieve object from topic endpoint", () => {
    return supertest(server)
      .get("/topic")
      .then((res) => {
        expect(res.body).toMatchObject([
          {
            id: 1,
            leaderid: "00ulthapbErVUwVJy4x6",
            topicname: "Testing First Topic",
            topicfrequency: "Daily",
            contextid: 1,
            joincode: "12SZXY",
            created_at: "2020-09-15T16:27:10.879Z",
            updated_at: "2020-09-15T16:27:10.879Z",
          },
          {
            id: 2,
            leaderid: "00ulthapbErVUwVJy4x6",
            topicname: "Testing Second Topic",
            topicfrequency: "Off",
            contextid: 2,
            joincode: "SZ456XY",
            created_at: "2020-09-15T16:27:10.879Z",
            updated_at: "2020-09-15T16:27:10.879Z",
          },
        ]);
      });
  });
});

// POST TESTING
describe("POST / can post to API", () => {
  it("should return status code 500", () => {
    return supertest(server)
      .post("/topic")
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });
  it("should return status code 400, already created topic", () => {
    return supertest(server).post("/topic").send({
      id: 1,
    });
    expect(res.body).toMatchObject({
      message: "topic already exists",
    });
  });
});

// PUT TESTING
describe("PUT / can update data", () => {
  it("can return status code 500", () => {
    return supertest(server).put("/topic").send({});
    expect(res.status).toBe(500);
  });
  it("can return status code of 404", () => {
    return supertest(server).put("/topic/1").send({});
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Not Found" });
  });
});

// DELETE TESTING
describe("DELETE / can delete a topic", () => {
  it("can post a new topic", () => {
    return supertest(server).post("/topic").send({
      id: 3,
      leaderid: "00ulthapbErVUwVJy4x6",
      topicname: "Testing Second Topic",
      topicfrequency: "Off",
      contextid: 2,
      joincode: "SZ452XY",
      created_at: "2020-09-15T16:27:10.879Z",
      updated_at: "2020-09-15T16:27:10.879Z",
    });
    expect(res.status).toBe(200);
  });
  it("can delete newly added topic", () => {
    return supertest(server).delete("/topic/3");
    expect(res.status).toBe(200);
    expect(res.message).toBe("topic '3' was deleted.");
  });
});
