import classNames from "classnames";
import { useEffect, useState } from "react";

import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { ProductPreview } from "./components/ProductPreview/ProductPreview";
import { Product, productApi } from "./services/product";

function App() {
  const [products, setProducts] = useState<Array<Product>>([]);

  const { isSuccess, currentData } = productApi.useListProductsQuery();

  useEffect(() => {
    if (isSuccess) {
      setProducts(currentData?.products || []);
    }
  }, [isSuccess]);

  return (
    <div className="App">
      <Navbar className={classNames("h-16 bg-gray-700")} />
      <main className="mt-16 flex flex-col items-center gap-8">
        {products.map((product) => (
          <ProductPreview product={product} />
        ))}
      </main>
    </div>
  );
}

export default App;
