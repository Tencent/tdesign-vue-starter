# Changelog
## 0.6.2
### 🚀 Features
- 新增`keepAlive` meta 用于配置是否开启路由的页面缓存 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/242
- 升级组件库至 1.3.0 新增组件示例 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/242
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.6.1...0.6.2
## 0.6.1
### 🚀 Features
- 新增打开外部页面示例 by @ccccpj @dianjie in https://github.com/Tencent/tdesign-vue-starter/pull/226
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.6.0...0.6.1
## 0.6.0
### ❗ Breaking Change
- 移除所有内置主题色相关代码，全部通过 `tvision-color` 计算获取，调整颜色相关方法的目录结构 @uyarn #218
### 🚀 Features
- 支持任意颜色作为初始化主题颜色 @uyarn #218
- 升级 `tvision-color` 至1.5.0 使用新的`getColorGradations`方法，修正部分选择的过曝主题色 @uyarn #218
### 🐞 Bug Fixes
- 修复自定义颜色切换明亮暗黑模式时无法沿用的缺陷 @uyarn #218
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.5.0...0.6.0
## 0.5.1
### 🚀 Features
- 升级组件库至1.x 正式版本 默认统一布局头部高度为56px by @uyarn @xiaosansiji in https://github.com/Tencent/tdesign-vue-starter/pull/205 https://github.com/Tencent/tdesign-vue-starter/pull/206
- 默认路由模式改为history模式 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/210 https://github.com/Tencent/tdesign-vue-starter/pull/211
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.5.0...0.5.1
## 0.5.0
### ❗ Breaking Changes
- 废弃大量内置`less variables`, 尺寸、色彩、字体、圆角及阴影统一使用组件库内置变量 具体变量可参考 https://tdesign.tencent.com/starter/docs/vue/design-token  by @uyarn #195
- 升级默认主题色的配色方案  组件库升级至 0.50.1 及请参照改动 @uyarn #195
### 🚀 Features
- 升级 `axios` 至 1.0 版本
### 🐞 Bug Fixes
- 修复组件库升级至 0.50.0 及以上由于头部高度变化导致部分导航模式样式异常的问题 #365 by @uyarn
- 修复tab栏点击无法自动打开三级菜单问题 by @jiangzenong in https://github.com/Tencent/tdesign-vue-starter/pull/189
- 修复侧边栏三级菜单路径异常的问题 @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/196
- 修复产品卡片示例的方法名错误 by @jiangzenong in https://github.com/Tencent/tdesign-vue-starter/pull/190
## New Contributors
* @jiangzenong made their first contribution in https://github.com/Tencent/tdesign-vue-starter/pull/190
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.4.3...0.5.0
## 0.4.3
### 🚀  Features
- 升级组件库依赖至0.49+ 优化下拉菜单高度及多级结构 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/181
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.4.2...0.4.3
## 0.4.2
### 🚀 Features
- 多标签页的右键操作扩展支持非当前页进行操作 @uyarn  in https://github.com/Tencent/tdesign-vue-starter/pull/172
- add README in english in https://github.com/Tencent/tdesign-vue-starter/pull/171
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.4.1...0.4.2
## 0.4.1
### Features
- 升级tdesign-vue至0.46+ 版本，统一卡片圆角样式 @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/161
### Bug Fixes
- 修复0.4.0改造sfc文件导致多标签tab页失效的缺陷 @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/164
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.4.0...0.4.1
## 0.4.0
### ❗️ BREAKING CHANGES
- 统一组件使用SFC(*.vue)编写 by @ardor-zhang in https://github.com/Tencent/tdesign-vue-starter/pull/157
- 统一组件以`PascalCase`规范命名 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/160
###  🚀 Features
- 升级组件库版本至0.45+ 组件圆角有所改动，支持字体配置 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/158
## New Contributors
* @ardor-zhang made their first contribution in https://github.com/Tencent/tdesign-vue-starter/pull/157
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.3.1...0.4.0
## 0.3.1
## What's Changed
- 处理vue2.7发布引起的不兼容问题 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/139 https://github.com/Tencent/tdesign-vue-starter/pull/145
   - `vue`版本在2.7以下
   - `vue-template-compiler`版本与`vue`一致
   - `vite-plugin-vue2-svg` 版本为0.3.0以上
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.3.0...0.3.1
## 0.3.0
## Refactor
- 全面替换less vars颜色方案为`CSS Token`方案 与其他页面模板保持一致 by @uyarn  https://github.com/Tencent/tdesign-vue-starter/pull/138/commits/d8ceb0375bc8bb9b2e28f20918fdea27f8a5617e
- 移除`vue-color`，使用组件库的`color-picker-panel`组件 by @uyarn https://github.com/Tencent/tdesign-vue-starter/pull/138/commits/66dc871d725bd58cb9a2b10eeeebbe1cdc29a061
## Features
- 升级组件库依赖至0.43+ datepicker使用方式有调整 by @uyarn https://github.com/Tencent/tdesign-vue-starter/pull/138/commits/66dc871d725bd58cb9a2b10eeeebbe1cdc29a061
- 支持刷新页面后保留展开菜单项 by @uyarn 
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.2.2...0.3.0
## 0.2.2
## Features
- 升级组件库依赖至0.41.5
- 优化计算列表吸顶高度与多标签页关系的逻辑 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/commit/7c8b55889da78c11223f5623b82f1eff442a7d75
- 多标签页增加支持指定路由不缓存的功能 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/125
## Bug Fixes
- 修复多标签页关闭左侧会关闭首页的问题 by @uyarn in https://github.com/Tencent/tdesign-vue-starter/pull/124
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.2.1...0.2.2
## 0.2.1
## Features
- 列表页增加吸顶展示 by @uyarn in #114
- 新增维护中页面 by @uyarn in #121
## Bug Fixes
- 修复展示底部开关失效的问题 by @uyarn in #122
- 修复mock roles错误 by @lscho in #111
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.2.0...0.2.1
## 0.2.0
## Features
- 新增三级菜单示例代码 #108 
- 升级组件库依赖至0.41.0 #110 
   - 替换全部卡片样式为卡片组件 减少重复代码量
   - 优化图表的相关代码目录结构
**Full Changelog**: https://github.com/Tencent/tdesign-vue-starter/compare/0.1.5...0.2.0
## 0.1.5
## Features
- 多标签Tab页增加持久化功能 by @uyarn #100 
- 内置全局配置组件 支持全局多语言及属性的配置 by @uyarn #101
## 0.1.4
## Features
- 新增多标签Tab页功能 by @uyarn  #89
## Bug fixes
- 修复混合分割菜单布局下 list页面滚动问题 by @octopustail #90
## 0.1.3
## Features
- 升级组件库依赖tdesign-vue至0.35.1版本
## Bug fixes
- 修复菜单下拉与表格层级冲突
## 0.1.2
## Features
- 调整部分不合理的公共组件所在目录 by @ccccpj 
- 升级组件库依赖tdesign-vue至0.34.0版本
## Bug Fixes
- 修复面包屑点击跳转当前页错误的问题 by @octopustail
## New Contributors
* @94dreamer made their first contribution in https://github.com/Tencent/tdesign-vue-starter/pull/68
* @octopustail made their first contribution in https://github.com/Tencent/tdesign-vue-starter/pull/70
* @amadeus711 made their first contribution in https://github.com/Tencent/tdesign-vue-starter/pull/72
## 0.1.1
### Bug Fixes
- 修复表单页检验提示未正常显示的问题
## 0.1.0
### 0.1.0
- 增加版本概念，方便后续用户同步新增页面、问题修复。
