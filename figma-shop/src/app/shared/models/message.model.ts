import { IMessage } from '../interfaces/message.interface';

export class Message implements IMessage {
    constructor(
        public id: number,
        public author: string,
        public date: Date,
        public description: string
    ){}
}