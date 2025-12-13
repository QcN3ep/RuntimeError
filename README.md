# Runtime Error

[![GitHub License](https://img.shields.io/github/license/QcN3ep/RuntimeError)](LICENSE)

一套基于定位系统与超声波的自规划智能小车解决方案，用于实现自动巡航及少量货物的运载。

## 项目概述

本项目为大学生学习实验项目，旨在实践嵌入式系统、传感器融合和路径规划等技术。小车结合多种传感器实现自主导航与避障，完成特定场景下的运输任务。

## 项目作用

- 实现小车在已知环境中的自主定位与导航
- 通过超声波传感器进行实时避障
- 完成少量货物的定点运输
- 提供可视化监控与控制界面

## 项目结构

### 源码目录

```
RuntimeError/
├── source/           # 小车固件代码 (Rust)
├── client/           # 客户端代码 (Tauri + pnpm + React)
└── hardware/         # 硬件设计文件
    └── Hardware.eprj # 主板原理图
└── ...
```

### 固件构建 (source/)

小车主控固件基于 Rust 开发：

```bash
cd source
cargo build
```

### 客户端构建 (client/)

监控客户端采用 Tauri + React 开发：

```bash
cd client
# 安装依赖
pnpm install
# 开发模式运行
pnpm tauri dev
# 构建应用
pnpm tauri build
```

## 硬件需求

### 主要组件

- **主控单元**: STM32H743VIT6
- **通信模块**: ESP32-S3-WROOM-N16R8
- **传感器**:
  - 超声波传感器 ×3
  - 摄像头 ×1
- **执行机构**:
  - 舵机 ×1
- **定位**:
  - GPS 模块 ×1
- **其他电子元件**:
  - 电源管理电路
  - 电机驱动模块
  - 基础电子元件（电阻、电容等）

### 硬件设计

主板原理图位于 `/hardware/Hardware.eprj`，使用相应 EDA 软件打开查看。

## 许可证

本项目采用开源许可证，详见 [LICENSE](LICENSE) 文件。