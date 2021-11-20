import React from "react";
import List from "./List";
import Search from "./Search";
import "../style/Shopping.css";

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
    this.state = {
      productsInBasket: JSON.parse(this.getProductsFromLocalStorage()),
      products: [
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
      ],
    };
  }

  getProductsFromLocalStorage = () => {
    try {
      const basket = localStorage.getItem("basket");
      return basket;
    } catch {
      localStorage.setItem("basket", []);
    }
  };

  searchOnProducts = (event) => {
    const query = event.target.value;
    let fillterd = [...products];
    fillterd = fillterd.filter((product) => product.indexOf(query) != -1);
    this.setState((prevState) => {
      return { products: fillterd };
    });
  };
  deleteAllItems = () => {
    localStorage.setItem("basket", []);
    this.setState({ productsInBasket: [] });
  };

  addToBasket = (event) => {
    this.setState((prevState) => {
      let items = [...prevState.productsInBasket];
      items.push(event.target.parentElement.textContent.substring(1));
      localStorage.setItem("basket", JSON.stringify(items));
      return {
        productsInBasket: items,
      };
    });
  };

  removeFromList = (product, list) => {
    if (product === list[0]) {
      return list.slice(1);
    } else {
      return [list[0]].concat(this.removeFromList(product, list.slice(1)));
    }
  };
  removeProduct = (event) => {
    this.setState((prevState) => {
      let items = [...prevState.productsInBasket];
      items = this.removeFromList(
        event.target.parentElement.textContent
          .substring(1)
          .replace(/[0-9]/g, ""),
        items
      );
      localStorage.setItem("basket", JSON.stringify(items));
      return {
        productsInBasket: items,
      };
    });
  };

  render() {
    return (
      <div className="contentDiv">
        <Search func={this.searchOnProducts} />
        <div className="shoppingDiv">
          <List func={this.addToBasket} products={this.state.products} />
          <List
            func={this.removeProduct}
            funcDeleteAll={this.deleteAllItems}
            basket={true}
            products={this.state.productsInBasket}
          />
        </div>
      </div>
    );
  }
}
