import { Product } from "../../services/product";

const options = { style: "currency", currency: "TRY" };
const currencyFormatter = new Intl.NumberFormat("tr-TR", options);

export const ProductPreview = ({
  product: { _id, avatar, name, description, price, category, createdAt },
}: {
  product: Product;
}) => (
  <div className="flex h-80 w-full max-w-screen-sm flex-col items-center rounded border border-neutral-200 p-2 shadow md:max-h-40 md:max-w-screen-md md:flex-row md:items-start md:shadow-md lg:max-w-screen-lg lg:shadow-lg">
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
          <div>Favorite</div>
          <div>
            {new Date(createdAt).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </div>
        </div>
      </div>
      <p className="overflow-auto text-sm">{description}</p>
    </div>
  </div>
);
