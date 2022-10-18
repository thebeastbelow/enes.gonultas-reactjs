import {
  PAGE_IDS,
  PAGE_NAMES,
} from "../../features/navigation/navigationSlice";
import { useAppSelector } from "../../hooks";
import { PageTemplate } from "../PageTemplate/PageTempate";
import { ProductsList } from "../ProductsList/ProductsList";

export const HomePage = () => {
  const products = useAppSelector((state) => state.products.products);

  return (
    <PageTemplate pageName={PAGE_NAMES[PAGE_IDS.HOME]}>
      <ProductsList products={products} />
    </PageTemplate>
  );
};
