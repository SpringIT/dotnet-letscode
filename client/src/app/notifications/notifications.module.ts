import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [NotificationsComponent],
    exports: [NotificationsComponent],
    imports: [
        CommonModule
        , MatSnackBarModule
    ]
})
export class NotificationsModule {




}
