'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { DrawIoEmbed } from 'react-drawio';
import type { DrawIoEmbedRef } from 'react-drawio';
import { loadSettings, isSettingsConfigured, type LLMSettings } from '@/lib/ai/settings';

// Wrap mxCell elements with full drawio XML structure
function wrapWithDrawioStructure(mxCells: string): string {
    return `<mxfile>
  <diagram name="Diagram">
    <mxGraphModel dx="1" dy="1" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${mxCells}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export default function FlowchartPage() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [settings, setSettings] = useState<LLMSettings | null>(null);
    const [generatedXml, setGeneratedXml] = useState('');
    const [hasGenerated, setHasGenerated] = useState(false);
    const drawioRef = useRef<DrawIoEmbedRef>(null);

    useEffect(() => {
        setSettings(loadSettings());
    }, []);

    const handleGenerate = async () => {
        if (!prompt.trim() || !settings) return;

        setIsGenerating(true);
        setError(null);
        setGeneratedXml('');

        try {
            const response = await fetch('/api/flowchart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, settings }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to generate flowchart');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let xmlContent = '';

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;
                xmlContent += decoder.decode(value, { stream: true });
            }

            // Clean up XML - strip markdown code blocks
            let cleanXml = xmlContent.trim();
            if (cleanXml.startsWith('```')) {
                cleanXml = cleanXml.replace(/^```(?:xml)?\n?/, '');
                cleanXml = cleanXml.replace(/\n?```$/, '');
            }
            cleanXml = cleanXml.trim();

            // Check for empty response or LLM API errors
            if (!cleanXml) {
                throw new Error('生成失败：AI 返回了空内容，请检查 API 配置或稍后重试');
            }

            // Check for common error patterns from LLM relay/proxy
            const errorPatterns = [
                /error/i,
                /failed/i,
                /invalid.*key/i,
                /unauthorized/i,
                /rate.?limit/i,
                /quota/i,
                /insufficient/i,
                /exceeded/i,
                /timeout/i,
                /请求失败/,
                /余额不足/,
                /密钥无效/,
                /配额/,
            ];

            // Only check for errors if the response doesn't look like valid XML
            const looksLikeXml = cleanXml.includes('<mxCell') || cleanXml.includes('mxCell');
            if (!looksLikeXml) {
                const matchedError = errorPatterns.find(pattern => pattern.test(cleanXml));
                if (matchedError) {
                    throw new Error(`API 错误：${cleanXml.slice(0, 200)}${cleanXml.length > 200 ? '...' : ''}`);
                }
                // If no error pattern matched but still no valid XML
                throw new Error(`生成失败：AI 返回了无效内容，请重试。返回内容：${cleanXml.slice(0, 100)}${cleanXml.length > 100 ? '...' : ''}`);
            }

            setGeneratedXml(cleanXml);
            setHasGenerated(true);

            if (drawioRef.current && cleanXml) {
                const fullXml = wrapWithDrawioStructure(cleanXml);
                drawioRef.current.load({ xml: fullXml });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsGenerating(false);
        }
    };

    const isConfigured = settings && isSettingsConfigured(settings);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Header */}
            <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                <div className="container-wide py-6 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <Link
                            href="/tools"
                            className="p-2.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all"
                            title="返回工具列表"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[#c4684a] flex items-center justify-center shadow-sm">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="font-serif text-2xl text-[var(--text-primary)]">AI 图表生成</h1>
                            </div>
                        </div>
                    </div>
                    <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        设置
                    </Link>
                </div>
            </header>

            {/* Not Configured Warning */}
            {!isConfigured && (
                <div className="bg-amber-50 border-b border-amber-200">
                    <div className="container-wide py-3 flex items-center gap-3 text-amber-800">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>请先 <Link href="/settings" className="underline font-medium hover:text-amber-900">配置 LLM API</Link> 后再使用</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="container-wide py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel - Input */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Input Card */}
                        <div className="card p-6">
                            <div className="flex items-center gap-2 mb-4">

                                <h2 className="font-medium text-[var(--text-primary)]">一句话描述图表</h2>
                            </div>

                            <textarea
                                className="input resize-none mb-4"
                                rows={6}
                                placeholder="支持多种图表类型"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isGenerating}
                            />

                            <button
                                className="btn btn-primary w-full"
                                onClick={handleGenerate}
                                disabled={!isConfigured || isGenerating || !prompt.trim()}
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        AI 生成中...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        生成图表
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Tips Card */}
                        <div className="card p-6 bg-[var(--bg-secondary)]">
                            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">✨ 支持的图表类型</h3>
                            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                                <li>• <strong>流程图</strong> - 工作流、决策树</li>
                                <li>• <strong>架构图</strong> - AWS、微服务、网络</li>
                                <li>• <strong>组织架构</strong> - 公司层级、团队结构</li>
                                <li>• <strong>时序图</strong> - API交互、认证流程</li>
                                <li>• <strong>类图</strong> - UML、继承关系</li>
                                <li>• <strong>ER图</strong> - 数据库实体关系</li>
                                <li>• <strong>状态图</strong> - 生命周期、状态机</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Panel - DrawIO Editor */}
                    <div className="lg:col-span-2">
                        <div className="card overflow-hidden" style={{ height: 'calc(100vh - 160px)', minHeight: '700px' }}>
                            {/* Editor Header */}
                            <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between">
                                <div className="flex items-center gap-2">

                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <span className="ml-2 text-sm text-[var(--text-muted)]">图表编辑器</span>
                                </div>
                                {hasGenerated && (
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        ✓ 已生成
                                    </span>
                                )}
                            </div>

                            {/* DrawIO Container */}
                            <div className="relative" style={{ height: 'calc(100% - 52px)' }}>
                                {!hasGenerated && !isGenerating && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)] z-10">
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
                                                <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                                </svg>
                                            </div>
                                            <p className="text-[var(--text-muted)]">在左侧输入流程描述后点击生成</p>
                                        </div>
                                    </div>
                                )}
                                {isGenerating && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)] bg-opacity-80 z-10">
                                        <div className="text-center">
                                            {/* <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--accent-primary)] bg-opacity-10 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-[var(--accent-primary)] animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            </div> */}
                                            <p className="text-[var(--text-primary)] font-medium">AI 正在生成流程图...</p>
                                            <p className="text-sm text-[var(--text-muted)] mt-1">请稍候，这可能需要几秒钟</p>
                                        </div>
                                    </div>
                                )}
                                <DrawIoEmbed
                                    ref={drawioRef}
                                    urlParameters={{
                                        ui: 'kennedy',
                                        spin: true,
                                        libraries: true,
                                        saveAndExit: false,
                                        noSaveBtn: true,
                                        noExitBtn: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
