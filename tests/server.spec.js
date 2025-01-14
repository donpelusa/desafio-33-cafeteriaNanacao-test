const request = require('supertest');
const app = require('../index');

describe('Pruebas de la API de Cafetería Nanacao', () => {
  test('GET /cafes Arreglo con al menos un objeto, devuelve 200', async () => {
    const response = await request(app).get('/cafes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.some((elemento) => typeof elemento === "object" && elemento !== null)).toBe(true);
    expect(response.body.every((elemento) => typeof elemento === "object" && elemento !== null)).toBe(true);
  });

  test('DELETE /cafes/:id ID no existe, devuelve 404', async () => {
    const response = await request(app)
      .delete('/cafes/90') 
      .set('Authorization', 'Bearer token'); 
    expect(response.status).toBe(404);
  });

  test('POST /cafes Agrega nuevo café, devuelve 201', async () => {
    const newCafe = { id: 9999, nombre: 'Café nuevo de prueba' }; 
    const response = await request(app).post('/cafes').send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(newCafe);
  });

  test('PUT /cafes/:id ID no coincide, devuelve 400', async () => {
    const updatedCafe = { id: 5, nombre: 'Café actualizado' };
    const response = await request(app).put('/cafes/4').send(updatedCafe); 
    expect(response.status).toBe(400);
  });
});
