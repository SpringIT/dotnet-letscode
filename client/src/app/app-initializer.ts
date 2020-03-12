import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AppInitializer {
    constructor(private _configurationService: ConfigurationService) { }

    load(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            this._configurationService
                .load()
                .then(() => {
                    resolve();
                }, () => {
                    reject();
                });
        });
        return promise;
    }
}