import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Sumit",
  lastName: "Kumar",
  name: `Sumit Kumar`,
  role: "Graphic Designer / Motion Designer / Video Editor",
  avatar: "/images/avatar.jpg",
  email: "sumitkdesigns@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "Behance",
    icon: "behance",
    link: "https://behance.net/sumitkdesigns",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/sumitk02",
    essential: true,
  },
  {
    name: "Website",
    icon: "globe",
    link: "https://sumitk.in",
    essential: true,
  },
  {
    name: "Resume",
    icon: "document",
    link: "https://drive.google.com/file/d/10UJxkEzk7ExltpHaIeGKDfEChwtBx2rT/view?usp=drive_link",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Call Me",
    icon: "phone",
    link: "tel:+919891997885",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Crafting Cohesive Visual Systems, Motion Graphics & Dynamic Videos</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">UNBLUR Packaging</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/unblur",
  },
  subline: (
    <>
      I'm {person.firstName}, a multidisciplinary {person.role.toLowerCase()} based in Delhi, India. I specialize in branding, layout, packaging design, and high-impact motion graphics & video editing.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Sumit Kumar is a Delhi-based Graphic Designer, Motion Designer, and Video Editor. With a passion for branding, layout, packaging, and digital designs, he creates cohesive visual systems. He helps brands stand out through dynamic content, solid typography, and high-fidelity motion graphics.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "ABA Technologies (Shop4Smile)",
        timeframe: "Mar 2026 - Present",
        role: "Graphic Designer / Video Editor",
        achievements: [
          <>
            Designed e-commerce web banners, promotional graphics, and marketing assets.
          </>,
          <>
            Created social media creatives, print ads, posters, and e-brochures.
          </>,
          <>
            Produced dynamic marketing visuals and product layout systems.
          </>,
        ],
        images: [],
      },
      {
        company: "Zabaan School for Languages",
        timeframe: "Nov 2025 - Jan 2026",
        role: "Graphic Design Intern",
        achievements: [
          <>
            Designed promotional posters and social media creatives.
          </>,
          <>
            Edited, refined, and updated existing design files.
          </>,
          <>
            Prepared internal and external marketing resources.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Graphic Design Softwares",
        description: (
          <>Expert in branding layouts, print dielines, and digital graphics.</>
        ),
        tags: [
          { name: "Photoshop", icon: "figma" },
          { name: "Illustrator", icon: "figma" },
          { name: "InDesign", icon: "figma" },
          { name: "Affinity Suite", icon: "figma" },
          { name: "CorelDRAW", icon: "figma" },
          { name: "Figma", icon: "figma" },
        ],
        images: [],
      },
      {
        title: "Motion & Video Editing",
        description: (
          <>Experienced in high-fidelity 3D modeling, animations, and social ads.</>
        ),
        tags: [
          { name: "Blender 3D", icon: "figma" },
          { name: "After Effects", icon: "figma" },
          { name: "Premiere Pro", icon: "figma" },
          { name: "CapCut", icon: "figma" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and video projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
