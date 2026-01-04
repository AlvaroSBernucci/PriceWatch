import type { ProductsInterface } from "../../pages/ProductsPage/ProductsPage.types";

export type ProductCardType = Pick<
  ProductsInterface,
  "id" | "name" | "current_price" | "initial_price" | "lowest_price" | "last_but_one_price" | "price_change" | "has_changed"
> & {
  openDelete: (productId: number) => void;
};
