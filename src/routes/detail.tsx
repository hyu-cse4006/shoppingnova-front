import useAxios from "@/utils/hook/useAxios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/components/product/type";
import ProductDetail from "@/components/product/ProductDetail";
import { motion } from "motion/react";

const variants = {
  hidden: { x: 640 },
  enter: { x: 0 },
  exit: { x: 640 },
};
const Detail = () => {
  const { productId } = useParams();
  const { response: productResponse, fetchData: fetchProductData } = useAxios();
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  useEffect(() => {
    const config = {
      method: "GET",
      url: `http://3.35.58.101:8080/api/product/${productId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (productId) fetchProductData(config);
  }, [fetchProductData, productId]);
  useEffect(() => {
    if (productResponse && productResponse.data) {
      const product = productResponse.data as Product;
      product.images = [];
      if (product.image_url1) product.images.push(product.image_url1);
      if (product.image_url2) product.images.push(product.image_url2);
      if (product.image_url3) product.images.push(product.image_url3);
      if (product.image_url4) product.images.push(product.image_url4);
      setProductInfo(productResponse.data);
    }
  }, [productResponse]);

  if (!productInfo || !productId) return null;
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 1.0, type: "easeInOut" }}
      className="absolute right-0 mt-32 top-0 z-10"
    >
      <ProductDetail product={productInfo} productId={+productId} />
    </motion.div>
  );
};

export default Detail;
