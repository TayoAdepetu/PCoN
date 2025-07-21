import { SetStateAction } from "react";
import { Dispatch } from "react";

export type ScrollableListProps = {
  initial: string;
  list: {
    id: string;
    name: string;
  }[];
  setActiveNav: Dispatch<SetStateAction<string>>;
};
