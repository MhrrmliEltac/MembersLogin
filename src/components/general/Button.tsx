import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
  onClick: () => void;
  small?: boolean | undefined;
  addMember?: boolean | undefined;
  userTable?: boolean | undefined;
  disabled?: boolean | undefined;
  outline?: boolean | undefined;
  icon?: IconType | undefined;
  animation?: boolean | undefined;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  small,
  disabled,
  icon: Icon,
  addMember,
  userTable,
  outline,
  animation
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${
          small && "text-[#9F9FA1] md:w-[170px] border border-[#9F9FA1]"
        } ${
          addMember &&
          "md:w-[170px] border border-[#DB2C59] bg-[#DB2C59] text-white"
        } ${
          userTable &&
          "border-2 border-[#C4C4C5] bg-white rounded-md text-[#B6B7B8]"
        } font-[roboto] w-full font-medium text-xs md:text-sm rounded-xl py-2 px-4 flex justify-around items-center gap-3 ${
          outline && "outline-none"
        } ${
          animation &&
          "hover:bg-[#1B065E] hover:text-white transition-all duration-500 hover:border-2 hover:border-[#fff]"
        }`}
      >
        {text} {Icon && <Icon size={16} />}
      </button>
    </div>
  );
};

export default Button;
