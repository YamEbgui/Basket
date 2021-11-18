import React from "react";
import List from "./List";
import "../style/Shopping.css";
import { elemIndex } from "prelude-ls";
import { remove } from "lodash";

const products = [
  "Strawberry",
  "Blueberry",
  "Orange",
  "Banana",
  "Apple",
  "Carrot",
  "Celery",
  "Mushroom",
  "Green",
  "Pepper",
  "Eggs",
  "Cheese",
  "Butter",
  "Chicken",
  "Beef",
  "Pork",
  "Fish",
  "Rice",
  "Pasta",
  "Bread",
];

export default class Shopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productsInBasket: [] };
  }

  addToBasket = (event) => {
    this.setState((prevState) => {
      let items = [...prevState.productsInBasket];
      items.push(event.target.parentElement.textContent.substring(1));
      return {
        productsInBasket: items,
      };
    });
  };

  removeFromList = (product, list) => {
    if (product === list[0]) {
      return list.slice(1);
    } else {
      console.log(product);
      console.log(list[0]);
      return [list[0]].concat(this.removeFromList(product, list.slice(1)));
    }
  };
  removeProduct = (event) => {
    this.setState((prevState) => {
      let items = [...prevState.productsInBasket];
      console.log("first", items);
      items = this.removeFromList(
        event.target.parentElement.textContent
          .substring(1)
          .replace(/[0-9]/g, ""),
        items
      );
      console.log("first", items);
      return {
        productsInBasket: items,
      };
    });
  };

  render() {
    console.log(this.state.productsInBasket);
    return (
      <div className="shoppingDiv">
        <List func={this.addToBasket} products={products} />
        <List
          func={this.removeProduct}
          basket={true}
          products={this.state.productsInBasket}
        />
      </div>
    );
  }
}
