import React, { Component } from "react";
import { fetchLTAData } from "../../utils/fetchAPI";
import MapWithAMarkerClusterer from "../MapWithAMarkerClusterer";
class TrafficImage extends Component {
  constructor() {
    super();
    this.state = {
      trafficImageDatas: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  render() {
    return (
      <div>
        <h1>
          Traffic Image of live traffic conditions along expressways and
          Woodlands & Tuas Checkpoints`
        </h1>
        <div>
          <MapWithAMarkerClusterer markers={this.state.trafficImageDatas} />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 240000); // 4 mins
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  fetchData() {
    fetchLTAData("Traffic-Images").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            trafficImageDatas: json.value
          });
        });
      } else {
        console.error("response is not okay");
      }
    });
  }
}

export default TrafficImage;
