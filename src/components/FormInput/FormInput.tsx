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
  <div className="my-4 flex">
    <label className="w-full text-left">{`${label}:`}</label>
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
