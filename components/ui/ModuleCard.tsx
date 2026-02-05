'use client';

import Link from 'next/link';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  comingSoon?: boolean;
}

export default function ModuleCard({
  title,
  description,
  icon,
  href,
  comingSoon = false,
}: ModuleCardProps) {
  const cardClassName = `
    group relative block p-6
    bg-white border border-[rgba(20,20,19,0.06)] rounded-xl
    transition-all duration-250 ease-out
    ${comingSoon
      ? 'opacity-60 cursor-not-allowed'
      : 'hover:border-[rgba(20,20,19,0.12)] hover:shadow-[0_4px_24px_-4px_rgba(20,20,19,0.08)]'
    }
  `;

  const content = (
    <>
      {/* Icon container */}
      <div
        className={`
          w-12 h-12 mb-5 rounded-lg
          flex items-center justify-center
          bg-[#F5F4EF] text-[#5E5D59]
          transition-all duration-250
          ${!comingSoon && 'group-hover:bg-[#EFEEE8] group-hover:text-[#141413]'}
        `}
      >
        {icon}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-serif text-xl text-[#141413] mb-2 flex items-center gap-2">
          {title}
          {comingSoon && (
            <span className="font-sans text-xs px-2 py-0.5 rounded-full bg-[#F5F4EF] text-[#8B8A85]">
              即将推出
            </span>
          )}
        </h3>
        <p className="text-sm text-[#5E5D59] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Arrow indicator */}
      {!comingSoon && (
        <div className="absolute bottom-6 right-6 opacity-0 translate-x-1 transition-all duration-250 group-hover:opacity-100 group-hover:translate-x-0">
          <svg
            className="w-5 h-5 text-[#8B8A85]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
    </>
  );

  if (comingSoon) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link href={href} className={cardClassName}>
      {content}
    </Link>
  );
}

