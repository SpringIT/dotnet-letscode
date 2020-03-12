import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../channel.service';
import { Channel, ChannelDetails } from 'src/app/channel';
import { ChatService } from 'src/app/notifications/chat.service';

@Component({
    selector: 'app-channel-list',
    templateUrl: './channel-list.component.html',
    styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {
    channels: ChannelDetails[];

    constructor(private _channelService: ChannelService, private _chatHub: ChatService) { }

    ngOnInit() {
        this.load();
    }

    private load() {
        this._chatHub.channelListUpdated
            .subscribe(channels => {
                this.channels = channels;
            });
    }
    onDelete(event: Event, channel: Channel) {

        event.preventDefault();
        event.stopPropagation();

        this._channelService.delete(channel)
            .subscribe(() => {
                this.load();
            });
    }

    public async onJoin(event: Event, channel: Channel) {
        await this._chatHub.join(channel);
    }
}
