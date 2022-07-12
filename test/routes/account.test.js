const request = require("supertest");

const app = require("../../src/app");

const MAIN_ROUTE = "/account";
let user;

beforeAll(async () => {
  const res = await app.services.user.save({
    name: "user account",
    email: `${Date.now()}@email.com`,
    password: "123456",
  });
  // eslint-disable-next-line rest-spread-spacing
  user = { ...res[0] };
});

test("Deve inserir uma conta com sucesso", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ name: "#acc1", user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe("#acc1");
    });
});
