import { ipcRenderer } from "electron";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import userState from "../../atoms/user";
import { auth, db } from "../../firebase";
import { cls } from "../../utils/cls";
import Button from "../button";
import Input from "../input";

export default function SignForm() {
  const setUser = useSetRecoilState(userState);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const router = useRouter();

  // Valid Check
  const [checkEmail, setCheckEmail] = useState<boolean>(null);
  const [checkPassword, setCheckPassword] = useState<boolean>(null);
  const [equalPassword, setEqualPassword] = useState<boolean>(null);
  const [checkNickname, setcheckNickname] = useState<boolean>(null);

  // Email Confirm
  useEffect(() => {
    const emailRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    emailRegex.test(email) ? setCheckEmail(true) : setCheckEmail(false);
  }, [email]);

  // PW Confirm
  useEffect(() => {
    password.length < 8 ? setCheckPassword(false) : setCheckPassword(true);
    password2 === password ? setEqualPassword(true) : setEqualPassword(false);
  }, [password, password2]);

  // Nickname Confirom
  useEffect(() => {
    if (nickname.length === 0) setcheckNickname(false);
    nickname.length > 8 ? setcheckNickname(false) : setcheckNickname(true);
  }, [nickname]);

  const signup = async () => {
    if (!checkEmail || !checkPassword || !checkNickname || !equalPassword) {
      ipcRenderer.invoke("showError", "회원가입 형식을 확인해주세요.");
      return;
    }
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
          setUser({
            email: data.user.email,
            displayName: data.user.displayName,
            uid: data.user.uid,
            isLoggedIn: true,
          });
        }
      );
    } catch (error) {
      ipcRenderer.invoke("showError", "동일한 이메일이 존재합니다.");
      return;
    }
    router.push("/");
  };
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((data) => {
        setUser({
          email: data.user.email,
          displayName: data.user.displayName,
          uid: data.user.uid,
          isLoggedIn: true,
        });
      });
    } catch (error) {
      ipcRenderer.invoke("showError", "이메일과 패스워드를 확인해주세요.");
      return;
    }
    router.push("/");
  };
  return (
    <>
      <form className={cls(" max-w-lg flex flex-col space-y-2")}>
        <div>
          <Input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isRegister ? (
            checkEmail ? null : (
              <p className="text-[12px] text-center text-red-500">
                이메일 형식이 올바르지 않습니다.
              </p>
            )
          ) : null}
        </div>
        <div>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegister ? (
            checkEmail ? null : (
              <p className="text-[12px] text-center text-red-500">
                8자리 이상의 비밀번호를 설정해주세요.
              </p>
            )
          ) : null}
        </div>
        {isRegister ? (
          <div>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {equalPassword ? null : (
              <p className="text-[12px] text-center text-red-500">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        ) : null}
        {isRegister ? (
          <div>
            <Input
              type="text"
              placeholder="닉네임(8자 이내)"
              maxLength={8}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {checkNickname ? null : (
              <p className="text-[12px] text-center text-red-500">
                8자 이내의 닉네임을 작성해주세요.
              </p>
            )}
          </div>
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
        {isRegister ? "이미 계정이 있습니다." : "계정이 없으신가요?"}
      </span>
    </>
  );
}
