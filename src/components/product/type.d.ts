export type SimpleProduct = {
  name?: string;
  id: number;
  price: number;
  rating: number;
  rate_num: number;
  image_url1?: string;
  image_url?: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  category_id: number;
  images: string[];
  image_url1: string | null;
  image_url2: string | null;
  image_url3: string | null;
  image_url4: string | null;
  weight: number | null;
  resolution: string | null;
  resolution1: number | null;
  resolution2: number | null;
  plugin: string | null;
  processor: string | null;
  sound: string | null;
  color: string | null;
  energy: string | null;
  rate_num: number | null;
  release_date: number | null;
  size_x: number | null;
  size_y: number | null;
  size_z: number | null;
  door_count: number | null;
  volume_cold: number | null;
  volume_freeze: number | null;
};
