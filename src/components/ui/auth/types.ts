export interface InputFieldProps{
  type : string;
  id : string;
  placeholder : string;
  value : string;
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
