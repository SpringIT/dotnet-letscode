import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/notifications/chat.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Channel } from 'src/app/channel';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-channel-messages',
    templateUrl: './channel-messages.component.html',
    styleUrls: ['./channel-messages.component.scss']
})
export class ChannelMessagesComponent implements OnInit, OnDestroy {

    private _destroying: Subject<void> = new Subject<void>();
    public channel: Channel = null;

    constructor(private _chatService: ChatService) {
        this._chatService.joinedChannel
            .pipe(takeUntil(this._destroying))
            .subscribe(c => {
                this.channel = c;
            });

        this._chatService.leftChannel
            .pipe(takeUntil(this._destroying))
            .subscribe(c => {
                this.channel = null;
                console.log('left');
            });

        this._chatService.channelDeleted
            .pipe(takeUntil(this._destroying))
            .subscribe(c => {
                this.channel = null;
            });

        this._chatService.messageReceived
            .pipe(takeUntil(this._destroying)
                , filter(m => m.channelId === this.channel.id))
            .subscribe(m => {
                this.channel.messages.push(m);
            });
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this._destroying.next();
        this._destroying.complete();
    }

}
