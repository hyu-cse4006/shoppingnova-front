import CategoryLink from "@/components/main/CategoryLink";
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
  const [categories, setCategories] = useState<Category[]>([
    {
      position: { x: 5000, y: -3000, z: 0 },
      name: "TV",
      id: 1,
    },
    {
      position: { x: 8000, y: 2000, z: 4000 },
      name: "Refrigerator",
      id: 2,
    },
    {
      position: { x: -5000, y: 4000, z: 0 },
      name: "Dishwasher",
      id: 3,
    },
    {
      position: { x: -8000, y: 2000, z: 4000 },
      name: "Cleaner",
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
    fetchData(config);
  }, []);
  useEffect(() => {
    if (response && response.data && !error) {
      console.log(response);

      const newCategories = response.data.map((category) => ({
        ...category,
        position: { x: 1000, y: 1000, z: 1000 },
      }));

      setCategories(newCategories);
    }
  }, [response]);
  return (
    <group>
      {categories.map((category) => (
        <CategoryLink data={category} key={category.name} />
      ))}
    </group>
  );
}
