import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  _id: string;
  avatar: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
}

interface Response {
  message: string;
  products: Array<Product>;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` },
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
