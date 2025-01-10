import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-2">
        <div></div>
        <h1 className="text-3xl font-bold text-gray-800">IssueScout</h1>
        <div className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-blue-600 hover:text-blue-800 transition-colors hover:underline"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
      <hr className="my-4 mx-[-28px]" />
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
