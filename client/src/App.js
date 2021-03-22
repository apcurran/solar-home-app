import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/views/home/Home";
import Design from "./components/views/design/Design";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/design" component={Design} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
