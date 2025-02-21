// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { FileText, FolderOpen } from "lucide-react";

// const sidebarItems = [
//   {
//     name: "Default Analysis",
//     href: "/dashboard/analyses/default.json",
//     icon: FileText,
//   },
//   {
//     name: "All Analyses",
//     href: "/dashboard/analyses",
//     icon: FolderOpen,
//   }
// ];

// export function AnalysesSidebar() {
//   const pathname = usePathname();

//   return (
//     <div className="pb-12">
//       <div className="space-y-4 py-4">
//         <div className="px-3 py-2">
//           <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
//             Analyses
//           </h2>
//           <div className="space-y-1">
//             {sidebarItems.map((item, index) => (
//               <Link
//                 key={index}
//                 href={item.href}
//                 className={cn(
//                   "flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                   pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
//                 )}
//               >
//                 <item.icon className="mr-2 h-4 w-4" />
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 