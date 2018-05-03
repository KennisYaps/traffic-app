import React, { Component } from "react";
import { fetchLTAData } from "../../utils/fetchAPI";
class EstTravelTimes extends Component {
  constructor() {
    super();
    this.state = {
      EstTravelTimesDatas: []
    };
  }

  componentDidMount() {
    fetchLTAData("EstTravelTimes").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            EstTravelTimesDatas: json.value
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
        <h1>Estimated Travel Times of expressways (in segments).</h1>
      </div>
    );
  }
}

export default EstTravelTimes;
