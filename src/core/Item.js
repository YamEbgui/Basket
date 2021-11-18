import React from "react";
import "../style/Item.css";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: this.props.basket || false,
      count: this.props.count || 0,
    };
  }

  decreceCount = () => {
    this.setState((prevState) => {
      return { count: prevState.count - 1 };
    });
  };

  addToCount = () => {
    this.setState((prevState) => {
      return { count: prevState.count + 1 };
    });
  };

  render() {
    if (this.state.basket === true) {
      return (
        <div className="itemDiv gradient-border">
          {/* need to add function to decrece that talking with shopping */}
          <button
            onClick={(event) => {
              this.props.func(event);
            }}
          >
            -
          </button>
          {this.props.product}
          <span>{this.props.count}</span>
        </div>
      );
    }
    return (
      <div className="itemDiv">
        <button
          onClick={(event) => {
            this.props.func(event);
          }}
        >
          +
        </button>
        {this.props.product}
      </div>
    );
  }
}
