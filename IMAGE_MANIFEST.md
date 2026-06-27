# 《夜晚的另一面》图片生成清单与素材规范

本文件用于 Phase 3B：只建立图片清单、命名规范、路径规范和后续 `story.js` 的 `src` 替换位置。当前阶段不生成图片、不接入真实图片、不修改正文、不修改颜色、不制作图表。

## 统一视觉风格

- 数据新闻网页插画风，服务于滚动叙事和节点卡片结构。
- 夜晚城市主题，整体偏蓝紫夜色，但不要全紫。
- 局部使用暖黄色灯光、橙色窗光、霓虹边缘光，形成城市夜间层次。
- 画面干净、有设计感，可带轻微颗粒质感。
- 不要过度写实，不要杂乱，不要做成普通旅游海报。
- 适合当前 K-pop 壳子的贴纸感、节点卡片感和章节封面感。
- 人物保持 Q 版平涂 / 半扁平插画风。
- 所有图片不要出现真实品牌 Logo。
- 不要出现可识别真实人物。
- 不要出现多余文字，除非图片说明中特别要求。

## 资源目录

图片统一放在 `static/assets/images/` 下。`story.js` 中引用时使用站点根路径，不使用 Windows 本地绝对路径。

| 目录 | 用途 | `story.js` 路径写法示例 |
| --- | --- | --- |
| `static/assets/images/hero/` | Hero 首屏主视觉 | `/assets/images/hero/hero-night-other-side.png` |
| `static/assets/images/characters/` | 两位叙事者头像、后续 speaker avatar | `/assets/images/characters/xia-avatar.png` |
| `static/assets/images/covers/` | 各章节封面 | `/assets/images/covers/cover-intro-train-arrival.png` |
| `static/assets/images/scenes/` | 单张场景主图，主要对应 ImageBlock | `/assets/images/scenes/scene-liangmahe-cruise.png` |
| `static/assets/images/stacks/` | 组图，主要对应 ImageStack | `/assets/images/stacks/stack-sanlitun-close-tables.png` |
| `static/assets/images/cards/` | PropCard 道具图 | `/assets/images/cards/card-three-day-plan.png` |

## P0 图片：首屏和框架必须图

| 优先级 | 用途 | 文件名 | 路径 | 比例 | 对应 `story.js` 位置 | 画面内容 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P0 | Hero 主视觉 | `hero-night-other-side.png` | `/assets/images/hero/hero-night-other-side.png` | 16:9 或 21:9，优先 16:9 | `story.hero.image.src` | 北京夜晚总视觉，两个女孩站在城市夜色中，远处有河岸灯光、三里屯霓虹、剧场灯牌、长安街路灯和地图线索。整体像一张网页首页插画。 | 不要文字，不要真实品牌。 |
| P0 | 小夏头像 | `xia-avatar.png` | `/assets/images/characters/xia-avatar.png` | 1:1 | `story.hero.narrators[0].avatar.src`；后续也可用于对应 TextBlock 的 `speakerAvatar.src` | 短发或低马尾女孩，浅色外套、深蓝半裙，背相机，观察者气质。 | 透明底优先；如果系统不支持透明，则纯色浅底。 |
| P0 | 晚晚头像 | `wanwan-avatar.png` | `/assets/images/characters/wanwan-avatar.png` | 1:1 | `story.hero.narrators[1].avatar.src`；后续也可用于对应 TextBlock 的 `speakerAvatar.src` | 长发女孩，浅粉或奶油白上衣，帆布包，温柔但有好奇心，记录者气质。 | 透明底优先；如果系统不支持透明，则纯色浅底。 |
| P0 | intro 章节封面 | `cover-intro-train-arrival.png` | `/assets/images/covers/cover-intro-train-arrival.png` | 16:9 | `sections[id="intro"].cover.src` | 火车驶入北京，窗外城市灯光逐渐亮起，两个女孩在车窗边看向夜色。 | 作为开场章节封面。 |
| P0 | 亮马河章节封面 | `cover-liangmahe-blue-hour.png` | `/assets/images/covers/cover-liangmahe-blue-hour.png` | 16:9 | `sections[id="liangmahe"].cover.src` | 蓝调时刻的亮马河，游船、水岸绿道、树影、暖色灯光倒影。 | 需要突出河岸和水面。 |
| P0 | 三里屯章节封面 | `cover-sanlitun-neon.png` | `/assets/images/covers/cover-sanlitun-neon.png` | 16:9 | `sections[id="sanlitun"].cover.src` | 三里屯夜间街区，外摆、霓虹、人流、远处工体方向的城市光感。 | 不要品牌 Logo。 |
| P0 | 剧场章节封面 | `cover-theater-night.png` | `/assets/images/covers/cover-theater-night.png` | 16:9 | `sections[id="theater"].cover.src` | 北京小剧场夜间散场，观众在门口讨论、合影，暖色门灯和夜色形成对比。 | 体现文化消费和散场氛围。 |
| P0 | 长安街夜骑章节封面 | `cover-ride-changan.png` | `/assets/images/covers/cover-ride-changan.png` | 16:9 | `sections[id="ride"].cover.src` | 两个女孩骑共享单车经过长安街，路灯向远处延伸，画面轻盈、有夜风感。 | 避免真实车辆品牌。 |
| P0 | 全国八城章节封面 | `cover-cities-night-map.png` | `/assets/images/covers/cover-cities-night-map.png` | 16:9 | `sections[id="cities"].cover.src` | 中国地图或抽象城市地图，八个城市以灯点方式亮起，周围有代表性夜景元素。 | 不要做成严肃政区地图。 |

## P1 图片：章节叙事主图

| 优先级 | 用途 | 文件名 | 路径 | 比例 | 对应 `story.js` 位置 | 画面内容 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P1 | 亮马河夜航主场景 | `scene-liangmahe-cruise.png` | `/assets/images/scenes/scene-liangmahe-cruise.png` | 16:9 | `sections[id="liangmahe"].nodes[type="Image"].value.src` | 游船从河面经过，岸边有人散步、野餐、遛狗，体现“坐船与散步两种入口”。 | 对应 liangmahe 的主 ImageBlock。 |
| P1 | 三里屯 A 面主场景 | `scene-sanlitun-a-side.png` | `/assets/images/scenes/scene-sanlitun-a-side.png` | 16:9 | `sections[id="sanlitun"].nodes[type="Image"].value.src` | 外摆桌椅、酒杯、霓虹、人群聊天，热闹但干净。 | 不要真实品牌。 |
| P1 | 剧场散场主场景 | `scene-theater-after-show.png` | `/assets/images/scenes/scene-theater-after-show.png` | 16:9 | `sections[id="theater"].nodes[type="Image"].value.src` | 演出结束后，观众在剧场门口讨论、等车、拿票根合影。 | 对应 theater 的主 ImageBlock。 |
| P1 | 长安街夜骑主场景 | `scene-ride-changan-bike.png` | `/assets/images/scenes/scene-ride-changan-bike.png` | 16:9 | `sections[id="ride"].nodes[type="Image"].value.src` | 两个女孩夜骑，路灯、公交站、远处城市线条，强调“不消费的夜晚”。 | 对应 ride 的主 ImageBlock。 |
| P1 | 全国城市夜色组图主图 | `scene-cities-night-grid.png` | `/assets/images/scenes/scene-cities-night-grid.png` | 16:9 | 可作为 `sections[id="cities"]` 新增 ImageBlock 的 `value.src`，或后续替换 cities 章节组图的总视觉 | 多城市夜景拼贴感，上海、重庆、西安、长沙、成都、杭州、深圳、北京以不同小场景出现。 | 当前结构中 cities 主要是 ImageStack，此图可作为后续备用主图。 |

## P2 图片：组图与卡片道具图

| 优先级 | 用途 | 文件名 | 路径 | 比例 | 对应 `story.js` 位置 | 画面内容 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P2 | 三里屯 B 面组图：外摆收街 | `stack-sanlitun-close-tables.png` | `/assets/images/stacks/stack-sanlitun-close-tables.png` | 4:3 | `sections[id="sanlitun"].nodes[type="Images"].value.images[0].src` | 店员凌晨收拾外摆桌椅。 | ImageStack 单张图。 |
| P2 | 三里屯 B 面组图：派出所灯光 | `stack-sanlitun-police-light.png` | `/assets/images/stacks/stack-sanlitun-police-light.png` | 4:3 | `sections[id="sanlitun"].nodes[type="Images"].value.images[1].src` | 夜间派出所或警务站灯光仍亮，有人值守。 | 不要出现具体真实名称。 |
| P2 | 三里屯 B 面组图：环卫或安保 | `stack-sanlitun-cleaner-security.png` | `/assets/images/stacks/stack-sanlitun-cleaner-security.png` | 4:3 | `sections[id="sanlitun"].nodes[type="Images"].value.images[2].src` | 环卫工清扫街角，或安保夜间巡逻。 | 避免真实单位标识。 |
| P2 | 八城组图：上海 | `stack-city-shanghai.png` | `/assets/images/stacks/stack-city-shanghai.png` | 4:3 | `sections[id="cities"].nodes[type="Images"].value.images[0].src` | 外滩和东方明珠意象，夜间城市消费与演艺感。 | 城市意象即可，不需要真实摄影。 |
| P2 | 八城组图：重庆 | `stack-city-chongqing.png` | `/assets/images/stacks/stack-city-chongqing.png` | 4:3 | `sections[id="cities"].nodes[type="Images"].value.images[1].src` | 山城、江面、桥梁、夜游船、层叠灯光。 | 注意层次和江面夜景。 |
| P2 | 八城组图：西安 | `stack-city-xian.png` | `/assets/images/stacks/stack-city-xian.png` | 4:3 | `sections[id="cities"].nodes[type="Images"].value.images[2].src` | 大唐不夜城或唐风街区意象，历史 IP 与夜间人流。 | 不要出现真实店招。 |
| P2 | Card 道具图：三日夜游计划 | `card-three-day-plan.png` | `/assets/images/cards/card-three-day-plan.png` | 4:3 或 1:1 | `sections[id="intro"].nodes[type="Card"].value.image.src` | 手机备忘录、票根、地图路线、小星星标记，表现三日夜游计划。 | 不要出现可读真实 App 界面文字。 |
| P2 | Card 道具图：亮马河船票与绿道 | `card-liangmahe-ticket-greenway.png` | `/assets/images/cards/card-liangmahe-ticket-greenway.png` | 4:3 或 1:1 | `sections[id="liangmahe"].nodes[type="Card"].value.image.src` | 船票、水波、绿道线条、河岸标记。 | 作为道具卡。 |
| P2 | Card 道具图：剧场票根 | `card-theater-ticket.png` | `/assets/images/cards/card-theater-ticket.png` | 4:3 或 1:1 | `sections[id="theater"].nodes[type="Card"].value.image.src` | 票根、舞台帷幕、小灯泡、话筒或剧场座椅。 | 避免真实剧名。 |
| P2 | Card 道具图：夜间回家服务链 | `card-night-service-chain.png` | `/assets/images/cards/card-night-service-chain.png` | 4:3 或 1:1 | `sections[id="ride"].nodes[type="Card"].value.image.src` | 共享单车、夜班公交、路灯、代驾、路线节点组成一条服务链。 | 可以偏图解感。 |
| P2 | Card 道具图：八城类型图鉴 | `card-city-types.png` | `/assets/images/cards/card-city-types.png` | 4:3 或 1:1 | `sections[id="cities"].nodes[type="Card"].value.image.src` | 八个城市小图标围成图鉴卡，像收藏卡或地图图例。 | 适合后续与八城图表呼应。 |

## 文件命名规范

- 全部使用小写英文、数字和连字符：`scene-liangmahe-cruise.png`。
- 不使用空格、中文文件名、下划线或 Windows 特殊字符。
- 按用途加前缀：
  - `hero-`：首屏主视觉。
  - `xia-` / `wanwan-`：人物头像。
  - `cover-`：章节封面。
  - `scene-`：单图场景。
  - `stack-`：组图。
  - `card-`：卡片道具图。
- 默认导出 PNG。若后续需要压缩，可另行生成 WebP，但 `story.js` 路径需要同步改成 `.webp`。
- 章节封面和主场景优先 16:9；头像固定 1:1；组图固定 4:3；卡片道具图使用 4:3 或 1:1。

## `story.js` 对应替换位置

后续只需要把对应图片路径填入 `src` 字段，不要改组件结构。

| 图片 | 替换位置 |
| --- | --- |
| Hero 主视觉 | `story.hero.image.src` |
| 小夏头像 | `story.hero.narrators[0].avatar.src` |
| 晚晚头像 | `story.hero.narrators[1].avatar.src` |
| TextBlock 小夏头像 | 对应 Text node 的 `speakerAvatar.src` |
| TextBlock 晚晚头像 | 对应 Text node 的 `speakerAvatar.src` |
| intro 封面 | `sections[id="intro"].cover.src` |
| 亮马河封面 | `sections[id="liangmahe"].cover.src` |
| 三里屯封面 | `sections[id="sanlitun"].cover.src` |
| 剧场封面 | `sections[id="theater"].cover.src` |
| 长安街夜骑封面 | `sections[id="ride"].cover.src` |
| 全国八城封面 | `sections[id="cities"].cover.src` |
| 亮马河主图 | `sections[id="liangmahe"].nodes[type="Image"].value.src` |
| 三里屯主图 | `sections[id="sanlitun"].nodes[type="Image"].value.src` |
| 剧场主图 | `sections[id="theater"].nodes[type="Image"].value.src` |
| 长安街夜骑主图 | `sections[id="ride"].nodes[type="Image"].value.src` |
| 三里屯组图 | `sections[id="sanlitun"].nodes[type="Images"].value.images[]` |
| 全国八城组图 | `sections[id="cities"].nodes[type="Images"].value.images[]` |
| intro Card 道具图 | `sections[id="intro"].nodes[type="Card"].value.image.src` |
| 亮马河 Card 道具图 | `sections[id="liangmahe"].nodes[type="Card"].value.image.src` |
| 剧场 Card 道具图 | `sections[id="theater"].nodes[type="Card"].value.image.src` |
| 长安街夜骑 Card 道具图 | `sections[id="ride"].nodes[type="Card"].value.image.src` |
| 全国八城 Card 道具图 | `sections[id="cities"].nodes[type="Card"].value.image.src` |

## 后续接入建议

1. 先生成 P0：Hero、两位头像、六个章节封面。P0 会决定页面是否从 placeholder 进入完整叙事状态。
2. 再生成 P1：各章节主 ImageBlock。P1 会直接改善正文滚动节奏。
3. 最后生成 P2：ImageStack 和 PropCard 道具图。P2 可用于增强节点感、道具感和细节密度。
4. 图片生成完成后，将文件放入对应目录，再把 `story.js` 中对应 `src` 从空字符串替换为 `/assets/images/...` 路径。
5. 每次接入一批图片后，运行 dev 检查牵引线、章节封面高度、移动端裁切和图片 caption。
6. 如果图片内容含有文字、Logo、真实人物或真实店招，应重新生成或局部处理后再接入。
