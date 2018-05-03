import React, { Component } from "react";
import { fetchLTAData } from "../../utils/fetchAPI";
class ERPRates extends Component {
  constructor() {
    super();
    this.state = {
      ERP_RatesDatas: []
    };
  }

  componentDidMount() {
    fetchLTAData("ERPRates").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            ERP_RatesDatas: json.value
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
        <h1>
          ERP rates of all vehicle types across all timings for each zone.
        </h1>
      </div>
    );
  }
}

export default ERPRates;
