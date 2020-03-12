import { EventEmitter, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';

import { Settings } from './settings';


import { takeUntil, take } from 'rxjs/operators';
import { HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';

export const DEFAULT_FACTOR_RECONNECT: number = 2;
export const DEFAULT_RECONNECT: number = 1000;
export const DEFAULT_MAX_RECONNECT: number = 120000;

export class HubService implements OnDestroy {
    public connected: EventEmitter<void> = new EventEmitter<void>();
    public reconnected: EventEmitter<void> = new EventEmitter<void>();
    public disconnected: EventEmitter<void> = new EventEmitter<void>();

    private _requestReconnect: EventEmitter<void> = new EventEmitter<void>();
    private _reconnectAfter: number = DEFAULT_RECONNECT;
    private _hub: signalR.HubConnection = null;
    private _stopRequested: boolean = false;
    private _destroying: Subject<void> = new Subject<void>();

    protected get hub(): signalR.HubConnection {

        if (this._hub === null) {
            const url = `${this.settings.signalRUrl}/${this.hubName}`;

            const hubConnectionBuilder = new HubConnectionBuilder();
            this._hub = hubConnectionBuilder.withUrl(url)
                .build();
        }

        return this._hub;
    }

    constructor(private settings: Settings, private hubName: string) {
        this.connected
            .pipe(takeUntil(this._destroying))
            .subscribe(() => {
                this.resetAutoReconnectSettings();
            });

        this._requestReconnect
            .pipe(takeUntil(this._destroying))
            .subscribe(() => {
                this._reconnectAfter = this._reconnectAfter * DEFAULT_FACTOR_RECONNECT;
                this._reconnectAfter = Math.min(this._reconnectAfter, DEFAULT_MAX_RECONNECT);

                console.log('cannot connect to hub, retrying after: ' + this._reconnectAfter);

                timer(this._reconnectAfter)
                    .pipe(takeUntil(this.reconnected), takeUntil(this._destroying), take(1))
                    .subscribe(() => {
                        this.start().then(() => {
                            this.reconnected.next();
                        });
                    });
            });
    }

    ngOnDestroy() {
        this._destroying.next();
        this._destroying.complete();
    }

    start(): Promise<void> {
        this._stopRequested = false;
        console.log('connecting');

        const hubStart = this.hub.start();
        hubStart.then(() => {
            this.connected.next();
        }).catch(() => {
            if (this.hub !== null && this.hub.state === HubConnectionState.Connected) {
                this.hub.stop();
            }
            this._hub = null;
            this._requestReconnect.next();
        });

        this.hub.onclose((e) => {
            console.log('disconnecting');
            if (this.hub !== null && this.hub.state === HubConnectionState.Connected) {
                this.hub.stop();
            }
            this._hub = null;
            this.disconnected.next();
            if (this._stopRequested) {
                return;
            }
            this._requestReconnect.next();
        });

        return hubStart;
    }

    stop() {
        this._stopRequested = true;
        if (this.hub === null) {
            return;
        }

        this.hub.stop();
    }

    private resetAutoReconnectSettings() {
        this._reconnectAfter = DEFAULT_RECONNECT;
    }
}