import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
    {
        path: '',
        component: ChatComponent,
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
