//- data/nav.ts

import {
  ChartBar,
  ArrowLeftRight,
  CalendarRange,
  CircleCheck,
  CircleQuestionMark,
  CookingPot,
  Copy,
  FileText,
  Globe,
  LayoutDashboard,
  MessageSquareQuote,
  MessagesSquare,
  NotebookPen,
  Package,
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
    name: "Dhany Noor Alfian",
    email: "dhanyalvian@gmail.com",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJikhQikH8XnIA7RW9BrDglLF-6q_FafJW020U2sjC_rBDkjv96=s96-c",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      demo: true,
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
          url: "/customers/all-customers",
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
      demo: true,
      submenus: [
        {
          title: "Products",
          url: "/manages/products",
          icon: Package,
          demo: true,
        },
        {
          title: "Recipes",
          url: "/manages/recipes",
          icon: CookingPot,
          demo: true,
        },
        {
          title: "Users",
          url: "/manages/users",
          icon: UserSearch,
          demo: true,
        },
      ],
    },
    {
      title: "Socials",
      url: "#",
      icon: Globe,
      demo: true,
      submenus: [
        {
          title: "Posts",
          url: "/socials/posts",
          icon: NotebookPen,
          demo: true,
        },
        {
          title: "Comments",
          url: "/socials/comments",
          icon: MessagesSquare,
          demo: true,
        },
        {
          title: "Quotes",
          url: "/socials/quotes",
          icon: MessageSquareQuote,
          demo: true,
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
      icon: ChartBar,
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