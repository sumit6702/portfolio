'use client';

import React, { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, Check, X, RotateCcw, AlertCircle, Layers } from 'lucide-react';
import { Project, VideoItem } from '@/lib/types';
import { DEFAULT_CATEGORIES } from '@/lib/initial-data';

interface CategoryManagerProps {
  categories: string[];
  projects: Project[];
  videos: VideoItem[];
  onSaveCategories: (updatedCategories: string[], renamedMap?: { from: string; to: string }) => Promise<void>;
}

export default function CategoryManager({
  categories = DEFAULT_CATEGORIES,
  projects = [],
  videos = [],
  onSaveCategories,
}: CategoryManagerProps) {
  const [newCatInput, setNewCatInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Count usage of each category
  const getCategoryUsage = (cat: string) => {
    const projectCount = projects.filter(
      (p) => p.category.toLowerCase().trim() === cat.toLowerCase().trim()
    ).length;
    const videoCount = videos.filter(
      (v) => v.category.toLowerCase().trim() === cat.toLowerCase().trim()
    ).length;
    return { projectCount, videoCount, total: projectCount + videoCount };
  };

  // Add new category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatInput.trim();
    if (!trimmed) return;

    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMsg(`Category "${trimmed}" already exists.`);
      return;
    }

    setErrorMsg('');
    setIsSaving(true);
    try {
      const updated = [...categories, trimmed];
      await onSaveCategories(updated);
      setNewCatInput('');
    } finally {
      setIsSaving(false);
    }
  };

  // Start inline editing
  const startEditing = (index: number, currentVal: string) => {
    setEditingIndex(index);
    setEditingValue(currentVal);
    setErrorMsg('');
  };

  // Cancel inline editing
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingValue('');
    setErrorMsg('');
  };

  // Save inline edit
  const handleSaveEdit = async (index: number) => {
    const oldName = categories[index];
    const newName = editingValue.trim();

    if (!newName) {
      setErrorMsg('Category name cannot be empty.');
      return;
    }

    if (newName !== oldName && categories.some((c) => c.toLowerCase() === newName.toLowerCase())) {
      setErrorMsg(`Category "${newName}" already exists.`);
      return;
    }

    setErrorMsg('');
    setIsSaving(true);
    try {
      const updated = [...categories];
      updated[index] = newName;
      await onSaveCategories(updated, { from: oldName, to: newName });
      setEditingIndex(null);
      setEditingValue('');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async (catToDelete: string) => {
    const usage = getCategoryUsage(catToDelete);
    let confirmMsg = `Are you sure you want to delete the category "${catToDelete}"?`;
    if (usage.total > 0) {
      confirmMsg += `\n\nNotice: ${usage.projectCount} project(s) and ${usage.videoCount} video(s) currently use this category.`;
    }

    if (!confirm(confirmMsg)) return;

    setErrorMsg('');
    setIsSaving(true);
    try {
      const updated = categories.filter((c) => c !== catToDelete);
      await onSaveCategories(updated);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to defaults
  const handleResetDefaults = async () => {
    if (confirm('Reset categories list to defaults (3D Design, Motion Graphics, Packaging, Branding, AI Video)?')) {
      setIsSaving(true);
      try {
        await onSaveCategories(DEFAULT_CATEGORIES);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1B33] rounded-[32px] md:rounded-[40px] border border-lavender/50 dark:border-white/10 p-6 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-periwinkle-light dark:bg-periwinkle/20 text-deepInk dark:text-periwinkle-light text-xs font-bold uppercase tracking-wider border border-periwinkle-border/50 mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Taxonomy & Filter Management</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-deepInk dark:text-white">
              Category Directory & Filters
            </h2>
            <p className="text-xs sm:text-sm text-bodyText-muted dark:text-lavender-light/70 font-semibold mt-1">
              Add, rename, or remove project categories. Changes update live directory filters and project creator options.
            </p>
          </div>

          <button
            onClick={handleResetDefaults}
            disabled={isSaving}
            className="btn-tactile inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-deepInk dark:text-lavender-light text-xs font-bold hover:bg-lavender-light transition-all shadow-sm self-start md:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Add New Category Bar */}
        <form onSubmit={handleAddCategory} className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bodyText-muted dark:text-lavender-light/60" />
            <input
              type="text"
              value={newCatInput}
              onChange={(e) => setNewCatInput(e.target.value)}
              placeholder="e.g. Virtual Reality, Typography, Editorial..."
              disabled={isSaving}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-bg dark:bg-[#161426] border border-lavender/50 dark:border-white/10 text-deepInk dark:text-white text-sm font-semibold focus:outline-none focus:border-deepInk shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving || !newCatInput.trim()}
            className="btn-tactile btn-tactile-dark inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-deepInk dark:bg-white text-white dark:text-deepInk text-sm font-bold shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3.5 rounded-2xl bg-babyPink-light dark:bg-babyPink/20 border border-babyPink-border text-deepInk dark:text-babyPink-light text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Categories Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, idx) => {
          const usage = getCategoryUsage(cat);
          const isEditing = editingIndex === idx;

          return (
            <div
              key={cat}
              className="bg-white dark:bg-[#1E1B33] rounded-3xl border border-lavender/40 dark:border-white/10 p-5 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      autoFocus
                      className="w-full px-3 py-1.5 rounded-xl bg-bg dark:bg-[#161426] border border-deepInk dark:border-lavender text-deepInk dark:text-white text-sm font-bold focus:outline-none"
                    />
                    <button
                      onClick={() => handleSaveEdit(idx)}
                      disabled={isSaving}
                      className="p-1.5 rounded-xl bg-mint text-deepInk hover:scale-105 active:scale-95 transition-all shadow-sm"
                      title="Save category rename"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={isSaving}
                      className="p-1.5 rounded-xl bg-babyPink-light text-deepInk hover:bg-babyPink transition-colors"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-lavender-light dark:bg-lavender/20 text-deepInk dark:text-lavender-light flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-base text-deepInk dark:text-white">
                        {cat}
                      </h3>
                      <p className="text-[11px] font-semibold text-bodyText-muted dark:text-lavender-light/60">
                        {usage.total === 0 ? 'No active items' : `${usage.projectCount} project(s), ${usage.videoCount} video(s)`}
                      </p>
                    </div>
                  </div>
                )}

                {!isEditing && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => startEditing(idx, cat)}
                      disabled={isSaving}
                      className="p-2 rounded-xl bg-bg dark:bg-[#161426] border border-lavender/40 dark:border-white/10 text-bodyText-muted dark:text-lavender-light hover:text-deepInk hover:bg-lavender-light transition-colors"
                      title="Rename Category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      disabled={isSaving}
                      className="p-2 rounded-xl bg-babyPink-light dark:bg-babyPink/20 text-deepInk dark:text-babyPink-light hover:bg-babyPink transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Status pill footer */}
              <div className="mt-4 pt-3 border-t border-lavender/20 dark:border-white/5 flex items-center justify-between text-[11px] font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-mint-light dark:bg-mint/15 text-deepInk dark:text-mint-light border border-mint-border/40">
                  Active Filter Pill
                </span>
                <span className="text-bodyText-muted dark:text-lavender-light/60 flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {usage.total} showcase items
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
