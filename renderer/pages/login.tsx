import Head from "next/head";
import SignForm from "@components/sign/signForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | My Chatting APP</title>
      </Head>

      <div className="flex flex-col items-center justify-center h-screen space-y-2 bg-gradient-to-b from-sky-300 to-indigo-500">
        <header className="mb-10 text-3xl font-bold text-white drop-shadow-xl shadow-gray-900 animate-fadeInWithUp">
          Chatting APP
        </header>
        <SignForm />
      </div>
    </>
  );
}
