"use client";
import Card from "@/components/Card";
import Image from "next/image";
import data from "@/assets/projects";

export default function Home() {
  return (
    <main>
      <section className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 my-auto p-2 ">
          <h1 className="text-4xl">Hi, I'm Sumit K.</h1>
          <p className="text-lg">
            I a'm a Computer Science Enthusiast and devotee of Lord Cat.
            <br />I am currently working as Job hunter.
          </p>
        </div>
        <div className="lg:col-span-4">
          <Image
            className="m-auto filter dark:invert"
            src="/car_.png"
            alt="cat"
            width={200}
            height={200}
          />
        </div>
      </section>
      {/* <section>
        <h1 className="text-4xl text-center m-6">Lord Cat Gallery</h1>
        <div className="grid lg:grid-cols-3 gap-4"></div>
      </section> */}
      <section className="grid lg:grid-cols-5 gap-4">
        {data.map((project) => (
          <Card
            key={project.id}
            href={project.href}
            imageSrc={project.image}
            altText={project.title}
            title={project.title}
          />
        ))}
      </section>
    </main>
  );
}
