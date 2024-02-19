import AddProducts from "./components/AddProducts/AddProducts";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductList from "./components/productLists/ProductList";

const App = () => {
  return (
    <div className="flex my-2 p-4">
      <AddProducts />
      <ProductList />
      <ProductDetails />


    </div>
  );
};

export default App;