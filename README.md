# ⚡️ 新能源电池预警平台 (New Energy Early Warning Platform)

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg)
![Flask](https://img.shields.io/badge/Framework-Flask-black)

## 📖 项目介绍 (Introduction)

**新能源预警平台**是一个旨在对新能源电池管理系统（BMS）进行实时状态监测与异常预警的 Web 可视化管理系统。

本项目结合了前端动态数据可视化与后端数据处理，提供了一个直观、高效的监控大屏界面及后台管理门户。通过对设备运行关键数据的实时追踪与分析，帮助运维人员及时发现潜在的安全隐患，有效降低事故发生率，保障新能源系统的安全、高效与稳定运行。

## ✨ 功能特性 (Features)

* **🔐 专属鉴权系统**：包含独立定制的登录页面组件，提供安全可靠的用户身份验证入口。
* **📊 数据可视化大屏**：利用丰富的前端图表与动画效果，直观呈现新能源设备的核心运行指标（温度、电压、功率等）。
* **⚠️ 实时异常预警**：基于后台数据分析引擎，对超出安全阈值的设备进行多级别、可视化的告警提示。
* **🖥️ 响应式 UI 布局**：自适应不同尺寸的监控屏幕，确保在不同终端上的最佳浏览体验。
* **📑 完备的工程文档**：项目内含详尽的《项目需求分析报告》与《项目设计报告》，极其适合作为二次开发、学术研究或毕业设计的参考。

## 🛠️ 技术栈 (Tech Stack)

* **后端开发**: Python (主要依托轻量级 Web 框架处理路由与接口交互，见 `app.py`)
* **前端交互**: JavaScript (原生 JS 及前端可视化库)
* **页面渲染**: HTML5 + CSS3 (包括定制字体及独立模块的静态资源)
* **模板引擎**: 前后端解耦结构，搭配后端的 `templates` 目录进行动态页面渲染。

## 📁 项目结构 (Project Structure)

```text
New-Energy-Early-Warning-Platform/
├── app.py                   # 后端主程序与路由入口
├── templates/               # 前端 HTML 模板文件目录
├── static/                  # 通用静态资源存放目录
├── css/                     # 主平台核心 CSS 样式文件
├── css_login/               # 独立登录界面的 CSS 样式
├── js/                      # 主平台核心 JavaScript 逻辑脚本
├── js_login/                # 独立登录界面的 JavaScript 逻辑脚本
├── images/                  # 主平台界面所需的图片与图标资源
├── images_login/            # 登录页面的背景与素材资源
├── font/                    # 定制化字体文件（UI 字体美化）
├── add.js                   # 补充/扩展的 JS 脚本组件
├── web.zip                  # 完整的 Web 前端资源备份打包包
├── 项目设计报告.pdf         # 📘 系统架构、UI设计与技术方案详述
└── 项目需求分析报告.pdf     # 📘 项目背景、业务流程与功能规划文档
```

## 🚀 安装与运行 (Installation & Usage)

### 1. 克隆项目到本地
```bash
git clone [https://github.com/owring-code/New-Energy-Early-Warning-Platform.git](https://github.com/owring-code/New-Energy-Early-Warning-Platform.git)
cd New-Energy-Early-Warning-Platform
```

### 2. 配置 Python 环境
建议使用虚拟环境，并确保安装了运行所需的核心依赖（如 Flask 等）：
```bash
# 如果有 requirements.txt 则执行：
# pip install -r requirements.txt 

# 基础运行通常需要：
pip install flask
```

### 3. 启动服务
运行后端主程序：
```bash
python app.py
```

### 4. 访问平台
打开浏览器，访问控制台输出的本地地址（通常为 `http://127.0.0.1:5000`），即可进入平台的登录界面。

## 📚 项目文档 (Documentation)

本项目不仅提供了完整的源代码，还配备了标准化的软件工程文档。若需了解该预警平台的深层业务逻辑和架构设计，请直接参阅仓库中附带的 PDF 文档：
* [`项目需求分析报告.pdf`](./项目需求分析报告.pdf) - 深入了解预警平台的业务需求、用例分析和功能规划。
* [`项目设计报告.pdf`](./项目设计报告.pdf) - 查看系统的总体架构设计、界面交互设计以及核心模块的具体实现方案。

## 🤝 参与贡献 (Contributing)

欢迎提交 Issue 或 Pull Request 来帮助完善这个平台！无论是前端界面的美化、后端逻辑的优化，还是加入新的预警算法，我们都非常期待您的加入。

---
*Powered by owring-code*
