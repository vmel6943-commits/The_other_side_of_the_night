# Phase 3C：P0 图片提示词文档

本文件用于后续批量生成《夜晚的另一面》P0 图片。当前阶段只整理提示词，不生成图片、不接入真实图片、不修改 `story.js`、不修改组件、不修改颜色、不制作图表。

## 统一风格总说明

本组图片用于数据新闻网页《夜晚的另一面》。整体为夜晚城市数据新闻插画风，适配 K-pop 壳子的贴纸感、节点卡片感和网页叙事感。风格应统一：半扁平插画、干净构图、轻微颗粒质感、夜蓝紫主调，但不要全紫；局部使用暖黄色灯光、橙色窗光、霓虹边缘光；画面清晰，有设计感，不要过度写实，不要杂乱。人物为 Q 版平涂或半扁平插画风，亲和、年轻、有新闻观察感。所有图片不要出现真实品牌 Logo，不要出现可识别真实人物，不要出现多余文字。

## 统一负面提示词

不要真实品牌 Logo，不要可识别真实人物，不要杂乱背景，不要低清晰度，不要过度写实，不要恐怖氛围，不要赛博朋克过重，不要满屏紫色，不要文字乱码，不要多余文字，不要错误肢体，不要夸张表情，不要塑料质感，不要照片拼贴感，不要强 AI 痕迹。

## P0 图片生成顺序

1. `xia-avatar.png`
2. `wanwan-avatar.png`
3. `hero-night-other-side.png`
4. `cover-intro-train-arrival.png`
5. `cover-liangmahe-blue-hour.png`
6. `cover-sanlitun-neon.png`
7. `cover-theater-night.png`
8. `cover-ride-changan.png`
9. `cover-cities-night-map.png`

原因：先确定人物形象，再生成 Hero 和章节封面，能保持两个女孩形象统一。

## P0-01 Hero 主视觉

| 项目 | 内容 |
| --- | --- |
| 文件名 | `hero-night-other-side.png` |
| 保存路径 | `static/assets/images/hero/hero-night-other-side.png` |
| 网页路径 | `/assets/images/hero/hero-night-other-side.png` |
| 比例 | 16:9 |
| 对应位置 | `story.hero.image.src` |

中文提示词：

北京夜晚总视觉插画，两个年轻女孩站在城市夜色中，像数据新闻网页首页主视觉。画面中融合北京夜晚的多个线索：远处有亮马河水岸灯光和游船，另一侧有三里屯街区的霓虹与外摆氛围，小剧场门口暖色灯牌，长安街路灯向远处延伸，地面有轻微地图路线线条连接这些夜游地点。两个女孩一位短发或低马尾、背相机，另一位长发、背帆布包，像正在观察城市夜晚。整体氛围温柔、安静但有城市活力。夜蓝紫主调，局部暖黄色灯光、橙色窗光、轻霓虹边缘光，半扁平插画风，干净构图，轻微颗粒质感，适合数据新闻网页首屏，高清，无文字，无真实品牌。

负面提示词：使用统一负面提示词。

## P0-02 小夏头像

| 项目 | 内容 |
| --- | --- |
| 文件名 | `xia-avatar.png` |
| 保存路径 | `static/assets/images/characters/xia-avatar.png` |
| 网页路径 | `/assets/images/characters/xia-avatar.png` |
| 比例 | 1:1 |
| 对应位置 | `story.hero.narrators[0].avatar.src` |

中文提示词：

小夏人物头像，年轻女孩，新闻观察者气质，短发或低马尾，浅色外套，深蓝色半裙或深蓝色下装，背着小相机或相机挂在胸前，神情专注、清爽、略带好奇。Q 版平涂插画风，半扁平人物设计，线条干净，五官亲和，不要幼稚，不要过度可爱。夜晚数据新闻网页角色头像，局部有暖黄色灯光边缘，整体色彩与夜蓝紫网页风格协调。透明背景优先，如无法透明则使用浅色纯背景。高清，无文字，无品牌。

负面提示词：使用统一负面提示词。

## P0-03 晚晚头像

| 项目 | 内容 |
| --- | --- |
| 文件名 | `wanwan-avatar.png` |
| 保存路径 | `static/assets/images/characters/wanwan-avatar.png` |
| 网页路径 | `/assets/images/characters/wanwan-avatar.png` |
| 比例 | 1:1 |
| 对应位置 | `story.hero.narrators[1].avatar.src` |

中文提示词：

晚晚人物头像，年轻女孩，记录者气质，长发，浅粉色或奶油白上衣，背帆布包，可以有小星星发夹或轻微夜晚元素点缀，神情温柔、好奇、善于观察，像在追问城市夜晚背后的故事。Q 版平涂插画风，半扁平人物设计，线条干净，五官亲和，不要幼稚，不要过度可爱。夜晚数据新闻网页角色头像，局部暖黄色灯光边缘，整体色彩与夜蓝紫网页风格协调。透明背景优先，如无法透明则使用浅色纯背景。高清，无文字，无品牌。

负面提示词：使用统一负面提示词。

## P0-04 Intro 章节封面

| 项目 | 内容 |
| --- | --- |
| 文件名 | `cover-intro-train-arrival.png` |
| 保存路径 | `static/assets/images/covers/cover-intro-train-arrival.png` |
| 网页路径 | `/assets/images/covers/cover-intro-train-arrival.png` |
| 比例 | 16:9 |
| 对应位置 | `sections[id="intro"].cover.src` |

中文提示词：

火车驶入北京的夜晚章节封面，车窗边坐着两个年轻女孩，一个拿着攻略或手机备忘录，一个趴在窗边看向外面的城市灯光。窗外是北京站或城市铁路进入北京的夜色意象，路灯和楼宇灯光一盏盏亮起，像星星一样散开。画面有“夜晚从什么时候开始”的叙事感，但不要出现文字。夜蓝紫色调，车厢内部有温暖黄光，窗外城市灯光柔和。半扁平插画风，数据新闻网页封面感，构图干净，有故事开端感，高清，无真实品牌，无文字。

负面提示词：使用统一负面提示词。

## P0-05 亮马河章节封面

| 项目 | 内容 |
| --- | --- |
| 文件名 | `cover-liangmahe-blue-hour.png` |
| 保存路径 | `static/assets/images/covers/cover-liangmahe-blue-hour.png` |
| 网页路径 | `/assets/images/covers/cover-liangmahe-blue-hour.png` |
| 比例 | 16:9 |
| 对应位置 | `sections[id="liangmahe"].cover.src` |

中文提示词：

蓝调时刻的亮马河夜晚章节封面，河面上有一艘暖光游船缓慢经过，水面倒映蓝紫夜色和金色灯光。两岸有绿道、树影、散步的人、遛狗的人、坐在台阶上聊天的人，体现“坐船是一种入口，散步也是一种入口”。画面安静、松弛、干净，有北京水岸公共空间的感觉。夜蓝紫主调，局部暖黄色窗光和路灯，轻微水波纹和颗粒质感。半扁平数据新闻插画风，高清，无真实品牌，无文字。

负面提示词：使用统一负面提示词。

## P0-06 三里屯章节封面

| 项目 | 内容 |
| --- | --- |
| 文件名 | `cover-sanlitun-neon.png` |
| 保存路径 | `static/assets/images/covers/cover-sanlitun-neon.png` |
| 网页路径 | `/assets/images/covers/cover-sanlitun-neon.png` |
| 比例 | 16:9 |
| 对应位置 | `sections[id="sanlitun"].cover.src` |

中文提示词：

三里屯夜间街区章节封面，夜晚的城市街道，有外摆桌椅、酒杯、年轻人聊天、霓虹灯牌、人流和远处城市建筑光感。画面表现热闹但不杂乱，不能出现真实品牌 Logo。街区有国际化、年轻、都市夜生活氛围，同时在远处或角落暗示安保、路灯、秩序感。夜蓝紫主调，霓虹边缘光，局部暖色灯光。半扁平插画风，适合数据新闻网页章节封面，高清，无文字，无品牌。

负面提示词：使用统一负面提示词。

## P0-07 剧场章节封面

| 项目 | 内容 |
| --- | --- |
| 文件名 | `cover-theater-night.png` |
| 保存路径 | `static/assets/images/covers/cover-theater-night.png` |
| 网页路径 | `/assets/images/covers/cover-theater-night.png` |
| 比例 | 16:9 |
| 对应位置 | `sections[id="theater"].cover.src` |

中文提示词：

北京小剧场夜间散场章节封面，剧场门口亮着温暖灯光，观众从门口走出来，有人拿着票根合影，有人站在门口讨论剧情，有人等车。画面不要喧闹，强调夜晚文化生活的余温。剧场门灯、票根、门口台阶、路边小店和夜色形成对比。夜蓝紫背景，暖黄色门灯，半扁平插画风，轻微颗粒质感，数据新闻网页章节封面，高清，无文字，无真实品牌。

负面提示词：使用统一负面提示词。

## P0-08 长安街夜骑章节封面

| 项目 | 内容 |
| --- | --- |
| 文件名 | `cover-ride-changan.png` |
| 保存路径 | `static/assets/images/covers/cover-ride-changan.png` |
| 网页路径 | `/assets/images/covers/cover-ride-changan.png` |
| 比例 | 16:9 |
| 对应位置 | `sections[id="ride"].cover.src` |

中文提示词：

长安街夜骑章节封面，两个年轻女孩骑共享单车经过宽阔的夜间街道，路灯一盏盏向远处延伸，画面有夜风感和轻盈感。远处有城市轮廓和夜班公交站意象，但不要出现具体政治建筑细节，不要真实品牌。整体表现“不消费的夜晚”和“安全回家路”。夜蓝紫主调，路灯暖黄，地面有柔和光影，半扁平插画风，干净构图，高清，无文字，无品牌。

负面提示词：使用统一负面提示词。

## P0-09 全国八城章节封面

| 项目 | 内容 |
| --- | --- |
| 文件名 | `cover-cities-night-map.png` |
| 保存路径 | `static/assets/images/covers/cover-cities-night-map.png` |
| 网页路径 | `/assets/images/covers/cover-cities-night-map.png` |
| 比例 | 16:9 |
| 对应位置 | `sections[id="cities"].cover.src` |

中文提示词：

全国八城夜经济章节封面，抽象中国城市夜色地图，不要做成严肃政区地图。地图上有八个城市灯点被点亮，周围分布小型夜景意象：北京公共空间和路灯、上海外滩城市光、重庆江面和桥、成都休闲街区、西安唐风灯火、长沙烟火夜市、杭州湖边夜色、深圳更新街区。整体像数据新闻结尾的城市类型图鉴。夜蓝紫背景，城市灯点暖黄，局部霓虹光，半扁平插画风，干净、有信息设计感，高清，无文字，无真实品牌。

负面提示词：使用统一负面提示词。
