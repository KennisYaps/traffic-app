import React, { Component } from "react";
import { fetchLTAData } from "../../utils/fetchAPI";
class VMS extends Component {
  constructor() {
    super();
    this.state = {
      VMSDatas: []
    };
  }

  componentDidMount() {
    fetchLTAData("VMS").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            VMSDatas: json.value
          });
        });
      } else {
        console.error("response is not okay");
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
