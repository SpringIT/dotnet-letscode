import { Injectable, Inject } from '@angular/core';
import { Settings } from './settings';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    private _loadingPromise: Promise<void> = null;

    constructor(private _http: HttpClient, private _settings: Settings) { }
    load(): Promise<void> {

        if (this._loadingPromise === null) {
            this._loadingPromise = new Promise<void>((resolve, reject) => {
                this.get().then((result) => {
                    this._settings.baseUrl = result.baseUrl;
                    this._settings.signalRUrl = result.signalRUrl;
                    this._settings.version = result.version;
                    resolve();
                });
            });
        }

        return this._loadingPromise;
    }

    get(): Promise<Settings> {
        return new Promise<Settings>((resolve, reject) => {
            this._http.get<Settings>(this._settings.settingsUrl).subscribe(result => {
                const settings = result as Settings;
                resolve(settings);
            });
        });
    }
}
