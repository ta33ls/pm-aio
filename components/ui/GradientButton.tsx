'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    children: ReactNode;
    icon?: ReactNode;
}

export default function GradientButton({
    variant = 'primary',
    size = 'md',
    href,
    children,
    icon,
    className = '',
    ...props
}: GradientButtonProps) {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-2.5 text-[0.9375rem]',
        lg: 'px-6 py-3 text-base',
    };

    const variantClasses = {
        primary: `
      bg-[#141413] !text-white font-medium
      hover:bg-[#2a2a29] hover:!text-white
    `,
        secondary: `
      bg-transparent !text-[#141413]
      border border-[rgba(20,20,19,0.12)]
      hover:bg-[#F5F4EF] hover:border-[rgba(20,20,19,0.2)] hover:!text-[#141413]
    `,
        ghost: `
      bg-transparent !text-[#5E5D59]
      hover:!text-[#141413] hover:bg-[#F5F4EF]
    `,
    };

    const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-medium
    transition-all duration-200 ease-out
    cursor-pointer border-none outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {icon}
                {children}
            </Link>
        );
    }

    return (
        <button className={baseClasses} {...props}>
            {icon}
            {children}
        </button>
    );
}
