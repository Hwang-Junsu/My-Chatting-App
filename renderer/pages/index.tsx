import React, { useContext } from "react";
import useUserList from "@hooks/useUserList";
import UserCard from "@components/user/userCard";
import Layout from "@components/common/layout";
import { UserContext } from "context/userContext";

export default function Home() {
  const { userList } = useUserList();
  const currentUser = useContext(UserContext);

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
