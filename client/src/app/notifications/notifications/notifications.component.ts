import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatService } from '../chat.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnDestroy {

    private _destroying: Subject<void> = new Subject<void>();

    constructor(private _service: ChatService, private _snackBar: MatSnackBar) {

        this._service.channelCreated
            .pipe(takeUntil(this._destroying))
            .subscribe(c => {
                this.openSnackBar(`channel created: ${c.name}`, 'Close');
            });

        this._service.channelDeleted
            .pipe(takeUntil(this._destroying))
            .subscribe(c => {

                this.openSnackBar(`channel deleted: ${c.name}`, 'Close');
            });


        this._service.connected
            .pipe(takeUntil(this._destroying))
            .subscribe(() => {
                this.openSnackBar(`notification service connected`, 'Close');

            });

        this._service.disconnected
            .pipe(takeUntil(this._destroying))
            .subscribe(() => {
                this.openSnackBar(`notification service disconnected`, 'Close');

            });

        this._service.reconnected
            .pipe(takeUntil(this._destroying))
            .subscribe(() => {
                this.openSnackBar(`notification service reconnected`, 'Close');
            });


        this._service.start();

    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }
    ngOnDestroy(): void {
        this._destroying.next();
        this._destroying.complete();
    }

}
