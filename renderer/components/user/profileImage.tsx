import Image from "next/image";
import basicProfile from "../../public/images/profile.jpg";

export default function ProfileImage() {
  return (
    <div className="relative w-10 h-10 overflow-hidden rounded-full shadow-xl">
      <Image layout="fill" src={basicProfile} />
    </div>
  );
}
