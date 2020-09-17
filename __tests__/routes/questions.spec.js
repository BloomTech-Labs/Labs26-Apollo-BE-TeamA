const supertest = require("supertest");
const server = require("../../api/app.js");

// GET TESTING
describe("Can retrieve info on questions", () => {
  it("can pull question data", () => {
    return supertest(server)
      .get("/question")
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

// POST TESTING
describe("POST / can post to API", () => {
  it("should return status code 500", () => {
    return supertest(server)
      .post("/question")
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });
  it("should return status code 400, already created question", () => {
    return supertest(server).post("/question").send({
      id: 1,
    });
    expect(res.body).toMatchObject({
      message: "question already exists",
    });
  });
});

// PUT TESTING
describe("PUT / can update data", () => {
  it("can return status code 500", () => {
    return supertest(server).put("/question").send({});
    expect(res.status).toBe(500);
  });
  it("can return status code of 404", () => {
    return supertest(server).put("/question/1").send({});
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Not Found" });
  });
});

// DELETE TESTING
describe("DELETE / can delete a question", () => {
  it("can post a new question", () => {
    return supertest(server).post("/question").send({
      id: 7,
      type: "Request Questions",
      style: "Text",
      question: "What is your favorite dessert?",
    });
    expect(res.status).toBe(200);
  });
  it("can delete newly added question", () => {
    return supertest(server).delete("/question/7");
    expect(res.status).toBe(200);
    expect(res.message).toBe("question '7' was deleted.");
  });
});
