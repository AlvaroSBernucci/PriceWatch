export interface ProductsInterface {
  id: number;
  name: string;
  link: string;
  user: number;
  product_source: number;
  target_price: string | null;
  initial_price: string | null;
  current_price: string | null;
  lowest_price: string | null;
  last_but_one_price: string | null;
  price_change: string | null;
  has_changed: boolean;
}
