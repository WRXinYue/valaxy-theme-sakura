---
title: SakuraNetworkGraph
title_zh-CN: 网络图谱 (SakuraNetworkGraph)
toc: true
categories:
  - components
---

## 网络图谱 SakuraNetworkGraph <SupTag>0.6.0</SupTag> <Experimental />

::: warning
该组件尚未完善，需等待后续功能的完善
:::

<SakuraNetworkGraphPG />

## API

### Attributes

| 属性名             | 类型     | 默认值      | 说明                                          |
| ------------------ | -------- | ----------- | --------------------------------------------- |
| type               | `string` | `undefined` | post card type, can be bilibili/yuque/...     |
| posts              | `Post[]` | `undefined` | 自定义传入`Post`数据，默认为获取全局posts数据 |
| width              | `number` | `1812`      | 画布宽度                                      |
| height             | `number` | `1738`      | 画布高度                                      |
| nodeWeight         | `number` | `5`         | 节点初始大小                                  |
| scale              | `number` | `1.8`       | 画布缩放数值                                  |
| hideScaleThreshold | `number` | `1`         | 在指定范围隐藏文字标签                        |
| selectNodeColor    | `string` | `'red'`     | 当前选中节点颜色                              |
