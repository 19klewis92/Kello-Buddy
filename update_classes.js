const fs = require('fs');

let content = fs.readFileSync('src/components/ProblemSection.tsx', 'utf-8');

// Replace problem cards
content = content.replace(
  'p-3.5 sm:p-4 lg:p-5 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm relative overflow-hidden border border-kello-coral/30 hover:-translate-y-1 transition-transform"',
  'p-4 sm:p-5 lg:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm relative overflow-hidden border border-kello-coral/30 hover:-translate-y-1 transition-transform"'
);
content = content.replace(
  'font-extrabold text-kello-coral tracking-tight text-xs sm:text-sm mb-1.5 sm:mb-2 block relative z-10"',
  'font-extrabold text-kello-coral tracking-tight text-sm sm:text-base mb-2 sm:mb-2.5 block relative z-10"'
);
content = content.replace(
  'text-slate-600 font-semibold italic text-sm sm:text-base md:text-lg leading-relaxed break-keep relative z-10"',
  'text-slate-600 font-semibold italic text-[15px] sm:text-lg md:text-xl leading-relaxed break-keep relative z-10"'
);

content = content.replace(
  'p-3.5 sm:p-4 lg:p-5 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm relative overflow-hidden border border-primary/30 hover:-translate-y-1 transition-transform"',
  'p-4 sm:p-5 lg:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm relative overflow-hidden border border-primary/30 hover:-translate-y-1 transition-transform"'
);
content = content.replace(
  'font-extrabold text-primary tracking-tight text-xs sm:text-sm mb-1.5 sm:mb-2 block relative z-10"',
  'font-extrabold text-primary tracking-tight text-sm sm:text-base mb-2 sm:mb-2.5 block relative z-10"'
);
content = content.replace(
  'text-slate-600 font-semibold italic text-sm sm:text-base md:text-lg leading-relaxed break-keep relative z-10"',
  'text-slate-600 font-semibold italic text-[15px] sm:text-lg md:text-xl leading-relaxed break-keep relative z-10"'
);

content = content.replace(
  'p-3.5 sm:p-4 lg:p-5 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm relative overflow-hidden border border-kello-gold/30 hover:-translate-y-1 transition-transform"',
  'p-4 sm:p-5 lg:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm relative overflow-hidden border border-kello-gold/30 hover:-translate-y-1 transition-transform"'
);
content = content.replace(
  'font-extrabold text-kello-gold tracking-tight text-xs sm:text-sm mb-1.5 sm:mb-2 block relative z-10"',
  'font-extrabold text-kello-gold tracking-tight text-sm sm:text-base mb-2 sm:mb-2.5 block relative z-10"'
);
content = content.replace(
  'text-slate-600 font-semibold italic text-sm sm:text-base md:text-lg leading-relaxed break-keep relative z-10"',
  'text-slate-600 font-semibold italic text-[15px] sm:text-lg md:text-xl leading-relaxed break-keep relative z-10"'
);

// Replace Solution cards
// 1
content = content.replace(
  'p-3.5 sm:p-4 lg:p-5 rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-kello-coral/20',
  'p-4 sm:p-5 lg:p-6 rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-kello-coral/20'
);
content = content.replace('gap-2 md:gap-3 mb-3 mt-1', 'gap-3 md:gap-4 mb-4 mt-1');
content = content.replace('w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-kello-coral/10', 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-kello-coral/10');
content = content.replace('Globe className="w-4 h-4 sm:w-5 sm:h-5"', 'Globe className="w-5 h-5 sm:w-6 sm:h-6"');
content = content.replace(
  'text-[15px] sm:text-base lg:text-lg font-extrabold text-foreground',
  'text-base sm:text-lg lg:text-xl font-extrabold text-foreground'
);
content = content.replace(
  'text-slate-600 font-semibold text-[13px] sm:text-sm lg:text-[15px] leading-relaxed break-keep"',
  'text-slate-600 font-semibold text-sm sm:text-[15px] lg:text-base leading-relaxed break-keep"'
);

// 2
content = content.replace(
  'p-3.5 sm:p-4 lg:p-5 rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-primary/20',
  'p-4 sm:p-5 lg:p-6 rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-primary/20'
);
content = content.replace('gap-4 mb-4', 'gap-5 mb-5');
content = content.replace('gap-2 mt-1', 'gap-3 mt-1');
content = content.replace('gap-2.5"', 'gap-3"');
content = content.replace('w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10', 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10');
content = content.replace('CreditCard className="w-4 h-4 sm:w-5 sm:h-5"', 'CreditCard className="w-5 h-5 sm:w-6 sm:h-6"');
content = content.replace(
  'text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-0.5',
  'text-[11px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1'
);
content = content.replace(
  'text-[15px] sm:text-base lg:text-lg font-extrabold text-foreground',
  'text-base sm:text-lg lg:text-xl font-extrabold text-foreground'
);
content = content.replace(
  'text-rose-500 font-bold text-sm sm:text-[15px] lg:text-base mt-0.5',
  'text-rose-500 font-bold text-[15px] sm:text-base lg:text-lg mt-0.5'
);

content = content.replace(
  'space-y-2.5 sm:space-y-3 bg-slate-50 p-3 sm:p-3.5 lg:p-4 rounded-[1.25rem]',
  'space-y-2.5 sm:space-y-3 bg-slate-50 p-4 sm:p-4 lg:p-5 rounded-[1.25rem]'
);
content = content.replace(
  'font-medium text-[13px] sm:text-sm lg:text-[15px] leading-relaxed break-keep"',
  'font-medium text-sm sm:text-[15px] lg:text-base leading-relaxed break-keep"'
);
content = content.replace(
  'font-semibold text-[13px] sm:text-sm lg:text-[15px] leading-relaxed break-keep"',
  'font-semibold text-sm sm:text-[15px] lg:text-base leading-relaxed break-keep"'
);

// 3
content = content.replace(
  'mt-5 sm:mt-6 w-full bg-gradient-to-r from-primary via-primary to-rose-400 p-4 sm:p-5 lg:p-6',
  'mt-6 sm:mt-8 w-full bg-gradient-to-r from-primary via-primary to-rose-400 p-5 sm:p-6 lg:p-8'
);
content = content.replace(
  'text-[15px] sm:text-base lg:text-xl font-extrabold mb-4 sm:mb-5',
  'text-base sm:text-lg lg:text-2xl font-extrabold mb-5 sm:mb-6'
);
content = content.replace('space-y-2.5 md:space-y-3"', 'space-y-3 md:space-y-4"');
content = content.replace(
  'text-white/90 font-semibold text-[13px] sm:text-sm lg:text-[15px]',
  'text-white/90 font-semibold text-sm sm:text-[15px] lg:text-base'
);
content = content.replace(
  'text-white font-extrabold text-sm sm:text-[15px] lg:text-base',
  'text-white font-extrabold text-[15px] sm:text-base lg:text-lg'
);
content = content.replace('pb-2.5 sm:pb-4"', 'pb-3 sm:pb-5"');
content = content.replace(
  'text-sm sm:text-[15px] md:text-base font-bold px-5 sm:px-6 py-2.5 sm:py-3',
  'text-[15px] sm:text-base md:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4'
);

fs.writeFileSync('src/components/ProblemSection.tsx', content);

console.log("Replaced successfully!");
