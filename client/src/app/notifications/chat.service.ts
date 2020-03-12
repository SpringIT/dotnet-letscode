import { Settings } from '../settings';
import { Injectable, EventEmitter } from '@angular/core';
import { HubService } from '../hub.service';
import { Channel, ChannelDetails } from '../channel';
import { Message } from '../message';

@Injectable({
    providedIn: 'root'
})
export class ChatService extends HubService {

    public channelListUpdated: EventEmitter<Array<ChannelDetails>> = new EventEmitter<Array<ChannelDetails>>();
    public channelCreated: EventEmitter<Channel> = new EventEmitter<Channel>();
    public channelDeleted: EventEmitter<Channel> = new EventEmitter<Channel>();
    public messageReceived: EventEmitter<Message> = new EventEmitter<Message>();

    public joinedChannel: EventEmitter<Channel> = new EventEmitter<Channel>();
    public leftChannel: EventEmitter<Channel> = new EventEmitter<Channel>();

    constructor(settings: Settings) {
        super(settings, 'chat');

        this.connected
            .subscribe(() => {

                this.hub.on('ChannelCreated', (channel: Channel) => {
                    this.channelCreated.next(channel);
                });

                this.hub.on('ChannelDeleted', (channel: Channel) => {
                    this.channelDeleted.next(channel);
                });

                this.hub.on('MessageReceived', (message: Message) => {
                    this.messageReceived.next(message);
                });

                this.hub.on('JoinedChannel', (channel: Channel) => {
                    this.joinedChannel.next(channel);
                });

                this.hub.on('LeftChannel', (channel: Channel) => {
                    this.leftChannel.next(channel);
                });

                this.hub.on('ChannelListUpdated', (channels: Array<ChannelDetails>) => {
                    this.channelListUpdated.next(channels);
                });

            });
    }

    public async join(channel: Channel) {
        await this.hub.send('Join', channel);
    }

    public async leave(channel: Channel) {
        await this.hub.send('Leave', channel);
    }

    public async send(message: Message) {
        await this.hub.send('Send', message);

    }

}