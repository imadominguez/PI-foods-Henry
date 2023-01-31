import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CreateRecipes from "./pages/CreateRecipes/CreateRecipes";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NotFound from "./pages/Not found/NotFound";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname === "/" ? null : <Navbar />}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/createrecipes" component={CreateRecipes} />
        <Route exact path="/detail/:id/:dataBase" component={Detail} />
        <Route exact path="*" component={NotFound} />
      </Switch>
      {/* * PARA EL 404 NOT FOUND */}
      {pathname === "/" ? null : <Footer />}
    </div>
  );
}

export default App;
