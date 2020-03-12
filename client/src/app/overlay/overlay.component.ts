import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ChatService } from '../notifications/chat.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


type display = 'none' | 'block';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {

    private _destroying: Subject<void> = new Subject<void>();


    constructor(private _service: ChatService) { }

    @HostBinding('style.display')
    public display: display = 'block';

    ngOnInit() {
        this._service.connected
            .pipe(takeUntil(this._destroying))
            .subscribe(() => {
                this.display = 'none';
            });

        this._service.disconnected
            .pipe(takeUntil(this._destroying))
            .subscribe(() => {
                this.display = 'block';
            });

        this._service.reconnected
            .pipe(takeUntil(this._destroying))
            .subscribe(() => {
                this.display = 'none';
            });
    }

    ngOnDestroy(): void {
        this._destroying.next();
        this._destroying.complete();
    }

}
