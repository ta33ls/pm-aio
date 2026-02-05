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
