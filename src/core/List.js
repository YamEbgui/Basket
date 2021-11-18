import React from "react";
import Item from "./Item";
import "../style/List.css";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: this.props.basket || "false",
      productsInBasket: this.props.products,
    };
  }

  countAndReturn = (_product) => {
    //console.log(this.state.products);
    let _counter = 0;
    for (let i = 0; i < this.props.products.length; i++) {
      if (_product === this.props.products[i]) {
        _counter++;
      }
    }
    //console.log(_counter);
    return { product: _product, counter: _counter };
  };

  removeAll = (product, list) => {
    if (list.length === 0) {
      return [];
    } else {
      if (product === list[0]) {
        return this.removeAll(product, list.slice(1));
      } else {
        return [list[0]].concat(this.removeAll(product, list.slice(1)));
      }
    }
  };

  listOfCounters = (list) => {
    let counterList = [];
    let newList = [...list];
    while (newList.length !== 0) {
      counterList.push(this.countAndReturn(newList[0]));
      newList = this.removeAll(newList[0], newList);
    }
    return counterList;
  };

  render() {
    console.log(this.props.products);
    console.log(this.state.productsInBasket);
    let listName;
    if (this.state.basket === true) {
      const itemsCounter = this.listOfCounters(this.props.products);
      console.log("here", itemsCounter);
      listName = "Basket";
      return (
        <div className="listDiv">
          <h3>{listName}</h3>
          {itemsCounter.map((item) => (
            <Item
              basket={true}
              func={this.props.func}
              product={item.product}
              count={item.counter}
            />
          ))}
        </div>
      );
    } else {
      const items = this.state.productsInBasket;
      listName = "Products";
      return (
        <div className="listDiv">
          <h3>{listName}</h3>
          {items.map((item) => {
            return <Item func={this.props.func} product={item} />;
          })}
        </div>
      );
    }
  }
}
