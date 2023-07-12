import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Product } from "../../models/product.model";

const api = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: (queryString) => ({
        url: `/products?${queryString}`,
        method: "GET",
      })
    }),
  }),
});

export const { useGetProductsQuery } = api;

export default api;
