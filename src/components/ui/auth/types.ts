export interface InputFieldProps {
  placeholder: string;
  type: "text" | "email" | "password";
  id: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
