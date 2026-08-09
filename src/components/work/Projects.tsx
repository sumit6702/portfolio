"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ToggleButton, Column, Row } from "@once-ui-system/core";
import { projectsList, getImageUrl } from "@/resources/projects";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  showFilters?: boolean;
}

export function Projects({ range, exclude, showFilters = false }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get unique categories from the projects list
  const categories = ["All", ...Array.from(new Set(projectsList.map((p) => p.category)))];

  // Exclude projects by slug
  let filtered = projectsList;
  if (exclude && exclude.length > 0) {
    filtered = filtered.filter((p) => !exclude.includes(p.slug));
  }

  // Filter projects by active category tab
  if (activeCategory !== "All") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }

  // Slice by range if specified
  const displayedProjects = range
    ? filtered.slice(range[0] - 1, range[1] ?? filtered.length)
    : filtered;

  // Scroll function for left/right navigation
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // Calculate scroll offset based on viewport width
      const cardWidth = window.innerWidth * 0.6 + 32; // 60vw width + 32px gap
      const offset = direction === "left" ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <Column fillWidth gap="xl" horizontal="center">
      {showFilters && (
        <div className="filter-tabs-container" style={{ padding: "0 24px" }}>
          {categories.map((category) => (
            <ToggleButton
              key={category}
              label={category}
              selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      )}

      {/* Center Carousel Track */}
      <div className="project-carousel-container" ref={carouselRef}>
        {displayedProjects.map((project, index) => (
          <div key={project.slug} className="card-3d-wrapper">
            <div className="card-3d-inner" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-image-wrap">
                <img
                  src={getImageUrl(project.coverImage)}
                  alt={project.title}
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
              <div className="card-overlay-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                  <span className="card-tag">{project.category}</span>
                  <div className="card-spin-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                  <h3 className="card-spin-title">{project.title}</h3>
                  <p className="card-spin-desc">{project.description}</p>
                  <Link href={`/work/${project.slug}`} className="card-spin-btn">
                    View Project Case Study
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrow buttons */}
      {displayedProjects.length > 1 && (
        <Row gap="16" horizontal="center" marginTop="16" marginBottom="l">
          <button className="carousel-nav-btn" onClick={() => scroll("left")} aria-label="Scroll left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button className="carousel-nav-btn" onClick={() => scroll("right")} aria-label="Scroll right">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </Row>
      )}
    </Column>
  );
}
