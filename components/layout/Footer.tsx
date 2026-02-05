import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-16 border-t border-[rgba(20,20,19,0.06)]">
            <div className="container-wide">
                <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                    {/* Brand */}
                    <div className="max-w-xs">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[#141413] flex items-center justify-center text-white font-medium text-sm">
                                PM
                            </div>
                            <span className="font-serif text-lg text-[#141413]">
                                All-in-One
                            </span>
                        </div>
                        <p className="text-[#5E5D59] text-sm leading-relaxed">
                            为产品经理打造的智能工具集，让创意自如流动。
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-16">
                        <div>
                            <h4 className="font-sans text-sm font-medium text-[#141413] mb-4">产品</h4>
                            <nav className="flex flex-col gap-3">
                                <Link
                                    href="/tools"
                                    className="text-[#5E5D59] hover:text-[#141413] text-sm transition-colors"
                                >
                                    工具中心
                                </Link>
                                <Link
                                    href="#features"
                                    className="text-[#5E5D59] hover:text-[#141413] text-sm transition-colors"
                                >
                                    功能介绍
                                </Link>
                            </nav>
                        </div>
                        <div>
                            <h4 className="font-sans text-sm font-medium text-[#141413] mb-4">资源</h4>
                            <nav className="flex flex-col gap-3">
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#5E5D59] hover:text-[#141413] text-sm transition-colors"
                                >
                                    GitHub
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-[rgba(20,20,19,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#8B8A85] text-sm">
                        © {currentYear} ta3ls
                    </p>
                    <p className="text-[#8B8A85] text-sm">
                        build for product manager
                    </p>
                </div>
            </div>
        </footer>
    );
}
