import barredSpiral from "@/glsl/bspiral.glsl";
import fragmentShader from "@/glsl/fragment.glsl";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { lerp } from "three/src/math/MathUtils.js";
import { colorFromTemperature } from "@/utils/three/color";
import { betaRandom, gammaRandom, precomputedNormal } from "@/utils/three/rand";

type GalaxyLayerProps = {
  count: number;
  color?: string;
  temperature?: number;
  textureUrl: string;
  sizeAmp?: number;
  minRadius?: number;
  maxRadius?: number;
  speedAmp?: number;
  yAmp?: number;
};
// const baseGeometry = new THREE.PlaneGeometry(1, 1);
const tempColor = new THREE.Color();
const normalRandom = precomputedNormal(0.5, 0.2);

export default function GalaxyLayer({
  count,
  color,
  temperature = 4000,
  sizeAmp = 3,
  minRadius = 0.2,
  maxRadius = 2,
  speedAmp = 1,
  yAmp = 1,
  textureUrl,
}: GalaxyLayerProps) {
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const texture = useTexture(textureUrl);
  const ref = useRef<THREE.InstancedMesh>(null!);
  const [position, colorArray] = useMemo(() => {
    // console.log(cdf);
    const pos = new Float32Array(count * 3);
    const color = new Float32Array(count * 3);

    for (let index = 0; index < count; index++) {
      const theta = Math.random() * 2 * Math.PI;
      const r = lerp(minRadius, maxRadius, betaRandom(1.5, 1));
      const x = r * Math.sin(theta);
      const y = (Math.random() - 0.05) * (lerp(0.2, 0.1, Math.random()) * yAmp);
      const z = r * Math.cos(theta);
      const temp = temperature + (2000 * Math.random() - 1000);

      color.set(colorFromTemperature(temp), index * 3);
      pos.set([x, y, z], index * 3);
    }

    return [pos, color];
  }, [count, maxRadius, minRadius, temperature, yAmp]);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        position[i * 3],
        position[i * 3 + 1],
        position[i * 3 + 2]
      );
      dummy.scale.set(10, 10, 10);
      dummy.rotation.y = time;
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uColor: {
        value: color
          ? new THREE.Color(color)
          : new THREE.Color(...colorFromTemperature(temperature)),
      },
      uSizeAmp: { value: sizeAmp },
      uSpeedAmp: { value: speedAmp },
      uYTwistAmp: { value: yAmp },
      uMouse: { value: new THREE.Vector3() },
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
    }),
    [color, sizeAmp, speedAmp, temperature, texture, yAmp]
  );
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: barredSpiral,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: false,
      }),
    [uniforms]
  );

  useFrame(() => {
    // console.log(material.current.uniforms.time);
    material.uniforms.time.value += 1;
    // material.current.needsUpdate = true;
  });
  return (
    <>
      <instancedMesh ref={ref} args={[undefined, material, count]}>
        {/* <instancedBufferGeometry instanceCount={count}>
          <instancedBufferAttribute attach="pos" array={positions} itemSize={3} />
        </instancedBufferGeometry> */}
        <planeGeometry args={[2, 2]}>
          <instancedBufferAttribute
            attach="attributes-color"
            args={[colorArray, 3]}
          />
        </planeGeometry>
        {/* <meshNormalMaterial /> */}
        {/* <shaderMaterial
          glslVersion={THREE.GLSL3}
          extensions={{
            derivatives: true,
          }}
          ref={material}
          side={THREE.DoubleSide}
          uniforms={uniforms}
          transparent
          depthTest={false}
          vertexShader={barredSpiral}
          fragmentShader={fragment}
        /> */}
      </instancedMesh>
    </>
  );
}
