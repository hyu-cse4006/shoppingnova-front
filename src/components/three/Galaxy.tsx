import GalaxyLayer from "@/components/three/GalaxyLayer";
import { Suspense } from "react";
import particle from "@/assets/particle-example.png";

export default function Galaxy() {
  return (
    <Suspense>
      <GalaxyLayer
        textureUrl={particle}
        count={200}
        temperature={10000}
        minRadius={0.01}
        maxRadius={0.2}
        sizeAmp={3.0}
      />
      <GalaxyLayer
        textureUrl={particle}
        count={1000}
        temperature={9500}
        minRadius={0.2}
        maxRadius={0.6}
      />
      <GalaxyLayer
        textureUrl={particle}
        count={2500}
        temperature={8000}
        minRadius={0.6}
        maxRadius={1.0}
        sizeAmp={4.0}
      />
      <GalaxyLayer
        textureUrl={particle}
        count={5000}
        temperature={6500}
        minRadius={1.0}
        maxRadius={2.0}
      />
    </Suspense>
  );
}
