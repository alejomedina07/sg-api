import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Person {
  name: string;
  id: number;
  roomAppointMent?: string;
  takeBy?: string;
}

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class TurnsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private turns: Person[] = [];
  private turnsTaken: Person[] = [];

  afterInit(server: any) {
    console.log('Esto se ejecuta cuando inicia');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Hola alguien se conecto al socket 👌👌👌');
    // this.server.emit('turnList', this.turns);
  }

  handleDisconnect(client: any) {
    console.log('ALguien se fue! chao chao');
  }

  @SubscribeMessage('eventJoin')
  handleJoinRoom(client: Socket, room: string) {
    console.log('nueva sala agregada::::', room);
    client.join(`room_${room}`);
    client.emit('turnList', this.turns);
    client.emit('turnTakenList', { turnsTaken: this.turnsTaken });
  }
  // New turns
  @SubscribeMessage('newTurn')
  handleNewTurn(
    client: Socket,
    payload: { room: string; name: string; id: number },
  ) {
    this.turns.push({ name: payload.name, id: payload.id });
    console.log('nuevo turno agregado::::', this.turns);
    this.server.to(`room_${payload.room}`).emit('turnList', this.turns);
  }

  // Taken turns

  @SubscribeMessage('takenTurn')
  handleTakenTurn(
    client: Socket,
    payload: {
      room: string;
      name: string;
      id: number;
      roomAppointMent: string;
      takeBy: string;
    },
  ) {
    console.log('takenTurn');
    const index = this.turns.findIndex((item) => item.id === payload.id);
    console.log(index);
    // Verifica si se encontró un elemento con id igual a 1
    if (index !== -1) {
      console.log(7777, payload);
      // Extrae el elemento con id igual a 1 y guárdalo en una variable
      const turn = this.turns.splice(index, 1)[0];
      const turnTaken = {
        ...turn,
        roomAppointMent: payload.roomAppointMent,
        takeBy: payload.takeBy,
      };
      this.turnsTaken.push(turnTaken);
      console.log('Elemento extraído:', turnTaken);
      console.log('nuevo turno agregado::::', this.turns);
      this.server
        .to(`room_${payload.room}`)
        .emit('turnTakenList', { turnsTaken: this.turnsTaken, turnTaken });
      this.server.to(`room_${payload.room}`).emit('turnList', this.turns);
    }
  }

  //
  // @SubscribeMessage('event_message') //TODO Backend
  // handleIncommingMessage(
  //   client: Socket,
  //   payload: { room: string; message: string },
  // ) {
  //   const { room, message } = payload;
  //   console.log(payload);
  //   this.server.to(`room_${room}`).emit('new_message', message);
  // }
  //
  // @SubscribeMessage('event_leave')
  // handleRoomLeave(client: Socket, room: string) {
  //   console.log(`chao room_${room}`);
  //   client.leave(`room_${room}`);
  // }
}
