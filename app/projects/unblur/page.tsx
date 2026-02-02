"use client";

// app/projects/unblur/page.tsx

export default function UnblurPage() {
  // Replace these with your actual image URLs or paths
  const projectImages = [
    "https://ik.imagekit.io/rqkvfjo2v/Untitled.png?tr=f-auto",
    "https://ik.imagekit.io/rqkvfjo2v/Desktop%20-%201.png?tr=f-auto",
    "https://ik.imagekit.io/rqkvfjo2v/Desktop%20-%202.png?tr=f-auto",
    "https://ik.imagekit.io/rqkvfjo2v/Main.png?tr=f-auto",
    "https://ik.imagekit.io/rqkvfjo2v/Artboard%201gateway.png?tr=f-auto",
  ];

  return (
    <main className="min-h-screen">
      {/* 1. Project Header */}
      <header className="max-w-5xl mx-auto pt-16 pb-8 px-4 text-center">
        <h1 className="text-7xl font-bold mb-4">UNBLUR</h1>
        <p className="text-lg text-gray-600 mb-6">
          Packaging Design / Branding
        </p>
      </header>

      {/* 2. Image Gallery - Behance style (full width/centered) */}
      <section className="max-w-6xl mx-auto px-2 md:px-0">
        {projectImages.map((src, index) => (
          <div key={index} className="w-full">
            <img
              src={src}
              alt={`Unblur project slide ${index + 1}`}
              className="w-full h-auto shadow-sm"
            />
          </div>
        ))}
      </section>

      {/* 3. Project Footer */}
      <footer className="py-20 text-center">
        <p className="text-gray-400">© 2024 Your Portfolio</p>
      </footer>
    </main>
  );
}
