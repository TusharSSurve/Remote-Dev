import { ChildrenProps } from "../../lib/types";

export default function Sidebar({ children }: ChildrenProps) {
  return (
    <div className="sidebar">
      {children}
    </div>
  );
}
