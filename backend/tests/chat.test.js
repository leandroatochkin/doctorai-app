import request from 'supertest'
import express from 'express'
import chatRoute from '../api/routes/gptRoute.js'

const app = express()
app.use(express.json())
app.use('/chat', chatRoute)

describe('POST /chat', () => {
  it('should return a reply message', async () => {
    const res = await request(app)
      .post('/chat')
      .send({ message: 'Hello, what should I do if I have a headache?' })

    console.log('RESPONSE BODY:', res.body)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('reply')
    expect(typeof res.body.reply).toBe('string')
  })
})
