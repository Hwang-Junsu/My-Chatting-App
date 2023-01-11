import Head from "next/head";
import React from "react";
import { ILayoutProps } from "types/common";
import Header from "./header";
import Navbar from "./navbar";

export default function Layout({
  text,
  children,
  onClick,
  seoTitle,
  canGoBack = false,
  hasTabBar = true,
  headerText = true,
}: ILayoutProps) {
  return (
    <div className="">
      <Head>
        <title>{`${seoTitle} | My Chatting App`}</title>
      </Head>
      {hasTabBar ? (
        <Header
          text={text}
          canGoBack={canGoBack}
          headerText={headerText}
          onClick={onClick}
        />
      ) : null}
      <main className="mt-16">{children}</main>
      <Navbar />
    </div>
  );
}
