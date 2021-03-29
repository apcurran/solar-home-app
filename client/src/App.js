import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from "./components/views/home/Home";
import Design from "./components/views/design/Design";

const stripePromise = loadStripe("pk_test_51GyOBXEFSgPrRFzWmUBqUfL9lNgsZR7qWlzKEQe7hTRs48845plWirspdaEqDps99uKE3MumJXsyjJPlSXoCGgOR0089tYnp4V");

function App() {
  return (
    <Router>
      <div className="App">
        <Elements stripe={stripePromise}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/design" component={Design} exact />
          </Switch>
        </Elements>
      </div>
    </Router>
  );
}

export default App;
