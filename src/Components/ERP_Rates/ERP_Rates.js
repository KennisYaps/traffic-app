import React, { Component } from "react";
import fetchAPI from "../../utils/fetchAPI";
class ERPRates extends Component {
  constructor() {
    super();
    this.state = {
      ERP_RatesDatas: []
    };
  }

  componentDidMount() {
    fetchAPI("ERPRates").then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            ERP_RatesDatas: json.value
          });
          console.log(
            this.state.ERP_RatesDatas.map(rate => {
              // console.log(rate.ZoneID);
              return rate;
            })
          );
        });
      } else {
        console.log("response is not okay");
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
