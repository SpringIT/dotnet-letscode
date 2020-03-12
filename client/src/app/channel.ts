import { Message } from './message';

export class Channel {
    id: string;
    name: string;
    messages: Array<Message> = [];


}

export class ChannelDetails {
    id: string;
    name: string;
    messageCount: number;
}

