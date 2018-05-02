import React, { Component } from "react";
import fetchAPI from "../../utils/fetchAPI";
class TrafficSpeedBands extends Component {
  constructor() {
    super();
    this.state = {
      TrafficSpeedBandsDatas: []
    };
  }

  componentDidMount() {
    fetchAPI("TrafficSpeedBands").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            TrafficSpeedBandsDatas: json.value
          });
          //   console.log(this.state.TrafficSpeedBandsDatas);
        });
      } else {
        console.log("response is not okay");
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
