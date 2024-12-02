import { IconType } from "react-icons";

type InputProps = {
  type: string;
  placeholder: string;
  icon?: IconType | undefined;
  id: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  large?: boolean | undefined;
  value?: string | undefined;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  icon: Icon,
  id,
  onChange,
  value,
}) => {
  return (
    <div className="flex md:w-[500px] relative w-full items-center justify-center gap-2">
      <input
        type={type}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        value={value}
        className={`border flex-1 rounded-xl py-2 px-4 font-[roboto] font-medium text-sm outline-none`}
      />
      {Icon && (
        <Icon
          className="absolute cursor-pointer top-2 right-2 text-[#9F9FA1]"
          size={20}
        />
      )}
    </div>
  );
};

export default Input;
