import React from "react";
import { PageHeader } from "../src/PageHeader";
import App from "next/app";
import "../styles/index.css";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <PageHeader />
        <div className="container mx-auto">
          <Component {...pageProps} />
        </div>
      </React.Fragment>
    );
  }
}
