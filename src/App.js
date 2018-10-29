import React, { Component } from "react";
import Week from "./components/Week";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowAltCircleLeft, faArrowAltCircleRight);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Week />
      </div>
    );
  }
}

export default App;
