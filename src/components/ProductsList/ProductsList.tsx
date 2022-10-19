import { goto, PAGE_IDS } from "../../features/navigation/navigationSlice";
import { setSelectedProductId } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Product } from "../../types/product";
import { ProductPreview } from "../ProductPreview/ProductPreview";

export const ProductsList = ({ products }: { products: Array<Product> }) => {
  const dispatch = useAppDispatch();
  const { favoriteProductIds, categoryFilter } = useAppSelector(
    ({ products }) => products
  );

  const filteredProducts = categoryFilter
    ? products.filter(({ category }) => category === categoryFilter)
    : products;

  return (
    <>
      {filteredProducts.length ? (
        filteredProducts.map((product) => {
          const { _id } = product;

          return (
            <ProductPreview
              key={_id}
              onClick={() => {
                dispatch(setSelectedProductId(product));
                dispatch(goto(PAGE_IDS.PRODUCT_DETAIL));
              }}
              product={product}
              favorite={favoriteProductIds.includes(_id)}
            />
          );
        })
      ) : (
        <p className="w-full text-left">{"Empty for now :)"}</p>
      )}
    </>
  );
};
