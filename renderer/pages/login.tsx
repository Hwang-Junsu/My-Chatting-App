import Head from "next/head";
import {useState} from "react";
import Button from "../components/button";
import Input from "../components/input";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import {collection, addDoc, setDoc, doc} from "firebase/firestore";
import {auth as getAuth, db} from "../firebase";
import {useRouter} from "next/router";
import {ipcRenderer} from "electron";

export default function Login() {
    const auth = getAuth;
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [nickname, setNickname] = useState("");

    const router = useRouter();
    const signup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(
                async (data) => {
                    await updateProfile(auth.currentUser, {
                        displayName: nickname,
                    });
                    await setDoc(doc(db, "users", email), {
                        email: data.user.email,
                        displayName: data.user.displayName,
                        uid: data.user.uid,
                    });
                    localStorage.setItem("uid", data.user.uid);
                    localStorage.setItem("displayName", data.user.displayName);
                }
            );
        } catch (error) {
            ipcRenderer.invoke("showError", "동일한 이메일이 존재합니다.");
            return;
        }
        router.push("/home");
    };
    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then(
                (data) => {
                    localStorage.setItem("uid", data.user.uid);
                    localStorage.setItem("displayName", data.user.displayName);
                }
            );
        } catch (error) {
            ipcRenderer.invoke(
                "showError",
                "이메일과 패스워드를 확인해주세요."
            );
            return;
        }
        router.push("/home");
    };

    return (
        <>
            <Head>
                <title>My Chatting APP | Login</title>
            </Head>

            <div className="flex flex-col items-center justify-center h-screen space-y-2">
                <header className="mb-5 text-2xl font-bold">
                    Chatting APP
                </header>
                <form className="flex flex-col space-y-3">
                    <Input
                        type="text"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isRegister ? (
                        <Input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    ) : null}
                    {isRegister ? (
                        <Input
                            type="text"
                            placeholder="닉네임(8자 이내)"
                            maxLength={8}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    ) : null}
                    <Button
                        text={isRegister ? "회원가입" : "로그인"}
                        onClick={isRegister ? signup : signIn}
                    />
                </form>
                <span
                    className="hover:scale-105 hover:text-blue-500"
                    onClick={() => setIsRegister((props) => !props)}
                >
                    계정이 없으신가요?
                </span>
            </div>
        </>
    );
}
