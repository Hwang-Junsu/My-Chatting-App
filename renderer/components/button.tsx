import {cls} from "../utils/cls";

interface ButtonProps {
    large?: boolean;
    text: string;
    [key: string]: any;
}

export default function Button({
    large = false,
    onClick,
    text,
    ...rest
}: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            {...rest}
            className={cls(
                "bg-blue-400 w-full tracking-tighter font-bold whitespace-nowrap flex justify-center items-center hover:scale-105 px-4 border border-transparent rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:outline-none",
                large ? "py-3 text-base" : "py-2 text-sm "
            )}
        >
            {text}
        </button>
    );
}
