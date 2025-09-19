"use client";

import { NAVIGATION_LINK } from "@/constants";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const hideNavbar = pathname?.startsWith("/download");
  return (
    <ReduxProvider>
      <ReactLenis root />
      {!hideNavbar && (
        <Navbar navItems={NAVIGATION_LINK} setOpenCart={setOpenCart} />
      )}
      {openCart && <Sidebar openCart={openCart} setOpenCart={setOpenCart} />}
      <SmartCursor />
      <main>{children}</main>
      {!hideNavbar && (
        <>
          <Footer />
          <ScrollToTop />
        </>
      )}
      <ToastHost />
    </ReduxProvider>
  );
};

export default AppLayout;
