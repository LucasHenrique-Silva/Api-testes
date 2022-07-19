/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const request = require("supertest");
const app = require("../../src/app");

test("Deve criar usuário via signup", () => {
  return request(app)
    .post("/auth/signup")
    .send({
      name: "Lucas",
      email: `${Date.now()}@email.com`,
      password: "123456",
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Lucas");
      expect(res.body).toHaveProperty("email");
      expect(res.body).not.toHaveProperty("password");
    });
});

test("Deve receber token ao logar", () => {
  const email = `${Date.now()}@email.com`;
  return app.services.user
    .save({ name: "Lucas", email, password: "123456" })
    .then(() =>
      request(app).post("/auth/signin").send({ email, password: "123456" })
    )
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
});

test("Não deve autenticar usuário com senha errada", () => {
  const email = `${Date.now()}@email.com`;
  return app.services.user
    .save({ name: "Lucas", email, password: "123456" })
    .then(() =>
      request(app).post("/auth/signin").send({ email, password: "654321" })
    )
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Usuário ou senha invalido");
    });
});

test("Não deve autenticar usuário com senha errada", () => {
  return request(app)
    .post("/auth/signin")
    .send({ email: "naoExiste@email.com", password: "654321" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Usuário ou senha invalido");
    });
});

test("Não deve acessar uma rota protegida sem token", () => {
  return request(app)
    .get("/v1/users")
    .then((res) => {
      expect(res.status).toBe(401);
    });
});
