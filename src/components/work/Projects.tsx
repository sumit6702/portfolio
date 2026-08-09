"use client";

import { useState } from "react";
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

  // Split projects into left and right columns for the asymmetric layout
  const leftColumnProjects = displayedProjects.filter((_, idx) => idx % 2 === 0);
  const rightColumnProjects = displayedProjects.filter((_, idx) => idx % 2 !== 0);

  return (
    <Column fillWidth gap="xl" paddingX="l">
      {showFilters && (
        <div className="filter-tabs-container">
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

      {/* Asymmetric Editorial Grid */}
      <Row fillWidth gap="32" s={{ direction: "column", gap: "24" }} className="editorial-grid-container">
        {/* Left Column */}
        <Column flex={1} gap="32" s={{ gap: "24" }} className="editorial-column editorial-left-column">
          {leftColumnProjects.map((project, index) => {
            // Alternating aspect ratio layouts
            const isTall = index % 2 === 0;
            return (
              <div
                key={project.slug}
                className="editorial-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={`/work/${project.slug}`} className="masonry-item-link">
                  <div className={`masonry-item-container ${isTall ? 'aspect-tall' : 'aspect-wide'}`}>
                    <img
                      src={getImageUrl(project.coverImage)}
                      alt={project.title}
                      className="masonry-item-image"
                      loading="lazy"
                    />
                    <div className="masonry-item-overlay">
                      <div className="masonry-item-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                      <div className="masonry-item-info">
                        <span className="masonry-item-category">{project.category}</span>
                        <h3 className="masonry-item-title">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Column>

        {/* Right Column (Offset downward on desktop) */}
        <Column flex={1} gap="32" s={{ gap: "24" }} className="editorial-column editorial-right-column">
          {rightColumnProjects.map((project, index) => {
            // Alternating aspect ratio layouts (opposite of left column for asymmetry)
            const isTall = index % 2 !== 0;
            return (
              <div
                key={project.slug}
                className="editorial-item"
                style={{ animationDelay: `${(index * 0.1) + 0.15}s` }}
              >
                <Link href={`/work/${project.slug}`} className="masonry-item-link">
                  <div className={`masonry-item-container ${isTall ? 'aspect-tall' : 'aspect-wide'}`}>
                    <img
                      src={getImageUrl(project.coverImage)}
                      alt={project.title}
                      className="masonry-item-image"
                      loading="lazy"
                    />
                    <div className="masonry-item-overlay">
                      <div className="masonry-item-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                      <div className="masonry-item-info">
                        <span className="masonry-item-category">{project.category}</span>
                        <h3 className="masonry-item-title">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Column>
      </Row>
    </Column>
  );
}
