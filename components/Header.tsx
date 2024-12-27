import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between my-4">
        <Link href="/">
          <h2 className="text-2xl font-bold text-main_text">Sumit K.</h2>
        </Link>
        <nav className="flex gap-4 my-auto">
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link
              target="_blank"
              className="underline text-main_text"
              href="https://drive.google.com/file/d/10UJxkEzk7ExltpHaIeGKDfEChwtBx2rT/view?usp=sharing"
            >
              Resume
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
