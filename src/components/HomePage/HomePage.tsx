import {
  PAGE_IDS,
  PAGE_NAMES,
} from "../../features/navigation/navigationSlice";
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
    <PageTemplate pageName={PAGE_NAMES[PAGE_IDS.HOME]} categories={categories}>
      <ProductsList products={products} />
    </PageTemplate>
  );
};
