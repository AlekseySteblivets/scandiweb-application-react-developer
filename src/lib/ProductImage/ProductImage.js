import { Component } from "react";

import cn from "classnames";

import styles from "./ProductImage.module.scss";

export default class ProductImage extends Component {
  render() {
    return (
      <img
        alt="product"
        src={this.props.image}
        className={cn(styles.thingTemplate, this.props.classNameProps)}
      />
    );
  }
}
