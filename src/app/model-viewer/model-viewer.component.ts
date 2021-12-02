import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss'],
})
export class ModelViewerComponent implements AfterViewInit, OnChanges {
  static models: Map<string, THREE.Group> = new Map<string, THREE.Group>();

  @ViewChild('container') container: ElementRef;

  @Input() ratio = 1;
  @Input() modelName: string;
  @Input() brightness = 1.5;
  @Input() zoom = 1;
  loader: OBJLoader;
  matLoader: MTLLoader;
  scene: THREE.Scene;
  light1: THREE.AmbientLight;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  model: THREE.Group;
  first = true;
  loading = true;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.loader = new OBJLoader();
    this.matLoader = new MTLLoader();
    this.scene = new THREE.Scene();
    this.light1 = new THREE.AmbientLight(0xffffff, this.brightness);
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.ratio * 1440,
      ((this.ratio * window.innerHeight) / window.innerWidth) * 1440
    );
    this.light1.position.set(20, 20, 20);
    this.scene.add(this.light1);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 5;
    this.camera.position.set(20 / this.zoom, 20 / this.zoom, 20 / this.zoom);
    this.camera.lookAt(0, 0, 0);
    this.controls.update();
    this.scene.background = new THREE.Color(0xffffff);
    const element: HTMLElement = this.renderer.domElement;
    element.classList.add('bordered');
    this.el.nativeElement.appendChild(element);
    this.matLoader.load(
      `${environment.baseUrl}assets/3d/${this.modelName}.mtl`,
      (mat) => {
        this.loader.setMaterials(mat);
        this.loader.load(
          `${environment.baseUrl}assets/3d/${this.modelName}.obj`,
          (model) => {
            this.model = model;
            this.scene.add(this.model);
            ModelViewerComponent.models.set(this.modelName, model);
            this.animate();
            this.loading = false;
          }
        );
      },
      undefined,
      () => {
        this.loader.load(
          `${environment.baseUrl}assets/3d/${this.modelName}.obj`,
          (model) => {
            this.model = model;
            this.scene.add(this.model);
            ModelViewerComponent.models.set(this.modelName, model);
            this.animate();
            this.loading = false;
          }
        );
      }
    );
    this.first = false;
  }

  ngOnChanges(): void {
    if (!this.first) {
      this.loading = true;
      this.scene.remove(this.model);
      if (ModelViewerComponent.models.has(this.modelName)) {
        const model = ModelViewerComponent.models.get(this.modelName);
        this.model = model;
        this.scene.add(model);
        this.animate();
        this.loading = false;
      } else {
        this.matLoader.load(
          `${environment.baseUrl}assets/3d/${this.modelName}.mtl`,
          (mat) => {
            this.loader.setMaterials(mat);
            this.loader.load(
              `${environment.baseUrl}assets/3d/${this.modelName}.obj`,
              (model) => {
                this.model = model;
                this.scene.add(this.model);
                ModelViewerComponent.models.set(this.modelName, model);
                this.animate();
                this.loading = false;
              }
            );
          },
          undefined,
          () => {
            this.loader.load(
              `${environment.baseUrl}assets/3d/${this.modelName}.obj`,
              (model) => {
                this.model = model;
                this.scene.add(this.model);
                ModelViewerComponent.models.set(this.modelName, model);
                this.animate();
                this.loading = false;
              }
            );
          }
        );
      }
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.light1.position.set(
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z
    );
    this.renderer.render(this.scene, this.camera);
    // tslint:disable-next-line: semicolon
  };
}
