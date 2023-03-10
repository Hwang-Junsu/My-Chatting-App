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
        ipcRenderer.invoke("showError", "??????????????? ??????????????????.");
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
          ipcRenderer.invoke("showError", "????????? ???????????? ???????????????.");
          return;
        } else {
          ipcRenderer.invoke("showError", "?????? ???????????????.");
          return;
        }
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        ipcRenderer.invoke("showError", "???????????? ??????????????? ??????????????????.");
        return;
      }
    }
    router.push("/");
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
          <Input type="text" placeholder="?????????" onChange={onChangeEmail} />
          {isRegister ? (
            checkEmail ? (
              <p className="text-[12px] text-center text-green-700">
                ????????? ????????? ???????????????.
              </p>
            ) : (
              <p className="text-[12px] text-center text-red-500">
                ????????? ????????? ???????????? ????????????.
              </p>
            )
          ) : null}
        </div>
        <div>
          <Input
            type="password"
            placeholder="????????????"
            onChange={onChangePassword}
            ref={passwordRef}
          />
          {isRegister ? (
            checkPassword ? (
              <p className="text-[12px] text-center text-green-700">
                ????????? ???????????? ???????????????.
              </p>
            ) : (
              <p className="text-[12px] text-center text-red-500">
                8?????? ????????? ??????????????? ??????????????????.
              </p>
            )
          ) : null}
        </div>
        {isRegister ? (
          <div>
            <Input
              type="password"
              placeholder="???????????? ??????"
              onChange={onChangePasswordCheck}
            />
            {equalPassword ? (
              <p className="text-[12px] text-center text-green-700">
                ??????????????? ???????????????.
              </p>
            ) : (
              <p className="text-[12px] text-center text-red-500">
                ??????????????? ???????????? ????????????.
              </p>
            )}
          </div>
        ) : null}
        {isRegister ? (
          <div>
            <Input
              type="text"
              placeholder="?????????(8??? ??????)"
              maxLength={8}
              onChange={onChangeDisplayName}
            />
            {checkDisplayName ? (
              <p className="text-[12px] text-center text-green-700">
                ????????? ????????? ???????????????.
              </p>
            ) : (
              <p className="text-[12px] text-center text-red-500">
                8??? ????????? ???????????? ??????????????????.
              </p>
            )}
          </div>
        ) : null}
        <Button type="submit" text={isRegister ? "????????????" : "?????????"} />
      </form>
      <span
        className="hover:scale-105 hover:text-white animate-fadeInWithUp"
        onClick={onRegister}
      >
        {isRegister ? "?????? ????????? ????????????." : "????????? ????????????????"}
      </span>
    </>
  );
}
