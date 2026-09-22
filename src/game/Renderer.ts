import * as THREE from 'three';

/**
 * Wraps Three.js's WebGLRenderer and keeps the canvas sized to its container.
 * Isolating this here means later systems never touch renderer setup directly.
 */
export class Renderer {
  public readonly instance: THREE.WebGLRenderer;
  private readonly container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.instance = new THREE.WebGLRenderer({ antialias: true });
    this.instance.setPixelRatio(window.devicePixelRatio);
    this.resize();

    this.container.appendChild(this.instance.domElement);
    window.addEventListener('resize', () => this.resize());
  }

  private resize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.instance.setSize(width, height);
  }

  public render(scene: THREE.Scene, camera: THREE.Camera): void {
    this.instance.render(scene, camera);
  }

  public get aspectRatio(): number {
    return this.container.clientWidth / this.container.clientHeight;
  }
}
