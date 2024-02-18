import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductList from "./components/productLists/ProductList";

const App = () => {
  return (
    <div className="flex my-2">
      <ProductList />
      <ProductDetails />


    </div>
  );
};

export default App;