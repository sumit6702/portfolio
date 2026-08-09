export interface ProjectImage {
  cloudinaryId: string;
  localFallback: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  description: string;
  behanceLink?: string;
  coverImage: ProjectImage;
  images: ProjectImage[];
}

export const projectsList: Project[] = [
  {
    slug: "unblur",
    title: "UNBLUR Packaging & Branding",
    category: "Branding",
    publishedAt: "2026-03-01",
    description: "UNBLUR is a premium product packaging and identity design project showcasing custom illustrations, structural dieline development, and cohesive branding layouts. Key features include premium glass bottle labels and box mockups, color palette systems, and print-ready structural dielines.",
    behanceLink: "https://www.behance.net/gallery/242975295/UNBLUR",
    coverImage: {
      cloudinaryId: "portfolio/unblur/cover",
      localFallback: "/images/projects/unblur.png",
    },
    images: [
      {
        cloudinaryId: "portfolio/unblur/cover",
        localFallback: "/images/projects/unblur.png",
      }
    ],
  },
  {
    slug: "crunchy-piper",
    title: "Crunchy Piper Soft Drink Packaging",
    category: "Packaging",
    publishedAt: "2026-02-15",
    description: "Vibrant soft drink packaging design for Crunchy Piper, featuring bold illustrative elements and clean layouts for a refreshing brand presence.",
    behanceLink: "https://www.behance.net/gallery/242951051/Crunchy-Piper",
    coverImage: {
      cloudinaryId: "portfolio/crunchy-piper/cover",
      localFallback: "/images/projects/crunchy-piper.png",
    },
    images: [
      {
        cloudinaryId: "portfolio/crunchy-piper/cover",
        localFallback: "/images/projects/crunchy-piper.png",
      }
    ],
  },
  {
    slug: "woodbone",
    title: "Woodbone Craft Identity",
    category: "Branding",
    publishedAt: "2026-01-20",
    description: "Brand identity, logo design, and craft packaging style for Woodbone, emphasizing natural materials and hand-crafted typography.",
    behanceLink: "https://www.behance.net/gallery/242981577/Woodbone-Craft-Identity",
    coverImage: {
      cloudinaryId: "portfolio/woodbone/cover",
      localFallback: "/images/projects/woodbone.jpg",
    },
    images: [
      {
        cloudinaryId: "portfolio/woodbone/cover",
        localFallback: "/images/projects/woodbone.jpg",
      }
    ],
  },
  {
    slug: "instagram-posts",
    title: "Instagram Post Templates",
    category: "Social Media",
    publishedAt: "2025-12-05",
    description: "Clean, consistent, and engaging Instagram post templates designed for social feeds to boost brand engagement and conversion metrics.",
    behanceLink: "https://www.behance.net/gallery/252233633/Instagram-Posts",
    coverImage: {
      cloudinaryId: "portfolio/instagram-posts/cover",
      localFallback: "/images/projects/instagram-posts.jpg",
    },
    images: [
      {
        cloudinaryId: "portfolio/instagram-posts/cover",
        localFallback: "/images/projects/instagram-posts.jpg",
      }
    ],
  },
  {
    slug: "website-banners",
    title: "E-Commerce Website Banners",
    category: "Web Design",
    publishedAt: "2025-11-15",
    description: "High-converting web banner layouts, digital advertising assets, and promotional creatives optimized for e-commerce platforms.",
    behanceLink: "https://www.behance.net/gallery/252232939/Website-Banners",
    coverImage: {
      cloudinaryId: "portfolio/website-banners/cover",
      localFallback: "/images/projects/website-banners.jpg",
    },
    images: [
      {
        cloudinaryId: "portfolio/website-banners/cover",
        localFallback: "/images/projects/website-banners.jpg",
      }
    ],
  }
];

export function getImageUrl(imageObj: ProjectImage) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName && cloudName !== "your_cloud_name" && cloudName !== "") {
    return `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${imageObj.cloudinaryId}`;
  }
  return imageObj.localFallback;
}
