/**
 * PM AIO Design Tokens
 * 
 * 设计系统配置文件 - 所有新模块必须遵循这些设计规范
 * Design System Config - All new modules must follow these specifications
 */

export const colors = {
    // Background Colors - 背景色
    bg: {
        primary: '#FAF9F5',    // 主背景 - 温暖奶油色
        secondary: '#F5F4EF',  // 次背景 - 稍深
        tertiary: '#EFEEE8',   // 三级背景
        elevated: '#FFFFFF',   // 卡片/弹出层背景
    },

    // Text Colors - 文字色
    text: {
        primary: '#141413',    // 主文字 - 深炭色
        secondary: '#5E5D59',  // 次文字 - 灰褐色
        muted: '#8B8A85',      // 弱化文字
    },

    // Accent Colors - 强调色
    accent: {
        primary: '#D97757',    // 陶土橙
        hover: '#C4684A',      // 悬浮时
    },

    // Border Colors - 边框色
    border: {
        subtle: 'rgba(20, 20, 19, 0.06)',
        default: 'rgba(20, 20, 19, 0.12)',
        strong: 'rgba(20, 20, 19, 0.2)',
    },
} as const;

export const typography = {
    // Font Families
    fonts: {
        serif: 'Georgia, "Times New Roman", serif',
        sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: '"SF Mono", Monaco, monospace',
    },

    // Font Sizes
    sizes: {
        xs: '0.8125rem',   // 13px
        sm: '0.875rem',    // 14px
        base: '0.9375rem', // 15px
        md: '1rem',        // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '2.25rem',  // 36px
        '4xl': '3rem',     // 48px
        '5xl': '3.5rem',   // 56px
    },

    // Line Heights
    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.7,
    },
} as const;

export const spacing = {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '5rem',  // 80px
} as const;

export const radius = {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
} as const;

export const shadows = {
    sm: '0 1px 2px rgba(20, 20, 19, 0.04)',
    md: '0 4px 12px rgba(20, 20, 19, 0.06)',
    lg: '0 4px 24px -4px rgba(20, 20, 19, 0.08)',
    xl: '0 8px 32px -8px rgba(20, 20, 19, 0.12)',
} as const;

export const animation = {
    duration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
    },
    easing: {
        default: 'ease-out',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
} as const;

// Tailwind class utilities for common patterns
export const tw = {
    // Button styles
    button: {
        primary: 'bg-[#141413] !text-white font-medium rounded-lg hover:bg-[#2a2a29] hover:!text-white transition-colors duration-200',
        secondary: 'bg-transparent !text-[#141413] border border-[rgba(20,20,19,0.12)] rounded-lg hover:bg-[#F5F4EF] hover:border-[rgba(20,20,19,0.2)] hover:!text-[#141413] transition-colors duration-200',
        ghost: 'bg-transparent !text-[#5E5D59] rounded-lg hover:!text-[#141413] hover:bg-[#F5F4EF] transition-colors duration-200',
    },

    // Card styles
    card: 'bg-white border border-[rgba(20,20,19,0.06)] rounded-xl hover:border-[rgba(20,20,19,0.12)] hover:shadow-[0_4px_24px_-4px_rgba(20,20,19,0.08)] transition-all duration-250',

    // Input styles
    input: 'w-full px-4 py-3 bg-white border border-[rgba(20,20,19,0.12)] rounded-lg text-[#141413] placeholder-[#8B8A85] focus:outline-none focus:border-[#141413] focus:shadow-[0_0_0_3px_rgba(20,20,19,0.08)] transition-all duration-150',

    // Text styles
    heading: 'font-serif text-[#141413]',
    body: 'font-sans text-[#5E5D59]',
    muted: 'font-sans text-[#8B8A85]',

    // Container
    container: 'max-w-[1200px] mx-auto px-8',
    containerNarrow: 'max-w-[720px] mx-auto px-8',
} as const;
