import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, take } from 'rxjs/operators';
import { Channel } from 'src/app/channel';
import { Subject } from 'rxjs';
import { ChannelService } from '../channel.service';
import { UUID } from 'angular2-uuid';


@Component({
    selector: 'app-create-channel',
    templateUrl: './create-channel.component.html',
    styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit, OnDestroy {


    public form: FormGroup;
    private _destroying: Subject<void> = new Subject<void>();

    public channel: Channel = new Channel();

    constructor(private _service: ChannelService) {

        this.form = new FormGroup({
            'name': new FormControl(null, Validators.required)
        });
    }

    ngOnInit() {
        this.reset();

        this.form.valueChanges
            .pipe(takeUntil(this._destroying))
            .subscribe(changes => {
                this.channel.name = changes.name;
            });

    }

    ngOnDestroy() {
        this._destroying.next();
        this._destroying.complete();
    }

    onCreate() {

        if (this.form.invalid) {
            return;
        }

        this._service.add(this.channel)
            .pipe(take(1))
            .subscribe(() => {
                this.reset();
            });
    }

    reset() {
        this.channel.name = '';
        this.channel.id = UUID.UUID();

        this.form.setValue({
            name: this.channel.name
        });

        this.form.reset();
    }


}
