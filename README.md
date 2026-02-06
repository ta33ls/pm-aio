<p align="center">
  <h1 align="center">PM-AIO</h1>
  <p align="center">为产品经理打造的 AI 驱动效率工具集</p>
  <p align="center">
    <a href="#features">功能</a> •
    <a href="#quick-start">快速开始</a> •
    <a href="#deployment">部署</a> •
    <a href="#roadmap">规划</a>
  </p>
</p>

---

## ✨ 简介

**PM-AIO** (Product Manager All-In-One) 是一个开源的产品经理智能工具集，利用 AI 能力提升产品经理的日常工作效率。

- 🎯 **为产品经理设计** — 聚焦 PM 高频工作场景
- 🤖 **AI 驱动** — 接入任意 OpenAI 兼容 API，让 AI 成为你的助手
- 🔐 **自托管** — 你的数据、你的 API Key、你完全掌控
- 🎨 **现代设计** — 优雅简洁的 Claude 风格界面

<h2 id="features">🚀 已实现功能</h2>

### AI 图表生成

用自然语言描述，一键生成专业图表：

| 图表类型 | 说明 |
|---------|------|
| 流程图 | 工作流、决策树、业务流程 |
| 架构图 | AWS、微服务、系统架构 |
| 组织架构图 | 公司层级、团队结构 |
| 时序图 | API 交互、认证流程 |
| UML 类图 | 继承关系、类结构 |
| ER 图 | 数据库实体关系 |
| 状态图 | 生命周期、状态机 |

**技术亮点**：
- 集成 DrawIO 编辑器，可继续编辑导出
- 流式响应，实时看到生成过程
- 智能错误处理与提示

<h2 id="quick-start">⚡ 快速开始</h2>

### 1. 克隆项目

```bash
git clone https://github.com/ta3ls/pm-aio.git
cd pm-aio
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 3. 配置环境变量 (可选)

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# OpenAI 兼容 API 配置
LLM_API_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=your-api-key
LLM_MODEL=gpt-4o
```

> 💡 也可以在应用内的 **设置页面** 动态配置

### 4. 启动开发服务

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

<h2 id="deployment">📦 部署</h2>

### Vercel 一键部署 (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ta33ls/pm-aio)

在 Vercel 中配置环境变量：
- `LLM_API_BASE_URL`
- `LLM_API_KEY`
- `LLM_MODEL`

### Docker 部署

```bash
# 构建镜像
docker build -t pm-aio .

# 运行容器
docker run -p 3000:3000 \
  -e LLM_API_BASE_URL=https://api.openai.com/v1 \
  -e LLM_API_KEY=your-api-key \
  -e LLM_MODEL=gpt-4o \
  pm-aio
```

<h2 id="roadmap">🗺️ 开发路线</h2>

### 近期规划

- [ ] **PRD 生成器** — Anything to PRD，任意输入转专业需求文档
- [ ] **行业洞察** — 智能收集分析行业信息，生成专业报告
- [ ] **用户故事地图** — 可视化用户旅程，梳理功能优先级
- [ ] **竞品分析助手** — 智能竞品对比分析

### 长期目标

- [ ] 更多图表类型支持 (甘特图、思维导图)
- [ ] 多语言国际化
- [ ] 团队协作功能
- [ ] 自定义提示词模板
- [ ] 插件系统

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| AI | Vercel AI SDK |
| 图表 | DrawIO (react-drawio) |
| 语言 | TypeScript |

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 发起 Pull Request

## 📄 License

[MIT](./LICENSE)

---

<p align="center">
  如果这个项目对你有帮助，请给一个 ⭐️
</p>
 