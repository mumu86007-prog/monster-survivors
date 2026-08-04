# omggame.store — 免费在线游戏门户站

## 项目定位

一个以 **SEO 内容驱动 + 广告变现** 为核心的免费在线小游戏门户网站。

- **域名**: `omggame.store`
- **定位**: 主页展示游戏封面墙，子页面嵌入 iframe 小游戏
- **核心收入**: Google AdSense 广告
- **增长引擎**: SEO 长尾流量 × 游戏数量规模化
- **托管**: GitHub Pages（免费）

## 变现模型

```
大量游戏页面(SEO内容) → 搜索流量 → 用户玩游戏(长停留) → AdSense广告展示 → 收入
```

| 指标 | 参考值 |
|------|--------|
| 游戏站 RPM（每千次浏览） | $3 ~ $15（英语流量最高） |
| 月入 $100 | ~2-3 万 PV/月 |
| 月入 $1000 | ~15-20 万 PV/月 |
| 单游戏日均搜索 PV | 50 ~ 500 |

关键原则：
- **每个游戏页 = 独立 SEO 着陆页**，标题/描述/内容必须独特
- **美国/英语流量 RPM 最高**，内容以英文为主
- **广告位在游戏 iframe 上方 + 侧边栏 + 内容区**三位一体
- **用户停留时间越长，广告收益越高**

## 技术架构

### 当前状态（Phase 1 完成）
- 数据驱动架构：`games.json` → 模板渲染
- 3 个模板文件：主页 + 游戏详情 + 分类页
- 18 款游戏已配置，涵盖 action/adventure/puzzle/racing/sports/arcade/simulation/strategy
- 暗色游戏主题 UI + 响应式布局
- Tailwind CSS CDN + 自定义 CSS
- Google AdSense（ca-pub-5952610108839991）
- GitHub Pages

### 目标架构（模板化 + 数据驱动）
```
omggame.store/
├── index.html              # 主页：游戏封面墙 + 分类导航 + 搜索 + 广告
├── play/
│   └── index.html          # 统一游戏详情页模板（?game=slug 驱动）
├── category/
│   └── index.html          # 统一分类页模板（?cat=category 驱动）
├── data/
│   └── games.json          # 所有游戏数据（10款游戏，单一数据源）
├── assets/
│   └── covers/             # 游戏封面图（当前用 emoji 占位）
├── ads.txt                 # AdSense ads.txt
└── CLAUDE.md               # 本文件
```

### 技术方案
- **第一阶段（当前）**: 纯静态 HTML + JS 数据驱动，单页模板
- **第二阶段（未来）**: 静态站点生成器（如 Astro/11ty），批量生成页面
- **核心原则**: 零服务器成本，纯前端，GitHub Pages 免费托管

### 游戏数据模型（games.json schema）
```json
{
  "id": "monster-survivors",
  "title": "Monster Survivors",
  "slug": "monster-survivors",
  "description": "SEO-friendly game description...",
  "category": "adventure",
  "tags": ["survival", "action", "adventure"],
  "iframeUrl": "https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html",
  "coverImage": "assets/covers/monster-survivors.webp",
  "controls": "WASD to move, mouse to aim",
  "tips": ["Collect power-ups", "Avoid large groups"],
  "rating": 4.5,
  "plays": 0
}
```

## 开发阶段

### Phase 1 — 基础重构 ✅ (已完成)
- [x] 创建 `data/games.json` 数据文件，18 款游戏
- [x] 重构主页为"游戏封面墙"布局（响应式网格 + 搜索）
- [x] 创建统一游戏详情页模板 `/play/?game=slug`
- [x] 创建统一分类页模板 `/category/?cat=category`
- [x] 移除所有旧页面和 "Coming Soon" 占位
- [ ] 每款游戏准备独立封面图（当前用 emoji 占位）
- [x] SEO 基础：每页独立 title/description/keywords
- [ ] 配置自定义域名 omggame.store

### Phase 2 — 内容扩充
- [ ] 扩充到 30-50 款游戏
- [ ] 每款游戏写独立介绍、操作说明、技巧攻略
- [ ] 添加"相关游戏推荐"模块
- [ ] 评分系统（五星评分）
- [ ] 广告位布局优化（3 个广告位/页）
- [ ] Core Web Vitals 性能优化

### Phase 3 — 规模化
- [ ] 50+ 款游戏
- [ ] 批量添加脚本（自动化生成游戏页）
- [ ] 多语言支持（英文为主，中文辅助）
- [ ] 搜索功能
- [ ] 热门排行 / 最新上架
- [ ] 数据分析埋点

## 编码规范

### 技术约束
- **零框架依赖**（Phase 1）：纯 HTML + Vanilla JS + Tailwind CSS CDN
- **零服务器成本**：所有逻辑客户端运行
- **SEO 优先**：内容必须在 HTML 中渲染（不用 SPA/客户端动态渲染主体内容）
- **响应式**：移动端优先，游戏 iframe 自适应

### 文件规范
- 文件名：小写 + 连字符（kebab-case）
- 游戏封面：WebP 格式，压缩到 < 50KB
- 每个 HTML 文件 < 800 行（提取公共 JS/CSS）

### SEO 要求（每个游戏页必须）
- [ ] 独立 `<title>`: `{Game Name} - Play Free Online | omggame.store`
- [ ] 独立 `<meta name="description">`: 120-160 字符的游戏描述
- [ ] 独立 `<meta name="keywords">`: 5-10 个相关关键词
- [ ] `<h1>`: 包含游戏名 + 核心关键词
- [ ] 至少 300 字的游戏介绍内容
- [ ] 结构化数据（schema.org Game）
- [ ] Open Graph 标签（社交分享用）
- [ ] canoncial URL 指向 `omggame.store`

### 广告规范
- AdSense 代码: `ca-pub-5952610108839991`
- 每页 2-3 个广告位
- 广告位不要遮挡游戏操作区域
- 移动端使用自适应广告格式

## 游戏来源

目前使用 iframe 嵌入第三方游戏平台：
- `cloud.onlinegames.io` — Monster Survivors 的来源
- 后续可扩展其他免费游戏源
- 注意：只嵌入允许嵌入的游戏（遵守第三方条款）

## Git 工作流

- 主分支: `main`
- 提交格式: `<type>: <description>`（feat/fix/refactor/docs/chore）
- 不在仓库中提交密钥或 AdSense 私密信息
