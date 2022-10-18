import {
  PAGE_IDS,
  PAGE_NAMES,
} from "../../features/navigation/navigationSlice";
import { useAppSelector } from "../../hooks";
import { PageTemplate } from "../PageTemplate/PageTempate";
import { ProductsList } from "../ProductsList/ProductsList";

export const Favorites = () => {
  const products = useAppSelector((state) => state.products.products);
  const favoriteProductIds = useAppSelector(
    ({ products }) => products.favoriteProductIds
  );

  return (
    <PageTemplate pageName={PAGE_NAMES[PAGE_IDS.FAVORITES]}>
      <ProductsList
        products={products.filter(({ _id }) =>
          favoriteProductIds.includes(_id)
        )}
      />
    </PageTemplate>
  );
};
