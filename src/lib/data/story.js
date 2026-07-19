import { chartData } from "./chartData.js";
import { nightSecurityPanel } from "./beijingPanels.js";
import {
	routeOverview,
	nightClock
} from "./guideData.js";
import {
	nightPortrait,
	holidayHotspots,
	nightSupply,
	nanluoPressure,
	shichahaiRelay,
	performanceGrowth,
	systemFlow
} from "./visualData.js";

const themes = [
	{
		background: "#70B0F9 0%, #A5A5A5 50%, #F0F0F0 90%, #F1FD0F 100%",
		headingColor: "#ccffed",
		headingShadow: "-1px -1px 0 #262626, 1px -1px 0 #262626, -1px 1px 0 #262626, 1px 1px 0 #262626, 4px 4px 0 rgba(38, 38, 38, 1)",
		lineStroke: "#ccffed",
		textColor: "#262626",
		textBg: "#f2fafe",
		border: "#262626",
		boxShadow: "inset -4px -4px 0 rgba(0, 0, 0, .2), inset 4px 4px rgba(255, 255, 255, 0.6)",
		cardBg: "#f1fb39",
		panelBg: "#eef4ff",
		panelText: "#1d2540",
		panelAccent: "#f1fd0f",
		panelAccent2: "#7aa9ef",
		panelBorder: "#262626"
	},
	{
		background: "#F1FD0F 0%, #D21FB2 33%, #4162BE 63%, #DADAFF 86%, #000000 100%",
		headingColor: "#fffafc",
		headingShadow: "-1px -1px 0 #9F40B8, 1px -1px 0 #9F40B8, -1px 1px 0 #9F40B8, 1px 1px 0 #9F40B8, 0px 4px 24px #9F40B8",
		lineStroke: "#ffd6f0",
		textColor: "#9f40b8",
		textBg: "linear-gradient(to bottom right, #fffafc, #ffe8f1)",
		border: "#9f40b8",
		boxShadow: "0px 4px 24px #d255f3, inset 0px -6px 14px #d255f3",
		cardBg: "#fffafc",
		panelBg: "#2a1239",
		panelText: "#fff7ed",
		panelAccent: "#f1fd0f",
		panelAccent2: "#ff8fcb",
		panelBorder: "#ffd6f0"
	},
	{
		background: "#090812 0%, #160d24 46%, #5e2444 78%, #bd655c 100%",
		headingColor: "#ffe0f4",
		headingShadow: "none",
		lineStroke: "#ffbd73",
		textColor: "#ffe0f4",
		textBg: "rgba(22, 13, 36, 0.78)",
		border: "#d884ff",
		boxShadow: "0 0 0 5px rgba(216, 132, 255, .18), 0 16px 44px rgba(0,0,0,.28)",
		cardBg: "rgba(22, 13, 36, 0.82)",
		panelBg: "#160d24",
		panelText: "#ffe7f5",
		panelAccent: "#ffbd73",
		panelAccent2: "#d884ff",
		panelBorder: "#f3bfe2"
	},
	{
		background: "#D04A4A 0%, #02696F 50%, #5F5348 100%",
		headingColor: "#ffffff",
		headingShadow: "0px 0px 10px #ffffff",
		lineStroke: "#ffffff",
		textColor: "#ffffff",
		textBg: "rgba(255, 255, 255, 0.08)",
		border: "rgba(255,255,255,0.78)",
		boxShadow: "inset 50px -56px 64px rgba(163, 155, 255, 0.55), inset 20px -6px 34px #cfcfcf, inset 0px 4px 4px #ffffff, inset -60px 64px 104px rgba(98, 54, 255, .5)",
		cardBg: "rgba(255, 255, 255, 0.12)",
		panelBg: "#073f43",
		panelText: "#f4fff9",
		panelAccent: "#ff8c7a",
		panelAccent2: "#88ead2",
		panelBorder: "#f4fff9"
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
		cardBg: "rgba(255, 255, 255, 0.12)",
		panelBg: "#0e211c",
		panelText: "#e7fff5",
		panelAccent: "#f1fd0f",
		panelAccent2: "#7ea0ff",
		panelBorder: "#ccffed"
	},
	{
		background: "#68648A 0%, #606FA8 22%, #627FC8 48%, #73A7E5 78%, #7BB4EE 100%",
		headingColor: "#ccffed",
		headingShadow: "-1px -1px 0 #262626, 1px -1px 0 #262626, -1px 1px 0 #262626, 1px 1px 0 #262626, 4px 4px 0 rgba(38, 38, 38, 0.65)",
		lineStroke: "#ccffed",
		textColor: "#262626",
		textBg: "#f2fafe",
		border: "#262626",
		boxShadow: "inset -4px -4px 0 rgba(0, 0, 0, .2), inset 4px 4px rgba(255, 255, 255, 0.6)",
		cardBg: "#f1fb39",
		panelBg: "#eff7ff",
		panelText: "#20243b",
		panelAccent: "#ccffed",
		panelAccent2: "#f1fd0f",
		panelBorder: "#262626"
	}
];

const section = ({ id, num, kicker, title, dek, cover, nodes }) => ({
	id,
	num: String(num).padStart(2, "0"),
	years: "北京夜间城市观察",
	theme: themes[(num - 1) % themes.length],
	kicker,
	title,
	dek,
	cover,
	nodes
});

const sources = {
	beijingCulture: "https://whlyj.beijing.gov.cn/zwgk/xwzx/gzdt/202502/t20250205_4003564.html",
	nanluoCommons: "https://commons.wikimedia.org/wiki/File:Nanluoguxiang_at_night_-_panoramio.jpg",
	shichahaiWater: "https://swj.beijing.gov.cn/swdt/ztzl/sstxczl/sstzx/202408/t20240828_3783599.html",
	shichahaiEnglish: "https://english.beijing.gov.cn/latest/activities/202204/t20220426_2691858.html",
	liangma: "https://www.beijing.gov.cn/tsbj/sxym/202601/t20260114_4430146.html",
	beijingNightPolice: "https://gaj.beijing.gov.cn/xxfb/jwbd/202607/t20260703_4746539.html",
	theaterPhoto: "https://whlyj.beijing.gov.cn/zwgk/xwzx/gzdt/202602/t20260203_4487055.html",
	bus: "https://commons.wikimedia.org/wiki/File:4628382_at_Dabeiyaodong_(20210523043824).jpg"
};

export const story = {
	meta: {
		title: "夜晚的另一面｜北京夜间城市数据新闻",
		shortTitle: "夜晚的另一面",
		description: "沿三条城市路径进入北京夜晚，用数据观察空间更新、文化供给、街区治理与安全归途。",
		credits: "数据新闻作品《夜晚的另一面》"
	},
	nav: {
		brand: "夜晚的另一面",
		brandImage: "/assets/images/brand/nav-brand.png"
	},
	hero: {
		title: "夜晚的另一面",
		titleWords: ["夜晚", "的", "另一面"],
		label: "北京夜间城市数据新闻",
		subtitle: "北京常被贴上“夜生活不够浓”的标签。把时间从景点闭馆后继续往后拨，胡同、水岸、剧场和街区正在组成另一张城市地图。沿着三条路径，我们追问的不只是夜里去哪儿，也是一座城市如何把夜晚延长。",
		bubbles: ["三条路径", "真实现场", "城市数据", "安全归途"],
		image: {
			src: "/assets/images/hero/hero-night-other-side.png",
			label: "北京夜晚总视觉",
			alt: "北京夜晚、两位观察者与城市灯光的叙事插画"
		},
		narrators: [
			{
				id: "xia",
				name: "小夏",
				role: "城市行走者",
				bio: "沿着胡同、水岸与街区向前，记录夜晚最直接的感受与变化。",
				avatar: { src: "/assets/images/characters/xia-avatar.png", label: "小夏头像", alt: "小夏人物头像" }
			},
			{
				id: "wanwan",
				name: "晚晚",
				role: "城市记录者",
				bio: "在人群散去后继续停留，寻找夜航、巡逻、清扫和交通留下的数据。",
				avatar: { src: "/assets/images/characters/wanwan-avatar.png", label: "晚晚头像", alt: "晚晚人物头像" }
			}
		]
	},
	sections: [
		section({
			id: "intro",
			num: 1,
			kicker: "为什么北京",
			title: "北京的夜晚，正在变长",
			dek: "作为长期热门的旅行目的地，北京的白天早已被古迹与地标定义。现在，高密度游客、不断进入街区的文化内容和覆盖深夜的公共服务，正在共同改写它的夜晚。",
			cover: {
				src: "/assets/images/real/shichahai-night-cruise-02.jpg",
				label: "什刹海夜航",
				alt: "什刹海水面上的游船与远处鼓楼",
				position: "center 46%",
				source: "北京市人民政府英文门户",
				sourceUrl: sources.shichahaiEnglish
			},
			nodes: [
				{ type: "Text", speaker: "晚晚", variant: "dialogue", value: { align: "left", text: "“北京真的没有夜生活吗？”" } },
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"这种印象并非毫无来由：许多古迹傍晚闭馆，热门点位彼此相距较远，第一次来北京的人很容易把夜晚理解成“吃完饭就回酒店”。",
							"但夜游并不等于延长景区开放。它也可以发生在胡同转角、水岸步道、小剧场散场后，以及一趟把人送回住处的夜班公交上。"
						]
					}
				},
				{ type: "NightPortrait", value: nightPortrait },
				{ type: "Hotspots", value: holidayHotspots },
				{ type: "Supply", value: nightSupply },
				{ type: "Routes", value: { routes: routeOverview, lead: "三条路径分别进入旧城、水岸街区与演出散场：旧城关乎空间承载，现代街区关乎更新与治理，文化现场则连接内容供给和深夜归途。" } },
				{
					type: "Clock",
					value: {
						title: "从日落到清晨，体验与服务怎样叠在一起",
						lead: "当游览和演出在午夜前后逐渐结束，巡逻与夜间交通仍在继续。北京的夜晚不是一条同时熄灭的线，而是一组前后交叠的城市时钟。",
						items: nightClock,
						note: "夜班公交以公开线路常见运行窗口作示意；具体线路、班次与夜航安排请以出行当天官方信息为准。"
					}
				}
			]
		}),
		section({
			id: "oldcity",
			num: 2,
			kicker: "旧城现场",
			title: "从胡同灯影，走到湖面夜航",
			dek: "南锣鼓巷、鼓楼、烟袋斜街与什刹海连成一段连续的旧城夜色。越往西走，商业主街逐渐让位于桥与水面，游客密度、街巷尺度和夜航运营也在同一条路径上显现。",
			cover: {
				src: "/assets/images/real/nanluoguxiang-night-commons.jpg",
				label: "南锣鼓巷夜景",
				alt: "夜间南锣鼓巷的店铺灯光与行人",
				position: "center 55%",
				source: "Wikimedia Commons",
				sourceUrl: sources.nanluoCommons,
				credit: "Daugilas，CC BY-SA 3.0（页面裁切展示）"
			},
			nodes: [
				{ type: "Text", speaker: "小夏", variant: "dialogue", value: { align: "right", text: "“旧城适合夜游，但不能只把人塞进一条网红主街。”" } },
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"傍晚从南口进入南锣鼓巷，热闹几乎立刻扑面而来。店铺灯光、游客队伍和穿过人群的居民，把一条并不宽的街压缩成北京夜游最典型的现场。",
							"沿鼓楼继续向西，街道在银锭桥前突然碰到水面。什刹海的松弛感并非与拥挤相反，它只是把同一批人流分散到了三片水域、桥区、码头与沿岸胡同。"
						]
					}
				},
				{ type: "Pressure", value: nanluoPressure },
				{
					type: "Image",
					value: {
						src: "/assets/images/real/shichahai-night-water-bureau.jpg",
						label: "什刹海夜航",
						alt: "什刹海夜间游船、灯光与水面倒影",
						position: "center 48%",
						caption: "真实现场：夜航把湖面变成观景路径，桥区、码头和岸线同时承担通行压力。",
						source: "北京市水务局",
						sourceUrl: sources.shichahaiWater
					}
				},
				{ type: "Relay", value: shichahaiRelay },
				{
					type: "Text",
					speaker: "晚晚",
					variant: "quote",
					value: { align: "left", text: "“湖面上的一小时，是码头调度、桥区疏导、夜间巡逻与清晨保洁共同托住的一小时。”" }
				}
			]
		}),
		section({
			id: "modern",
			num: 3,
			kicker: "水岸与夜巡",
			title: "从水岸晚风，走进城市夜巡",
			dek: "亮马河提供低门槛的公共空间，什刹海连接湖面、胡同与夜间商户。夜色越深，水岸和街区吸引的人越多，一张覆盖重点时段与风险点位的巡控网也随之展开。",
			cover: {
				src: "/assets/images/real/liangma-river-beijing-gov-05.jpg",
				label: "亮马河夜景",
				alt: "亮马河夜间水岸、桥梁与游船",
				position: "center 50%",
				source: "北京市人民政府",
				sourceUrl: sources.liangma
			},
			nodes: [
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"傍晚六点，亮马河两岸开始聚集散步、遛狗、用餐和等船的人。这里最重要的变化，不是多了一艘游船，而是河道、绿道与商业之间终于可以连续行走。",
							"几个小时后，把镜头从一条河拉远：商圈、胡同、交通口和临水空间仍有人停留。北京的夜游空间越丰富，治安保障就越需要跟着时间、客流和具体风险移动。"
						]
					}
				},
				{ type: "Text", speaker: "小夏", variant: "quote", value: { align: "right", text: "“船票是一种入口，免费的晚风和连续步道也是。”" } },
				{ type: "Chart", value: chartData.liangmaheSystem },
				{ type: "Security", value: nightSecurityPanel },
				{
					type: "Timeline",
					value: {
						eyebrow: "同一夜晚 / 四次接力",
						title: "从消费高峰到清晨复原",
						lead: "一座城市不会在某个整点突然切换角色。消费、人流、巡逻、收市和清扫前后交叠，构成北京从夜晚到清晨的连续变化。",
						entries: [
							{ time: "21:00", title: "消费与人流升温", text: "商业、酒吧、餐饮和到达交通同时进入高峰。", roles: ["商户", "游客", "交通"] },
							{ time: "00:00", title: "巡逻与处置加密", text: "高流动人群与居民生活叠加，现场调解和秩序维护持续在线。", roles: ["民警", "安保"] },
							{ time: "02:00", title: "收市与清扫接班", text: "门店整理经营场地，保洁和离场交通开始复原街面。", roles: ["店员", "环卫", "司机"] },
							{ time: "04:00", title: "夜间服务继续", text: "夜班公交、巡逻和城市运维接住最后一批夜归者。", roles: ["公交", "巡逻", "运维"] }
						],
						source: "北京市公安局夜间巡控公开报道",
						sourceUrl: sources.beijingNightPolice
					}
				}
			]
		}),
		section({
			id: "culture",
			num: 4,
			kicker: "演出散场",
			title: "一张票根，把夜晚从吃喝中解放出来",
			dek: "北京的夜生活并不只发生在餐桌和酒吧。小剧场与演艺新空间提供了另一种停留理由，而散场后的街道、骑行与交通，又把一张票根继续延伸进城市。",
			cover: {
				src: "/assets/images/real/beijing-theater-official-01.png",
				label: "北京小剧场",
				alt: "北京沉浸式小剧场演出现场",
				position: "center 42%",
				source: "北京市文化和旅游局",
				sourceUrl: sources.theaterPhoto
			},
			nodes: [
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"晚上七点，一场演出为夜晚定下明确的开始。观众在几十平方米的小空间里聚拢，又在两小时后同时回到街上；内容生产与散场承接，于是成为同一段城市体验。",
							"有人继续沿长安街骑行，有人寻找地铁或夜班公交。演出结束不是夜晚的句号，而是城市公共服务接过人流的时刻。"
						]
					}
				},
				{
					type: "Image",
					value: {
						src: "/assets/images/real/beijing-theater-official-03.png",
						label: "北京演艺新空间",
						alt: "北京多种小剧场与演艺新空间现场拼图",
						fit: "contain",
						caption: "真实现场：演艺新空间让观看演出进入商圈、街区与城市更新空间。",
						source: "北京市文化和旅游局",
						sourceUrl: sources.theaterPhoto
					}
				},
				{ type: "Growth", value: performanceGrowth },
				{
					type: "Insight",
					value: {
						eyebrow: "演出之后",
						title: "内容把人留下，城市把人接走",
						lead: "5.7 万余场演出勾勒出北京的内容供给，真正进入夜间现场的，是空间、观众与散场服务之间的连接。",
						items: [
							{ kicker: "内容", title: "5.7 万余场演出", text: "全年供给让“看一场演出”成为北京夜晚稳定而多样的选择。" },
							{ kicker: "空间", title: "79 家演艺新空间", text: "演出离开单一大剧院，进入商圈、园区和更日常的街区。" },
							{ kicker: "人流", title: "散场瞬间集中", text: "短时间离场把照明、疏导、叫车与公共交通拉到同一时刻。" },
							{ kicker: "城市", title: "夜晚继续向后延伸", text: "一张票根连接的不只是舞台，也连接周边消费与回家的路。" }
						]
					}
				},
				{ type: "Text", speaker: "晚晚", variant: "quote", value: { align: "left", text: "“北京的夜生活不必一直喧闹，也可以由一张票根延长。”" } }
			]
		}),
		section({
			id: "return",
			num: 5,
			kicker: "深夜归途",
			title: "夜游的最后一站，是安全到达",
			dek: "当最后一场演出散场、最后一间店铺收市，夜班公交、出租车、照明、巡逻与信息服务仍在运转。夜生活是否完整，最终要看一座城市能不能把人送回去。",
			cover: {
				src: "/assets/images/real/beijing-night-bus-n1-commons.jpg",
				label: "北京夜1路公交",
				alt: "凌晨行驶中的北京夜1路公交车",
				position: "center 54%",
				source: "Wikimedia Commons",
				sourceUrl: sources.bus,
				credit: "N509FZ，CC BY-SA 4.0（页面裁切展示）"
			},
			nodes: [
				{
					type: "Text",
					speaker: "旁白",
					variant: "body",
					value: {
						align: "left",
						text: [
							"2019 年公开数据中，北京夜班公交已形成 36 条、848 公里的线网，日均发车 792 次，服务一万余名乘客。地铁收班之后，另一套公共交通仍在城市上空织网。",
							"一万余名夜间乘客背后，是演出散场、深夜工作和夜间消费产生的真实移动。夜生活的边界，也因此从最后一个消费地点延伸到了回家的路。"
						]
					}
				},
				{ type: "Chart", value: chartData.nightServicePeople },
				{
					type: "Insight",
					value: {
						eyebrow: "深夜移动",
						title: "当一座城市仍有人在路上",
						items: [
							{ title: "36 条夜班线路", text: "在地铁运营之外，夜班公交继续连接长安街、环路与居住区。" },
							{ title: "792 次日均发车", text: "稳定班次把分散的夜归需求组织成可持续的公共服务。" },
							{ title: "一万余名乘客", text: "数字背后既有夜间消费者，也有演出散场者和深夜劳动者。" },
							{ title: "弹性运力补位", text: "出租车与网约车承接跨区、换乘和公共线路未覆盖的最后一段。" }
						]
					}
				},
				{ type: "Text", speaker: "小夏", variant: "dialogue", value: { align: "right", text: "“免费的晚风不收费，但让人安心回去的系统一直有成本。”" } }
			]
		}),
		section({
			id: "summary",
			num: 6,
			kicker: "城市托底",
			title: "热闹不是终点，完整抵达才是",
			dek: "三条城市路径通向同一个答案：空间更新让人愿意停留，文化供给让夜晚更有内容，治理与交通则让热闹能够安全延续。",
			cover: {
				src: "/assets/images/real/liangma-river-beijing-gov-04.jpg",
				label: "北京亮马河夜间水岸",
				alt: "北京亮马河夜间水岸与城市建筑",
				position: "center 52%",
				source: "北京市人民政府",
				sourceUrl: sources.liangma
			},
			nodes: [
				{ type: "System", value: systemFlow },
				{
					type: "Text",
					speaker: "晚晚",
					speakerAvatar: { src: "/assets/images/characters/wanwan-avatar.png", alt: "晚晚人物头像" },
					variant: "dialogue",
					value: {
						align: "right",
						text: "“所以，‘北京没有夜生活’更像是一种旧印象。它没有消失，只是没有总以喧闹的方式出现。”"
					}
				},
				{
					type: "Text",
					speaker: "小夏",
					speakerAvatar: { src: "/assets/images/characters/xia-avatar.png", alt: "小夏人物头像" },
					variant: "dialogue",
					value: {
						align: "left",
						text: "“有人沿河散步，有人看完演出赶夜班车，也有人在街区巡逻、清扫。夜晚越丰富，背后的城市系统就越忙。”"
					}
				},
				{
					type: "Text",
					speaker: "结语",
					variant: "body",
					value: {
						align: "right",
						text: [
							"长期以来，北京常被贴上“没有夜生活”的标签：景点闭馆较早、城市尺度很大、夜间活动彼此分散，很难汇成一条一眼可见的霓虹街。但从 129 个夜间消费点位、持续增长的夜间服务消费，到演艺新空间、夜班公交与街区治理，北京的夜晚正在从少数热点扩展为更稳定的城市生活。",
							"这不是简单地把灯亮得更久，而是空间更新、文化供给、公共服务和治安治理共同延长了人们停留的时间。北京的夜生活或许不总喧闹，却正在以更多元、更安全、也更日常的方式生长。"
						]
					}
				}
			]
		})
	],
	methodology: null,
	footer: {
		credits: "数据新闻作品《夜晚的另一面》",
		instructor: "刘莹华",
		members: "马雨秋 · 曹馨熔 · 赵珺涵 · 胡咏伊"
	}
};
