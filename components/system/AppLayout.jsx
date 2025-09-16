"use client";

import { NAVIGATION_LINK } from "@/constants";
import { ReactLenis } from "lenis/react";
import React, { useState } from "react";
import Footer from "../common/Footer";
import { Navbar } from "../common/Navbar";
import ScrollToTop from "../common/ScrollToTop";
import Sidebar from "../common/Sidebar";
import ReduxProvider from "../layout/ReduxProvider";
import ToastHost from "../ui/ToastHost";
import SmartCursor from "./Cursor";

const AppLayout = ({ children }) => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <ReduxProvider>
      <ReactLenis root />
      <Navbar navItems={NAVIGATION_LINK} setOpenCart={setOpenCart} />
      {openCart && <Sidebar openCart={openCart} setOpenCart={setOpenCart} />}
      <SmartCursor />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <ToastHost />
    </ReduxProvider>
  );
};

export default AppLayout;
