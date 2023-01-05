import React, {useEffect, useState} from "react";
import Head from "next/head";
import {auth as getAuth} from "../firebase";
import Layout from "../components/layout";
import {useRouter} from "next/router";
import UserCard from "../components/people/userCard";
import useUserList from "../hooks/useUserList";
import {onAuthStateChanged} from "firebase/auth";
import {IUser} from "../types/chat";

const auth = getAuth;

export default function Home() {
    const {userList} = useUserList();
    const [user, setUser] = useState<IUser>();
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    displayName: user.displayName,
                    uid: user.uid,
                    email: user.email,
                });
            } else {
                router.replace("/login");
            }
        });
    }, []);

    return (
        <>
            <Head>
                <title>My Chatting APP | Home</title>
            </Head>
            <Layout text="People">
                <div className="p-5">
                    <section className="space-y-2 border-b-2 mb-2">
                        <div className="font-bold text-lg">My Profile</div>
                        <UserCard user={user} />
                    </section>
                    <section>
                        <div className="font-bold text-lg">People</div>
                        <div className=" divide-y-2">
                            {userList.map((user: IUser) => (
                                <UserCard key={user.uid} user={user} />
                            ))}
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}
