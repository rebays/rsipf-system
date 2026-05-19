import { Bell } from "lucide-react";
import { Icon } from "../ui/Icon";
import { SmallShield } from "../brand/Shield";

type TopNavProps = {
  org?: string;
  initials?: string;
};

export function TopNav({
  org = "Police Service · Recruits",
  initials = "JO",
}: TopNavProps) {
  return (
    <div className="nav-header">
      <div className="nav-header__left">
        <div className="nav-header__logo">
          <SmallShield />
          {org}
        </div>
      </div>
      <div className="nav-header__right">
        <Icon as={Bell} width={18} height={18} style={{ opacity: 0.8 }} />
        <div className="nav-header__avatar">{initials}</div>
      </div>
    </div>
  );
}
