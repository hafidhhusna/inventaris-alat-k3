export interface InputFieldProps {
  placeholder: string;
  type: string;
  id: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
