import { ReactNode, useEffect } from "react";
import { goto, PAGE_IDS } from "../../features/navigation/navigationSlice";
import { setCategoryFilter } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productApi } from "../../services/product";
import { saveFavorites } from "../../utils/storage";

export const PageTemplate = ({
  pageName,
  categories,
  children,
  ...rest
}: {
  pageName: string;
  categories?: Set<string>;
  children: ReactNode;
}) => {
  const { favoriteProductIds, categoryFilter } = useAppSelector(
    ({ products }) => products
  );
  const dispatch = useAppDispatch();
  const { isLoading } = productApi.useListProductsQuery();

  const sortedCategories = Array.from(categories || []);
  sortedCategories.sort();

  useEffect(() => {
    saveFavorites(favoriteProductIds);
  }, [favoriteProductIds]);

  return isLoading ? null : (
    <div
      className={
        "flex w-full max-w-screen-sm flex-col items-center gap-8 md:max-w-screen-md lg:max-w-screen-lg"
      }
      {...rest}
    >
      <div className="flex w-full justify-between">
        <h2 className="w-full text-left text-3xl md:text-4xl">{pageName}</h2>
        {categories && (
          <div className="flex gap-4">
            <select
              className="rounded-lg bg-sky-700 px-2 text-lg text-slate-100"
              value={categoryFilter}
              onChange={({ target: { value } }) =>
                dispatch(setCategoryFilter(value))
              }
            >
              <option value={""}>Filter Products by Category</option>
              {sortedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={() => dispatch(goto(PAGE_IDS.ADD_PRODUCT))}
              className="text h-full whitespace-nowrap rounded-lg bg-sky-900 px-4 text-lg text-slate-100"
            >
              Add a New Product
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
