import * as THREE from 'three';

// Road runs along the Z axis; these sizes are shared with Buildings/Water/Bazaar
// so everything lines up without every file re-declaring the same numbers.
export const ROAD_LENGTH = 140;
export const ROAD_WIDTH = 10;
export const PAVEMENT_WIDTH = 4;
export const PAVEMENT_CENTER_X = ROAD_WIDTH / 2 + PAVEMENT_WIDTH / 2;

/**
 * Dark grey main road with light grey pavements on either side.
 * Slightly raised above the ground (y = 0.01) to avoid z-fighting flicker.
 */
export function createRoad(): THREE.Group {
  const group = new THREE.Group();

  const roadGeometry = new THREE.BoxGeometry(ROAD_WIDTH, 0.1, ROAD_LENGTH);
  const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x4d4d4d });
  const road = new THREE.Mesh(roadGeometry, roadMaterial);
  road.position.set(0, 0.05, 0);
  group.add(road);

  const pavementGeometry = new THREE.BoxGeometry(PAVEMENT_WIDTH, 0.15, ROAD_LENGTH);
  const pavementMaterial = new THREE.MeshStandardMaterial({ color: 0xcfcfcf });

  const leftPavement = new THREE.Mesh(pavementGeometry, pavementMaterial);
  leftPavement.position.set(-PAVEMENT_CENTER_X, 0.075, 0);
  group.add(leftPavement);

  const rightPavement = new THREE.Mesh(pavementGeometry, pavementMaterial);
  rightPavement.position.set(PAVEMENT_CENTER_X, 0.075, 0);
  group.add(rightPavement);

  return group;
}
