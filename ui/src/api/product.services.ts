import { api } from "../utils/axios";
import useAxios from "../hooks/useAxios";
import type { ProductsInterface } from "../pages/ProductsPage/ProductsPage.types";
import type { NewProductFormInterface } from "../components/Forms/NewProductForm/NewProductForm.types";
import type { ProductsSourceInterface } from "../components/ProductSourceInput/ProductsSource.types";

export const GetProductsSource = () => {
  return useAxios<ProductsSourceInterface[]>("/api/products-source");
};

export const GetProducts = () => {
  return useAxios<ProductsInterface[]>("/api/products");
};

export const registerProduct = async (data: NewProductFormInterface) => {
  return api.post("/api/products", data);
};

export const deleteProduct = async (id: number) => {
  return api.delete(`/api/products/${id}`);
};
