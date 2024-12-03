import * as THREE from "three";
import { ARMS_X_DIST } from "../../../constants/galaxy";
import { getGaussianRandomFloat, getRandomFloat } from "@/utils/three/rand";

interface GalaxyInfo {
  position: THREE.Vector3;
  z_dist: number;
  thickness: number;
  spiral: number;
  spiral_start: number;
}

export const getSpiralPositions = () => {
  const x = getGaussianRandomFloat(0, ARMS_X_DIST * 1.5);
  const y = getGaussianRandomFloat(0, 1);
  const z = getGaussianRandomFloat(0, 1);
  return new THREE.Vector3(x, y, z);
};

export const getSpherePositions = () => {
  const x = getRandomFloat(0, Math.PI * 2);
  const y = getGaussianRandomFloat(0, Math.PI / 5);
  const r = getGaussianRandomFloat(0, 1);

  return new THREE.Vector3(
    r * Math.sin(x) * Math.cos(y) * ARMS_X_DIST,
    r * Math.sin(y) * 4,
    r * Math.cos(x) * Math.cos(y) * ARMS_X_DIST
  );
};

export const setSpiralPositions = ({
  position,
  z_dist,
  thickness,
  spiral,
  spiral_start,
}: GalaxyInfo) => {
  const x = position.x;
  const y = position.y * thickness;
  const z = position.z * z_dist;
  const r = Math.sqrt(x ** 2 + z ** 2);
  if (r < spiral_start) return new THREE.Vector3(x, y, z);

  const theta = Math.log(r / spiral_start) * spiral * -Math.PI;
  const yAxis = new THREE.Vector3(0, 1, 0);

  return new THREE.Vector3(x, y, z).applyAxisAngle(yAxis, theta);
};

export const setSpherePositions = (
  position: THREE.Vector3,
  thickness: number
) => {
  const x = position.x;
  const y = position.y * thickness;
  const z = position.z;

  return new THREE.Vector3(x, y, z);
};
