import * as THREE from 'three';
import { createGround } from './Ground';
import { createRoad } from './Road';
import { createWater } from './Water';
import { createBuildings } from './Buildings';
import { createTrees } from './Trees';
import { createBazaar } from './Bazaar';
import { createGalataTower } from './GalataTower';

/**
 * Assembles every world piece (ground, road, water, buildings, trees, bazaar,
 * landmark) into one group so Scene.ts only needs a single call to build the district.
 */
export function createDistrict(): THREE.Group {
  const district = new THREE.Group();

  district.add(createGround());
  district.add(createRoad());
  district.add(createWater());
  district.add(createBuildings());
  district.add(createTrees());
  district.add(createBazaar());
  district.add(createGalataTower());

  return district;
}
