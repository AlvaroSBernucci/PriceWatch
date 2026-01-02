import { GetProductsSource } from "../../api/product.services";
import { SelectInput } from "../SelectInput/SelectInput";

function ProductSourceInput({ value, onChange }: any) {
  const { data: productsSource, loading } = GetProductsSource();

  if (!productsSource) return null;

  return (
    <SelectInput<number>
      label="Escolha de qual site é seu produto"
      options={productsSource}
      value={value}
      onChange={onChange}
      loading={loading}
      placeholder="Selecione a loja"
    />
  );
}

export default ProductSourceInput;
