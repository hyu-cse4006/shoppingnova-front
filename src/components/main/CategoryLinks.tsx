import CategoryLink from "@/components/main/CategoryLink";
import { useViewStore } from "@/store/useViewStore";
import useAxios from "@/utils/hook/useAxios";
import { useEffect, useState } from "react";

type CategoryProps = {
  location: string;
};

type Position = {
  x: number;
  y: number;
  z: number;
};
type Category = {
  position: Position;
  name: string;
  id: number;
};

export default function CategoryLinks({ location }: CategoryProps) {
  const { view } = useViewStore();
  const [categories, setCategories] = useState<Category[]>([
    {
      position: { x: 4000, y: 0, z: 2500 },
      name: "tv",
      id: 1,
    },
    {
      position: { x: 2000, y: 0, z: -7000 },
      name: "refrigerator",
      id: 2,
    },
    {
      position: { x: -6000, y: 0, z: -4000 },
      name: "dishwasher",
      id: 3,
    },
    {
      position: { x: -3000, y: 0, z: 6000 },
      name: "cleaner",
      id: 4,
    },
  ]);
  const { response, error, fetchData } = useAxios();

  useEffect(() => {
    const id = categories.find((category) => category.name === location)?.id;
    const config = {
      method: "GET",
      url: `http://3.35.58.101:8080/api/category/child/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (location) {
      fetchData(config);
    }
  }, [view, location, fetchData]);
  useEffect(() => {
    if (response && response.data && !error) {
      const n = response.data.length;
      const newCategories = (
        response.data as Array<Omit<Category, "position">>
      ).map((category, idx) => {
        const r = 8000;
        const x = r * Math.cos((2 * Math.PI * idx) / n);
        const z = r * Math.sin((2 * Math.PI * idx) / n);
        return {
          ...category,
          position: { x, y: 0, z },
        };
      });

      setCategories(newCategories);
    }
  }, [response, error]);
  return (
    <group>
      {categories.map((category) => (
        <CategoryLink data={category} key={category.name} />
      ))}
    </group>
  );
}
