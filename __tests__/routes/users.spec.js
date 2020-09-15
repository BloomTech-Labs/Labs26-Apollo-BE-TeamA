// const supertest = require("supertest");
//
// const server = require("../../api/app.js");
//
// describe("Can retrieve user profile data", () => {
//   it("Can return firstname from user profile object", () => {
//     return supertest(server)
//       .get("/profile")
//       .then((res) => {
//         expect(res.body[0].firstname).toBe("FirstName001");
//       });
//   });
//   it("Can return user id from firstname user", () => {
//     return supertest(server)
//       .get("/profile")
//       .then((res) => {
//         console.log(res.body[0].id);
//         expect(res.body[0].id).toBe("00ulthapbErVUwVJy4x6");
//       });
//   });
// });
