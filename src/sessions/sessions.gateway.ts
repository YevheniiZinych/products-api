import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } }) // CORS на localhost разрешен
export class SessionsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private sessionsCount = 0;

  handleConnection() {
    this.sessionsCount++;
    this.emitSessions();
  }

  handleDisconnect() {
    this.sessionsCount = Math.max(0, this.sessionsCount - 1);
    this.emitSessions();
  }

  emitSessions() {
    this.server.emit('sessions', this.sessionsCount);
  }
}
