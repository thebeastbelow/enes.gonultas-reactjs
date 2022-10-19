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
  error?: boolean;
  [x: string]: any;
}) => (
  <div className="my-2 flex flex-col md:my-4 md:flex-row">
    <label className="mb-2 w-full text-left md:mb-0">{`${label}:`}</label>
    {type === "textarea" ? (
      <textarea
        value={value}
        className={classNames("w-full rounded border-2 px-1", {
          "border-red-300": error,
        })}
        {...rest}
      />
    ) : (
      <input
        type={type}
        value={value}
        className={classNames("w-full rounded border-2 px-1", {
          "border-red-300": error,
        })}
        {...rest}
      />
    )}
  </div>
);
