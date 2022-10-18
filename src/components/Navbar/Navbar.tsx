import classNames from "classnames";

import {
  goto,
  PAGE_IDS,
  PAGE_NAMES,
} from "../../features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface Props {
  className?: string;
}

export const Navbar = ({ className, ...rest }: Props) => {
  const currentPageId = useAppSelector(
    (state) => state.navigation.activePageId
  );
  const dispatch = useAppDispatch();

  return (
    <div
      className={classNames("flex items-center justify-center", className)}
      {...rest}
    >
      <ul data-testid="navlist" className="flex flex-row gap-10">
        {Object.values(PAGE_IDS).map((id) => (
          <li
            key={id}
            data-testid={id}
            onClick={() => dispatch(goto(id))}
            className={classNames(
              `${
                currentPageId === id ? "text-slate-100" : "text-slate-400"
              } cursor-pointer text-lg`
            )}
          >
            {PAGE_NAMES[id]}
          </li>
        ))}
      </ul>
    </div>
  );
};
