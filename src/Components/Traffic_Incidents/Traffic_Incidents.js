import React, { Component } from "react";
import { getData } from "../../utils/fetchAPI";
import MapWithAMarkerClusterer from "../MapWithAMarkerClusterer";
// import SearchExample from "../SearchExample";
import SearchBar from "../SearchBar/SearchBar";
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
        <h4>The Incident Map</h4>
        <div>
          <SearchBar trafficIncidentDatas={this.state.trafficIncidentsDatas} />{" "}
          <br />
          <MapWithAMarkerClusterer markers={this.state.trafficIncidentsDatas} />
          {/* <SearchExample fluid /> */}
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
