import React, { Dispatch, SetStateAction } from "react";

export type TextInputProps = {
  style?: string;
  title?: string;
  type?: string;
  value?: string | number;
  setValue?: (value: string | number) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string | null;
  readOnly?: boolean;
  required?: boolean;
  border?: string;
  color?: string;
  validationMsg?: string;
  autofocus?: boolean;
  className?: string;
};

export type TextAreaProps = {
  style?: string;
  title: string;
  value?: string;
  setValue?: (value: string | number) => void;
  placeholder?: string;
  readOnly?: boolean;
  rows: number;
  border?: string;
};

export type PasswordInputProps = {
  styles?: string;
  title: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  error: boolean;
  required?: boolean;
};

export type PrimaryButtonProps = {
  children: React.ReactNode;
  style?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export type ModalProps = {
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  isActive: string | null;
  setIsActive: Dispatch<SetStateAction<string | null>>;
  id: string;
  resetFunc?: () => void;
  className?: string;
};

export type PermissionModalProps = {
  children: React.ReactNode;
  isActive: string | null;
  setIsActive?: Dispatch<SetStateAction<string | null>>;
  title: string;
  buttons: React.ReactNode;
  resetFunc?: () => void;
};

export type OverviewItemProps = {
  color: string;
  borderColor: string;
  Icon: React.ReactNode;
  title: string;
  digits: number | string;
};

export interface BeforeInstallPromptEvent extends Event {
  platforms: Array<string>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
