const supertest = require("supertest");
const server = require("../../api/app.js");

describe("Can retrieve info on questions", () => {
  it("can pull question data", () => {
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
