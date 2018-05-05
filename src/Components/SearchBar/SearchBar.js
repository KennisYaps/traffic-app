import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { getSearchResults } from "../../utils/fetchAPI";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      isLoadingIcon: false,
      inputValue: "",
      oneMapSearchResults: [],
      results: []
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  render() {
    return (
      <div>
        This is my search component
        <Search
          icon="search"
          loading={this.state.isLoadingIcon}
          fluid={true}
          onSearchChange={this.handleSearchChange}
          value={this.state.inputValue}
        />
      </div>
    );
  }
  // destructuring: pass in {value} as a arg because i want to get the key: "value" from the object
  handleSearchChange(event, { value }) {
    event.preventDefault();
    // console.log("hello", event.target.value);
    this.setState({
      isLoadingIcon: true,
      inputValue: value
    });

    // wait for 3ms after user stop typing then search
    setTimeout(async () => {
      if (this.state.inputValue.length < 1) {
        this.setState({
          isLoadingIcon: false,
          inputValue: "",
          oneMapSearchResults: [],
          results: []
        });
      }
      try {
        const getSearchResultsFromOneMapAPI = await getSearchResults(
          this.state.inputValue
        );
        this.setState({
          oneMapSearchResults: getSearchResultsFromOneMapAPI
        });
        console.log("abjdf", this.state.oneMapSearchResults);
        console.log("this.data", this.props.trafficIncidentDatas);
      } catch (error) {
        console.error("Failed to search");
      }
      const escapeSpecialRegExp = string => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
      };
      const regExPattern = new RegExp(
        escapeSpecialRegExp(this.state.inputValue),
        "i"
      );
    }, 300);
  }
}

export default SearchBar;
