'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadSettings, saveSettings, type LLMSettings, defaultSettings } from '@/lib/ai/settings';

export default function SettingsPage() {
    const [settings, setSettings] = useState<LLMSettings>(defaultSettings);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setSettings(loadSettings());
    }, []);

    const handleSave = () => {
        saveSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleChange = (field: keyof LLMSettings, value: string) => {
        setSettings(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    return (
        <div className="container-wide py-16">
            {/* Back Navigation */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回首页
            </Link>

            {/* Header */}
            <div className="mb-12">
                <h1 className="font-serif text-4xl text-[var(--text-primary)] mb-4">设置</h1>
                <p className="text-[var(--text-secondary)] text-lg">
                    配置 LLM API 连接，这些设置将应用于所有 AI 功能模块
                </p>
            </div>

            {/* Settings Card */}
            <div className="card p-8 max-w-2xl">
                <h2 className="font-serif text-2xl text-[var(--text-primary)] mb-6">LLM API 配置</h2>

                <div className="space-y-6">
                    {/* Base URL */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            API Base URL
                        </label>
                        <input
                            type="url"
                            className="input"
                            placeholder="https://api.openai.com/v1"
                            value={settings.baseURL}
                            onChange={(e) => handleChange('baseURL', e.target.value)}
                        />
                        <p className="mt-2 text-sm text-[var(--text-muted)]">
                            OpenAI 兼容的 API 端点地址（支持中转 API）
                        </p>
                    </div>

                    {/* API Key */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            API Key
                        </label>
                        <input
                            type="password"
                            className="input"
                            placeholder="sk-..."
                            value={settings.apiKey}
                            onChange={(e) => handleChange('apiKey', e.target.value)}
                        />
                        <p className="mt-2 text-sm text-[var(--text-muted)]">
                            API 密钥将安全存储在浏览器本地
                        </p>
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            模型名称
                        </label>
                        <input
                            type="text"
                            className="input"
                            placeholder="gpt-4o"
                            value={settings.model}
                            onChange={(e) => handleChange('model', e.target.value)}
                        />
                        <p className="mt-2 text-sm text-[var(--text-muted)]">
                            要使用的模型 ID，如 gpt-4o、claude-3-opus 等
                        </p>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 flex items-center gap-4">
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            保存设置
                        </button>
                        {saved && (
                            <span className="text-sm text-green-600 fade-in">
                                ✓ 已保存
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
