import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import {useRouter} from "next/router";

export default function Setting() {
    const router = useRouter();

    return (
        <>
            <Layout text="Setting">
                <div className="p-5">
                    <section className="space-y-2 border-b-2 mb-2">
                        <div className="font-bold text-lg">Setting</div>
                        <div className="divide-y-2">
                            <div className="hover:cursor-pointer flex space-x-3 items-center p-3 hover:bg-blue-300">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div>프로필 수정</div>
                            </div>
                            <div
                                className="hover:cursor-pointer flex space-x-3 items-center p-3 hover:bg-blue-300"
                                onClick={() => router.push("/login")}
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                                        />
                                    </svg>
                                </div>
                                <div>로그아웃</div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}
