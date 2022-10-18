import {
  StarIcon as OutlineStarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import {
  deleteProduct,
  toggleFavorite,
} from "../../features/products/productsSlice";
import { useAppDispatch } from "../../hooks";
import { Product } from "../../types/product";

const options = { style: "currency", currency: "TRY" };
const currencyFormatter = new Intl.NumberFormat("tr-TR", options);

const getStarIconComponent = (favorite: boolean) =>
  favorite ? SolidStarIcon : OutlineStarIcon;

export const ProductPreview = ({
  product: { _id, avatar, name, description, price, category, createdAt },
  favorite = false,
}: {
  product: Product;
  favorite: boolean;
}) => {
  const dispatch = useAppDispatch();

  const StarIcon = getStarIconComponent(favorite);

  return (
    <div className="flex h-80 w-full flex-col items-center rounded border border-neutral-200 p-2 shadow md:max-h-40 md:flex-row md:items-start md:shadow-md lg:shadow-lg">
      <div className="flex h-36 w-36 flex-col items-center justify-center border border-neutral-400 md:flex-row">
        <img className="max-h-full object-contain" alt={name} src={avatar} />
      </div>
      <div
        id="description"
        className="flex h-full w-full flex-col px-4 text-left"
      >
        <div className="mb-2 flex flex-col  justify-between md:flex-row">
          <h3 className="max-w-[320px] truncate text-lg font-semibold text-sky-700 lg:max-w-[600px]">
            {name}
          </h3>
          <div className="flex items-center justify-between gap-4 text-sm text-gray-400">
            <div>{currencyFormatter.format(price)}</div>
            <div>{category}</div>
            <div>
              {new Date(createdAt).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </div>
          </div>
        </div>
        <p className="overflow-auto pr-2 text-sm">{description}</p>
      </div>
      <div className="flex h-full items-center border-l px-2 py-4 text-gray-400 md:flex-col md:justify-between">
        <StarIcon
          onClick={() => dispatch(toggleFavorite(_id))}
          className={classNames("h-8 cursor-pointer hover:text-amber-400", {
            "text-amber-400": favorite,
          })}
        />
        <hr className="w-full text-gray-400" />
        <TrashIcon
          onClick={() => dispatch(deleteProduct(_id))}
          className="h-8 cursor-pointer hover:text-red-400"
        />
      </div>
    </div>
  );
};
