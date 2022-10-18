import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../types/product";

interface Response {
  message: string;
  products: Array<Product>;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${process.env.REACT_APP_API_TOKEN}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    listProducts: builder.query<Response, void>({
      query: () => "/products",
    }),
  }),
});

export const { useListProductsQuery } = productApi;
