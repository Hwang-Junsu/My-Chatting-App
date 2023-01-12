import React, { useState, useRef, useCallback } from "react";
import { ipcRenderer } from "electron";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase";
import { cls } from "../../utils/cls";
import Button from "../common/button";
import Input from "../common/input";

export default function SignForm() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const router = useRouter();

  const passwordRef = useRef<HTMLInputElement>(null);
  // Valid Check
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [equalPassword, setEqualPassword] = useState<boolean>(false);
  const [checkDisplayName, setCheckDisplayName] = useState<boolean>(false);

  const onRegister = () => {
    setIsRegister((props) => !props);
    setCheckDisplayName(false);
    setEqualPassword(false);
  };

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      const currentEmail = e.target.value;
      if (!emailRegex.test(currentEmail)) setCheckEmail(false);
      else setCheckEmail(true);
    },
    []
  );
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /.{8,}/g;
      const currentPassword = e.target.value;
      if (!passwordRegex.test(currentPassword)) setCheckPassword(false);
      else setCheckPassword(true);
    },
    []
  );
  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentPasswordCheck = e.target.value;
      if (String(passwordRef.current.value) !== String(currentPasswordCheck))
        setEqualPassword(false);
      else setEqualPassword(true);
    },
    []
  );
  const onChangeDisplayName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const displayNameRegex = /.{1,8}/g;
      const currentDisplayName = e.target.value;
      if (!displayNameRegex.test(currentDisplayName))
        setCheckDisplayName(false);
      else setCheckDisplayName(true);
    },
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    if (isRegister) {
      if (
        !checkEmail ||
        !checkPassword ||
        !checkDisplayName ||
        !equalPassword
      ) {
        ipcRenderer.invoke("showError", "입력형식을 확인해주세요.");
        return;
      }
      const displayName = event.target[3].value;
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          async (data) => {
            await updateProfile(auth.currentUser, {
              displayName,
            });
            await setDoc(doc(db, "users", data.user.uid), {
              email: data.user.email,
              displayName: data.user.displayName,
              stateMessage: "",
              uid: data.user.uid,
            });
          }
        );
      } catch (error) {
        if (String(error.code) === "auth/email-already-in-use") {
          ipcRenderer.invoke("showError", "동일한 이메일이 존재합니다.");
          return;
        } else {
          ipcRenderer.invoke("showError", "서버 에러입니다.");
          return;
        }
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        ipcRenderer.invoke("showError", "이메일과 패스워드를 확인해주세요.");
        return;
      }
    }
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };
  return (
    <>
      <form
        className={cls(
          " max-w-lg flex flex-col space-y-2 animate-fadeInWithUp"
        )}
        onSubmit={handleSubmit}
      >
        <div>
          <Input type="text" placeholder="이메일" onChange={onChangeEmail} />
          {isRegister ? (
            checkEmail ? (
              <p className="text-[12px] text-center text-green-700">
                올바른 이메일 형식입니다.
              </p>
            ) : (
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
            onChange={onChangePassword}
            ref={passwordRef}
          />
          {isRegister ? (
            checkPassword ? (
              <p className="text-[12px] text-center text-green-700">
                올바른 비밀번호 형식입니다.
              </p>
            ) : (
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
              onChange={onChangePasswordCheck}
            />
            {equalPassword ? (
              <p className="text-[12px] text-center text-green-700">
                비밀번호가 일치합니다.
              </p>
            ) : (
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
              onChange={onChangeDisplayName}
            />
            {checkDisplayName ? (
              <p className="text-[12px] text-center text-green-700">
                올바른 닉네임 형식입니다.
              </p>
            ) : (
              <p className="text-[12px] text-center text-red-500">
                8자 이내의 닉네임을 작성해주세요.
              </p>
            )}
          </div>
        ) : null}
        <Button type="submit" text={isRegister ? "회원가입" : "로그인"} />
      </form>
      <span
        className="hover:scale-105 hover:text-white animate-fadeInWithUp"
        onClick={onRegister}
      >
        {isRegister ? "이미 계정이 있습니다." : "계정이 없으신가요?"}
      </span>
    </>
  );
}
