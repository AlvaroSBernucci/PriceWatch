export function parsePrice(priceStr: string): number {
  return parseFloat(priceStr);
}

export const toCurrency = (value: string | null) => {
  if (!value) return "N/D";

  const number = parseFloat(value);
  if (isNaN(number)) return "R$ -";

  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const toPercent = (value: string | null) => {
  if (!value) return "N/D";

  const number = parseFloat(value);
  if (isNaN(number)) return "-";
  return (number * 100).toFixed(1).replace(".", ",") + "%";
};

export const toShortDate = (value: string | null) => {
  if (!value) return "N/D";

  if (value.length > 10) return value;

  const date = new Date(value);

  if (isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
};
