import classNames from "classnames";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import "./App.css";
import { AddProduct } from "./components/AddProduct/AddProduct";
import { Favorites } from "./components/Favorites/Favorites";
import { HomePage } from "./components/HomePage/HomePage";
import { Navbar } from "./components/Navbar/Navbar";
import { PAGE_IDS } from "./features/navigation/navigationSlice";
import { useAppSelector } from "./hooks";

const PAGE_COMPONENT_MAP = {
  [PAGE_IDS.HOME]: HomePage,
  [PAGE_IDS.FAVORITES]: Favorites,
  [PAGE_IDS.ADD_PRODUCT]: AddProduct,
  [PAGE_IDS.PRODUCT_DETAIL]: ({ ...props }) => (
    <AddProduct editMode {...props} />
  ),
};

function App() {
  const { activePageId: currentPageId } = useAppSelector(
    (state) => state.navigation
  );

  const CurrentComponent = PAGE_COMPONENT_MAP[currentPageId];

  return (
    <div className="App">
      <Navbar className={classNames("h-16 bg-gray-700")} />
      <main className="mt-16 mb-12 flex flex-col items-center px-4">
        <CurrentComponent />
      </main>

      <Toaster position="bottom-left" />
    </div>
  );
}

export default App;
