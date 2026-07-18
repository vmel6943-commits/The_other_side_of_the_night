import { chartData } from "./chartData.js";

const themes = [
	{
		background: "#70B0F9 0%, #A5A5A5 50%, #F0F0F0 90%, #F1FD0F 100%",
		headingColor: "#ccffed",
		headingShadow:
			"-1px -1px 0 #262626, 1px -1px 0 #262626, -1px 1px 0 #262626, 1px 1px 0 #262626, 4px 4px 0 rgba(38, 38, 38, 1)",
		lineStroke: "#ccffed",
		textColor: "#262626",
		textBg: "#f2fafe",
		border: "#262626",
		boxShadow:
			"inset -4px -4px 0 rgba(0, 0, 0, .2), inset 4px 4px rgba(255, 255, 255, 0.6)",
		cardBg: "#f1fb39"
	},
	{
		background: "#F1FD0F 0%, #D21FB2 33%, #4162BE 63%, #DADAFF 86%, #000000 100%",
		headingColor: "#fffafc",
		headingShadow:
			"-1px -1px 0 #9F40B8, 1px -1px 0 #9F40B8, -1px 1px 0 #9F40B8, 1px 1px 0 #9F40B8, 0px 4px 24px #9F40B8",
		lineStroke: "#ffd6f0",
		textColor: "#9f40b8",
		textBg: "linear-gradient(to bottom right, #fffafc, #ffe8f1)",
		border: "#9f40b8",
		boxShadow: "0px 4px 24px #d255f3, inset 0px -6px 14px #d255f3",
		cardBg: "#fffafc"
	},
	{
		background: "#000000 0%, #000000 52%, #D04A4A 100%",
		headingColor: "#ffa9ff",
		headingShadow: "none",
		lineStroke: "#ffa9ff",
		textColor: "#ffa9ff",
		textBg: "rgba(0, 0, 0, 0.2)",
		border: "#ffa9ff",
		boxShadow: "0 0 0 6px rgba(255, 169, 255, .22)",
		cardBg: "rgba(0, 0, 0, 0.34)"
	},
	{
		background: "#D04A4A 0%, #02696F 50%, #5F5348 100%",
		headingColor: "#ffffff",
		headingShadow: "0px 0px 10px #ffffff",
		lineStroke: "#ffffff",
		textColor: "#ffffff",
		textBg: "rgba(255, 255, 255, 0.08)",
		border: "rgba(255,255,255,0.78)",
		boxShadow:
			"inset 50px -56px 64px rgba(163, 155, 255, 0.55), inset 20px -6px 34px #cfcfcf, inset 0px 4px 4px #ffffff, inset -60px 64px 104px rgba(98, 54, 255, .5)",
		cardBg: "rgba(255, 255, 255, 0.12)"
	},
	{
		background: "#5F5348 0%, #4167A1 12%, #245D25 62%, #68648A 100%",
		headingColor: "#ccffed",
		headingShadow: "none",
		lineStroke: "#ccffed",
		textColor: "#ccffed",
		textBg: "rgba(0, 0, 0, 0.16)",
		border: "#000000",
		boxShadow: "4px 4px 0px #ccffed, inset 0px 3px 20px #ccffed",
		cardBg: "rgba(255, 255, 255, 0.12)"
	},
	{
		background: "#68648A 0%, #606FA8 22%, #627FC8 48%, #73A7E5 78%, #7BB4EE 100%",
		headingColor: "#ccffed",
		headingShadow:
			"-1px -1px 0 #262626, 1px -1px 0 #262626, -1px 1px 0 #262626, 1px 1px 0 #262626, 4px 4px 0 rgba(38, 38, 38, 0.65)",
		lineStroke: "#ccffed",
		textColor: "#262626",
		textBg: "#f2fafe",
		border: "#262626",
		boxShadow:
			"inset -4px -4px 0 rgba(0, 0, 0, .2), inset 4px 4px rgba(255, 255, 255, 0.6)",
		cardBg: "#f1fb39"
	}
];

const section = ({ id, num, kicker, title, dek, cover, nodes }) => ({
	id,
	num: String(num).padStart(2, "0"),
	years: "北京夜游",
	theme: themes[(num - 1) % themes.length],
	kicker,
	title,
	dek,
	cover,
	nodes
});

export const story = {
	meta: {
		title: "夜晚的另一面",
		shortTitle: "夜晚的另一面",
		description: "两位观察者的三日夜游，读懂城市夜经济的 A 面与 B 面。",
		credits: "数据新闻作品《夜晚的另一面》"
	},
	nav: {
		brand: "夜晚的另一面",
		brandImage: "/assets/images/brand/nav-brand.png"
	},
	hero: {
		title: "夜晚的另一面",
		titleWords: ["夜晚", "的", "另一面"],
		label: "城市夜经济数据新闻",
		subtitle:
			"一场为期三日的城市夜游、两位观察者的沉浸式记录，让我们窥见城市夜经济的真实肌理。它从不是单一的灯火喧嚣，而是由灯光脉络、消费场景、城市服务、公共秩序与归家通路，层层托举起来的完整城市夜间生态。",
		bubbles: ["A 面", "B 面", "北京夜游", "回家路"],
		image: {
			src: "/assets/images/hero/hero-night-other-side.png",
			label: "北京夜晚总视觉",
			alt: "北京夜晚、两个女孩与城市灯光的总视觉插画"
		},
		narrators: [
			{
				id: "xia",
				name: "小夏",
				role: "观察者",
				bio: "携相机与社交平台攻略出发，最初只为捕捉北京夜色光鲜亮眼的 A 面图景，定格网红夜景的极致繁华。",
				avatar: {
					src: "/assets/images/characters/xia-avatar.png",
					label: "小夏头像",
					alt: "小夏人物头像"
				}
			},
			{
				id: "wanwan",
				name: "晚晚",
				role: "记录者",
				bio: "偏爱在人潮散去、喧嚣落幕时驻足停留，探寻璀璨夜景之下，城市夜间运转的底层逻辑与隐秘细节。",
				avatar: {
					src: "/assets/images/characters/wanwan-avatar.png",
					label: "晚晚头像",
					alt: "晚晚人物头像"
				}
			}
		]
	},
	sections: [
		section({
			id: "intro",
			num: 1,
			kicker: "出发",
			title: "夜晚从什么时候开始？",
			dek: "两位年轻人带着预设的夜游攻略奔赴北京，却在入夜后的城市街巷里，撞见了一套远超消费场景的、真实运转的城市夜间系统。",
			cover: {
				src: "/assets/images/covers/cover-intro-train-arrival.png",
				label: "火车抵达北京，路灯亮起",
				alt: "火车驶入北京站，城市灯光逐渐亮起"
			},
			nodes: [
				{
					type: "Text",
					speaker: "晚晚",
					variant: "dialogue",
					value: {
						align: "left",
						text: [
							"“你说，一座城市的夜晚，到底是从什么时候开始的？”",
							"火车驶入北京站时，暮色恰好浸染整座城市。晚晚倚在车窗边凝望，站台灯、路口灯、楼宇灯带次第亮起，点点星光铺满城市大地。彼时的她单纯以为，城市的夜晚，始于灯火亮起的瞬间。"
						]
					}
				},
				{
					type: "Text",
					speaker: "小夏",
					variant: "dialogue",
					value: {
						align: "right",
						text: [
							"“从霓虹灯亮起来开始？”",
							"小夏低头翻看着精心整理的夜游攻略，收藏夹里的关键词鲜活又热门：亮马河夜航、三里屯夜游、剧场观演、长安街夜骑，每一个点位都是社交平台上热度爆棚的城市夜景标签。",
							"她们本是奔赴一场标准化的城市夜游打卡：追逐热门场景、拍摄精美照片、收集可供分享的夜间片段，完成一次常规的城市休闲体验。"
						]
					}
				},
				{
					type: "Text",
					speaker: "旁白",
					variant: "aside",
					value: {
						align: "left",
						text: [
							"社交攻略描摹的，是城市夜晚光鲜的 A 面：摇曳的游船、微醺的酒杯、珍贵的演出票根、璀璨的沿街路灯、治愈的骑行晚风，皆是看得见、可记录、易传播的夜间美好。",
							"但城市真正的夜色，永远藏在繁华表象的背后。是谁维系彻夜灯火长明？是谁疏导涌动的夜间人潮？是谁在散场后复原街区样貌？是谁守候至深夜，目送最后一批游客离场？是谁筑牢安全底线，守护每一个人的归家路途？这趟夜游的意义，从来不止于看见热闹，更在于读懂支撑热闹的城市力量。"
						]
					}
				},
				{
					type: "Card",
					value: {
						eyebrow: "三日夜游计划",
						title: "从打卡开始，往城市深处走",
						body: "此行依次打卡亮马河、三里屯、城市剧场、长安街四大夜间场景。原本只为奔赴社交平台定义的北京夜色 A 面，却在每一次靠岸停歇、街区收市、演出散场、晚风归途里，解锁了城市夜间运转的隐秘 B 面。",
						image: {
							src: "/assets/images/cards/card-three-day-plan.png",
							label: "三日夜游计划",
							alt: "三日夜游计划卡片插画"
						},
						icon: "✦",
						caption: "从网红打卡路线切入，夜游视角逐步穿透消费表层，深入城市夜间运行系统。"
					}
				},
				{
					type: "Text",
					speaker: "旁白",
					variant: "transition",
					value: {
						align: "right",
						text: [
							"三日夜游落幕，真正镌刻在记忆里的，从来不是攻略上千篇一律的网红场景。",
							"是码头手持喇叭疏导人流的工作人员，是凌晨俯身整理街区的门店店员，是剧场全程值守的安保人员，是深夜街头等候接单的代驾司机。城市夜晚，从来不是灯光堆砌的消费盛宴，而是由人、空间、服务、秩序共同构筑、稳稳托举的完整城市生态。"
						]
					}
				}
			]
		}),
		section({
			id: "liangmahe",
			num: 2,
			kicker: "亮马河",
			title: "一条河的两种入口",
			dek: "付费夜航，是体验夜色的消费入口；沿河漫步，是拥抱晚风的公共入口。一条亮马河，容纳着城市夜晚的双重底色。",
			cover: {
				src: "/assets/images/covers/cover-liangmahe-blue-hour.png",
				label: "亮马河蓝调时刻",
				alt: "亮马河夜航与水岸灯光"
			},
			nodes: [
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"傍晚六点，天际晕开温柔的藏蓝暮色，白日的喧嚣慢慢沉淀。小夏与晚晚在燕莎码头检票登船，游船缓缓驶向蓝色港湾方向，粼粼河面被两岸灯火切割成错落光影。船内是温暖闲适的人间烟火，船外是缓缓后退的绿树、桥梁与沿河人群，夜色温柔铺展。",
							"平整的沿河绿道上，野餐休憩的市民、缓步遛宠的住户、弹唱助兴的街头艺人，一一掠过眼帘。这里没有夜市的喧闹烟火，没有商圈的嘈杂音效，只剩城市入夜后独有的松弛与静谧。她们起初以为，船票是解锁亮马河夜景的唯一方式，后来才懂得，游船只是亲近这条河的万千方式之一。"
						]
					}
				},
				{
					type: "Image",
					value: {
						src: "/assets/images/scenes/scene-liangmahe-cruise.png",
						label: "亮马河夜航主场景",
						alt: "亮马河夜航、游船、水岸灯光和散步人群",
						caption: "A 面：蓝调时刻的亮马河夜航，光影温柔，氛围感十足。"
					}
				},
				{
					type: "Text",
					speaker: "小夏",
					variant: "quote",
					value: {
						align: "right",
						text: [
							"“原来最热门的夜游项目，核心从不是花钱消费，免费的晚风与步道，才是更多人奔赴的浪漫。”",
							"游船靠岸前，小夏发现，河岸漫步的人群远比船上的游客更多。有人静坐台阶闲谈，有人推着婴儿车缓步慢行，有人凭栏吹风放空。亮马河的水岸与绿道全域开放，褪去消费属性，这里是属于所有人的城市公共空间。多数人奔赴此地，不为消费，只为邂逅一场晚风、一段闲静时光。"
						]
					}
				},
				{
					type: "Card",
					value: {
						eyebrow: "A 面 / B 面",
						title: "船票之外，还有一整条开放的水岸",
						body: "亮马河的夜间吸引力，从不局限于付费夜航项目。经过改造升级的公共水岸空间，包容了多元化的夜间生活场景。消费体验是夜色的点缀，普惠的公共生活，才是城市夜经济最温暖的底色。",
						image: {
							src: "/assets/images/cards/card-liangmahe-ticket-greenway.png",
							label: "船票与水岸",
							alt: "船票与开放水岸双入口卡片插画"
						},
						icon: "⛴",
						caption: "同一处水岸空间，同时承载付费夜游消费与全民免费公共生活。"
					}
				},
				{
					type: "Text",
					speaker: "旁白",
					variant: "aside",
					value: {
						align: "left",
						text: [
							"游船靠岸、游客散去，亮马河的夜间运行从未停歇。码头工作人员持续疏导客流，保洁人员细致清理沿岸杂物，安保人员不间断巡逻值守。",
							"这份扑面而来的松弛感，从不是天然存在，而是依托完善的河道治理、空间改造、票务调度、夜间运维与便民服务才得以实现。亮马河的夜晚，不是单一的网红消费场景，而是经过精细化运营、兼顾商业价值与公共价值的城市夜间样本。"
						]
					}
				},
				{ type: "Chart", value: chartData.liangmaheSystem }
			]
		}),
		section({
			id: "sanlitun",
			num: 3,
			kicker: "三里屯",
			title: "霓虹背后的承载",
			dek: "夜间消费的热度越是集中、喧嚣越是浓烈，背后的城市秩序与兜底守护，就越不可或缺。",
			cover: {
				src: "/assets/images/covers/cover-sanlitun-neon.png",
				label: "三里屯凌晨霓虹",
				alt: "三里屯夜晚街区、外摆、霓虹和人流"
			},
			nodes: [
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"夜色渐深，从亮马河南行至三里屯，已是夜间九点。沿街商铺的户外座位座无虚席，各式餐饮招牌灯火璀璨，年轻人群举杯闲谈、笑语盈盈。工体周边，娱乐场馆门前人潮涌动，网约车、出租车有序缓行等候。",
							"这正是社交平台定义中最典型的都市夜生活：霓虹闪烁、乐声悠扬、烟火不息、社交不止，整座街区高速运转，尽显都市夜间的鲜活生命力。"
						]
					}
				},
				{
					type: "Image",
					value: {
						src: "/assets/images/scenes/scene-sanlitun-a-side.png",
						label: "三里屯 A 面",
						alt: "三里屯夜间外摆、霓虹和年轻人",
						caption: "A 面：酒杯、外摆、霓虹交织，勾勒出永不落幕的繁华街区。"
					}
				},
				{
					type: "Text",
					speaker: "旁白",
					variant: "transition",
					value: {
						align: "right",
						text: [
							"凌晨两点，喧嚣渐退，三里屯的夜间主角悄然更迭。",
							"门店工作人员逐一收纳户外桌椅、整理经营场地，环卫车辆穿梭街区，清扫散落的酒瓶、纸巾与杂物，执勤人员沿街巡查，规整街区秩序。方才还被消费与热闹填满的街区，切换为静默收尾、清洁复原、秩序维护的节奏，为城市深夜兜底。"
						]
					}
				},
				{
					type: "Text",
					speaker: "小夏",
					variant: "dialogue",
					value: {
						align: "left",
						text: [
							"路过三里屯派出所时，大厅灯火通明，往来人员步履不停。",
							"她在观察笔记中写下这样一句话：霓虹最璀璨的街头，也是城市治理最忙碌的阵地。三里屯的 A 面有多热闹鲜活，它的 B 面就有多清醒坚韧。繁华的酒吧街，从来不止由商铺与消费者构成，更由夜间警务、常态巡逻、街区清扫、出行保障、无数从业者的夜班坚守共同支撑。"
						]
					}
				},
				{
					type: "Images",
					value: {
						images: [
							{
								src: "/assets/images/stacks/stack-sanlitun-close-tables.png",
								label: "外摆收街",
								alt: "店员收拾外摆桌椅",
								caption: ""
							},
							{
								src: "/assets/images/stacks/stack-sanlitun-police-light.png",
								label: "派出所灯光",
								alt: "三里屯派出所夜间灯光",
								caption: ""
							},
							{
								src: "/assets/images/stacks/stack-sanlitun-cleaner-security.png",
								label: "环卫或安保",
								alt: "夜间环卫或安保人员工作",
								caption: ""
							}
						],
						caption: "B 面：收市复原、街区巡逻、全域清扫、秩序守护，构筑夜间城市底线。"
					}
				},
				{
					type: "Text",
					speaker: "旁白",
					variant: "aside",
					value: {
						align: "right",
						text: [
							"三里屯的夜晚，是多重场景叠加的高密度夜间系统。商铺经营、人流集聚、交通流转、警务保障、环卫运维环环相扣，构成完整的夜间生态。",
							"对游客而言，这里是休闲打卡的网红目的地；对城市而言，这里是需要实时调度、精细治理的重点场景。所谓“越夜越美丽”，从来不是单纯的消费宣传口号，更是一座城市夜间治理能力的真实答卷。"
						]
					}
				},
				{
					type: "Card",
					value: {
						eyebrow: "B 面现场",
						title: "越热闹的地方，越不能没有秩序",
						body: "商圈消费、户外经营、密集人流、交通流转与警务保障高度叠加，让三里屯成为城市夜间高密度治理样本。繁华的夜间经济，始终依托严谨、高效的城市治理体系得以平稳运转。",
						image: {
							src: "/assets/images/stacks/stack-sanlitun-close-tables.png",
							label: "三里屯秩序现场",
							alt: "三里屯夜间秩序现场卡片插画"
						},
						icon: "✦",
						caption: "商业场景、人流活动与公共治理，共同构筑完整的城市夜间现场。"
					}
				},
				{ type: "Chart", value: chartData.sanlitunComplexity }
			]
		}),
		section({
			id: "theater",
			num: 4,
			kicker: "剧场",
			title: "不只吃喝的夜晚",
			dek: "城市的夜晚，不止有烟火消费，更有文化余温。演出、观演、思辨与守候，让夜色拥有更丰盈的精神内核。",
			cover: {
				src: "/assets/images/covers/cover-theater-night.png",
				label: "剧场散场",
				alt: "北京小剧场夜间散场，人群走出剧场"
			},
			nodes: [
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"第二日夜晚，二人走进城市小众剧场，沉浸式感受北京的文化夜生活。演出落幕，观众并未即刻散去，有人驻足热议剧情，有人举着票根定格美好，有人静静等候车辆，夜色里留存着绵长的情绪余温。",
							"相较于三里屯的喧闹热烈，剧场的夜晚安静又治愈。没有震耳的音乐，没有闪烁的霓虹，却有着独属于文化消费的持久力量。一场演出的结束，不是夜晚的终点，而是城市精神生活的延续。"
						]
					}
				},
				{
					type: "Image",
					value: {
						src: "/assets/images/scenes/scene-theater-after-show.png",
						label: "剧场散场主图",
						alt: "剧场门口观众散场和讨论剧情",
						caption: "A 面：演出散场，灯火未熄，城市的文化夜晚仍在延续。"
					}
				},
				{
					type: "Text",
					speaker: "晚晚",
					variant: "quote",
					value: {
						align: "right",
						text: [
							"“原来北京的夜生活，从来不止一种模样，不必喧嚣，亦可丰盈。”",
							"晚晚真切感受到，城市夜晚的内核，早已超越吃喝玩乐的单一维度。话剧、音乐会、艺术展览、夜间沙龙，为夜色注入了审美与思辨的温度。人们带着期待奔赴一场演出，散场后仍沉浸其中、细细回味，这样的夜晚，是情绪的舒展，也是精神的滋养。"
						]
					}
				},
				{
					type: "Text",
					speaker: "旁白",
					variant: "aside",
					value: {
						align: "left",
						text: [
							"舞台落幕，服务不止。观众离场后，场务人员清点场地、整理设备，工作人员有序疏导人流，安保人员坚守岗位直至全员散去。同时，周边餐饮、便利店、公共交通持续联动，承接文化消费带来的夜间人流。",
							"如果说商圈酒吧代表着夜经济的消费热度，那么剧场文化消费，则诠释了夜经济的品质深度。城市夜间的活力，不仅在于留住人的脚步、带动消费，更在于提供优质的文化供给，让人愿意为精神奔赴、为美好停留。"
						]
					}
				},
				{
					type: "Card",
					value: {
						eyebrow: "文化夜经济",
						title: "票根也是一种夜生活入口",
						body: "剧场演出、LiveHouse 演艺、博物馆夜场、夜间艺术展览，构成了北京多层次的夜间文化供给。丰富的文化业态，让城市夜生活彻底摆脱单一的吃喝消费，延伸至审美体验、精神消费与公共文化生活领域。",
						image: {
							src: "/assets/images/cards/card-theater-ticket.png",
							label: "票根与舞台灯",
							alt: "票根与舞台灯卡片插画"
						},
						icon: "🎭",
						caption: "一张小小的演出票根，将城市夜晚从物质消费，引向精神与内容消费。"
					}
				},
				{ type: "Chart", value: chartData.performanceComparison }
			]
		}),
		section({
			id: "ride",
			num: 5,
			kicker: "夜骑",
			title: "免费的夜风也有成本",
			dek: "无需消费的夜间体验、不花钱的城市浪漫，从来不是凭空而来，而是完善的公共服务默默托底的结果。",
			cover: {
				src: "/assets/images/covers/cover-ride-changan.png",
				label: "长安街夜骑",
				alt: "两个女孩夜骑长安街，路灯向远处延伸"
			},
			nodes: [
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"第三日凌晨，二人扫码解锁共享单车，沿长安街缓缓骑行，沉浸式邂逅深夜的北京城。沿街路灯次第延伸，铺就一条璀璨长路，晚风穿耳而过，褪去白日的拥挤喧嚣，城市街巷尽显开阔静谧。",
							"这是整趟夜游中最纯粹的体验：没有消费账单，没有网红场景，只有晚风、灯火、长路与偶尔驶过的夜班公交。小夏坦言，这份零成本的夜色浪漫，是整段旅程中最难忘的记忆。"
						]
					}
				},
				{
					type: "Image",
					value: {
						src: "/assets/images/scenes/scene-ride-changan-bike.png",
						label: "长安街夜骑主图",
						alt: "长安街夜骑，路灯、共享单车和夜色",
						caption: "A 面：无需消费的晚风与夜色，藏着最治愈的城市夜间记忆。"
					}
				},
				{
					type: "Text",
					speaker: "小夏",
					variant: "aside",
					value: {
						align: "right",
						text: [
							"骑行途中忽然醒悟，那些免费拥抱的夜风、随心畅享的夜景，从来都暗藏成本。",
							"彻夜长明的路灯、实时调度的共享单车、穿梭全城的夜班公交、坚守岗位的巡逻警力、全程在线的出行保障，共同构筑起深夜城市的安全感。我们习以为常的夜间自由，从来不是天然存在，而是无数隐性服务默默支撑的成果。城市最动人的温柔与安全感，往往藏在这些不被打卡、不被关注的细微角落。"
						]
					}
				},
				{
					type: "Text",
					speaker: "晚晚",
					variant: "quote",
					value: {
						align: "left",
						text: [
							"“原来不消费的夜晚，从来不是轻飘飘的存在，它有着厚重的城市支撑。”",
							"一场随性的夜间骑行，看似只是个人的兴趣使然，背后串联着整套城市公共服务体系。明亮的道路、便捷的出行、安稳的环境、兜底的服务，让每一次深夜出行都有底气，这便是城市给予普通人最朴素的夜间馈赠。"
						]
					}
				},
				{
					type: "Card",
					value: {
						eyebrow: "回家路",
						title: "夜晚的最后一站，是安全到家",
						body: "夜间骑行、夜班公交、代驾服务、全域照明、安保巡逻，共同编织成城市夜间出行兜底网络。夜经济的边界，从不局限于消费发生的现场，更延伸至每一个人离场后的归家全程。",
						image: {
							src: "/assets/images/cards/card-night-service-chain.png",
							label: "夜间回家服务链",
							alt: "夜间回家服务链卡片插画"
						},
						icon: "🚲",
						caption: "城市夜间的安心归途，由交通、照明、安保、运维多重服务共同托举。"
					}
				},
				{ type: "Chart", value: chartData.nightServicePeople }
			]
		}),
		section({
			id: "cities",
			num: 6,
			kicker: "八城",
			title: "每座城市都有自己的夜晚性格",
			dek: "夜经济从无统一模板，不止于夜市烟火、深夜喧嚣。不同的城市资源、治理理念与发展路径，造就了独一无二的城市夜色。",
			cover: {
				src: "/assets/images/covers/cover-cities-night-map.png",
				label: "全国城市夜色地图",
				alt: "中国城市夜色地图与八城灯点"
			},
			nodes: [
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"三日深度夜游，让两位观察者跳出单一的网红视角，读懂了夜经济的多元内核。",
							"北京的夜晚，是公共空间与商业场景共生、烟火消费与文化气质并存、热闹喧嚣与秩序安稳相融的综合样本。将视野放眼全国，每一座城市，都在依托自身禀赋，打造专属的夜间生态。"
						]
					}
				},
				{
					type: "Image",
					value: {
						src: "/assets/images/scenes/scene-cities-night-grid.png",
						label: "全国城市夜色拼贴主图",
						alt: "多个城市夜景拼贴，北京、上海、重庆、西安、长沙、成都、杭州、深圳以小窗口或地图线索呈现",
						caption: "以北京为起点，解锁全国城市夜经济多元图谱。",
						overlays: [
							{ label: "北京", x: "3.5%", y: "7%" },
							{ label: "上海", x: "27.8%", y: "7%" },
							{ label: "重庆", x: "52.2%", y: "7%" },
							{ label: "西安", x: "76.6%", y: "7%" },
							{ label: "长沙", x: "3.5%", y: "51.5%" },
							{ label: "成都", x: "27.8%", y: "51.5%" },
							{ label: "杭州", x: "52.2%", y: "51.5%" },
							{ label: "深圳", x: "76.6%", y: "51.5%" }
						]
					}
				},
				{
					type: "Images",
					value: {
						images: [
							{
								src: "/assets/images/stacks/stack-city-shanghai.png",
								city: "上海",
								label: "上海/外滩",
								alt: "上海夜经济地标",
								caption: ""
							},
							{
								src: "/assets/images/stacks/stack-city-chongqing.png",
								city: "重庆",
								label: "重庆/两江游",
								alt: "重庆夜游地标",
								caption: ""
							},
							{
								src: "/assets/images/stacks/stack-city-xian.png",
								city: "西安",
								label: "西安/大唐不夜城",
								alt: "西安夜经济地标",
								caption: ""
							}
						],
						caption: "一城一夜色，一城一性格，八座城市演绎八种夜间生长形态。"
					}
				},
				{
					type: "Text",
					speaker: "晚晚",
					variant: "quote",
					value: {
						align: "right",
						text: [
							"“城市的夜晚，从来不是越热闹越优质，而是越有辨识度、越贴合自身越好。”",
							"北京夜色侧重公共空间赋能、文化内容输出与精细化秩序治理，而这只是中国城市夜经济的其中一种形态。评判城市夜经济的核心，从来不是“谁更热闹、谁更熬夜”，而是谁能依托自身资源，打造出独属于自己的夜间发展模式与城市气质。"
						]
					}
				},
				{
					type: "Text",
					speaker: "旁白",
					variant: "aside",
					value: {
						align: "left",
						text: [
							"因此，我们拒绝用“热闹排名”简单定义城市夜色。更值得探讨的核心问题是：每座城市，究竟将夜晚的发展机遇，交付给了何种产业、何种场景、何种生活？",
							"上海立足国际化优势，打造高端夜间消费与演艺集群；重庆依托山水地貌，塑造独一无二的山水夜游名片；西安深挖历史 IP，以古风文旅激活夜间人流；长沙坚守市井烟火，保留亲民松弛的夜间氛围；成都聚焦休闲生活，打造宜居舒适的夜间场景；杭州联动景区与街区，实现日夜场景无缝衔接；深圳盘活城市更新空间，打造年轻化、潮流化夜间体验。八城迥异的夜色，本质是各地城市治理、产业结构、空间规划与文化资源的差异化组合。"
						]
					}
				},
				{
					type: "Card",
					value: {
						eyebrow: "城市类型图鉴",
						title: "不是比谁更热闹，而是看谁更有辨识度",
						body: "北京、上海、重庆、西安、长沙、成都、杭州、深圳八座城市，探索出了差异化的夜经济发展路径。夜间活力没有标准答案，本质是一座城市盘活自身资源、适配市民需求、塑造城市特色的综合结果。",
						image: {
							src: "/assets/images/cards/card-city-types.png",
							label: "八城类型图鉴",
							alt: "八城夜经济类型图鉴卡片插画"
						},
						icon: "✹",
						caption: "八座标杆城市，对应八种特色夜间经济形态。"
					}
				},
				{ type: "Chart", value: chartData.cityNightMatrix },
				{
					type: "Text",
					speaker: "结语",
					variant: "conclusion-intro",
					value: {
						align: "left",
						text: [
							"城市夜晚最动人的另一面",
							"当我们跳出“打卡看热闹”的浅层视角便会发现，城市夜晚从来不是静止的风景，也不是单纯的消费盛宴，而是一套持续运转、精密协同、冷暖兼具的复杂城市系统。"
						]
					}
				},
				{
					type: "Text",
					speaker: "A 面 / B 面",
					variant: "conclusion-duality",
					value: {
						align: "right",
						text: [
							"A 面｜光鲜亮眼，是大众看得见的烟火、浪漫与热闹。",
							"B 面｜沉稳坚韧，是大众看不见的服务、秩序与坚守。"
						]
					}
				},
				{
					type: "Text",
					speaker: "从北京到八城",
					variant: "conclusion-bridge",
					value: {
						align: "left",
						text: [
							"从河段、商圈、文化、归途到八城一路走来，我们看到的不是彼此分散的夜景，而是城市空间、文化供给、公共服务和治理系统共同组成的夜晚。",
							"这趟夜游之旅，让我们读懂了夜经济的真正内核：它不止是拉动消费的经济赛道，更是承载市民生活、彰显城市治理、传递城市温度的公共载体。"
						]
					}
				},
				{
					type: "Text",
					speaker: "最后一站",
					variant: "conclusion-closing",
					value: {
						align: "center",
						text: [
							"灯火璀璨的背后，是无数岗位的日夜坚守，是城市治理的精细落地，是公共服务的全程在线。",
							"一座城市最好的夜色，从来不是极致的喧嚣，而是让每一份热闹都有秩序支撑，每一次停留都有美好赋能，每一段归途都有安稳守护。",
							"昼夜交替之间，灯火与人烟共生，服务与温情同行，这便是城市夜晚最动人的另一面。"
						]
					}
				}
			]
		})
	],
	methodology: null,
	footer: {
		credits: "数据新闻作品《夜晚的另一面》",
		instructor: "刘英华",
		members: "马雨秋 曹馨熠 赵珂涵 胡咏仪"
	}
};
