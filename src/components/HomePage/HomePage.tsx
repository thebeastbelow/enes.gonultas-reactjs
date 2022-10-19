import { PAGES, PAGE_IDS } from "../../features/navigation/navigationSlice";
import { useAppSelector } from "../../hooks";
import { PageTemplate } from "../PageTemplate/PageTemplate";
import { ProductsList } from "../ProductsList/ProductsList";

export const HomePage = () => {
  const { products } = useAppSelector((state) => state.products);

  const categories = products.reduce<Set<string>>(
    (categories, { category }) => {
      categories.add(category);
      return categories;
    },
    new Set()
  );

  return (
    <PageTemplate pageName={PAGES[PAGE_IDS.HOME].name} categories={categories}>
      <ProductsList products={products} />
    </PageTemplate>
  );
};
