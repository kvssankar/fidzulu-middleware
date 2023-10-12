const request = require('supertest');
const express = require('express');
const axios = require('axios');

const app = express();

// Define your API routes here

// Defined routes for Bikes

app.get('/bikes/NewBikes', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.get('/bikes/Durham', (req, res) => {
  res.status(200).json({
    data: {
      "name": "Mamba Sport 12\" Balance Bike",
      "brand": "Mamba Bikes",
      "color": "black",
      "price": 75.88
    },
  });
});

// Defined routes for Food

app.get('/food/NewFood', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.get('/food/Durham', (req, res) => {
  res.status(200).json({
    data: {
      "name": "The Original Sandwich",
      "brand": "Oreo",
      "weight": "303g",
      "calories": 405,
      "price": 2.85
    },
  });
});

// Defined routes for Toys

app.get('/toys/NewToy', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.get('/toys/Durham', (req, res) => {
  res.status(200).json({
    data: {
      name: 'Medical Kit',
      brand: 'Fisher-Price',
      'age-group': '3 to 9',
      prize: 20.41,
    },
  });
});

app.get('/toys/NewToy', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.get('/toys/Durham', (req, res) => {
  res.status(200).json({
    data: {
      name: 'Medical Kit',
      brand: 'Fisher-Price',
      'age-group': '3 to 9',
      prize: 20.41,
    },
  });
});



// Other route handlers

// For Bikes

describe('Bikes API Integration Tests', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('returns a 404 status code', async () => {
    const response = await request(app).get('/bikes/NewBike');
    expect(response.status).toBe(404);
  });

  it('returns a 200 status code', async () => {
    const response = await request(app).get('/toys/Durham');
    expect(response.status).toBe(200);
  });
  
});

// For Food

describe('Food API Integration Tests', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('returns a 404 status code', async () => {
    const response = await request(app).get('/food/NewFood');
    expect(response.status).toBe(404);
  });

  it('returns a 200 status code', async () => {
    const response = await request(app).get('/food/Durham');
    expect(response.status).toBe(200);
  });
  
});

// For Toys

describe('Toys API Integration Tests', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('returns a 404 status code', async () => {
    const response = await request(app).get('/toys/NewToy');
    expect(response.status).toBe(404);
  });

  it('returns a 200 status code', async () => {
    const response = await request(app).get('/toys/Durham');
    expect(response.status).toBe(200);
  });
  
});