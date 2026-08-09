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
  if (activeCategory !== "All") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }

  // Slice by range if specified
  const displayedProjects = range
    ? filtered.slice(range[0] - 1, range[1] ?? filtered.length)
    : filtered;

  return (
    <Column fillWidth gap="xl">
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

      {/* Simple Grid Layout */}
      <div className="simple-project-grid">
        {displayedProjects.map((project, index) => (
          <div
            key={project.slug}
            className="simple-grid-item"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Link href={`/work/${project.slug}`} className="simple-item-link">
              <div className="simple-item-container">
                <img
                  src={getImageUrl(project.coverImage)}
                  alt={project.title}
                  className="simple-item-image"
                  loading="lazy"
                />
                <div className="simple-item-overlay">
                  <div className="simple-item-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <div className="simple-item-info">
                    <span className="simple-item-category">{project.category}</span>
                    <h3 className="simple-item-title">{project.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Column>
  );
}
