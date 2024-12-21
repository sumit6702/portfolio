import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaGithubAlt } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-between my-4 text-lg">
        <div>
          <p>© Praise the lord Cat.</p>
        </div>
        <div className="flex gap-1">
          <Link
            href="https://www.linkedin.com/in/sumitk6702/"
            className="group/link p-1"
            target="_blank"
          >
            <FaLinkedinIn className="group-hover/link:animate-bounce group-hover/link:transition-all" />
          </Link>
          <Link
            href="https://www.github.com/sumit6702"
            className="group/link p-1"
            target="_blank"
          >
            <FaGithubAlt className="group-hover/link:animate-bounce group-hover/link:transition-all" />
          </Link>
          <Link
            href="mailto:sumitcar98@gmail.com"
            className="group/link p-1"
            target="_blank"
          >
            <MdOutlineEmail className="group-hover/link:animate-bounce group-hover/link:transition-all" />
          </Link>
          <Link
            href="https://www.instagram.com/sumitk0o0/"
            className="group/link p-1"
            target="_blank"
          >
            <FaInstagram className="group-hover/link:animate-bounce group-hover/link:transition-all" />
          </Link>
          <Link
            href="https://x.com/sumitk0o0"
            className="group/link p-1"
            target="_blank"
          >
            <RiTwitterXFill className="group-hover/link:animate-bounce group-hover/link:transition-all" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
