import React, { Component } from "react";
import { fetchLTAData } from "../../utils/fetchAPI";
class TrafficSpeedBands extends Component {
  constructor() {
    super();
    this.state = {
      TrafficSpeedBandsDatas: []
    };
  }

  componentDidMount() {
    fetchLTAData("TrafficSpeedBands").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            TrafficSpeedBandsDatas: json.value
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
        <h1>Traffic Speed Bands</h1>
        <p>
          Returns current traffic speeds on expressways and arterial roads,
          expressed in speed bands.
        </p>
      </div>
    );
  }
}

export default TrafficSpeedBands;
