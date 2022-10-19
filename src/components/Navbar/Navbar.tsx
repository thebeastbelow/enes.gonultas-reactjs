import classNames from "classnames";

import {
  goto,
  PAGES,
  PAGE_IDS,
} from "../../features/navigation/navigationSlice";
import { setCategoryFilter } from "../../features/products/productsSlice";
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
        {Object.values(PAGE_IDS).reduce((navbarPages, pageId) => {
          const { name, visibleInNavbar } = PAGES[pageId];
          if (visibleInNavbar) {
            navbarPages.push(
              <li
                key={pageId}
                data-testid={pageId}
                onClick={() => {
                  dispatch(setCategoryFilter(""));
                  dispatch(goto(pageId));
                }}
                className={classNames(
                  `${
                    currentPageId === pageId
                      ? "text-slate-100"
                      : "text-slate-400"
                  } cursor-pointer text-lg`
                )}
              >
                {name}
              </li>
            );
          }

          return navbarPages;
        }, new Array())}
      </ul>
    </div>
  );
};
