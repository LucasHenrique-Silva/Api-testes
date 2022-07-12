const request = require("supertest");

const app = require("../../src/app");

const mail = `${Date.now()}@gmail.com`;

test("Deve listar todos os usuarios", () => {
  return request(app)
    .get("/users")
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test("Deve inserir usuario com sucesso", () => {
  return request(app)
    .post("/users")
    .send({
      name: "Diogo",
      email: mail,
      password: "123456",
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Diogo");
    });
});

test("Nao deve inserir usuario sem nome", () => {
  const maile = `${Date.now()}@gmail.com`;
  return request(app)
    .post("/users")
    .send({
      email: maile,
      password: "123456",
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Nome é obrigatorio");
    });
});

test("Nao deve inserir usuario sem email", async () => {
  const result = await request(app).post("/users").send({
    name: "Lucas",
    password: "123456",
  });

  expect(result.status).toBe(400);
  expect(result.body.error).toBe("Email é obrigatorio");
});

test("Nao deve inserir usuario sem senha", () => {
  const maile = `${Date.now()}@gmail.com`;
  return request(app)
    .post("/users")
    .send({
      name: "Diogo",
      email: maile,
    })
    .then((res) => {
      expect(res.status).toBe(400);
    });
});

test("Não deve inserir usuario com mesmo email", () => {
  return request(app)
    .post("/users")
    .send({
      name: "Diogo",
      email: mail,
      password: "123456",
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Email já cadastrado");
    });
});
