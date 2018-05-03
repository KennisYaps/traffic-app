import React, { Component } from "react";
import { getData } from "../../utils/fetchAPI";
import MapWithAMarkerClusterer from "../MapWithAMarkerClusterer";
import { Input } from "semantic-ui-react";

class TrafficIncidents extends Component {
  constructor() {
    super();
    this.state = {
      trafficIncidentsDatas: []
    };
  }

  render() {
    return (
      <div>
        <h1>Traffic Incidents</h1>
        <Input fluid loading={false} icon="search" placeholder="Search..." />
        <h4>The Incident Map</h4>
        <div>
          <MapWithAMarkerClusterer markers={this.state.trafficIncidentsDatas} />
        </div>
      </div>
    );
  }
  async componentDidMount() {
    const data = await getData("TrafficIncidents");
    console.log(data);
    this.setState({ trafficIncidentsDatas: data });
    // this.interval = await setInterval(data, 1000); // 2 mins
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default TrafficIncidents;
