import Link from "next/link";
import {
  TbBrandInstagram,
  TbBrandBehance,
  TbBrandLinkedin,
} from "react-icons/tb";
import { GoArrowUpRight } from "react-icons/go";

export default function Footer() {
  return (
    <footer>
      <div className="bg-gray-50 dark:bg-[#0C0C0C] rounded-[2rem] flex justify-between my-4 text-lg px-3 lg:px-6 py-1">
        <Link
          href="https://drive.google.com/file/d/10UJxkEzk7ExltpHaIeGKDfEChwtBx2rT/view?usp=drive_link"
          target="_blank"
          className="group inline-flex items-center gap-x-1 uppercase font-bold"
        >
          <span className="relative">
            Resume
            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
          </span>

          <GoArrowUpRight
            size={22}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
        <div className="flex gap-4 justify-end">
          <Link
            href="https://www.instagram.com/sumitk.designs/"
            className="group p-1 uppercase"
            target="_blank"
          >
            <TbBrandInstagram
              size={28}
              className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.2]"
            />
          </Link>
          <Link
            href="https://www.behance.net/sumitkdesigns"
            className="group p-1 uppercase"
            target="_blank"
          >
            <TbBrandBehance
              size={28}
              className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.2]"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/sumitk02/"
            className="group p-1 uppercase"
            target="_blank"
          >
            <TbBrandLinkedin
              size={28}
              className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.2]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
