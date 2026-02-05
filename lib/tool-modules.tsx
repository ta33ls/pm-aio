import ModuleCard from "@/components/ui/ModuleCard";
import GradientButton from "@/components/ui/GradientButton";

// Tool modules configuration
// 工具模块配置 - 每个模块包含必要的元信息

export interface ToolModule {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    comingSoon?: boolean;
    category?: 'document' | 'analysis' | 'visualization' | 'collaboration';
}

export const toolModules: ToolModule[] = [
    {
        id: 'flowchart',
        title: "AI 图表生成",
        description: "用自然语言描述，自动生成流程图、架构图、组织架构等专业图表",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        ),
        href: "/tools/flowchart",
        category: 'visualization',
    },
    {
        id: 'prd-generator',
        title: "PRD 生成器",
        description: "Anything To PRD，不管是文档、代码还是设计稿",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        href: "/tools/prd-generator",
        category: 'document',
        comingSoon: true,
    },
    {
        id: 'dashboard',
        title: "行业洞察",
        description: "智能收集分析行业信息，生成专业分析报告",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
        ),
        href: "/tools/dashboard",
        category: 'analysis',
        comingSoon: true,
    },
    {
        id: 'story-map',
        title: "用户故事地图",
        description: "可视化用户旅程，快速梳理产品功能优先级",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        ),
        href: "/tools/story-map",
        category: 'visualization',
        comingSoon: true,
    },
    {
        id: 'competitor-analysis',
        title: "竞品分析助手",
        description: "智能收集分析竞品信息，生成专业分析报告",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        href: "/tools/competitor-analysis",
        category: 'analysis',
        comingSoon: true,
    },
    {
        id: 'meeting-notes',
        title: "Coming Soon",
        description: "Coming Soon",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        ),
        href: "/tools/meeting-notes",
        category: 'document',
        comingSoon: true,
    },

];

// Re-export components for convenience
export { ModuleCard, GradientButton };
