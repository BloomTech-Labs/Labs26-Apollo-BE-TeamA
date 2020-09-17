const supertest = require("supertest");
const server = require("../../api/app.js");

describe("Can retrieve info on questions", () => {
  it("can pull question data", () => {
    return supertest(server)
      .get(
        "/question"
        //  {
        //   headers: { Authorization: `Bearer ${process.env.TOKENID}` },
        // }
      )
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});

describe("GET requests for endpoint /question/:id", () => {
  it("Should return question ID 1 object info", () => {
    return supertest(server)
      .get("/question/1")
      .then((res) => {
        expect(res.body).toMatchObject({
          id: 1,
          type: "Context Questions",
          style: "Text",
          question: "What is your current priority?",
        });
      });
  });

  it("Should return the error message for a non valid id", () => {
    return supertest(server)
      .get("/question/10")
      .then((res) => {
        expect(res.body).toMatchObject({
          error: "QuestionNotFound",
        });
      });
  });
  it("Should return status code 404 for id not found", () => {
    return supertest(server)
      .get("/question/10")
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });
});
