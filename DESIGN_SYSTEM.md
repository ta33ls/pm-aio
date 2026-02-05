# PM AIO 设计系统指南

本文档定义了 PM All-in-One 项目的设计规范。**所有新功能模块必须遵循这些规范**。

---

## 颜色系统

| 用途 | 色值 | CSS 变量 | Tailwind |
|------|------|----------|----------|
| **主背景** | `#FAF9F5` | `--bg-primary` | `bg-[#FAF9F5]` |
| 次背景 | `#F5F4EF` | `--bg-secondary` | `bg-[#F5F4EF]` |
| 卡片背景 | `#FFFFFF` | `--bg-elevated` | `bg-white` |
| **主文字** | `#141413` | `--text-primary` | `text-[#141413]` |
| 次文字 | `#5E5D59` | `--text-secondary` | `text-[#5E5D59]` |
| 弱化文字 | `#8B8A85` | `--text-muted` | `text-[#8B8A85]` |
| 强调色 | `#D97757` | `--accent-primary` | `text-[#D97757]` |

### 边框

```
细边框: rgba(20, 20, 19, 0.06)  →  border-[rgba(20,20,19,0.06)]
默认边框: rgba(20, 20, 19, 0.12) →  border-[rgba(20,20,19,0.12)]
强边框: rgba(20, 20, 19, 0.2)   →  border-[rgba(20,20,19,0.2)]
```

---

## 字体

- **标题**: `font-serif` (Georgia) - 诗意、优雅
- **正文/UI**: `font-sans` (Geist Sans) - 清晰、现代

```tsx
// 标题示例
<h1 className="font-serif text-[#141413]">标题文字</h1>

// 正文示例
<p className="text-[#5E5D59]">正文描述</p>
```

---

## 圆角

| 大小 | 值 | 用途 |
|------|-----|------|
| `rounded-md` | 8px | 按钮、输入框 |
| `rounded-lg` | 12px | 小卡片 |
| `rounded-xl` | 16px | 大卡片 |
| `rounded-2xl` | 24px | 面板、弹窗 |

---

## 组件使用

### 按钮
```tsx
import { GradientButton } from "@/components";

// 主按钮
<GradientButton href="/path">开始使用</GradientButton>

// 次按钮
<GradientButton variant="secondary">了解更多</GradientButton>

// 幽灵按钮
<GradientButton variant="ghost">取消</GradientButton>
```

### 模块卡片
```tsx
import { ModuleCard } from "@/components";

<ModuleCard
  title="工具名称"
  description="工具描述"
  icon={<IconComponent />}
  href="/tools/tool-name"
  comingSoon={false}  // 未完成时设为 true
/>
```

### 输入框
```tsx
<input className="input" placeholder="搜索..." />
```

---

## 页面结构

```tsx
// 标准页面布局
export default function ToolPage() {
  return (
    <div className="container-wide py-12">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-[#8B8A85] text-sm mb-6">
        <a href="/">首页</a>
        <span>/</span>
        <span className="text-[#5E5D59]">当前页</span>
      </div>
      
      {/* 页面标题 */}
      <h1 className="font-serif text-4xl text-[#141413] mb-4">
        页面标题
      </h1>
      
      {/* 页面内容 */}
      <div>...</div>
    </div>
  );
}
```

---

## 添加新工具模块

1. 在 `lib/tool-modules.tsx` 中添加配置
2. 创建 `app/tools/[tool-name]/page.tsx`
3. 遵循上述设计规范

```tsx
// lib/tool-modules.tsx 中添加
{
  id: 'new-tool',
  title: "新工具",
  description: "工具描述",
  icon: <svg>...</svg>,
  href: "/tools/new-tool",
  category: 'document',
  comingSoon: false,  // 开发完成后设为 false
}
```

---

## 设计令牌

完整的设计令牌定义在 `lib/design-tokens.ts`，可直接导入使用：

```tsx
import { colors, tw } from "@/lib/design-tokens";

// 使用预定义的 Tailwind 类
<button className={tw.button.primary}>按钮</button>
<div className={tw.card}>卡片</div>
```
