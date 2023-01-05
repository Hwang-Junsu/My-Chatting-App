import React from "react";
import Header from "./header";
import Navbar from "./navbar";

export default function Layout({
    text,
    children,
    hasTabBar = true,
}: {
    text: string;
    children: React.ReactNode;
    hasTabBar?: boolean;
}) {
    return (
        <div className="">
            {hasTabBar ? <Header text={text} /> : null}
            <main className="mt-16">{children}</main>
            <Navbar />
        </div>
    );
}
