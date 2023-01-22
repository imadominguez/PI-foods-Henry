import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CreateRecipes from "./pages/CreateRecipes/CreateRecipes";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname === "/" ? null : <Navbar />}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/createrecipes" component={CreateRecipes} />
        <Route exact path="/recipes/:id" component={Detail} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
