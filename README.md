# 3D 数字孪生

## 开发指南

### 自动化 eslint

项目的 eslint 规则，统一在`eslint-config-custom`包中配置；

`git push, git commit`都会执行 lint 操作。 若需要全局自动解决，执行 `pnpm run lint -- --fix`

### commit 提交规范

| build    | 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交                |
| -------- | ------------------------------------------------------------------------------------ |
| ci       | 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交     |
| docs     | 文档更新                                                                             |
| feat     | 新增功能                                                                             |
| merge    | 分支合并 Merge branch ? of ?                                                         |
| fix      | bug 修复                                                                             |
| perf     | 性能, 体验优化                                                                       |
| refactor | 重构代码(既没有新增功能，也没有修复 bug)                                             |
| style    | 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑) |
| test     | 新增测试用例或是更新现有测试                                                         |
| revert   | 回滚某个更早之前的提交                                                               |
| chore    | 不属于以上类型的其他类型                                                             |

---

## 迭代事项跟踪

### 阶段性问题

> 2023-09-12

- [x] 定义样式的方式，统一使用 `@mui/material/styles`，作为样式管理工具，对于选定的框架（Meterial UI）性能优化和兼容性更强。styles-components 适用于不依赖框架的项目。
- [ ] 重复依赖安装包问题，子包中使用`peerDependencies`作为依赖配置，在根目录统一安装。如（React...）方便做版本控制。
- [x] 补充 git commit 提交规则

---
