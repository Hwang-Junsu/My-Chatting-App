import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData, getDoc, doc } from "firebase/firestore";
import { auth, db } from "@firebase";
import useUserList from "@hooks/useUserList";
import UserCard from "@components/user/userCard";
import Layout from "@components/common/layout";

export default function Home() {
  const { userList } = useUserList();
  const [currentUser, setCurrentUser] = useState<DocumentData>();
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.email);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          setCurrentUser(snapshot.data());
        }
      } else {
        router.replace("/login");
      }
    });
  }, []);

  return (
    <>
      <Layout seoTitle="People" text="People">
        <div className="h-screen p-5">
          <section className="mb-2 space-y-2 border-b-2">
            <div className="text-lg font-bold">My Profile</div>
            <UserCard user={currentUser} type="READONLY" />
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
