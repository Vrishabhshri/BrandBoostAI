import { BarChart2, Home, PlusCircle, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Add Competitor",
    href: "/dashboard/add-competitor",
    icon: PlusCircle,
  },
  {
    name: "Analyses",
    href: "/dashboard/analyses",
    icon: BarChart2,
  },
  {
    name: "Default Analysis",
    href: "/dashboard/analyses/default.json",
    icon: FileText,
  }
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {navigation.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent" : "transparent"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
} 