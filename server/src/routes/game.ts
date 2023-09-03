import { type Application } from 'express-ws'
import { addGame, gameExists, getGame } from '../pseudoDatabase.ts'

export function useGame (app: Application): void {
  app.post('/game', (_req, res) => {
    const gameId = _req.body.hash

    if (!gameId || gameExists(gameId)) {
      console.log(`rejecting ${gameId}`)
      res.status(400)
      res.send({ error: 'game already exists' })
      return
    }

    addGame(gameId)
    const game = getGame(gameId)
    console.log(`Game created ${gameId}`)
    console.log(`responding with: ${JSON.stringify(game)}`)
    res.send(game)
  })

  app.get('/game/:id', (_req, res) => {
    const gameId = _req.params.id
    const game = getGame(gameId)
    if (!game) {
      res.status(404)
    }
    res.send(game)
  })
}
