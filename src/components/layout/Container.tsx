import { ChildrenProps } from "../../lib/types";

export default function Container({ children }: ChildrenProps) {
  return <div className="container">
    {children}
  </div>;
}
