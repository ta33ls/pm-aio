'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-250 ease-out
        ${scrolled
                    ? 'py-3 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[rgba(20,20,19,0.06)]'
                    : 'py-5 bg-transparent'
                }
      `}
        >
            <div className="container-wide flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 group"
                >
                    <div className="w-8 h-8 rounded-lg bg-[#141413] flex items-center justify-center text-white font-medium text-sm">
                        PM
                    </div>
                    <span className="font-serif text-lg text-[#141413]">
                        All-in-One
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/tools"
                        className="text-[#5E5D59] hover:text-[#141413] transition-colors duration-200 text-[0.9375rem]"
                    >
                        工具
                    </Link>
                    <Link
                        href="/about"
                        className="text-[#5E5D59] hover:text-[#141413] transition-colors duration-200 text-[0.9375rem]"
                    >
                        关于
                    </Link>
                    <Link
                        href="/settings"
                        className="text-[#5E5D59] hover:text-[#141413] transition-colors duration-200 text-[0.9375rem]"
                    >
                        LLM API
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        href="https://github.com/ta33ls/pm-aio"
                        className="
              px-5 py-2.5 rounded-lg text-[0.9375rem] font-medium
              bg-[#141413] !text-white
              hover:bg-[#2a2a29] hover:!text-white
              transition-colors duration-200
            "
                    >
                        More
                    </Link>
                </div>
            </div>
        </header>
    );
}
