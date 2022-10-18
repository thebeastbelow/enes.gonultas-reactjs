import { useAppSelector } from "../../hooks";
import { Product } from "../../types/product";
import { ProductPreview } from "../ProductPreview/ProductPreview";

export const ProductsList = ({ products }: { products: Array<Product> }) => {
  const favoriteProductIds = useAppSelector(
    ({ products }) => products.favoriteProductIds
  );

  return (
    <>
      {products.length ? (
        products.map((product) => {
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
        <p className="w-full text-left">{"No favorites yet :)"}</p>
      )}
    </>
  );
};
