import { Component } from "react";

import { withRouter } from "react-router";
import { graphql } from "@apollo/client/react/hoc";
import { compose } from "react-compose";

// import { READ_GET_PRODUCT_INTO_CART } from "../../api/cache/getProductIntoCart";
// import { client } from "../../api/base/apolloClient";
import Modal from "../../lib/Modal/Modal";
import Product from "../Product";
import ProductItem from "../ProductItem";
import { GET_PRODUCTS_BY_NAME } from "../../api/shemas/getProductsByName";
// import { SELECTED_CURRENCY } from "../../api/cache/selectedCurrency";

import styles from "./ProductList.module.scss";

class ProductList extends Component {
  state = {
    showCartOfThing: false,
    idProduct: "",
    currentCurrencySymbol: "",
    currentValute: [],
  };

  componentDidUpdate() {
    this.selectedCurrencyQuery(this.props.takenCurrency.selectedCurrency);
  }

  selectedCurrencyQuery = (currency) => {
    if (!currency) {
      return;
    }
    if (!this.state.currentCurrencySymbol)
      this.setState({
        currentCurrencySymbol: currency.symbol,
      });

    if (this.state.currentCurrencySymbol !== currency.symbol) {
      this.setState({
        currentCurrencySymbol: currency.symbol,
      });
    }
  };

  togleModal = (id) => {
    this.setState((state) => ({
      showCartOfThing: !state.showCartOfThing,
      idProduct: id,
    }));
  };

  amountMoney = (currencies) => {
    return currencies.find(
      (kindOfCurrency) =>
        kindOfCurrency.currency.symbol === this.state.currentCurrencySymbol
    )?.amount;
    // this.setState({});
  };

  render() {
    const {
      match: { params },
      data: { category, loading },
    } = this.props;

    // console.log("ProductList", category);
    return (
      <div>
        <h2 className={styles.title}>{params.slug}</h2>
        {loading ? (
          <p>...Loading PRODUCTS</p>
        ) : (
          <ul className={styles.menu}>
            {category?.products.map((oneProduct) => (
              <ProductItem
                onTogleModal={this.togleModal}
                key={oneProduct.id}
                idProduct={oneProduct.id}
                brand={oneProduct.brand}
                amountMoney={this.amountMoney(oneProduct.prices)}
                // amountMoney={555}
                image={oneProduct.gallery[0]}
                name={oneProduct.name}
                isInStock={oneProduct.inStock}
                currencySymbol={this.state.currentCurrencySymbol}
              />
            ))}
          </ul>
        )}
        <Modal
          onClose={this.togleModal}
          visible={this.state.showCartOfThing}
          classNameProps={styles.modalCartOfThing}
        >
          <Product
            productId={this.state.idProduct}
            onTogleModal={this.togleModal}
            // amountMoney={this.amountMoney(oneProduct.prices)}
            currencySymbol={this.state.currentCurrencySymbol}
          />
        </Modal>
      </div>
    );
  }
}

// const withCurrency = graphql(SELECTED_CURRENCY, {
//   options: () => ({
//     fetchPolicy: "cache-only",
//   }),
// })(withRouter(ProductList));

// const withProducts = graphql(GET_PRODUCTS_BY_NAME, {
//   options: (props) => ({
//     variables: {
//       type: props.match.params.slug,
//     },
//   }),
// })(withCurrency);

// export default withProducts;

export default graphql(GET_PRODUCTS_BY_NAME, {
  options: (props) => ({
    variables: {
      type: props.slug,
    },
  }),
})(withRouter(ProductList));
