export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const clearToken = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("provider");
  localStorage.removeItem("institucion");
};
