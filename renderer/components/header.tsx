import { useRecoilValue } from "recoil";
import userState from "../atoms/user";

export default function Header({ text }: { text: string }) {
  const currentUser = useRecoilValue(userState);
  return (
    <div className="h-16 border-b-2 bg-blue-400 fixed top-0 inset-x-0 p-2">
      <div className="flex items-center h-full justify-between px-5">
        <p className=" tracking-tighter font-bold">{text}</p>
        <p className=" tracking-tighter text-sm">{`${currentUser.displayName}
        님 안녕하세요`}</p>
      </div>
    </div>
  );
}
