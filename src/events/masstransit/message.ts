import { MessageTransit } from './host'

export interface IMassTransitMessage {
  messageId?: string
  requestId?: string
  correlationId?: string
  conversationId?: string
  initiatorId?: string
  expirationTime?: string
  sourceAddress?: string
  destinationAddress?: string
  responseAddress?: string
  faultAddress?: string
  sentTime?: string
  messageType?: Array<string>
  headers?: object
  host?: MessageTransit
}

export class MassTransitMessage<M> implements IMassTransitMessage {
  messageId?: string
  requestId?: string
  correlationId?: string
  conversationId?: string
  initiatorId?: string
  expirationTime?: string
  sourceAddress?: string
  destinationAddress?: string
  responseAddress?: string
  faultAddress?: string
  sentTime?: string
  messageType?: Array<string>
  headers?: object
  host?: MessageTransit
  message: M
}
