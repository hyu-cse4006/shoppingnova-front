import CategoryLink from "@/components/main/CategoryLink";

const categories = [
  {
    position: { x: 5000, y: 0, z: 0 },
    name: "PC & MONITOR",
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
