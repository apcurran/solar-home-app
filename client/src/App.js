import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/views/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
