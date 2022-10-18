import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { productApi } from "../../services/product";
import { saveFavorites } from "../../utils/storage";

export const PageTemplate = ({
  pageName,
  children,
  ...rest
}: {
  pageName: string;
  children: ReactNode;
}) => {
  const favoriteProductIds = useAppSelector(
    ({ products }) => products.favoriteProductIds
  );
  const { isLoading } = productApi.useListProductsQuery();

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
      <h2 className="w-full text-left text-4xl">{pageName}</h2>
      {children}
    </div>
  );
};
