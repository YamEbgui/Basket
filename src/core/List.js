import React from "react";
import Item from "./Item";
import "../style/List.css";
import deleteImage from "../images/delete.png";
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: this.props.basket || "false",
      productsInBasket: this.props.products,
    };
  }

  countAndReturn = (_product) => {
    let _counter = 0;
    for (let i = 0; i < this.props.products.length; i++) {
      if (_product === this.props.products[i]) {
        _counter++;
      }
    }
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
    let listName;
    if (this.state.basket === true) {
      const itemsCounter = this.listOfCounters(this.props.products);
      listName = "Basket";

      return (
        <div className="listDiv">
          <div id="basketHeader">
            <h3>{listName}</h3>
            <button onClick={() => this.props.funcDeleteAll()}>
              <img src={deleteImage} />
            </button>
          </div>
          {itemsCounter.length !== 0 ? (
            itemsCounter.map((item) => (
              <Item
                basket={true}
                func={this.props.func}
                product={item.product}
                count={item.counter}
              />
            ))
          ) : (
            <h3>Empty Basket</h3>
          )}
        </div>
      );
    } else {
      const items = this.props.products;
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
