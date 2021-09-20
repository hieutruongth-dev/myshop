import "./App.css";
import Home from "./pages/Home";
import { Route, BrowserRouter as Router , Switch } from "react-router-dom";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Router >
        <header>
        </header>
        <section>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/Admin">
              <Admin></Admin>
            </Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
