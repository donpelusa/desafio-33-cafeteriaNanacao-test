const request = require("supertest");
const server = require("../index");

const token = "cualquier-token-para-eltest";

describe("Operaciones CRUD de cafes", () => {
  it("en ruta /cafes deberia devolver un 200 ok y un array con 1 elemento como minimo", async () => {
    const response = await request(server).get("/cafes");
    const cafes = response.body;
    expect(response.status).toBe(200);
    expect(cafes).toBeInstanceOf(Array);
    expect(cafes.length).toBeGreaterThan(0);
  });

  it("deberia devolver 404 al eliminar cafe sin id", async () => {
    const notId = 398472934;
    const response = await request(server)
      .delete(`/cafes/:${notId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it("deberia devolver 201 al hacer post a /cafes", async () => {
    const response = await request(server).post("/cafes");
    expect(response.status).toBe(201);
  });

  it("deberia retornar 400 si se hace un PUT a cafes:id con un id no existente", async () => {
    const notId = 293847;
    const response = await request(server).put(`/cafes/:${notId}`);
    expect(response.status).toBe(400);
  });
});