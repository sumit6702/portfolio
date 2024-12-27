import Image from "next/image";
import Link from "next/link";

interface CardProps {
  href: string;
  imageSrc: string;
  altText: string;
  title: string;
}

export default function Card({ href, imageSrc, altText, title }: CardProps) {
  return (
    <div className="max-w-72 min-h-32 group/cards border hover:border-main_text hover:shadow-lg hover:transition-all hover:transform hover:scale-[1.02] rounded-lg">
      <Link target="_blank" href={href}>
        <div className="">
          <Image
            className="rounded-lg"
            src={imageSrc}
            alt={altText}
            width={500}
            height={500}
          />
          <p className="text-center py-2 font-bold">{title}</p>
        </div>
      </Link>
    </div>
  );
}
