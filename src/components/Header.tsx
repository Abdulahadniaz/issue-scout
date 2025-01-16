import Link from "next/link";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@/theme/ThemeContext";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-2 px-4 sm:px-0 gap-3 sm:gap-0">
        <div></div>
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            IssueScout
          </h1>
        </Link>
        <div className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm sm:text-base text-blue-600 hover:text-blue-800 transition-colors hover:underline"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
      <hr className="my-4 mx-[-28px]" />
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
}

const links = [
  {
    text: "all",
    href: "/all-issues",
  },
  {
    text: "repos",
    href: "/",
  },
  {
    text: "orgs",
    href: "/org-repos",
  },
];
