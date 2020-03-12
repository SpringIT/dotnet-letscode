import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitializer } from './app-initializer';
import { HttpClientModule } from '@angular/common/http';
import { Settings } from './settings';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsModule } from './notifications/notifications.module';
import { ChatComponent } from './chat/chat.component';
import { ChannelModule } from './channel/channel.module';
import { HandyMaterialModule } from './handy-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayComponent } from './overlay/overlay.component';


export function AppInitializerFactory(initializer: AppInitializer) {
    return () => initializer.load();
}

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        OverlayComponent
    ],
    imports: [
        BrowserModule
        , HttpClientModule
        , AppRoutingModule
        , NotificationsModule
        , ChannelModule
        , BrowserAnimationsModule
        , HandyMaterialModule
        , FormsModule
        , ReactiveFormsModule
    ],
    providers: [
        Settings
        , AppInitializer
        , {
            provide: APP_INITIALIZER, useFactory: AppInitializerFactory, deps: [AppInitializer], multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
