import classNames from "classnames";
import { useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

import { Toaster } from "react-hot-toast";
import "./App.css";
import { AddProduct } from "./components/AddProduct/AddProduct";
import { Favorites } from "./components/Favorites/Favorites";
import { HomePage } from "./components/HomePage/HomePage";
import { Navbar } from "./components/Navbar/Navbar";
import {
  increaseLoader,
  PAGE_IDS,
  setLoadingProgress,
} from "./features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

let loaderIntervalId;

const PAGE_COMPONENT_MAP = {
  [PAGE_IDS.HOME]: HomePage,
  [PAGE_IDS.FAVORITES]: Favorites,
  [PAGE_IDS.ADD_PRODUCT]: AddProduct,
  [PAGE_IDS.PRODUCT_DETAIL]: ({ ...props }) => (
    <AddProduct readOnly {...props} />
  ),
};

function App() {
  const dispatch = useAppDispatch();

  const { activePageId: currentPageId, loadingProgress } = useAppSelector(
    (state) => state.navigation
  );
  const { shouldReloadProducts } = useAppSelector(({ products }) => products);

  const CurrentComponent = PAGE_COMPONENT_MAP[currentPageId];

  useEffect(() => {
    if (shouldReloadProducts) {
      loaderIntervalId = setInterval(() => dispatch(increaseLoader), 200);
    }
  }, [shouldReloadProducts]);

  // useEffect(() => {
  //   if (isSuccess && !isFetching) {
  //     dispatch(loadProducts(currentData?.products || []));
  //     dispatch(setLoadingProgress(100));
  //     dispatch(setShouldReloadProducts(false));
  //   }
  // }, [isSuccess, isFetching]);

  // useEffect(() => {
  //   if (shouldReloadProducts) {
  //     refetch();
  //   }
  // }, [shouldReloadProducts]);

  return (
    <div className="App">
      <Navbar className={classNames("h-16 bg-gray-700")} />
      <LoadingBar
        color="#f11946"
        progress={loadingProgress}
        onLoaderFinished={() => dispatch(setLoadingProgress(0))}
      />
      <main className="mt-16 mb-12 flex flex-col items-center px-4">
        <CurrentComponent />
      </main>

      <Toaster position="bottom-left" />
    </div>
  );
}

export default App;
