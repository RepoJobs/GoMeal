import request from 'supertest'

import { app } from '@/server'
import { generateLocalization } from '../../helpers/utils'
import { Prisma } from '@/infra/db/prisma/client'

beforeEach(async () => {
  const prisma = new Prisma()
  await prisma.clearAllTables()
  prisma.disconnect()
})

describe('Customer Register API integration test', () => {
  it('should register a customer with all informations', async () => {
    await generateLocalization('Country', 'State', 'City')

    const response = await request(app.get)
      .post('/customer/register')
      .send({
        firstName: 'John',
        lastName: 'Due',
        email: 'john.due@email.com',
        password: '12345678',
        address: {
          street: 'Street',
          number: '123',
          zip_code: '12345678',
          city: 'City',
          state: 'State',
          country: 'Country'
        }
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
    
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      firstName: 'John',
      lastName: 'Due',
      email: 'john.due@email.com',
      addresses: [
        {
          street: 'Street',
          number: '123',
          zip_code: '12345678',
          city: 'City',
          state: 'State',
          country: 'Country'
        }
      ]
    })
  })

  it('should register a customer without address', async () => {
    const response = await request(app.get)
      .post('/customer/register')
      .send({
        firstName: 'John',
        lastName: 'Due',
        email: 'john.due@email.com',
        password: '12345678'
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
    
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      firstName: 'John',
      lastName: 'Due',
      email: 'john.due@email.com',
      addresses: []
    })
  })

  it('should not register a customer with invalid email', async () => {
    const response = await request(app.get)
      .post('/customer/register')
      .send({
        firstName: 'John',
        lastName: 'Due',
        email: 'john.dueemail.com',
        password: '12345678'
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      error: 'Invalid email: john.dueemail.com'
    })
  })

  it('should not register a customer with invalid password', async () => {
    const response = await request(app.get)
      .post('/customer/register')
      .send({
        firstName: 'John',
        lastName: 'Due',
        email: 'john.due@email.com',
        password: '123'
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      error: 'Password must have least 8 characters'
    })
  })

  it('should not register a customer without first name', async () => {
    const response = await request(app.get)
      .post('/customer/register')
      .send({
        lastName: 'Due',
        email: 'john.due@email.com',
        password: '12345678'
      })  
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      error: 'First name is required'
    })
  })

  it('should register a customer without last name', async () => {
    const response = await request(app.get)
      .post('/customer/register')
      .send({
        firstName: 'John',
        email: 'john.due@email.com',
        password: '12345678'
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      firstName: 'John',
      lastName: null,
      email: 'john.due@email.com',
      addresses: []
    })
  })

  it('should not register a customer with invalid address', async () => {
    const response = await request(app.get)
      .post('/customer/register')
      .send({
        firstName: 'John',
        lastName: 'Due',
        email: 'john.due@email.com',
        password: '12345678',
        address: {
          street: 'Street',
          number: '123',
          zip_code: '12345678',
          city: 'City',
          state: 'State',
          country: 'Country'
        }
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      error: 'Invalid Address'
    })
  })
})