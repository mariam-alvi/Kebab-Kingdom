import * as THREE from 'three';
import { PAVEMENT_CENTER_X } from './Road';

// Bright Mediterranean palette — no realistic browns/greys here, keep it Roblox-colourful.
const BUILDING_COLORS = [0xe98a8a, 0xf4d35e, 0x5fa8d3, 0xf2e0c9, 0xff8fab, 0x6fcf97];

const BUILDING_DEPTH = 6;
const BUILDING_ROW_X = PAVEMENT_CENTER_X + BUILDING_DEPTH / 2 + 2;

interface BuildingSpec {
  z: number;
  width: number;
  height: number;
  color: number;
}

// Only the left-hand side of the road gets a solid row of buildings; the right
// side is reserved for the waterfront/bazaar so the district reads as one street.
const BUILDING_SPECS: BuildingSpec[] = [
  { z: -50, width: 7, height: 6, color: BUILDING_COLORS[0] },
  { z: -36, width: 6, height: 9, color: BUILDING_COLORS[1] },
  { z: -22, width: 8, height: 5, color: BUILDING_COLORS[2] },
  { z: -8, width: 6, height: 11, color: BUILDING_COLORS[3] },
  { z: 8, width: 7, height: 7, color: BUILDING_COLORS[4] },
  { z: 24, width: 6, height: 9, color: BUILDING_COLORS[5] },
  { z: 40, width: 8, height: 6, color: BUILDING_COLORS[0] },
];

/**
 * Roblox-style low-poly buildings: plain colourful boxes with a slightly darker
 * flat roof slab on top for a bit of shape variety. No realistic detailing.
 */
export function createBuildings(): THREE.Group {
  const group = new THREE.Group();

  for (const spec of BUILDING_SPECS) {
    group.add(createBuilding(spec));
  }

  return group;
}

function createBuilding(spec: BuildingSpec): THREE.Group {
  const building = new THREE.Group();

  const bodyGeometry = new THREE.BoxGeometry(spec.width, spec.height, BUILDING_DEPTH);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: spec.color });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(-BUILDING_ROW_X, spec.height / 2, spec.z);
  building.add(body);

  const roofGeometry = new THREE.BoxGeometry(spec.width + 0.4, 0.4, BUILDING_DEPTH + 0.4);
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x3d3d3d });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.set(-BUILDING_ROW_X, spec.height + 0.2, spec.z);
  building.add(roof);

  return building;
}
