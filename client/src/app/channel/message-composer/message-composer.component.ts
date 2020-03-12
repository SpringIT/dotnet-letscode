import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChatService } from 'src/app/notifications/chat.service';
import { Message } from 'src/app/message';
import { UUID } from 'angular2-uuid';
import { Channel } from 'src/app/channel';

@Component({
    selector: 'app-message-composer',
    templateUrl: './message-composer.component.html',
    styleUrls: ['./message-composer.component.scss']
})
export class MessageComposerComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private _destroying: Subject<void> = new Subject<void>();

    public message: string;

    @Input() channel: Channel;

    constructor(private _chatService: ChatService) {
        this.form = new FormGroup({
            'message': new FormControl(null, Validators.required)
        });
    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(takeUntil(this._destroying))
            .subscribe(changes => {
                this.message = changes.message;
            });
    }

    async onSend(event: Event) {

        event.preventDefault();
        event.stopPropagation();

        if (this.form.invalid) {
            return;
        }

        const message = new Message();
        message.id = UUID.UUID();
        message.value = this.message;
        message.channelId = this.channel.id;

        this.reset();

        await this._chatService.send(message);

    }

    ngOnDestroy() {
        this._destroying.next();
        this._destroying.complete();
    }

    private reset() {
        this.message = '';
        this.form.setValue({
            message: this.message
        });

        this.form.reset();
    }

}
