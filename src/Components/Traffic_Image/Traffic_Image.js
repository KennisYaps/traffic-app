import React, { Component } from "react";
import fetchAPI from "../../utils/fetchAPI";
class TrafficImage extends Component {
  constructor() {
    super();
    this.state = {
      trafficImageDatas: []
    };
  }

  componentDidMount() {
    fetchAPI("Traffic-Images").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            trafficImageDatas: json.value
          });
          console.log(this.state.trafficImageDatas);
        });
      } else {
        console.log("response is not okay");
      }
    });
  }
  render() {
    return <div>Traffic Image of live traffic conditions along expressways
    and Woodlands & Tuas Checkpoints</div>;
  }
}

export default TrafficImage;
