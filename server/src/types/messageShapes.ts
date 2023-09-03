export interface ListenToGameMessage {
  type: 'ListenToGame'
  gameId: string
}
export type MessageFromClient = ListenToGameMessage

export type ObjectType = 'game'

export interface ObjectUpdatedMessage<ObjectType> {
  type: 'ObjectUpdated'
  objectType: ObjectType
  updatedId: string
  nextObj: ObjectType
}

export type MessageFromServer = ObjectUpdatedMessage<unknown>
