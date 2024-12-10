import {PropsWithChildren, MouseEvent} from "react";

interface ButtonProps extends PropsWithChildren {
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean;
}

const Button = ({ children, onClick = () => () => {}, type = "button", disabled = false }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
