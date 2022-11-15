import { Product } from "../types/product";

const FAVORITES_KEY = "ENESG_DEMO_FAVORITES_KEY";
const EMPTY_FAVORITES = '{ "favProductIds": [] }';
const LAST_PAGE_KEY = "ENESG_DEMO_LAST_PAGE_KEY";
const DEFAULT_LAST_PAGE = "home";
const PRODUCTS_KEY = "ENESG_DEMO_PRODUCTS_KEY";
const EMPTY_PRODUCTS = '{ "products": [] }';

export const saveLastPage = (lastPage: string) =>
  localStorage.setItem(LAST_PAGE_KEY, lastPage);

export const getLastPage = () =>
  localStorage.getItem(LAST_PAGE_KEY) || DEFAULT_LAST_PAGE;

export const saveProducts = (products: Array<Product>) =>
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify({ products }));

export const getProducts = () =>
  JSON.parse(localStorage.getItem(PRODUCTS_KEY) || EMPTY_PRODUCTS).products;

export const saveFavorites = (favProductIds: Array<string>) =>
  localStorage.setItem(FAVORITES_KEY, JSON.stringify({ favProductIds }));

export const getFavorites = () =>
  JSON.parse(localStorage.getItem(FAVORITES_KEY) || EMPTY_FAVORITES)
    .favProductIds;
