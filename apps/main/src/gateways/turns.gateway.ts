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
  room: string;
  name: string;
  company?: string;
  note?: string;
  isFinish?: boolean;
  createdAt?: string;
  id: number;
  idPre?: number;
  roomAppointMent?: string;
  timeAppointment?: string | null;
  takeBy?: string;
  entryTime?: string;
  procedures?: any[];
  attentions?: any[];
  doubleTurn?: boolean;
  takePreTurn?: boolean;
}

@WebSocketGateway(3001, {
  cors: { origin: '*' },
})
export class TurnsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private preTurns: Person[] = [];
  private turns: Person[] = [];
  private turnsTaken: Person[] = [];

  afterInit(server: any) {
    // console.log('Esto se ejecuta cuando inicia');
  }

  handleConnection(client: any, ...args: any[]) {
    // // console.log('Hola alguien se conecto al socket 👌👌👌');
    // this.server.emit('turnList', this.turns);
  }

  handleDisconnect(client: any) {
    // console.log('ALguien se fue! chao chao');
  }

  @SubscribeMessage('eventJoin')
  handleJoinRoom(client: Socket, room: string) {
    // console.log('nueva sala agregada::::', room);
    client.join(`room_${room}`);
    client.emit('turnList', this.turns);
    client.emit('preTurnList', this.preTurns);
    client.emit('turnTakenList', { turnsTaken: this.turnsTaken });
  }
  // New Pre Turn
  @SubscribeMessage('newPreTurn')
  handlePreNewTurn(client: Socket, payload: Person) {
    // console.log('newPreTurn::', payload);
    this.preTurns.push(payload);
    this.server.to(`room_${payload.room}`).emit('preTurnList', this.preTurns);
  }
  // New Pre Turn
  @SubscribeMessage('takePreTurn')
  handleTakePreTurn(client: Socket, payload: { id: number; room: string }) {
    // console.log('newPreTurn::', payload);
    // this.preTurns.push(payload);
    this.preTurns.forEach((item) => {
      if (item.id === payload.id) item.takePreTurn = true;
    });
    this.server.to(`room_${payload.room}`).emit('preTurnList', this.preTurns);
  }

  // New turns
  @SubscribeMessage('newTurn')
  handleNewTurn(client: Socket, payload: Person) {
    console.log('newTurn:::', payload);
    this.turns.push({ ...payload });
    // console.log(2, this.turns);
    const preTurns = this.preTurns.filter((item) => item.id !== payload.idPre);
    this.preTurns = preTurns;
    // console.log(3, preTurns);
    this.server.to(`room_${payload.room}`).emit('preTurnList', this.preTurns);
    this.server.to(`room_${payload.room}`).emit('turnList', [...this.turns]);
  }

  // New turns
  @SubscribeMessage('finishTurn')
  handleFinishTurn(client: Socket, payload: Person) {
    let turns, turnsTaken;
    // console.log('finishTurn', payload);
    if (!payload.isFinish) {
      turns = [...this.turns];
      turns.push(payload);
      // console.log(123456, turns);
      turnsTaken = this.turnsTaken.filter((item) => item.id !== payload.id);

      this.turnsTaken = turnsTaken;

      this.turns = turns;
    } else {
      turnsTaken = this.turnsTaken.filter((item) => item.id !== payload.id);
      turns = this.turns.filter((item) => item.id !== payload.id);
      this.turnsTaken = turnsTaken;
      this.turns = turns;
    }
    this.server.to(`room_${payload.room}`).emit('turnList', turns);
    this.server
      .to(`room_${payload.room}`)
      .emit('turnTakenList', { turnsTaken: turnsTaken });
  }

  // Taken turns

  @SubscribeMessage('takenTurn')
  handleTakenTurn(client: Socket, payload: Person) {
    const index = this.turns.findIndex((item) => item.id === payload.id);
    if (index !== -1) {
      const turn = this.turns.splice(index, 1)[0];
      const turnTaken = {
        ...turn,
        ...payload,
      };

      this.turnsTaken.push(turnTaken);
      this.server
        .to(`room_${payload.room}`)
        .emit('turnTakenList', { turnsTaken: this.turnsTaken, turnTaken });
      this.server.to(`room_${payload.room}`).emit('turnList', this.turns);
    }
  }
  @SubscribeMessage('deleteTurn')
  handleDeleteTurn(client: Socket, payload: Person) {
    const turns = this.turns.filter((item) => item.id !== payload.id);
    this.turns = turns;
    this.server.to(`room_${payload.room}`).emit('turnList', this.turns);
    const turnsTaken = this.turnsTaken.filter((item) => item.id !== payload.id);
    this.turnsTaken = turnsTaken;
    this.server
      .to(`room_${payload.room}`)
      .emit('turnTakenList', { turnsTaken: this.turnsTaken });
  }

  @SubscribeMessage('callAgain')
  handleCallAgain(client: Socket, payload: Person) {
    this.server.to(`room_${payload.room}`).emit('callAgain', payload);
  }

  @SubscribeMessage('changeRoom')
  handleChangeRoom(client: Socket, payload: Person) {
    const turn = this.turns.filter((item) => item.id === payload.id);
    if (turn?.length) {
      const turns = this.turns.filter((item) => item.id !== payload.id);
      this.turns = [payload, ...turns];
    }

    const turnTaken = this.turnsTaken.filter((item) => item.id === payload.id);
    if (turnTaken?.length) {
      const turnsTaken = this.turnsTaken.filter(
        (item) => item.id !== payload.id,
      );
      this.turnsTaken = [payload, ...turnsTaken];
    }
    this.server.to(`room_${payload.room}`).emit('turnList', this.turns);
    this.server
      .to(`room_${payload.room}`)
      .emit('turnTakenList', { turnsTaken: this.turnsTaken });
  }

  @SubscribeMessage('unlock')
  handleUnlock(client: Socket, payload: Person) {
    const turnTaken = this.turnsTaken.filter((item) => item.id === payload.id);
    if (turnTaken?.length) {
      const turnsTaken = this.turnsTaken.filter(
        (item) => item.id !== payload.id,
      );
      this.turnsTaken = [...turnsTaken];
      this.turns = [payload, ...this.turns];
    }
    this.server.to(`room_${payload.room}`).emit('turnList', this.turns);
    this.server
      .to(`room_${payload.room}`)
      .emit('turnTakenList', { turnsTaken: this.turnsTaken });
  }

  @SubscribeMessage('reCreateTurn')
  handleReCreateTurn(client: Socket, payload: Person) {
    try {
      console.log(999);
      const index = this.turns.findIndex((x) => x.id === payload.id);
      const indexTaken = this.turnsTaken.findIndex((x) => x.id === payload.id);
      if (index < 0 && indexTaken < 0) {
        const turns = [...this.turns, payload];
        console.log(777, turns);
        this.turns = turns;
      } else return { message: 'El turno se encuentra en el turner' };

      this.server.to(`room_${payload.room}`).emit('turnList', this.turns);
    } catch (e) {
      console.log(e);
    }
    // this.server
    //   .to(`room_${payload.room}`)
    //   .emit('turnTakenList', { turnsTaken: this.turnsTaken });
  }
}
