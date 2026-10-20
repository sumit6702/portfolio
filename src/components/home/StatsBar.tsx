import React from 'react';
import { Layers, Sparkles, Video, Box } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: <Box className="w-6 h-6 text-primary" />,
      number: '3D & Motion',
      label: 'Blender & After Effects Specialist',
      border: 'border-mint dark:border-[#1A4543]',
    },
    {
      icon: <Video className="w-6 h-6 text-coralPeach" />,
      number: 'AI Pipelines',
      label: 'Veo & Kling 2.0 Video Generation',
      border: 'border-coralPeach-light dark:border-[#42211C]',
    },
    {
      icon: <Layers className="w-6 h-6 text-deepTeal dark:text-primary-light" />,
      number: 'Multi-Brand',
      label: 'E-Commerce Banners & Collaterals',
      border: 'border-butterYellow dark:border-[#382F13]',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      number: 'End-to-End',
      label: 'From Dieline Packaging to Renders',
      border: 'border-mint dark:border-[#1A4543]',
    },
  ];

  return (
    <section className="py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl bg-white dark:bg-[#0D2625] border-2 ${stat.border} shadow-[0_4px_0_rgba(15,76,74,0.06),0_10px_20px_rgba(15,76,74,0.04)] dark:shadow-[0_4px_0_#071918,0_10px_20px_rgba(0,0,0,0.3)] flex items-center gap-4 transition-transform duration-200 hover:-translate-y-1`}
            >
              <div className="w-12 h-12 rounded-2xl bg-cream dark:bg-[#071918] flex items-center justify-center shrink-0 shadow-inner">
                {stat.icon}
              </div>
              <div>
                <p className="font-display font-bold text-lg text-deepTeal dark:text-white">
                  {stat.number}
                </p>
                <p className="text-xs font-semibold text-deepTeal-muted dark:text-mint/70 leading-tight">
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
