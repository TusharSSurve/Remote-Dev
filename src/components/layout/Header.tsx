import { ChildrenProps } from "../../lib/types";

export default function Header({ children }: ChildrenProps) {
  return (
    <header className="header">
      {children}
    </header>
  );
}
