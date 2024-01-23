# 多语言词条更新流程

## 1.导出生成词条 excel 文件

执行 pnpm collect:word

```
pnpm collect:word
```

会生成子应用的词条文件在 scripts 目录下

## 2.专业人员翻译词条

注意，这一步骤需要专业人员保持步骤 1 导出的 excel 的格式

## 3.更新程序的词条

执行 pnpm write:word

```
 pnpm write:word
```

这一步骤，会将翻译后的词条同步到 apps 目录下的各个应用的 languages/translates/default.json 中

## 4.编译词条

进入各个应用的项目目录，执行 voerkai18n compile 命令
比如 main 的词条更新

```
cd apps/main
voerkai18n compile
```
