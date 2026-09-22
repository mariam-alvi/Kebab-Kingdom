import * as THREE from 'three';
import { PAVEMENT_CENTER_X, ROAD_LENGTH } from './Road';

// Everything on the water side of the street starts past the right-hand pavement.
const WATER_EDGE_X = PAVEMENT_CENTER_X + 2;

/**
 * Bosphorus waterfront: a big blue water slab, a wooden ferry dock poking into it,
 * and a couple of simple benches along the promenade.
 */
export function createWater(): THREE.Group {
  const group = new THREE.Group();

  group.add(createWaterSurface());
  group.add(createFerryDock());
  group.add(createBench(0, 30));
  group.add(createBench(0, 10));

  return group;
}

function createWaterSurface(): THREE.Mesh {
  const waterGeometry = new THREE.BoxGeometry(40, 0.1, ROAD_LENGTH);
  const waterMaterial = new THREE.MeshStandardMaterial({ color: 0x1e88e5 });
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.position.set(WATER_EDGE_X + 20, 0.02, 0);
  return water;
}

function createFerryDock(): THREE.Group {
  const dock = new THREE.Group();

  const plankGeometry = new THREE.BoxGeometry(8, 0.2, 4);
  const plankMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  const plank = new THREE.Mesh(plankGeometry, plankMaterial);
  plank.position.set(WATER_EDGE_X + 4, 0.15, -10);
  dock.add(plank);

  const postGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 8);
  const postMaterial = new THREE.MeshStandardMaterial({ color: 0x5a3a1a });
  const postOffsets: Array<[number, number]> = [
    [-3.5, -11.5],
    [3.5, -11.5],
    [-3.5, -8.5],
    [3.5, -8.5],
  ];
  for (const [dx, z] of postOffsets) {
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.set(WATER_EDGE_X + 4 + dx, -0.4, z);
    dock.add(post);
  }

  return dock;
}

/** A simple bench: a seat box on two block legs, placed on the pavement facing the water. */
function createBench(x: number, z: number): THREE.Group {
  const bench = new THREE.Group();

  const seatGeometry = new THREE.BoxGeometry(1.6, 0.1, 0.5);
  const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x9c6b3f });
  const seat = new THREE.Mesh(seatGeometry, woodMaterial);
  seat.position.set(PAVEMENT_CENTER_X + x, 0.5, z);
  bench.add(seat);

  const backGeometry = new THREE.BoxGeometry(1.6, 0.5, 0.1);
  const back = new THREE.Mesh(backGeometry, woodMaterial);
  back.position.set(PAVEMENT_CENTER_X + x, 0.75, z - 0.2);
  bench.add(back);

  const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.5);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  for (const legX of [-0.7, 0.7]) {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(PAVEMENT_CENTER_X + x + legX, 0.25, z);
    bench.add(leg);
  }

  return bench;
}
