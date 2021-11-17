import React from "react";
import "../style/Header.css";
import cart from "../images/cart.png";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <img className="cartImage" src={cart} />
        <h1>BASKET</h1>
      </div>
    );
  }
}
