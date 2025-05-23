export interface InputFieldProps {
  placeholder: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SocialButtonProps {
  icon: string;
  onClick?: () => void;
}
