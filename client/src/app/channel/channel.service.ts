import { Injectable } from '@angular/core';
import { catchError, map, take } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';
import { Channel } from '../channel';
import { Settings } from '../settings';


@Injectable({
    providedIn: 'root'
})
export class ChannelService {


    constructor(private _http: HttpClient, private _settings: Settings) { }

    delete(channel: Channel) {
        return this._http.delete(`${this._settings.baseUrl}/channel/${channel.id}`)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    console.log('invalid response', err);
                    return empty();
                })
            );
    }

    add(channel: Channel) {
        return this._http.post(`${this._settings.baseUrl}/channel`, channel)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    console.log('invalid response', err);
                    return empty();
                })
            );
    }
}
