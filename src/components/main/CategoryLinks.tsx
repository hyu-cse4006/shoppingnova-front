import CategoryLink from "@/components/main/CategoryLink";

const categories = [
  {
    position: { x: 5000, y: -3000, z: 0 },
    name: "TV",
  },
  {
    position: { x: 8000, y: 2000, z: 4000 },
    name: "Refrigerator",
  },
  {
    position: { x: -5000, y: 4000, z: 0 },
    name: "Dishwasher",
  },
  {
    position: { x: -8000, y: 2000, z: 4000 },
    name: "Cleaner",
  },
  {
    position: { x: -10000, y: 10, z: 0 },
    name: "PC & MONITOR1",
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
