import classNames from "classnames";
import { useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

import "./App.css";
import { Favorites } from "./components/Favorites/Favorites";
import { HomePage } from "./components/HomePage/HomePage";
import { Navbar } from "./components/Navbar/Navbar";
import {
  increaseLoader,
  PAGE_IDS,
  setLoadingProgress,
} from "./features/navigation/navigationSlice";
import { loadProducts } from "./features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { productApi } from "./services/product";

let loaderIntervalId;

const PAGE_COMPONENT_MAP = {
  [PAGE_IDS.HOME]: HomePage,
  [PAGE_IDS.FAVORITES]: Favorites,
};

function App() {
  const dispatch = useAppDispatch();

  const { activePageId: currentPageId, loadingProgress } = useAppSelector(
    (state) => state.navigation
  );

  const { isSuccess, currentData } = productApi.useListProductsQuery();

  const CurrentComponent = PAGE_COMPONENT_MAP[currentPageId];

  useEffect(() => {
    loaderIntervalId = setInterval(() => dispatch(increaseLoader), 200);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(loadProducts(currentData?.products || []));
      dispatch(setLoadingProgress(100));
    }
  }, [isSuccess]);

  return (
    <div className="App">
      <Navbar className={classNames("h-16 bg-gray-700")} />
      <LoadingBar
        color="#f11946"
        progress={loadingProgress}
        onLoaderFinished={() => dispatch(setLoadingProgress(0))}
      />
      <main className="mt-16 mb-12 flex flex-col items-center">
        <CurrentComponent />
      </main>
    </div>
  );
}

export default App;
