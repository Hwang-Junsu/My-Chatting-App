import {IRootModalProps} from "../types/common";
import {cls} from "../utils/cls";

export default function Modal({isOpen, setIsOpen, children}: IRootModalProps) {
    const onClick = () => {
        setIsOpen((props) => !props);
    };

    return (
        <>
            {isOpen ? (
                <div
                    onClick={onClick}
                    role="presentation"
                    className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        role="presentation"
                        className={cls(
                            `p-5 min-w-[350px] md:w-[500px] lg:w-[900px] h-[500px] bg-white rounded-md overflow-hidden
`
                        )}
                    >
                        {children}
                    </div>
                </div>
            ) : null}
        </>
    );
}
