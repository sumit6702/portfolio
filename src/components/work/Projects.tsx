"use client";

import { useState } from "react";
import Link from "next/link";
import { ToggleButton, Column } from "@once-ui-system/core";
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
  const isFiltered = activeCategory !== "All";
  if (isFiltered) {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }

  // Slice by range if specified (e.g. for homepage slots)
  const displayedProjects = range
    ? filtered.slice(range[0] - 1, range[1] ?? filtered.length)
    : filtered;

  // We only display the custom Bento layout if we are not filtering and displaying all 5 projects
  const useBentoLayout = !isFiltered && displayedProjects.length >= 5;

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

      {/* Bento Box Grid */}
      <div className={useBentoLayout ? "bento-grid" : "bento-grid-simple"}>
        {displayedProjects.map((project, index) => {
          const itemClass = useBentoLayout ? `bento-${project.slug}` : "";
          return (
            <div
              key={project.slug}
              className={`bento-item ${itemClass}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <Link href={`/work/${project.slug}`} className="bento-item-link">
                <div className="bento-item-container">
                  <img
                    src={getImageUrl(project.coverImage)}
                    alt={project.title}
                    className="bento-item-image"
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

        {/* Call to Action Bento Card (renders only in full Bento Layout to fill the final grid cell) */}
        {useBentoLayout && (
          <div
            className="bento-item bento-cta"
            style={{ animationDelay: `${displayedProjects.length * 0.08}s` }}
          >
            <Link href="/about" className="bento-item-link">
              <div className="bento-cta-card">
                <div className="bento-cta-status">
                  <div className="bento-cta-dot"></div>
                  Available for Freelance
                </div>
                <div>
                  <h3 className="bento-cta-title">Let's collaborate on your next design project!</h3>
                  <span className="masonry-item-category">Get In Touch</span>
                </div>
                <div className="bento-cta-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </Column>
  );
}
