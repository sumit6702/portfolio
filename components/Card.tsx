import Image from "next/image";
import Link from "next/link";

import { PiLinkSimpleBold } from "react-icons/pi";

interface CardProps {
  href: string;
  imageSrc: string;
  altText: string;
  title: string;
}

export default function Card({ href, imageSrc, altText, title }: CardProps) {
  return (
    <div className="relative max-w-72 min-h-32 group/cards border hover:border-main_text hover:shadow-lg hover:transition-all hover:transform hover:scale-[1.02] rounded-lg">
      <Link target="_blank" href={href}>
        <div className="">
          <PiLinkSimpleBold className="absolute top-2 right-2 text-lg z-10 text-main_text hidden group-hover/cards:block group-hover/cards:animate-bounce" />
          <Image
            className="rounded-lg"
            src={imageSrc}
            alt={altText}
            width={500}
            height={500}
          />
          <p className="absolute z-10 bottom-0 right-0 left-0 rounded-ee-lg rounded-es-lg bg-gradient-to-t from-main_text/80 via-main_text/40 to-transparent backdrop-blur-md text-center py-2 font-bold dark:text-black">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
}
