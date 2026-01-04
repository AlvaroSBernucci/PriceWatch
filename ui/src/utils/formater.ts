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
