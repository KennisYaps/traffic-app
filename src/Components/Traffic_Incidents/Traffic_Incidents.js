import React, { Component } from "react";
import fetchAPI from "../../utils/fetchAPI";
import MapWithAMarkerClusterer from "../MapWithAMarkerClusterer";
import { Input } from "semantic-ui-react";

class TrafficIncidents extends Component {
  constructor() {
    super();
    this.state = {
      TrafficIncidentsDatas: []
    };
    this.fetchData = this.fetchData.bind(this);
  }
  // componentWillMount() {
  //   this.setState({ TrafficIncidentsDatas: [] });
  // }

  render() {
    const displayIncidentsMessages = this.state.TrafficIncidentsDatas.map(
      (incident, idx) => {
        return (
          <li key={idx}>
            {incident.Type}&nbsp;&nbsp;&nbsp;&nbsp;{incident.Message}
          </li>
        );
      }
    );
    return (
      <div>
        <h1>Traffic Incidents</h1>
        <Input fluid loading={false} icon="search" placeholder="Search..." />
        {/* {displayIncidentsMessages} */}
        <h4>The Incident Map</h4>
        <div>
          <MapWithAMarkerClusterer markers={this.state.TrafficIncidentsDatas} />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.fetchData();
    this.fetchReverseGeoCodedStreetNames =
    this.interval = setInterval(this.fetchData, 120000); // 2 mins
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData() {
    fetchAPI("TrafficIncidents").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            TrafficIncidentsDatas: json.value
          });
        });
      } else {
        console.log("response is not okay");
      }
    });
  }
}

export default TrafficIncidents;
