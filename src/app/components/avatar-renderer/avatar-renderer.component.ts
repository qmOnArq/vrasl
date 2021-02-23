import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ResizeObserverFactoryService } from '../../services/resize-observer-factory.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

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
    private camera!: THREE.PerspectiveCamera;
    private scene!: THREE.Scene;
    private animationMixer!: THREE.AnimationMixer;
    private clock = new THREE.Clock();

    // @ts-ignore
    private stats: Stats = new Stats();

    private resizeObserver?: ResizeObserver;
    private destroyed = false;

    constructor(
        private element: ElementRef<HTMLElement>,
        private resizeObserverFactoryService: ResizeObserverFactoryService,
    ) {}

    ngOnInit() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.set(100, 200, 300);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemisphereLight.position.set(0, 200, 0);
        this.scene.add(hemisphereLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 200, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 180;
        directionalLight.shadow.camera.bottom = -100;
        directionalLight.shadow.camera.left = -120;
        directionalLight.shadow.camera.right = 120;
        this.scene.add(directionalLight);

        // this.scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

        // Ground
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(4000, 4000),
            new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }),
        );
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        const grid = new THREE.GridHelper(4000, 40, 0x000000, 0x000000);
        (grid.material as THREE.Material).opacity = 0.2;
        (grid.material as THREE.Material).transparent = true;
        this.scene.add(grid);

        const fbxLoader = new FBXLoader();
        fbxLoader.load('assets/fbx/samba.fbx', object => {
            this.animationMixer = new THREE.AnimationMixer(object);

            object.traverse(child => {
                child.castShadow = true;
                child.receiveShadow = true;
            });

            this.scene.add(object);
        });

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        this.element.nativeElement.appendChild(this.renderer.domElement);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 100, 0);
        controls.update();

        this.element.nativeElement.appendChild(this.stats.dom);
        this.stats.domElement.style.cssText = 'position:absolute; top:0px; right:0px;';

        this.animate();

        this.resizeObserver = this.resizeObserverFactoryService.new(() => {
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });
        this.resizeObserver.observe(this.element.nativeElement);
    }

    ngOnDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        this.destroyed = true;
    }

    private animate() {
        if (this.destroyed) {
            return;
        }

        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        if (this.animationMixer) {
            this.animationMixer.update(delta);
        }
        this.renderer.render(this.scene, this.camera);

        if (this.stats) {
            this.stats.update();
        }
    }
}
