import { Route, Switch } from "react-router-dom";
import "./App.css";
import CreateRecipes from "./pages/CreateRecipes/CreateRecipes";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/createrecipes" component={CreateRecipes} />
      </Switch>
    </div>
  );
}

export default App;
