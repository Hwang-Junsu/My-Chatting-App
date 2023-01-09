import React from "react";
import Header from "./header";
import Navbar from "./navbar";

export default function Layout({
  text,
  children,
  canGoBack = false,
  hasTabBar = true,
  headerText = true,
}: {
  text: string;
  children: React.ReactNode;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  headerText?: boolean;
}) {
  return (
    <div className="">
      {hasTabBar ? (
        <Header text={text} canGoBack={canGoBack} headerText={headerText} />
      ) : null}
      <main className="mt-16">{children}</main>
      <Navbar />
    </div>
  );
}
