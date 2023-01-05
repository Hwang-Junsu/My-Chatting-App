import {useState} from "react";
import ListItem from "../../components/chatlist/item";
import UserList from "../../components/people/userList";
import Layout from "../../components/layout";

export default function Chatting() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <Layout text="Chat">
                <div className="p-5">
                    <section>
                        <div className="font-bold text-lg">Chatting</div>
                        <div className=" divide-y-2">
                            {[1, 2, 3, 4, 5].map((el) => (
                                <ListItem key={el} displayName={String(el)} />
                            ))}
                        </div>
                    </section>
                </div>
                <span
                    onClick={() => setIsOpen((props) => !props)}
                    className="w-12 h-12 rounded-full bg-blue-400 absolute flex justify-center items-center bottom-[6rem] right-[1rem] hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </span>
            </Layout>
            {isOpen ? <UserList isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
        </>
    );
}
