import * as THREE from 'three';

/**
 * Large flat ground plane the whole district sits on.
 */
export function createGround(): THREE.Mesh {
  const groundGeometry = new THREE.PlaneGeometry(300, 300);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3a9d3a });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);

  // Planes face up the Z axis by default; rotate flat so it lies on the XZ ground plane.
  ground.rotation.x = -Math.PI / 2;
  return ground;
}
