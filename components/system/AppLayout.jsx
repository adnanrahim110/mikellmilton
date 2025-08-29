"use client";

import { ReactLenis } from "lenis/react";
import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import ScrollToTop from "../common/ScrollToTop";
import SmartCursor from "./Cursor";

const AppLayout = ({ children }) => {
  return (
    <>
      <ReactLenis root />
      <Header />
      <SmartCursor />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AppLayout;
