import { type UnifiedGame } from './types/types.ts'
import { generate } from 'random-words'
import { WatchableResource } from './watchableResource.ts'

const gameDB: Record<string, WatchableResource<UnifiedGame>> = {}

export function gameExists (gameId: string): boolean {
  return !!gameDB[gameId]
}
export function getGame (gameId: string): UnifiedGame | undefined {
  if (!gameDB[gameId]) {
    throw new Error(`${gameId} not found`)
  }
  return gameDB[gameId].readOnce()
}

export function addGame (gameId: string): boolean {
  if (gameDB[gameId]) {
    throw new Error('Game already exists')
  }

  gameDB[gameId] = new WatchableResource(createGame(gameId))
  return true
}

export function subscribeToGame (gameId: string | number, callback: (value: UnifiedGame | null) => void): () => void {
  if (gameDB[gameId]) {
    throw new Error(`${gameId} not found`)
  }

  return gameDB[gameId].subscribe(callback)
}

function createGame (_gameId: string): UnifiedGame {
  return {
    gameStarted: false,
    gmSecretHash: generate(3).join('-'),
    players: {},
    playersToRoles: {},
  }
}
