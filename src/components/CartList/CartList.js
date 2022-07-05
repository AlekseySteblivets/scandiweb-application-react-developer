import { Component } from "react";
// import { withRouter } from "react-router";
import { graphql } from "@apollo/client/react/hoc";

import cn from "classnames";

import CartItem from "../CartItem/CartItem";
import CartTotal from "../CartTotal";
import { READ_GET_PRODUCT_INTO_CART } from "../../api/cache/getProductIntoCart";
// import { client } from "../../api/base/apolloClient";

import styles from "./CartList.module.scss";

class CartList extends Component {
  // state = {
  //   numbersProduct: 0,
  // };

  componentDidUpdate() {
    // console.log("CartList-componentDidUpdate", this.props);
  }

  // counterProducts = (amount) => {
  //   this.setState(
  //     (prevState) => ({
  //       numbersProduct: prevState.numbersProduct + amount,
  //     }),
  //     () => this.props.modalAmountImems(this.state.numbersProduct)
  //   );
  // };

  render() {
    const { productIntoCart } = this.props.data;
    // console.log("productIntoCart", productIntoCart.length);
    return (
      <div>
        <ul
          className={cn({
            [styles.menu]: true,
            [styles.menuFullScreen]: this.props.visibleFullScreen,
          })}
        >
          {productIntoCart.map((product) => (
            <CartItem
              key={product.id}
              productId={product.id}
              // counterProducts={this.counterProducts}
              visibleFullScreen={this.props.visibleFullScreen}
            />
          ))}
        </ul>
        <CartTotal visibleFullScreen={this.props.visibleFullScreen} />
      </div>
    );
  }
}

export default graphql(READ_GET_PRODUCT_INTO_CART, {
  options: (props) => ({
    // variables: {
    //   id: props.productId,
    // },
    fetchPolicy: "cache-only",
  }),
})(CartList);
