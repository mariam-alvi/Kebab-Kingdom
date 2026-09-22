import * as THREE from 'three';

const TOWER_POSITION = { x: 0, z: -75 };

/**
 * Simplified Galata Tower: a wide stone-grey base cylinder, a tall tapered
 * tower cylinder, a small balcony ring, and a red cone roof on top.
 */
export function createGalataTower(): THREE.Group {
  const tower = new THREE.Group();

  const baseGeometry = new THREE.CylinderGeometry(4, 4.5, 2, 16);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x9b9b9b });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 1;
  tower.add(base);

  const shaftGeometry = new THREE.CylinderGeometry(3, 3.6, 14, 16);
  const shaftMaterial = new THREE.MeshStandardMaterial({ color: 0xb5651d });
  const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
  shaft.position.y = 2 + 7;
  tower.add(shaft);

  const balconyGeometry = new THREE.CylinderGeometry(3.6, 3.6, 0.6, 16);
  const balconyMaterial = new THREE.MeshStandardMaterial({ color: 0x6b4226 });
  const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
  balcony.position.y = 2 + 14 + 0.3;
  tower.add(balcony);

  const roofGeometry = new THREE.ConeGeometry(3.4, 6, 16);
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xc0392b });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 2 + 14 + 0.6 + 3;
  tower.add(roof);

  tower.position.set(TOWER_POSITION.x, 0, TOWER_POSITION.z);
  return tower;
}
