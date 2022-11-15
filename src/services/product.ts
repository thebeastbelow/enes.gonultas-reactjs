import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Product } from "../types/product";

// interface Response {
//   message: string;
//   products: Array<Product>;
// }

// export const productApi = createApi({
//   reducerPath: "productApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_BASE_URL,
//     prepareHeaders: (headers) => {
//       headers.set("authorization", `Bearer ${process.env.REACT_APP_API_TOKEN}`);

//       return headers;
//     },
//   }),
//   tagTypes: ["Products"],
//   endpoints: (builder) => ({
//     listProducts: builder.query<Response, void>({
//       query: () => "/products",
//       providesTags: ["Products"],
//     }),
//     saveNewProduct: builder.mutation({
//       query: (payload) => ({
//         url: "/products",
//         method: "POST",
//         body: payload,
//         invalidatesTags: () => {
//           return ["Product"];
//         },
//       }),
//     }),
//   }),
// });

// export const { useListProductsQuery, useSaveNewProductMutation } = productApi;
