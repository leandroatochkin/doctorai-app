import express from 'express'

const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body

  try {
    const response = await fetch('http://ollama:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        messages: [
          { role: 'system', content: 'You are a helpful medical advisor. Do not provide a diagnosis. Only offer general health advice. Please clarify to seek professional care' },
          { role: 'user', content: message }
        ],
        stream: false
      })
    })

    const result = await response.json()
    console.log(result)
    res.status(200).json({ reply: result.message.content })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to reach local model' })
  }
})

export default router