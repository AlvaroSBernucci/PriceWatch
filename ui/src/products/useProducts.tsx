import * as productTypes from "./types";
import { productServices } from "./services";
import { useSnack } from "@/common/providers/SnackContext";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productServices.getAllProducts(params),
  });
};

export const useProduct = (id: number | string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productServices.getProductById(id),
    enabled: !!id,
  });
};

export const useProductHistory = (id: string) => {
  return useQuery({
    queryKey: ["product-history", id],
    queryFn: () => productServices.getProductHistory(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnack();

  return useMutation<productTypes.ProductsInterface, unknown, productTypes.ICreateProduct>({
    mutationFn: productServices.registerProduct,
    onSuccess: () => {
      showSnack("Produto criado com sucesso", "success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error);
      showSnack(errorMessage, "error");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnack();

  return useMutation({
    mutationFn: productServices.updateProduct,
    onSuccess: (_, variables) => {
      showSnack("Produto atualizado com sucesso", "success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", variables.id] });
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error);
      showSnack(errorMessage, "error");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { showSnack } = useSnack();

  return useMutation({
    mutationFn: productServices.deleteProduct,

    onSuccess: () => {
      showSnack("Produto deletado com sucesso", "success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error);
      showSnack(errorMessage, "error");
    },
  });
};

export const useProductSource = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productServices.getProductsSource,
  });
};
