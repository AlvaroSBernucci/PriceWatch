import useAxios from "../hooks/useAxios";
import type { ProductsSourceInterface } from "../components/ProductSourceInput/ProductsSource.types";

export const GetProductsSource = () => {
  return useAxios<ProductsSourceInterface[]>("/api/products-source");
};
