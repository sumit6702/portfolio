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

      <div className="masonry-grid">
        {displayedProjects.map((project, index) => (
          <div
            key={project.slug}
            className="masonry-item"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <Link href={`/work/${project.slug}`} className="masonry-item-link">
              <div className="masonry-item-container">
                <img
                  src={getImageUrl(project.coverImage)}
                  alt={project.title}
                  className="masonry-item-image"
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="masonry-item-overlay">
                  <div className="masonry-item-info">
                    <span className="masonry-item-category">{project.category}</span>
                    <h3 className="masonry-item-title">{project.title}</h3>
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
