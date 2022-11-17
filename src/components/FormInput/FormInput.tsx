import classNames from "classnames";

export const FormInput = ({
  label,
  type,
  value,
  error,
  ...rest
}: {
  label: string;
  type: string;
  value: string | number;
  error?: string;
  [x: string]: any;
}) => (
  <div className="mt-2 flex flex-col md:mt-4 md:flex-row">
    <label className="mb-2 w-full text-left md:mb-0">{`${label}:`}</label>
    <div className="w-full ">
      {type === "textarea" ? (
        <textarea
          value={value}
          className={classNames("w-full rounded border-2 px-1", {
            "border-red-300": Boolean(error),
          })}
          {...rest}
        />
      ) : (
        <input
          type={type}
          value={value}
          className={classNames("w-full rounded border-2 px-1", {
            "border-red-300": Boolean(error),
          })}
          {...rest}
        />
      )}
      <p className="min-h-[20px] pt-1 text-left text-xs text-red-700">
        {error}
      </p>
    </div>
  </div>
);
