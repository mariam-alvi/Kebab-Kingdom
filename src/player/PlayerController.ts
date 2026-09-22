import { Player } from './Player';

const MOVE_SPEED = 5; // units per second

/**
 * Reads WASD keyboard input and moves the Player each frame.
 * Movement is scaled by delta time so speed stays the same regardless of frame rate.
 */
export class PlayerController {
  private readonly player: Player;
  private readonly pressedKeys = new Set<string>();

  constructor(player: Player) {
    this.player = player;

    window.addEventListener('keydown', (event) => this.pressedKeys.add(event.key.toLowerCase()));
    window.addEventListener('keyup', (event) => this.pressedKeys.delete(event.key.toLowerCase()));
  }

  public update(deltaSeconds: number): void {
    const distance = MOVE_SPEED * deltaSeconds;

    // W/S move along Z, A/D move along X. Combining them lets diagonal movement work too.
    if (this.pressedKeys.has('w')) {
      this.player.mesh.position.z -= distance;
    }
    if (this.pressedKeys.has('s')) {
      this.player.mesh.position.z += distance;
    }
    if (this.pressedKeys.has('a')) {
      this.player.mesh.position.x -= distance;
    }
    if (this.pressedKeys.has('d')) {
      this.player.mesh.position.x += distance;
    }
  }
}
