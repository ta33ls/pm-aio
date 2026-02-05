import { toolModules } from "@/lib/tool-modules";
import { ModuleCard } from "@/components";

export default function ToolsPage() {
    return (
        <div className="container-wide py-12">
            {/* Page Header */}
            <div className="mb-12">
                <div className="flex items-center gap-2 text-[#8B8A85] text-sm mb-6">
                    <a href="/" className="hover:text-[#5E5D59] transition-colors">首页</a>
                    <span>/</span>
                    <span className="text-[#5E5D59]">工具中心</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl text-[#141413] mb-4">工具中心</h1>
                <p className="text-[#5E5D59] text-lg max-w-lg">
                    探索为产品经理精心打造的智能工具，每一个都让你事半功倍
                </p>
            </div>

            {/* Search */}
            <div className="mb-10 max-w-md">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="搜索工具..."
                        className="input pl-11"
                    />
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B8A85]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {toolModules.map((module, index) => (
                    <div
                        key={module.id}
                        className="fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <ModuleCard {...module} />
                    </div>
                ))}
            </div>

            {/* Coming Soon */}
            <div className="mt-20 text-center">
                <p className="text-[#8B8A85] text-sm">
                    更多工具正在开发中，敬请期待
                </p>
            </div>
        </div>
    );
}
