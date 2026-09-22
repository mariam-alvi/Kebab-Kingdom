import * as THREE from 'three';
import { createDistrict } from '../world/District';

/**
 * Owns the Three.js Scene graph: background, lighting and the Istanbul starter district.
 * No movement, controls, or gameplay lives here yet — just the static world.
 */
export class GameScene {
  public readonly instance: THREE.Scene;

  constructor() {
    this.instance = new THREE.Scene();

    // Sky-blue background so the scene doesn't render as plain black.
    this.instance.background = new THREE.Color(0x87ceeb);

    this.addLights();
    this.instance.add(createDistrict());
  }

  private addLights(): void {
    // Ambient light softly lights every surface so nothing is pitch black in shadow.
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.instance.add(ambientLight);

    // Directional light acts like the sun, giving surfaces shading and depth.
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(10, 20, 10);
    this.instance.add(sunLight);
  }
}

