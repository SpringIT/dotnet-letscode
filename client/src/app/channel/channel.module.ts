import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelMessagesComponent } from './channel-messages/channel-messages.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { HandyMaterialModule } from '../handy-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComposerComponent } from './message-composer/message-composer.component';

@NgModule({
    declarations: [ChannelListComponent
        , ChannelMessagesComponent
        , CreateChannelComponent, MessageComposerComponent
    ],
    exports: [
        ChannelListComponent
        , ChannelMessagesComponent
        , CreateChannelComponent
    ],
    imports: [
        CommonModule
        , HandyMaterialModule
        , FormsModule
        , ReactiveFormsModule
    ]
})
export class ChannelModule { }
