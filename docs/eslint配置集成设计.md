```mermaid
graph LR
  start[开始] --> input1[用户输入命令fastcoder]
  input1 --> hasEslint{是否输入 options: -e/--eslint?}
  hasEslint -- YES --> showPrompt[显示提示]
  hasEslint -- NO --> other[其他流程]

  showPrompt --> 打算到你家啊啥的
