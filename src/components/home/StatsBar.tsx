import React from 'react';
import { Layers, Sparkles, Video, Box } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: <Box className="w-5 h-5 text-deepInk" />,
      number: '3D & Motion',
      label: 'Blender & After Effects Specialist',
      bgIcon: 'bg-periwinkle-light dark:bg-periwinkle/20',
      border: 'border-periwinkle-border/60 dark:border-white/10',
    },
    {
      icon: <Video className="w-5 h-5 text-deepInk" />,
      number: 'AI Pipelines',
      label: 'Veo & Kling 2.0 Video Generation',
      bgIcon: 'bg-babyPink-light dark:bg-babyPink/20',
      border: 'border-babyPink-border/60 dark:border-white/10',
    },
    {
      icon: <Layers className="w-5 h-5 text-deepInk" />,
      number: 'Multi-Brand',
      label: 'E-Commerce Banners & Collaterals',
      bgIcon: 'bg-butterYellow-light dark:bg-butterYellow/20',
      border: 'border-butterYellow-border/60 dark:border-white/10',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-deepInk" />,
      number: 'End-to-End',
      label: 'From Dieline Packaging to Renders',
      bgIcon: 'bg-mint-light dark:bg-mint/20',
      border: 'border-mint-border/60 dark:border-white/10',
    },
  ];

  return (
    <section className="py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-5 rounded-[24px] bg-white dark:bg-[#1E1B33] border ${stat.border} shadow-soft-sm card-float card-shimmer flex items-center gap-4 transition-transform duration-200 hover:-translate-y-1.5`}
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bgIcon} flex items-center justify-center shrink-0 shadow-inner transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
              <div>
                <p className="font-serif font-bold text-lg text-deepInk dark:text-white leading-tight">
                  {stat.number}
                </p>
                <p className="text-xs font-semibold text-bodyText-muted dark:text-lavender-light/70 mt-0.5 leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
