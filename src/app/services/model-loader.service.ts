import { Injectable } from '@angular/core';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { HttpClient } from '@angular/common/http';
import { BoneMapping } from '../types';

@Injectable({ providedIn: 'root' })
export class ModelLoaderService {
    constructor(private http: HttpClient) {}

    loadModel(name: string) {
        const fbxLoader = new FBXLoader();

        const fbxPromise = new Promise<THREE.Group>(resolve => {
            fbxLoader.load(`assets/fbx/${name}.model.fbx`, object => {
                resolve(object);
            });
        });

        const fetchMappingPromise = this.http.get<BoneMapping>(`assets/fbx/${name}.mapping.json`).toPromise();

        return Promise.all([fbxPromise, fetchMappingPromise]);
    }
}
