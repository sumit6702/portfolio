import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 m-auto p-2">
          <h1 className="text-6xl">Hi, I'm Sumit K.</h1>
          <p className="text-xl lg:w-[70%]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
            quod provident corporis dolores sapiente? Rem neque fugiat veritatis
            dolores laboriosam!
          </p>
        </div>
        <div className="lg:col-span-4">
          <Image
            className="m-auto"
            src="/car_.png"
            alt="cat"
            width={300}
            height={300}
          />
        </div>
      </section>
      <section className="my-6 py-3 border-t border-b">
        <h1 className="text-4xl text-center underline mb-4">Today's Quote</h1>
        <p className="text-4xl text-center">
          "You don't own the cat, Cat owns you. Get your knee and give lord Cat
          Catnip"
        </p>
      </section>
      {/* <section>
        <h1 className="text-4xl text-center m-6">Lord Cat Gallery</h1>
        <div className="grid lg:grid-cols-3 gap-4"></div>
      </section> */}
    </main>
  );
}
