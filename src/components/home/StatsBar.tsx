import React from 'react';
import { Layers, Sparkles, Video, Box } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: <Box className="w-6 h-6 text-primary" />,
      number: '3D & Motion',
      label: 'Blender & After Effects Specialist',
      bg: 'bg-white',
      border: 'border-mint',
    },
    {
      icon: <Video className="w-6 h-6 text-coralPeach" />,
      number: 'AI Pipelines',
      label: 'Veo & Kling 2.0 Video Generation',
      bg: 'bg-white',
      border: 'border-coralPeach-light',
    },
    {
      icon: <Layers className="w-6 h-6 text-deepTeal" />,
      number: 'Multi-Brand',
      label: 'E-Commerce Banners & Collaterals',
      bg: 'bg-white',
      border: 'border-butterYellow',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      number: 'End-to-End',
      label: 'From Dieline Packaging to Renders',
      bg: 'bg-white',
      border: 'border-mint',
    },
  ];

  return (
    <section className="py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl ${stat.bg} border-2 ${stat.border} shadow-[0_4px_0_rgba(15,76,74,0.06),0_10px_20px_rgba(15,76,74,0.04)] flex items-center gap-4 transition-transform duration-200 hover:-translate-y-1`}
            >
              <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center shrink-0 shadow-inner">
                {stat.icon}
              </div>
              <div>
                <p className="font-display font-bold text-lg text-deepTeal">
                  {stat.number}
                </p>
                <p className="text-xs font-semibold text-deepTeal-muted leading-tight">
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
