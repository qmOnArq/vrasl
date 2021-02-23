import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
    selector: 'a-avatar-renderer',
    templateUrl: './avatar-renderer.component.html',
    styleUrls: ['./avatar-renderer.component.scss'],
})
export class AvatarRendererComponent implements OnInit, OnDestroy {
    get width() {
        return this.element?.nativeElement?.clientWidth ?? 0;
    }

    get height() {
        return this.element?.nativeElement?.clientHeight ?? 0;
    }

    private renderer!: THREE.WebGLRenderer;
    private camera!: THREE.Camera;
    private scene!: THREE.Scene;

    private cube!: THREE.Mesh;

    private destroyed = false;

    constructor(private element: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        this.element.nativeElement.appendChild(this.renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        this.camera.position.z = 5;

        this.animate();
    }

    ngOnDestroy() {
        this.destroyed = true;
    }

    private animate() {
        if (this.destroyed) {
            return;
        }

        requestAnimationFrame(() => this.animate());

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }
}
