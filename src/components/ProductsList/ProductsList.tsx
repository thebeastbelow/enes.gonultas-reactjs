import { useAppSelector } from "../../hooks";
import { Product } from "../../types/product";
import { ProductPreview } from "../ProductPreview/ProductPreview";

export const ProductsList = ({ products }: { products: Array<Product> }) => {
  const { favoriteProductIds, categoryFilter } = useAppSelector(
    ({ products }) => products
  );

  const filteredProducts = categoryFilter
    ? products.filter(({ category }) => category === categoryFilter)
    : products;

  return (
    <>
      {products.length ? (
        filteredProducts.map((product) => {
          const { _id } = product;

          return (
            <ProductPreview
              key={_id}
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
