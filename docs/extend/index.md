---
title: 指掌天下重构指南
description: 指掌天下重构
keywords:
  - 指掌天下重构
  - handday
  - frontend
---
<p align="left">
    <a style={{marginRight: '4px'}}><img src="https://img.shields.io/badge/build-passing-blue"/></a>
    <a style={{marginRight: '4px'}} href='http://front.handday.com:9999'><img src='https://img.shields.io/badge/gitter-join%20chat-brightgreen'/></a>
    <a><img src="https://img.shields.io/badge/license-platform-brightgreen"/></a>
</p>


:four_leaf_clover: 指掌天下重构

项目使用eslint做代码风格检查，并对git commit 提交的内容做了严格要求 采用标准的angular规范

`0.0.2` 组织架构

:warning: Commit Type
=========================
 - feat:     新功能
 - fix:      bug 修改
 - docs:     仅文档修改 
 - style:    不会影响代码含义的更改（空格，格式，缺少分号等）
 - refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
 - perf:    改进代码
 - test:     增加测试 
## :rocket: Examples
```
git commit -m 'feat: xxx'
```
标准提交： 项目内部提供了标准的git-cz 可视化操作

1. 安装依赖
```
npm install
```
2. 进入你想要使用git cz命令的git项目
```
使用 npm run commit 代替git commit
```
:::info
项目还是直接用git commit 提交
:::
:rocket: Installation
=========================
```javascript
npm install nrm -g // 镜像管理 设置私服地址   http://192.168.11.29:4873/
npm install 
```
:maple_leaf: Feature
=========================

## :construction: iconfont 图标引用
1. 文件路径 src/core/IconFont.js
```javascript
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2273066_lc0nq0xr8bf.js' // 在 iconfont.cn 上生成
})
export default IconFont

```
2. 引用
```javascript 
<template>
...
 <icon-font class="xxx" type="iconzhizhang_01" />
</template>

import IconFont from '@/core/IconFont'

<script>
...
components: {
  IconFont
}
</script>

```
> 当icon有更新时 在iconfont 官网中 选择<font color = "red" size={3} face="STCAIYUN">Symbol</font>重新复制代码链接 替换上面代码中的scriptUrl

## :construction: SVG 图标引用
1. 文件路径 src/core/icons.js
```javascript
/**
 * Custom icon list
 * @see https://vue.ant.design/components/icon/#Custom-Font-Icon
 *
 * 自定义图标加载表
 * 所有图标均从这里加载，方便管理
 */
import businessPeoples from '@/assets/icons/business-peoples.svg?inline'
import loginFail from '@/assets/icons/login-fail.svg?inline'

export { businessPeoples, loginFail, crm, dh, office, sell, man, girl, empty }

```
2. 引用(`当成组件使用`)
```javascript 
<template>
...
  <empty class="empty-icon" />
</template>

import { empty } from '@/core/icons'
<script>
...
components: {
  empty
}
</script>

```

### :truck: 路由和菜单
路由和菜单是组织起一个应用的关键骨架，为了方便管理，使用了中心化的方式，在 router.config.js 统一配置和管理。

###  :bulb: 路由
<!-- 目前脚手架中所有的路由都通过 <font color = #1890ff size=3 face="STCAIYUN">router.config.js</font> 来统一管理，在  `vue-router` 的配置中我们增加了一些参数，如 `hideChildrenInMenu`,`meta.title`,`meta.icon`,`meta.permission`，来辅助生成菜单。其中： -->

  * hideChildrenInMenu 用于隐藏不需要在菜单中展示的子路由。用法可以查看 个人设置 的配置。
  * meta.title 和 meta.icon分别代表生成菜单项的文本和图标。
  * meta.permission 用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示 *（默认情况下）。
### :orange_book: 菜单
菜单根据 <htmlFont color = "#1890ff" size={3} face="STCAIYUN">router.config.js</htmlFont>  生成，具体逻辑在 `src/store/modules/permission.js` 中的 `actions.GenerateRoutes` 方法实现。

如果你需要从服务器请求菜单，你可以参考 权限管理&动态菜单
<!-- ### :dress: 样式 -->
#### src/assets/mixin.less
这里可以放置一些工具函数供调用，比如清除浮动 `.clearfix`。

## :money_with_wings: 财务

### 按钮权限
| 查看 | 新增 | 编辑 | 删除   | 审核  | 记账     | 签字     | 取消记账   | 导入   | 导出   | 打印  | 期初      | 明细   | 红冲   | 设置    | 引入   |
| ---- | ---- | ---- | ------ | ----- | -------- | -------- | ---------- | ------ | ------ | ----- | --------- | ------ | ------ | ------- | ------ |
| view | add  | edit | delete | audit | bookkeep | signname | unbookkeep | import | export | print | beginning | detail | revoke | setting | import |

使用：
```javascript 

// 1.默认按钮权限使用
 <a-button @click="printHandler" v-action.del="'print'">打印</a-button>
// 2.权限按钮禁用状态使用   pKey: 为控制disable的变量  pName：权限关键字
 <a-button  @click="editExcer(row)" :disabled="disabledEdit"  v-action="{ pKey: 'disabledEdit', pName: 'edit' }">编辑</a-button>
  editExcer () {
  if (this.disabledEdit) return // 使用第二种 建议在对应方法上加个这个判断 防止在html上手动取消disable属性后 事件触发情况
  ...
  }
```

```javascript

this.permission = this.$route.meta?.permission?.map(item => item.componentId) // 获取当前页权限
this.hasEditPermission = this.permission.includes('edit') // 判断是否有编辑权限  ['edit', 'view', 'import', 'delete', 'export']
```

## 规范
![](https://whimuc.com/RcRzFCiGikmGpkUZDzPzc6/EvNLzS8V8F9MVy.png)
#### 路由名
> 路由名应该使用 `kebab-case` 命名规范，例如：`my-page`。这样可以确保路由名称在 URL 中使用时易于阅读和识别。
```js
{
  path: 'project-list',
  name: 'ProjectList',
  meta: { title: '项目列表', nav: 'courseList' },
  component: () => import('@/views/home/pages/project/list/List'),
}
```
# :hammer: 构建和发布
当项目开发完毕，只需要运行一行命令就可以打包你的应用：
```javascript
$ yarn build
or
$ npm run build
```
:zap:[权限管理](./permisson.md)
## 0.0.2 (2021-05-08)
## feature/0.0.11:消息中心(2021-11-24)

### Features

* api 方法补充，防止报错。 ([c30a701](http://gitlab.facehand.cn/weiwei/web-platform/commit/c30a7013e19299bd0738506492023834ecd5052e))
* api/user.js修改 ([38ebcef](http://gitlab.facehand.cn/weiwei/web-platform/commit/38ebcefbc53c2a036f5a66f9e12333c0e595f200))
* api/user新增方法 ([81bb33a](http://gitlab.facehand.cn/weiwei/web-platform/commit/81bb33a470bae08d8c5a9873d73354a9321410be))
* api代理 ([bd797e1](http://gitlab.facehand.cn/weiwei/web-platform/commit/bd797e1e349b939cd50effacd6bf11e20e750a38))
* api代理 ([068105b](http://gitlab.facehand.cn/weiwei/web-platform/commit/068105bf2ab832ad4dc1f09e48a7991097e73959))
* api前缀添加 ([00ec66d](http://gitlab.facehand.cn/weiwei/web-platform/commit/00ec66dd4d01aac6f7897ac34abde904cee00598))
* app模块路由name修改 ([0df7fc0](http://gitlab.facehand.cn/weiwei/web-platform/commit/0df7fc09795b79383623e9757ca3b5f102d6668f))
* auth_code ([ae19c7f](http://gitlab.facehand.cn/weiwei/web-platform/commit/ae19c7fb1c658943283a893cb7400ef502e6c360))
* auth_code ([3ced507](http://gitlab.facehand.cn/weiwei/web-platform/commit/3ced5077a66edea5845f688fffc140a0839325b8))
* commit 提交代码检查 ([abd84f4](http://gitlab.facehand.cn/weiwei/web-platform/commit/abd84f4047bd573727625b0dc1d675b7555112db))
* commit提交检查 ([eb2a7be](http://gitlab.facehand.cn/weiwei/web-platform/commit/eb2a7be261203fd2a601211c6f24e26593ab072c))
* components文件结构更改 ([bec5b88](http://gitlab.facehand.cn/weiwei/web-platform/commit/bec5b88648a08415e3506797a2bfef7c686c7dba))
* console.log ([c8bd445](http://gitlab.facehand.cn/weiwei/web-platform/commit/c8bd44574ab62ab2c6d7c511db4394fe6399d3a4))
* default-layout修改 ([ea31b43](http://gitlab.facehand.cn/weiwei/web-platform/commit/ea31b43c183291b5f5a9630ceebfd75455881474))
* delete aimage ([c1b3d26](http://gitlab.facehand.cn/weiwei/web-platform/commit/c1b3d2612b4463e46cab8ffd16c319cf2bf39ad8))
* directive模块添加 ([a0153e0](http://gitlab.facehand.cn/weiwei/web-platform/commit/a0153e0d32970ab5410d095224e00089f190758c))
* globalHeader ([9795380](http://gitlab.facehand.cn/weiwei/web-platform/commit/9795380ced516eab2bda12253a60da5a388d5969))
* hash ([62b313b](http://gitlab.facehand.cn/weiwei/web-platform/commit/62b313b937c37e3b54c3034137ed58a820a6307a))
* icon地址更新 ([4a26704](http://gitlab.facehand.cn/weiwei/web-platform/commit/4a267043082c9eefa1559ec2da3d3d941d6cdf63))
* input 正整数指令 ([058349d](http://gitlab.facehand.cn/weiwei/web-platform/commit/058349ddc32fe0314e3d5e921e7868aea092e66a))
* layout ([86bac5f](http://gitlab.facehand.cn/weiwei/web-platform/commit/86bac5fbd075b01adb0b44eb45a135df3c2e0a32))
* list页面调整 ([8c5e128](http://gitlab.facehand.cn/weiwei/web-platform/commit/8c5e128780fcf5294ed5046a1b885299dba14059))
* merge ([ff1e1c3](http://gitlab.facehand.cn/weiwei/web-platform/commit/ff1e1c3c8527cd29b9dd6c6d1c016be0a718c960))
* merge ([68a5800](http://gitlab.facehand.cn/weiwei/web-platform/commit/68a5800caea2d678c417e29b421f38bb49dc1170))
* mock delay ([f3dd344](http://gitlab.facehand.cn/weiwei/web-platform/commit/f3dd34455278e6c5e0456e76bd3666a2f2a37680))
* request.js修改 ([a74e7bd](http://gitlab.facehand.cn/weiwei/web-platform/commit/a74e7bd469c6bea1d31c3e9e8807721d304eac31))
* table filter ([14ece2d](http://gitlab.facehand.cn/weiwei/web-platform/commit/14ece2de52ef5001805074098df7d02525b6cd9d))
* Transition ([238ef9f](http://gitlab.facehand.cn/weiwei/web-platform/commit/238ef9fc80d790f1ab1d94abf526e91c127f09be))
* version ([400a4a5](http://gitlab.facehand.cn/weiwei/web-platform/commit/400a4a51da08982c39ce64d79682e90efec186a2))
* 住址架构 ([766196d](http://gitlab.facehand.cn/weiwei/web-platform/commit/766196d75893e28cca24de1ad3ced720557bf757))
* 修复 defaultLayout 中 logo 显示问题、 ([c3b8236](http://gitlab.facehand.cn/weiwei/web-platform/commit/c3b8236f66daaa6c70af490f646564f24f67cd57))
* 修复svg 中无用的 title ([450e0f3](http://gitlab.facehand.cn/weiwei/web-platform/commit/450e0f3f5cef7261e5985f5a56742219e2488773))
* 修复修改公司名称错误检测 ([0bb8629](http://gitlab.facehand.cn/weiwei/web-platform/commit/0bb8629bea2d520228efa64bec8a2c7cb3f2fbe7))
* 修复初始地址。 ([7e0b0be](http://gitlab.facehand.cn/weiwei/web-platform/commit/7e0b0be1f73dbc2c152c26d83310029258bac6ef))
* 修复登录 ([d62fb9e](http://gitlab.facehand.cn/weiwei/web-platform/commit/d62fb9eeb8f10d82234145b65a7357b677fa8a59))
* 修复登录 ([cb6689f](http://gitlab.facehand.cn/weiwei/web-platform/commit/cb6689f9606b92d677f28cf7a2c2a8aac2f97813))
* 修复登录跳转 ([b07ef70](http://gitlab.facehand.cn/weiwei/web-platform/commit/b07ef70097c53e5feb76a05b454da0beaa470efb))
* 修复省市区选择问题，增加 inputInteger 指令参数可自定义正则功能。保存功能增加 loading。 ([2e02dd5](http://gitlab.facehand.cn/weiwei/web-platform/commit/2e02dd5a77e36c0a6281ed4ea4542c3112dc81d9))
* 修复选人 bug ([33b4ae3](http://gitlab.facehand.cn/weiwei/web-platform/commit/33b4ae343d431c4ee3521d7217fa0e7b42f9af21))
* 修改 ([d26af45](http://gitlab.facehand.cn/weiwei/web-platform/commit/d26af457b543a11067af7180b50ff0e23eda4328))
* 修改头像文件名 ([2aff672](http://gitlab.facehand.cn/weiwei/web-platform/commit/2aff67280442cb4e08636ec8e8bb81c017a98784))
* 修改数字输入指令修改 ([eb80780](http://gitlab.facehand.cn/weiwei/web-platform/commit/eb807809063a57db6926fa158821e30775f29354))
* 修改文字颜色以及背景色 ([c21f0aa](http://gitlab.facehand.cn/weiwei/web-platform/commit/c21f0aae34a8bf0ec538c73e5950bffd384ad027))
* 修改登录相关。 ([189de47](http://gitlab.facehand.cn/weiwei/web-platform/commit/189de471253332fb45e3bb5c86a5617657820c35))
* 修改登录结果页样式。 ([5a58871](http://gitlab.facehand.cn/weiwei/web-platform/commit/5a588715f8212abb770af8a783a40a336672f6f2))
* 列表交互修改 ([c75e2d8](http://gitlab.facehand.cn/weiwei/web-platform/commit/c75e2d886065b6b506f9af7be7358c81bd326a5b))
* 列表修改 ([754ea52](http://gitlab.facehand.cn/weiwei/web-platform/commit/754ea52f67d144493ea60cf714de9f00d11eebb2))
* 列表页筛选过滤 ([ba59fec](http://gitlab.facehand.cn/weiwei/web-platform/commit/ba59fecad902257cef62eb2ad512af5e06d1b25f))
* 删除 console ([a3dd74f](http://gitlab.facehand.cn/weiwei/web-platform/commit/a3dd74f6314078a721bbb2822eb7e50ef8c0504a))
* 去掉了 icon 自动高度的功能。 ([ce7f2c7](http://gitlab.facehand.cn/weiwei/web-platform/commit/ce7f2c72cb90538de777533d645774d46af4bc6d))
* 右侧咨询有修改, 应用注册逻辑完善 ([e7260e2](http://gitlab.facehand.cn/weiwei/web-platform/commit/e7260e256d0cee538df619def26774997ddb8bed))
* 员工列表/新增接口对接 ([c94bebe](http://gitlab.facehand.cn/weiwei/web-platform/commit/c94bebe436dfeea80a3bf2cc053f09ef607a78dc))
* 员工列表接口参数调整 ([d1620ba](http://gitlab.facehand.cn/weiwei/web-platform/commit/d1620baf9c1a08f7cdf8a104552b0518cbc8101a))
* 员工列表接口对接 ([ab8827d](http://gitlab.facehand.cn/weiwei/web-platform/commit/ab8827d79dd59f56b333471733ccfddeb8f132c3))
* 员工详情/新增/编辑修改 ([0df3e06](http://gitlab.facehand.cn/weiwei/web-platform/commit/0df3e06c76b2afd01897af6656cfe45b52fcd2f9))
* 地图优化，组织架构优化。 ([0ee3e27](http://gitlab.facehand.cn/weiwei/web-platform/commit/0ee3e278f70b4bb7e2b3f0eea068409aa60cbb4d))
* 增加接口。 ([47cdfa5](http://gitlab.facehand.cn/weiwei/web-platform/commit/47cdfa50320089c452cc185c18f855b9f4386d81))
* 增加登录功能 ([a471a64](http://gitlab.facehand.cn/weiwei/web-platform/commit/a471a640493dd36fc0c0a694c897d4dcd1fd2eaa))
* 增加省市区组件说明 ([e928803](http://gitlab.facehand.cn/weiwei/web-platform/commit/e92880385d91f1a9535fdc854c1e128925bac17c))
* 头部跳转 ([3e19bbc](http://gitlab.facehand.cn/weiwei/web-platform/commit/3e19bbce5fc0f6043e68aaa204d1d2a6e2f7519c))
* 安装应用接口mock ([8aea833](http://gitlab.facehand.cn/weiwei/web-platform/commit/8aea833f31c156d3fe7d8dd5318ab3c410184e73))
* 安装应用样式 ([e49c1cc](http://gitlab.facehand.cn/weiwei/web-platform/commit/e49c1cc089e76b0bb2a91380654d0ade8805984b))
* 安装应用返回值 ([7334589](http://gitlab.facehand.cn/weiwei/web-platform/commit/733458972e67cff277f598693523f1de86aba693))
* 安装应用页安装按钮 ([d5abf8f](http://gitlab.facehand.cn/weiwei/web-platform/commit/d5abf8f690d2d043f7a27edbb7fbfac064b40ff5))
* 完善登录 ([1deb6b3](http://gitlab.facehand.cn/weiwei/web-platform/commit/1deb6b38677d977a96be31620f8019d48f7b12cc))
* 导航 ([7ec46bf](http://gitlab.facehand.cn/weiwei/web-platform/commit/7ec46bf1d3030befc2040abcec3266bc90719ee3))
* 打包 ([972d783](http://gitlab.facehand.cn/weiwei/web-platform/commit/972d78369e787e469144dcd6df87798f6db1761e))
* 指令 ([3bc2d44](http://gitlab.facehand.cn/weiwei/web-platform/commit/3bc2d44cbe9ea114cfd6ad7603f2ca0fa18d837a))
* 指令引入方式 ([2e2e068](http://gitlab.facehand.cn/weiwei/web-platform/commit/2e2e068a971d4bd5a67e3295730166dacb62cbba))
* 接入首页七莫在线客服； ([17e30e2](http://gitlab.facehand.cn/weiwei/web-platform/commit/17e30e2b469264e4398591d1453cbdf2c99c2456))
* 接口修改，组织树点击事件返回结果。 ([96f6474](http://gitlab.facehand.cn/weiwei/web-platform/commit/96f6474a530b0b49de7d17c012ccbcedd5a23260))
* 接口调整，小弹窗功能调整。 ([083c184](http://gitlab.facehand.cn/weiwei/web-platform/commit/083c184a60b253f0ad8d01db30b6239863945eb8))
* 文件命名 ([4bbfa34](http://gitlab.facehand.cn/weiwei/web-platform/commit/4bbfa34d481386e3bada7620664d6ee7badf66e2))
* 新增 iconFontBox 组件说明，修复 layout 已知bug。 ([ae81690](http://gitlab.facehand.cn/weiwei/web-platform/commit/ae816909e35433de192d97a00e67a64c4b08aad5))
* 新增整数自定义指令 ([a26ba8d](http://gitlab.facehand.cn/weiwei/web-platform/commit/a26ba8db918b3d6882c19cf1eafd7f6abb81290a))
* 新增用户编辑 ([c8d90a1](http://gitlab.facehand.cn/weiwei/web-platform/commit/c8d90a1fdf36c8d61cd522e53ea0e2f340aa57fe))
* 新增组织机构路由 ([06cee36](http://gitlab.facehand.cn/weiwei/web-platform/commit/06cee361bc7b9333076d0bd2bfe407825bb62b80))
* 新增编辑用户 ([880fd36](http://gitlab.facehand.cn/weiwei/web-platform/commit/880fd368a6177c545cd2f8acb09df4b62e65cdb7))
* 新增自定义指令 ([3b7d7b1](http://gitlab.facehand.cn/weiwei/web-platform/commit/3b7d7b1d764fcbacb449ef5b8bb0568cbfd2ce99))
* 新增设置/组织架构模块 ([8e75a82](http://gitlab.facehand.cn/weiwei/web-platform/commit/8e75a8242d300e39e2b4d0429249d0b1afa74333))
* 新增部门全局组件 ([23170da](http://gitlab.facehand.cn/weiwei/web-platform/commit/23170da659e1e80d50144eb67c15f83422446a62))
* 新建组织架构的组件结构。 ([7f1003d](http://gitlab.facehand.cn/weiwei/web-platform/commit/7f1003d925d7971b00e5dde1b86d6b71176a6ba6))
* 机构列表修改 ([301a6e9](http://gitlab.facehand.cn/weiwei/web-platform/commit/301a6e91f2dc00de32bc73a6f0ee5b16e85f4f5d))
* 格式化 ([d81e172](http://gitlab.facehand.cn/weiwei/web-platform/commit/d81e17202ad70f6c93ccad4bb96b6c62c4957153))
* 注册也ui修改 ([7daea6f](http://gitlab.facehand.cn/weiwei/web-platform/commit/7daea6fe473997cfb3723208a3a408570eff9a2a))
* 注册修改 ([4599067](http://gitlab.facehand.cn/weiwei/web-platform/commit/45990676abe2755942bb3775904a027a402e7c5c))
* 注册接口对接 ([b1dc448](http://gitlab.facehand.cn/weiwei/web-platform/commit/b1dc44852cf2f0a010e5dbf875a4c68fd3f17ffd))
* 注册接口调整 ([fb197dd](http://gitlab.facehand.cn/weiwei/web-platform/commit/fb197dd1dc43ba3c4060aa30d5bc541e90369bd4))
* 注册逻辑新增 ([9eff2ad](http://gitlab.facehand.cn/weiwei/web-platform/commit/9eff2adfce967d1241a3b72ea081de3a54defd01))
* 注册验证码修改 ([3584858](http://gitlab.facehand.cn/weiwei/web-platform/commit/3584858b196f7c6c6500d4df63130d770abee22e))
* 添加api/common模块 ([6412b16](http://gitlab.facehand.cn/weiwei/web-platform/commit/6412b1637b66f0834dd2137a42811d350df7375e))
* 添加cz-conventional-changelog ([887b0c2](http://gitlab.facehand.cn/weiwei/web-platform/commit/887b0c2de88fb3cab5d8a7a10069a880d912615b))
* 添加修改员工自动保存 ([322b9e5](http://gitlab.facehand.cn/weiwei/web-platform/commit/322b9e5ff5a69a4a1eb01abe0f8ba0a919091c35))
* 添加安装应用页面 ([a55085f](http://gitlab.facehand.cn/weiwei/web-platform/commit/a55085fa72b6714b29bf11dab175388f812ce3c5))
* 添加注释 ([fef654d](http://gitlab.facehand.cn/weiwei/web-platform/commit/fef654d9d8c0445732546b5b6f6a4af1aaae88f2))
* 添加用户修改 ([299d18e](http://gitlab.facehand.cn/weiwei/web-platform/commit/299d18ef4d8ec98f6a7bace00967625a80ca70a5))
* 清除默认注册手机号 ([b28080b](http://gitlab.facehand.cn/weiwei/web-platform/commit/b28080bf91395301d23addaf0e3bd1c6d71c1864))
* 用户列表修改 ([2b57b97](http://gitlab.facehand.cn/weiwei/web-platform/commit/2b57b97656f113c34ac2894fd3985d7c82f5abb8))
* 用户新增修改字段对应到Api ([2a09c10](http://gitlab.facehand.cn/weiwei/web-platform/commit/2a09c1047ba92ade1deea7832ab9e82e48865cb9))
* 用户编辑修改 ([14ace16](http://gitlab.facehand.cn/weiwei/web-platform/commit/14ace16ce3d49644d174e016e2e1376d7d486fd8))
* 用户编辑修改 ([65187ad](http://gitlab.facehand.cn/weiwei/web-platform/commit/65187adc77647b15634be5583646696b367504e8))
* 用户详情修改 ([8cd259a](http://gitlab.facehand.cn/weiwei/web-platform/commit/8cd259a3fd15639e1f3fc08bd5818e371e110cc2))
* 用户详情修改 ([27d0c7a](http://gitlab.facehand.cn/weiwei/web-platform/commit/27d0c7a3a3f1c245f9b0546bb0dad766f439d00f))
* 用户详情修改 ([6495054](http://gitlab.facehand.cn/weiwei/web-platform/commit/6495054127fbfcd80fb0ebea5213c716c0bc4d4c))
* 登录 ([90cd812](http://gitlab.facehand.cn/weiwei/web-platform/commit/90cd812e1d4491dbee685d97315fa23315172be0))
* 登录 ([5614978](http://gitlab.facehand.cn/weiwei/web-platform/commit/56149785673053f7aa7383b85574fc0c7dc4e997))
* 登录 ([281a8fa](http://gitlab.facehand.cn/weiwei/web-platform/commit/281a8fa58fbc18b543654e92b29157c64e5b54c9))
* 登录。 ([1462923](http://gitlab.facehand.cn/weiwei/web-platform/commit/146292346402d53c78ee721009802b134fc7ae6d))
* 登录模块。 ([e48f3fe](http://gitlab.facehand.cn/weiwei/web-platform/commit/e48f3fe7eb475121d20ed81e04ad6b1360f26278))
* 登录结果页按钮功能。 ([7d6584d](http://gitlab.facehand.cn/weiwei/web-platform/commit/7d6584dd11a3452b116a1b94e16fb5d38f98498e))
* 登录首页。 ([5a42c02](http://gitlab.facehand.cn/weiwei/web-platform/commit/5a42c029e14bf9118ed71a9a4f0ebf9cf64d0e70))
* 目录调整 ([01754fb](http://gitlab.facehand.cn/weiwei/web-platform/commit/01754fbaef7d380cc30d5d146e3b0c41de8d4e9c))
* 目录调整 ([0d140c5](http://gitlab.facehand.cn/weiwei/web-platform/commit/0d140c54614e253639413427b71cece57dabdda4))
* 省市区 宽度 ([676aee7](http://gitlab.facehand.cn/weiwei/web-platform/commit/676aee7ad7647adbd095bf1e6c23aabe5dbdd732))
* 省市区三级联动，地图搜索 bug 修复。 ([ae1f2ae](http://gitlab.facehand.cn/weiwei/web-platform/commit/ae1f2ae0879099708a41498d08dbfa0b513ef784))
* 省市区反查 ([456f77d](http://gitlab.facehand.cn/weiwei/web-platform/commit/456f77d0fc1f6cfc7e88f1a24f52968ff5a66189))
* 筛选条件 ([dc85e8c](http://gitlab.facehand.cn/weiwei/web-platform/commit/dc85e8c53678c2c3367494e8c6355454a3ef9462))
* 组件名称修改。 ([229b38f](http://gitlab.facehand.cn/weiwei/web-platform/commit/229b38fccc87474636c95408a94e9675049f9ec8))
* 组件命名 ([344c89e](http://gitlab.facehand.cn/weiwei/web-platform/commit/344c89e094b14941e8a69ea2ed9fccc61e07dd7d))
* 组织机构ui添加 ([13a23e2](http://gitlab.facehand.cn/weiwei/web-platform/commit/13a23e23fe3fa5017d8969fe7d8b4d8c4efbd74b))
* 组织架构 select 回调。 ([3980a4d](http://gitlab.facehand.cn/weiwei/web-platform/commit/3980a4dfefbd30090484082c5ef41a4eb946d2fa))
* 组织架构table ([a11c523](http://gitlab.facehand.cn/weiwei/web-platform/commit/a11c523796524f290e37050a577737d456f5e5aa))
* 组织架构修改 ([55f6f4e](http://gitlab.facehand.cn/weiwei/web-platform/commit/55f6f4e4388b22af8de71423c6930f878b4c0538))
* 组织架构功能添加 ([47f9a3a](http://gitlab.facehand.cn/weiwei/web-platform/commit/47f9a3a4cbe1c9d7133b509a115c51d798547eec))
* 组织架构基础接口 ([1564a96](http://gitlab.facehand.cn/weiwei/web-platform/commit/1564a96adba248768f5e65279cba7975857d440e))
* 组织架构完善 ([2f0360a](http://gitlab.facehand.cn/weiwei/web-platform/commit/2f0360ad41b08cd243697f7838d7c14a40a63778))
* 组织结构树 ([f1f261d](http://gitlab.facehand.cn/weiwei/web-platform/commit/f1f261d9cf1c1289d08abeec2ea369b5008d319c))
* 编辑用户信息修改 ([0163bb7](http://gitlab.facehand.cn/weiwei/web-platform/commit/0163bb725670eedafd9c28ba4a9b94c1c6e16e4e))
* 编辑用户修改 ([858e5df](http://gitlab.facehand.cn/weiwei/web-platform/commit/858e5df0f0c861656fe452adff5f3defcc8e9b4c))
* 自定义数字指令修改 ([e2269e8](http://gitlab.facehand.cn/weiwei/web-platform/commit/e2269e8987547baea7c001ff4e4c7503b33fa743))
* 表单增加验证。 ([efac9ad](http://gitlab.facehand.cn/weiwei/web-platform/commit/efac9adbf8418c64e38b1d2e30ab45f834f94d38))
* 详情数据模拟 ([9c95356](http://gitlab.facehand.cn/weiwei/web-platform/commit/9c9535662eaed8733d69451c60db82aff62a8c7d))
* 账户注册交互修改 ([f72e1e3](http://gitlab.facehand.cn/weiwei/web-platform/commit/f72e1e3279ba41d5b1209adb04cd6743c6efb667))
* 选择登录范围修改 ([94158f5](http://gitlab.facehand.cn/weiwei/web-platform/commit/94158f57e838f3d92cb2fa1902692c6b83d904ef))
* 通讯录 ([be8ab0c](http://gitlab.facehand.cn/weiwei/web-platform/commit/be8ab0c7b22448ca721d86656eb1355a990a5a54))
* 通讯录 ([b632801](http://gitlab.facehand.cn/weiwei/web-platform/commit/b632801a45b00f36df01f73491a27d31d590ea21))
* 通讯录 ([6088ef2](http://gitlab.facehand.cn/weiwei/web-platform/commit/6088ef25aa565b055a13727fc0e639118225cf05))
* 通讯录 ([c4efbe7](http://gitlab.facehand.cn/weiwei/web-platform/commit/c4efbe74523e982cc5ca107b6cb188863ff92382))
* 通讯录 ([4923d1e](http://gitlab.facehand.cn/weiwei/web-platform/commit/4923d1e4c35aa26b968027fa72a086300ba2ab75))
* 通讯录 ([605cfd0](http://gitlab.facehand.cn/weiwei/web-platform/commit/605cfd00b1ede2089ca52521cdd91c5aaeb2f0d6))
* 通讯录 ([a5b1030](http://gitlab.facehand.cn/weiwei/web-platform/commit/a5b103042d576bf0ca276f26cb4edb32d3073689))
* 通讯录 ([12083f9](http://gitlab.facehand.cn/weiwei/web-platform/commit/12083f948c8703945492804a59f60cdea74ad832))
* 通讯录 ([f6f0386](http://gitlab.facehand.cn/weiwei/web-platform/commit/f6f0386297c7dd51117cf72b8cfecdead9235ed7))
* 通讯录 ([1a050a0](http://gitlab.facehand.cn/weiwei/web-platform/commit/1a050a0ba65b0e48eb972cfb5a80f5e9bbd93b60))
* 通讯录 ([df00c63](http://gitlab.facehand.cn/weiwei/web-platform/commit/df00c63759202cc19d1eae85b5bf6abd72624047))
* 项目初始化 ([2b8f8ba](http://gitlab.facehand.cn/weiwei/web-platform/commit/2b8f8baf431560bd90382fbb6658e3535dbee697))
* 首页修改 ([eb0589e](http://gitlab.facehand.cn/weiwei/web-platform/commit/eb0589e5423d1270955c400f45b8c98db46aeef5))
* 首页修改 ([e95a200](http://gitlab.facehand.cn/weiwei/web-platform/commit/e95a20028458eb3f25e7544760c471bf681a0f36))
* 首页滚动修改 ([e5e41ff](http://gitlab.facehand.cn/weiwei/web-platform/commit/e5e41ffdf7c7ee5c6d1e579600e6d2c0753094f5))
* 高德地图。用户选择。 ([4b33f02](http://gitlab.facehand.cn/weiwei/web-platform/commit/4b33f0234d6c6883503e7fffa7ff50417f4c5e91))



