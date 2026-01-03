import { api } from "../utils/axios";
import useAxios from "../hooks/useAxios";
import type { NewProductFormInterface } from "../components/Forms/NewProductForm/NewProductForm.types";
import type { ProductsSourceInterface } from "../components/ProductSourceInput/ProductsSource.types";

export const GetProductsSource = () => {
  return useAxios<ProductsSourceInterface[]>("/api/products-source");
};

export const registerProduct = async (data: NewProductFormInterface) => {
  return api.post("/api/products", data);
};
