import GalaxyLayer from "@/components/three/galaxy/GalaxyLayer";
import { Suspense } from "react";
import particle from "@/assets/particle-example.png";

export default function Galaxy() {
  return (
    <group>
      <GalaxyLayer
        textureUrl={particle}
        count={100}
        temperature={10000}
        minRadius={0.01}
        maxRadius={0.2}
        sizeAmp={3.0}
      />
      <GalaxyLayer
        textureUrl={particle}
        count={200}
        temperature={9500}
        minRadius={0.2}
        maxRadius={0.6}
      />
      <GalaxyLayer
        textureUrl={particle}
        count={200}
        temperature={8000}
        minRadius={0.6}
        maxRadius={1.0}
        sizeAmp={4.0}
      />
      <GalaxyLayer
        textureUrl={particle}
        count={2000}
        temperature={6500}
        minRadius={1.0}
        maxRadius={2.0}
      />
    </group>
  );
}
