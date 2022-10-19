import { PAGES, PAGE_IDS } from "../../features/navigation/navigationSlice";
import { useAppSelector } from "../../hooks";
import { PageTemplate } from "../PageTemplate/PageTemplate";
import { ProductsList } from "../ProductsList/ProductsList";

export const Favorites = () => {
  const { products, favoriteProductIds } = useAppSelector(
    (state) => state.products
  );

  const favoriteProducts = products.filter(({ _id }) =>
    favoriteProductIds.includes(_id)
  );
  const categories = favoriteProducts.reduce<Set<string>>(
    (categories, { category }) => {
      categories.add(category);
      return categories;
    },
    new Set()
  );

  return (
    <PageTemplate
      pageName={PAGES[PAGE_IDS.FAVORITES].name}
      categories={categories}
    >
      <ProductsList products={favoriteProducts} />
    </PageTemplate>
  );
};
