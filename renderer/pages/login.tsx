import Head from "next/head";
import SignForm from "../components/sign/signForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>My Chatting APP | Login</title>
      </Head>

      <div className="flex flex-col items-center justify-center h-screen space-y-2">
        <header className="mb-5 text-2xl font-bold">Chatting APP</header>
        <SignForm />
      </div>
    </>
  );
}
