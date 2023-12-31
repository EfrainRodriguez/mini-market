import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Product } from "../../models/product.model";

const api = createApi({
  reducerPath: "productApi",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_URL_API }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: (queryString) => ({
        url: `/products?${queryString}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = api;

export default api;
