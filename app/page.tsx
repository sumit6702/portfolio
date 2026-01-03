"use client";

import Image from "next/image";
import Link from "next/link";

const HEADER_HEIGHT = 92;
const projects = [
  {
    id: 1,
    title: "TiffinMeal",
    slug: "tiffinmeal",
    img: "https://cdn.dribbble.com/userupload/17595010/file/original-699703237930eefca414bb46a63021fc.png",
    className: "row-span-2",
  },
  {
    id: 2,
    title: "Dantra Packaging",
    slug: "dantra",
    img: "https://seafile.sumitk.in/thumbnail/3cf012e47ba34f97827c/1024/Dantra_Hindi_01.png",
    className: "",
  },
  {
    id: 3,
    title: "geometry Posters",
    slug: "geometry",
    img: "https://seafile.sumitk.in/thumbnail/3cf012e47ba34f97827c/1024/geometry.png",
    className: "col-span-2",
  },
  {
    id: 4,
    title: "unblurred Packaging",
    slug: "unblurred",
    img: "https://seafile.sumitk.in/thumbnail/3cf012e47ba34f97827c/1024/unblur4.png",
    className: "",
  },
  {
    id: 5,
    title: "3d Renders",
    slug: "3d-renders",
    img: "https://seafile.sumitk.in/thumbnail/3cf012e47ba34f97827c/1024/3d_designs.png",
    className: "",
  },
];

export default function Home() {
  return (
    <main
      className={`min-h-[calc(100vh-${HEADER_HEIGHT}px)] grid grid-row-2 lg:grid-cols-3 gap-6 py-6`}
    >
      {/* First Grid */}
      <div className="flex flex-row lg:flex-col h-full gap-6">
        <div className="relative flex-[1] rounded-[2rem] overflow-hidden">
          <Link
            className="group h-full w-full block"
            href={`/projects/${projects[0].slug}`}
          >
            <Image
              src={projects[0].img}
              alt={projects[0].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
            />
          </Link>
        </div>
        <div className="relative flex-[1] rounded-[2rem] overflow-hidden">
          <Link
            className="group h-full w-full block"
            href={`/projects/${projects[1].slug}`}
          >
            <Image
              src={projects[1].img}
              alt={projects[1].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
            />
          </Link>
        </div>
      </div>
      {/* Middle Grid */}
      <div className="relative h-full rounded-[2rem] overflow-hidden">
        <Link
          className="group h-full w-full block"
          href={`/projects/${projects[2].slug}`}
        >
          <Image
            src={projects[2].img}
            alt={projects[2].title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
          />
        </Link>
      </div>
      {/* Last Grid */}
      <div className="  flex flex-row lg:flex-col gap-6 h-full">
        <div className="relative flex-[1] rounded-[2rem] overflow-hidden">
          <Link
            className="group h-full w-full block"
            href={`/projects/${projects[3].slug}`}
          >
            <Image
              src={projects[3].img}
              alt={projects[3].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
            />
          </Link>
        </div>
        <div className="relative flex-[1] rounded-[2rem] overflow-hidden">
          <Link
            className="group h-full w-full block"
            href={`/projects/${projects[4].slug}`}
          >
            <Image
              src={projects[4].img}
              alt={projects[4].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-125 "
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
