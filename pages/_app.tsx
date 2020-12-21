import React from "react";
import { Navbar } from "../src/Navbar";
import App from "next/app";
import "../styles/index.css";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Navbar />
        <div className="container mx-auto pt-10 px-5">
          <Component {...pageProps} />
        </div>
      </React.Fragment>
    );
  }
}
