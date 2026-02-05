import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="container-narrow py-16">
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
                <h1 className="font-serif text-4xl text-[var(--text-primary)] mb-4">关于 PM AIO</h1>
                <p className="text-[var(--text-secondary)] text-lg">
                    产品经理的 AI 工具集，帮助您更高效地完成日常工作
                </p>
            </div>

            {/* Usage Guide */}
            <section className="mb-12">
                <h2 className="font-serif text-2xl text-[var(--text-primary)] mb-6">如何使用</h2>
                <div className="card p-6 space-y-4">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center font-medium flex-shrink-0">1</div>
                        <div>
                            <h3 className="font-medium text-[var(--text-primary)] mb-1">配置 LLM API</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                前往 <Link href="/settings" className="text-[var(--accent-primary)] hover:underline">设置页面</Link>，
                                填入您的 API Base URL、API Key 和模型名称。支持所有 OpenAI 兼容的 API。
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center font-medium flex-shrink-0">2</div>
                        <div>
                            <h3 className="font-medium text-[var(--text-primary)] mb-1">选择工具</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                在 <Link href="/tools" className="text-[var(--accent-primary)] hover:underline">工具页面</Link> 选择您需要的功能模块。
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center font-medium flex-shrink-0">3</div>
                        <div>
                            <h3 className="font-medium text-[var(--text-primary)] mb-1">输入描述，生成内容</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                用自然语言描述您的需求，AI 会自动为您生成相应的内容。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Policy */}
            <section className="mb-12">
                <h2 className="font-serif text-2xl text-[var(--text-primary)] mb-6">隐私政策</h2>
                <div className="card p-6 space-y-6">
                    <div>
                        <h3 className="font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            本地处理
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                            PM AIO 是一个纯前端应用，所有配置和数据都存储在您的浏览器本地（localStorage）。
                            我们不收集、存储或传输您的任何个人信息。
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[var(--text-primary)] mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            API 密钥安全
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                            您的 API Key 仅存储在浏览器本地，不会上传到我们的服务器。
                            所有 API 调用都直接从您的浏览器发送到您配置的 LLM 服务地址。
                        </p>
                    </div>
                </div>
            </section>

            {/* Warning */}
            <section className="mb-12">
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <h3 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        重要提醒
                    </h3>
                    <div className="text-amber-800 space-y-3">
                        <p>
                            <strong>请注意：</strong>当您使用 AI 生成功能时，您输入的内容会被发送到您配置的第三方 LLM API 服务（如 OpenAI、Claude 等）。
                        </p>
                        <p>
                            这意味着您的输入数据将离开您的设备，传输到第三方服务器进行处理。
                            请确保您了解并同意所使用的 LLM 服务的隐私政策和服务条款。
                        </p>
                        <p className="font-medium">
                            请勿在输入中包含敏感的个人信息、商业机密或其他保密数据。
                            您需要对自己输入的内容和使用的 API 服务负责。
                        </p>
                    </div>
                </div>
            </section>

            {/* Open Source */}
            <section>
                <h2 className="font-serif text-2xl text-[var(--text-primary)] mb-6">开源项目</h2>
                <div className="card p-6">
                    <p className="text-[var(--text-secondary)] mb-4">
                        PM AIO 是一个开源项目，欢迎贡献代码和提出建议。
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="/tools"
                            className="btn btn-primary"
                        >
                            开始使用
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
