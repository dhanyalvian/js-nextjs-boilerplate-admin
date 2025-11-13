//- data/nav.ts

import { 
  ArrowLeftRight,
  CalendarRange,
  CircleCheck,
  CircleQuestionMark,
  ClipboardList,
  CookingPot,
  Copy,
  FileText,
  Frame,
  Globe,
  LayoutDashboard,
  MessageSquareQuote,
  MessagesSquare,
  NotebookPen,
  Package,
  PieChart,
  Puzzle,
  Settings,
  ShoppingCart,
  Tag,
  Truck,
  UserLock,
  UserRound,
  UserSearch,
  UsersRound,
} from "lucide-react";

export const dataNav = {
  user: {
    name: "Dzubair Nazhmi Alfian",
    email: "dzubairalvian@gmail.com",
    avatar: "/images/avatars/41aa42765f552f704c7d64f8b73278474b5c6bf895a15e69ceedf7b0e49541ea.jpeg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Sales",
      url: "#",
      icon: Tag,
      submenus: [
        {
          title: "Orders",
          url: "/sales/orders",
          icon: ShoppingCart,
        },
        {
          title: "Invoices",
          url: "/sales/invoices",
          icon: FileText,
        },
        {
          title: "Shipments",
          url: "/sales/shipments",
          icon: Truck,
        },
        {
          title: "Credit Memos",
          url: "/sales/credit-memos",
          icon: ArrowLeftRight,
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: UserRound,
      submenus: [
        {
          title: "All Customers",
          url: "/customers",
          icon: UsersRound,
        },
        {
          title: "Now Online",
          url: "/customers/now-online",
          icon: CircleCheck,
        },
        {
          title: "Segments",
          url: "/customers/segments",
          icon: Puzzle,
        },
        {
          title: "Groups",
          url: "/customers/groups",
          icon: UserLock,
        },
      ],
    },
    {
      title: "Manages",
      url: "#",
      icon: Copy,
      submenus: [
        {
          title: "Products",
          url: "/manages/products",
          icon: Package,
        },
        {
          title: "Recipes",
          url: "/manages/recipes",
          icon: CookingPot,
        },
        {
          title: "Users",
          url: "/manages/users",
          icon: UserSearch,
        },
      ],
    },
    {
      title: "Socials",
      url: "#",
      icon: Globe,
      submenus: [
        {
          title: "Posts",
          url: "/socials/posts",
          icon: NotebookPen,
        },
        {
          title: "Comments",
          url: "/socials/comments",
          icon: MessagesSquare,
        },
        {
          title: "Quotes",
          url: "/socials/quotes",
          icon: MessageSquareQuote,
        },
      ],
    },
    {
      title: "Calendars",
      url: "/calendars",
      icon: CalendarRange,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: ClipboardList,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  navSecondary: [
    {
      title: "Helps",
      url: "/helps",
      icon: CircleQuestionMark,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}