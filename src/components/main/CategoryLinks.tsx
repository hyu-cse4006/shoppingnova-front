import CategoryLink from "@/components/main/CategoryLink";

const categories = [
  {
    position: { x: 10000, y: 10, z: 0 },
    name: "PC & MONITOR",
  },
  {
    position: { x: -10000, y: 10, z: 0 },
    name: "PC & MONITOR1",
  },
  {
    position: { x: 0, y: 10, z: 10000 },
    name: "PC & MONITOR2",
  },
  {
    position: { x: 0, y: 10, z: -10000 },
    name: "PC & MONITOR3",
  },
];
export default function CategoryLinks() {
  return (
    <group>
      {categories.map((category) => (
        <CategoryLink data={category} key={category.name} />
      ))}
    </group>
  );
}
