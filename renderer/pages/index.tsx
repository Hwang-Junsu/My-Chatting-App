import React, { useEffect } from "react";
import Head from "next/head";
import { auth as getAuth } from "../firebase";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import UserCard from "../components/user/userCard";
import useUserList from "../hooks/useUserList";
import { onAuthStateChanged } from "firebase/auth";
import { useRecoilValue } from "recoil";
import userState from "../atoms/user";

const auth = getAuth;

export default function Home() {
  const { userList, isLoading } = useUserList();
  const currentUser = useRecoilValue(userState);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(currentUser);
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
        <div className="h-screen p-5">
          <section className="mb-2 space-y-2 border-b-2">
            <div className="text-lg font-bold">My Profile</div>
            <UserCard user={currentUser} />
          </section>
          <section className="">
            <div className="text-lg font-bold">People</div>
            <div className="divide-y-2 ">
              {userList.map((user) => {
                if (user.uid === currentUser.uid) return;
                return <UserCard key={user.uid} user={user} />;
              })}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
