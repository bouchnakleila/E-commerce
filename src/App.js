import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./Views/About/about";
import Addproduct from "./Views/AddProduct/addproduct";
import Cart from "./Views/Cart/cart";
import Contact from "./Views/Contact/contact";
import Home from "./Views/Home/home";
import Login from "./Views/Login/login";
import ProductDetails from "./Views/ProductDetails/productDetails";
import Register from "./Views/Register/register";
import Shop from "./Views/Shop/shop";
import AddCategory from "./Views/AddCategory/addcategory"
import CategoryList from "./Views/CategoryList/categoryList"
import ProductList from "./Views/ProductList/productList"
import Users from "./Views/Users/usersList"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home/>}></Route>
          <Route path="/shop" element={< Shop/>}></Route>
          <Route path="/about" element={< About/>}></Route>
          <Route path="/contact" element={< Contact/>}></Route>
          <Route path="/login" element={< Login/>}></Route>
          <Route path="/register" element={< Register/>}></Route>
          <Route path="/cart" element={< Cart/>}></Route>
          <Route path="/productDetails/:id" element={< ProductDetails/>}></Route>
          <Route path="/addProduct" element={< Addproduct/>}></Route>
          <Route path="/addCategory" element={< AddCategory/>}></Route>
          <Route path="/categoryList" element={< CategoryList/>}></Route>
          <Route path="/productList" element={< ProductList/>}></Route>
          <Route path="/users" element={< Users/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
