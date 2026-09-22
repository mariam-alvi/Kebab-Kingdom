import * as THREE from 'three';
import { PAVEMENT_CENTER_X } from './Road';

// Trees dotted along both pavements, spaced out along the street.
const TREE_POSITIONS: Array<[x: number, z: number]> = [
  [-(PAVEMENT_CENTER_X - 1), -45],
  [-(PAVEMENT_CENTER_X - 1), -15],
  [-(PAVEMENT_CENTER_X - 1), 15],
  [-(PAVEMENT_CENTER_X - 1), 45],
  [PAVEMENT_CENTER_X - 1, -30],
  [PAVEMENT_CENTER_X - 1, 0],
  [PAVEMENT_CENTER_X - 1, 30],
];

/** Low-poly trees: brown cylinder trunk + green cone top. */
export function createTrees(): THREE.Group {
  const group = new THREE.Group();

  for (const [x, z] of TREE_POSITIONS) {
    group.add(createTree(x, z));
  }

  return group;
}

function createTree(x: number, z: number): THREE.Group {
  const tree = new THREE.Group();

  const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.25, 1.2, 8);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.set(x, 0.6, z);
  tree.add(trunk);

  const topGeometry = new THREE.ConeGeometry(1, 2, 8);
  const topMaterial = new THREE.MeshStandardMaterial({ color: 0x4caf50 });
  const top = new THREE.Mesh(topGeometry, topMaterial);
  top.position.set(x, 2, z);
  tree.add(top);

  return tree;
}
