import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  small?: boolean;
  outline?: boolean;
  icon?: IconType;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  small,
  outline,
  disabled,
  icon: Icon,
  className,
  type = "button",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`
        cursor-pointer
        my-2
        flex
        items-center
        justify-center
        gap-3
        rounded-xl
        px-6 py-3
        transition-all
        duration-300
        ease-in-out
        font-semibold
        text-lg
        ${small ? "w-64" : "w-full"}
        ${outline
          ? "border border-gray-300 text-gray-800 hover:border-black hover:text-black hover:shadow-md"
          : "bg-gray-800 text-white hover:bg-black hover:shadow-lg"}
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        ${className || ""}
      `}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
};

export default Button;
