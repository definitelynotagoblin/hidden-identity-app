import expressWs from 'express-ws'
import express from 'express'
import dotenv from 'dotenv'
import { addGame, gameExists, getGame, subscribeToGame } from './pseudoDatabase.ts'
import { createMessage, parseMessage } from './messenger.ts'

dotenv.config()

const rawApp = express()
const app = expressWs(rawApp).app
const port = process.env.PORT

app.ws('/socket', (ws) => {
  ws.on('message', (rawMsg) => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const message = rawMsg.toString()
    console.log(`recieved message ${message}}`)
    const parsedMessage = parseMessage(message)
    if (parsedMessage.type === 'ListenToGame') {
      subscribeToGame(parsedMessage.gameId, (game) => {
        ws.send(createMessage({
          type: 'ObjectUpdated',
          objectType: 'game',
          updatedId: parsedMessage.gameId,
          nextObj: game,
        }))
      })
    }
  })
})

app.get('/game/:id', (_req, res) => {
  const gameId = _req.params.id
  const game = getGame(gameId)
  if (!game) {
    res.status(404)
  }
  res.send(game)
})

app.post('/game/:id', (_req, res) => {
  const gameId = _req.params.id
  if (gameExists(gameId)) {
    res.status(400)
    res.send({ error: 'game already exists' })
  }

  addGame(gameId)
  res.send(getGame(gameId))
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

console.log('dsafdsaf')
