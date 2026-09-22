import * as THREE from 'three';
import { Renderer } from './Renderer';
import { GameScene } from './Scene';
import { Player } from '../player/Player';
import { PlayerController } from '../player/PlayerController';
import { CameraController } from '../player/CameraController';

/**
 * Top-level orchestrator: owns the renderer, scene and camera, and drives the render loop.
 * Future systems (player, world, UI) will be wired in here without changing this file's job.
 */
export class Game {
  private readonly renderer: Renderer;
  private readonly scene: GameScene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly player: Player;
  private readonly playerController: PlayerController;
  private readonly cameraController: CameraController;
  private readonly timer = new THREE.Timer();

  constructor(container: HTMLElement) {
    this.renderer = new Renderer(container);
    this.scene = new GameScene();

    this.player = new Player();
    this.scene.instance.add(this.player.mesh);
    this.playerController = new PlayerController(this.player);

    this.camera = new THREE.PerspectiveCamera(75, this.renderer.aspectRatio, 0.1, 1000);
    this.cameraController = new CameraController(this.camera, this.player);

    window.addEventListener('resize', () => this.onResize());
  }

  public start(): void {
    this.renderer.instance.setAnimationLoop(() => this.update());
  }

  private update(): void {
    this.timer.update();
    const deltaSeconds = this.timer.getDelta();
    this.playerController.update(deltaSeconds);
    this.cameraController.update(deltaSeconds);
    this.renderer.render(this.scene.instance, this.camera);
  }

  private onResize(): void {
    this.camera.aspect = this.renderer.aspectRatio;
    this.camera.updateProjectionMatrix();
  }
}
