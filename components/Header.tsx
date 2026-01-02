import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { GoArrowUpRight } from "react-icons/go";

export default function Header() {
  return (
    <header className="font-header">
      <div className="flex justify-between my-4">
        <Link href="/">
          <h2 className="text-4xl text-main_text">Sumit K.</h2>
        </Link>
        <nav className="flex gap-6 text-lg my-auto">
          <div>
            <Link href="/">Work</Link>
          </div>
          <div>
            <Link
              href="mailto:sumitkdesigns@gmail.com"
              target="_blank"
              className="group inline-flex items-center gap-x-1"
            >
              <span className="relative">
                Contact
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </span>

              <GoArrowUpRight
                size={22}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
          <div className="m-auto">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
