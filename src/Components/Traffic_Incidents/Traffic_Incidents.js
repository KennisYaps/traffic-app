import React, { Component } from "react";
import fetchAPI from "../../utils/fetchAPI";
class TrafficIncidents extends Component {
  constructor() {
    super();
    this.state = {
      TrafficIncidentsDatas: []
    };
  }

  componentDidMount() {
    fetchAPI("TrafficIncidents").then(
      response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({
              TrafficIncidentsDatas: json.value
            });
            console.log(this.state.TrafficIncidentsDatas);
          });
        } else {
          console.log("response is not okay");
        }
      }
    );
  }
  render() {
    return <div>Traffic Incidents</div>;
  }
}

export default TrafficIncidents;
