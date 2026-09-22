import * as THREE from 'three';
import { PAVEMENT_CENTER_X } from './Road';

// Small market square tucked past the last building, on the same side of the street.
const BAZAAR_CENTER_X = -(PAVEMENT_CENTER_X + 6);
const BAZAAR_CENTER_Z = 56;

const CANOPY_COLORS = [0xe63946, 0xf4a259, 0x8e44ad, 0x2a9d8f];

/**
 * Grand Bazaar-inspired market: a handful of simple stalls, each a counter box
 * with corner posts and a bright cone canopy overhead.
 */
export function createBazaar(): THREE.Group {
  const group = new THREE.Group();

  const stallOffsets: Array<[x: number, z: number]> = [
    [-3, -3],
    [3, -3],
    [-3, 3],
    [3, 3],
  ];

  stallOffsets.forEach(([dx, dz], index) => {
    const stall = createStall(CANOPY_COLORS[index % CANOPY_COLORS.length]);
    stall.position.set(BAZAAR_CENTER_X + dx, 0, BAZAAR_CENTER_Z + dz);
    group.add(stall);
  });

  return group;
}

function createStall(canopyColor: number): THREE.Group {
  const stall = new THREE.Group();

  const counterGeometry = new THREE.BoxGeometry(2, 0.8, 1.2);
  const counterMaterial = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
  const counter = new THREE.Mesh(counterGeometry, counterMaterial);
  counter.position.y = 0.4;
  stall.add(counter);

  const postGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2.2, 6);
  const postMaterial = new THREE.MeshStandardMaterial({ color: 0x6b4226 });
  const postOffsets: Array<[number, number]> = [
    [-0.9, -0.5],
    [0.9, -0.5],
    [-0.9, 0.5],
    [0.9, 0.5],
  ];
  for (const [dx, dz] of postOffsets) {
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.set(dx, 1.5, dz);
    stall.add(post);
  }

  const canopyGeometry = new THREE.ConeGeometry(1.7, 1, 4);
  const canopyMaterial = new THREE.MeshStandardMaterial({ color: canopyColor });
  const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
  canopy.position.y = 3;
  canopy.rotation.y = Math.PI / 4; // square the 4-sided cone up so it reads as a tent roof
  stall.add(canopy);

  return stall;
}
