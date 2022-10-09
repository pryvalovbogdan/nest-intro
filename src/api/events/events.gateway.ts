import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('event')
  onEvent(@MessageBody() data): Observable<WsResponse<number>> {
    const event = 'events';
    const response = [1, 2, 3];
    console.log('data', data);

    this.server.emit('events', data);
    return from(response).pipe(map(data => ({ event, data })));
  }

  @SubscribeMessage('ping')
  onPing(@MessageBody() data) {
    this.server.emit('pong');
  }

  handleConnection(client: Socket) {
    client.emit('connection', client.handshake.query);
  }

  handleDisconnect() {
    console.log('client disconnected');
  }
}
