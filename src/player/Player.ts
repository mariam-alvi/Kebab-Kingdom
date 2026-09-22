import * as THREE from 'three';

// Road surface sits at y = 0.1 (see Road.ts); half the cube's height sits above that.
const PLAYER_HEIGHT = 1;
const SPAWN_Y = 0.1 + PLAYER_HEIGHT / 2;

/**
 * The player character. For now this is just a red cube — movement and input
 * will be added in PlayerController later without changing how Player is used.
 */
export class Player {
  public readonly mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry(PLAYER_HEIGHT, PLAYER_HEIGHT, PLAYER_HEIGHT);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, SPAWN_Y, 0); // spawn on the road, at the middle of the street
  }
}
