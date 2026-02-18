import api from "@/utils/axios";
import * as productTypes from "./types";
import type { IOptions } from "@/common/types";

export const productServices = {
  getAllProducts: async (params?: productTypes.IProductsFilter) => {
    const resp = await api.get<productTypes.ProductsInterface[]>("/products", { params });
    return resp.data;
  },

  getProductById: async (id: number) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  registerProduct: async (data: productTypes.ICreateProduct) => {
    const resp = await api.post("/products", data);
    return resp.data;
  },
  updateProduct: async (data: productTypes.IUpdateProduct) => {
    await api.patch(`/products/${data.id}/`);
  },

  deleteProduct: async (id: number) => {
    const resp = await api.delete(`/products/${id}`);
    return resp.data;
  },

  getProductsSource: async () => {
    const resp = await api.get<IOptions<number>[]>("/products-source");
    return resp.data;
  },
};
