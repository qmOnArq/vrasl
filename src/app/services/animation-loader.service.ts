import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as LZString from 'lz-string';
import { AnimationData } from '../types';

@Injectable({ providedIn: 'root' })
export class AnimationLoaderService {
    private cache: Record<string, any> = {};

    constructor(private http: HttpClient) {}

    loadAnimation(name: string): Promise<AnimationData | null> {
        if (this.cache[name]) {
            return this.cache[name];
        }

        return this.http
            .get(`assets/anims/${name}.lzs`, { responseType: 'text' })
            .toPromise()
            .then(data => {
                const decompressedData = LZString.decompressFromUTF16(data);
                if (decompressedData) {
                    const json = JSON.parse(decompressedData);
                    this.cache[name] = json;
                    return json;
                }

                return null;
            });
    }
}
