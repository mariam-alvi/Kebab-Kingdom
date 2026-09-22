import * as THREE from 'three';
import { Player } from './Player';

// Fixed offset behind and above the player (player faces -Z as "forward").
const CAMERA_OFFSET = new THREE.Vector3(0, 4, 8);

// How quickly the camera catches up to its target position each second.
// Higher = snappier, lower = floatier. This is frame-rate independent (see update()).
const FOLLOW_SPEED = 4;

/**
 * Third-person camera that smoothly trails behind the player and always looks at them.
 * Roblox-style: fixed offset behind the character rather than a fully free-orbit camera.
 */
export class CameraController {
  private readonly camera: THREE.PerspectiveCamera;
  private readonly player: Player;

  constructor(camera: THREE.PerspectiveCamera, player: Player) {
    this.camera = camera;
    this.player = player;

    // Snap to the correct spot immediately so the first frame doesn't start mid-air.
    this.camera.position.copy(this.player.mesh.position).add(CAMERA_OFFSET);
    this.camera.lookAt(this.player.mesh.position);
  }

  public update(deltaSeconds: number): void {
    const desiredPosition = this.player.mesh.position.clone().add(CAMERA_OFFSET);

    // Exponential smoothing: converges towards the target regardless of frame rate.
    const smoothing = 1 - Math.exp(-FOLLOW_SPEED * deltaSeconds);
    this.camera.position.lerp(desiredPosition, smoothing);

    this.camera.lookAt(this.player.mesh.position);
  }
}
