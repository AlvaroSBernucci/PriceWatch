export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD_PAGE: "/reset-password/:uid/:token"
  },
  PRODUCTS: {
    LIST: "/products"
  }

} as const;
