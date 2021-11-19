import React from "react";
import "../style/Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onInput={(event) => {
            this.props.func(event);
          }}
          placeholder="Search Products"
        />
      </div>
    );
  }
}
