import React, { Component } from "react";
import fetchAPI from "../../utils/fetchAPI";
class EstTravelTimes extends Component {
  constructor() {
    super();
    this.state = {
      EstTravelTimesDatas: []
    };
  }

  componentDidMount() {
    fetchAPI("EstTravelTimes").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            EstTravelTimesDatas: json.value
          });
          console.log(this.state.EstTravelTimesDatas);
        });
      } else {
        console.log("response is not okay");
      }
    });
  }
  render() {
    return <div>Estimated Travel Times of expressways (in segments).</div>;
  }
}

export default EstTravelTimes;
