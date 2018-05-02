import React, { Component } from "react";
import fetchAPI from "../../utils/fetchAPI";
class VMS extends Component {
  constructor() {
    super();
    this.state = {
      VMSDatas: []
    };
  }

  componentDidMount() {
    fetchAPI("VMS").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            VMSDatas: json.value
          });
          //   console.log(this.state.VMSDatas);
        });
      } else {
        console.log("response is not okay");
      }
    });
  }
  render() {
    return (
      <div>
        <h1>VMS</h1>
        <p>
          Returns traffic advisories (via variable message services) concerning
          current traffic conditions that are displayed on EMAS signboards along
          expressways and arterial roads.
        </p>
      </div>
    );
  }
}

export default VMS;
