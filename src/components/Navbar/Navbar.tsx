import classNames from "classnames";

import { goto, PAGES } from "../../features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface Props {
  className?: string;
}

export const Navbar = ({ className, ...rest }: Props) => {
  const currentPage = useAppSelector((state) => state.navigation.activePage);
  const dispatch = useAppDispatch();

  return (
    <div
      className={classNames("flex items-center justify-center", className)}
      {...rest}
    >
      <ul data-testid="navlist" className="flex flex-row gap-10">
        {PAGES.map(({ id, name }) => (
          <li
            key={id}
            data-testid={id}
            onClick={() => dispatch(goto(id))}
            className={classNames(
              `${
                currentPage.id === id ? "text-slate-100" : "text-slate-400"
              } cursor-pointer text-lg`
            )}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
