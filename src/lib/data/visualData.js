import { nightPointCoordinates } from "./nightPointCoordinates.js";

export const nightPortrait = {
	eyebrow: "北京居民夜间消费 / 官方调查基线",
	title: "从 18:00 到次日 6:00，北京人怎样使用夜晚",
	lead: "与全日旅游总量相比，夜间消费调查更接近这篇报道真正关心的问题：谁在夜里出门、什么时候出门，又把时间花在哪里。",
	year: "2019",
	sample: "3058 名居民 · 覆盖 16 区",
	window: "18:00—次日 06:00",
	participation: { value: 75.5, display: "75.5%", label: "被访者日常有夜间消费" },
	times: [
		{ label: "18:00—20:00", value: 62.2, detail: "晚餐与下班后消费最集中" },
		{ label: "20:00—23:00", value: 34.8, detail: "演出、电影与休闲继续接力" },
		{ label: "23:00 以后", value: 4.9, detail: "深夜消费占比较小但真实存在" }
	],
	activities: [
		{ label: "美食餐饮", value: 73.2 },
		{ label: "电影与文艺演出", value: 52.0 },
		{ label: "景点或公园", value: 48.7 },
		{ label: "逛街购物", value: 48.6 },
		{ label: "健身", value: 45.2 },
		{ label: "书店、图书馆与展览", value: 32.9 }
	],
	spending: [
		{ label: "100 元及以下", value: 25.5 },
		{ label: "101—200 元", value: 34.3 },
		{ label: "201—300 元", value: 21.6 },
		{ label: "301 元及以上", value: 18.7 }
	],
	transport: [
		{ label: "自驾或代驾", value: 40.2 },
		{ label: "步行", value: 38.5 },
		{ label: "公交", value: 31.4 },
		{ label: "地铁", value: 25.2 },
		{ label: "打车", value: 22.7 },
		{ label: "骑车", value: 17.1 }
	],
	pulse: { value: "+17.1%", label: "2024 年端午假期夜间服务消费人次同比增长" },
	source: "北京市统计局《2019 年北京市夜间消费调查报告》",
	sourceUrl: "https://tjj.beijing.gov.cn/tjsj_31433/sjjd_31444/202002/t20200216_1639654.html",
	pulseSource: "北京市人民政府（2024 年端午数据）",
	pulseSourceUrl: "https://www.beijing.gov.cn/gongkai/shuju/sjjd/202406/t20240611_3708135.html",
	note: "2019 年调查为 3058 名北京居民样本，多选题比例可相加超过 100%；2024 年增幅为假期银联商务监测信号，两者不直接比较绝对量。"
};

const pointsFromBuckets = (tier, district, buckets) => Object.entries(buckets).flatMap(([subtype, names]) =>
	names.map((name) => ({ tier, district, subtype, name, tags: [subtype] }))
);

const landmarkPoints = [
	["东城区", "前门大街", ["夜食", "夜购"]], ["东城区", "隆福寺文化街区", ["夜食", "夜游"]], ["东城区", "王府井", ["夜购", "夜游"]],
	["西城区", "天桥演艺区", ["夜游", "夜动"]], ["西城区", "什刹海—地外", ["夜游", "夜食"]], ["海淀区", "五棵松", ["夜动", "夜购"]],
	["石景山区", "首钢园", ["夜动", "夜游"]], ["通州区", "北京（通州）大运河文化旅游景区", ["夜游", "夜动"]], ["通州区", "北京环球城市大道", ["夜食", "夜购", "夜动"]],
	["朝阳区", "新工体—三里屯太古里", ["夜购", "夜动", "夜食"]], ["朝阳区", "蓝色港湾—亮马河国际风情水岸", ["夜游", "夜食", "夜购"]], ["朝阳区", "798—751艺术街区", ["夜动", "夜购"]],
	["朝阳区", "北京奥林匹克中心区", ["夜动", "夜游"]], ["朝阳区", "北京CBD商圈", ["夜购", "夜食"]], ["朝阳区", "北京欢乐谷", ["夜动", "夜游"]], ["朝阳区", "朝阳大悦城", ["夜食", "夜购"]],
	["昌平区", "乐多港假日广场", ["夜食", "夜动"]], ["怀柔区", "雁栖湖旅游风景区", ["夜游"]], ["怀柔区", "慕田峪长城", ["夜游"]],
	["平谷区", "梨树沟休闲谷", ["夜游", "夜动"]], ["密云区", "密云古北水镇国际旅游度假区", ["夜游"]], ["延庆区", "八达岭长城", ["夜游"]]
].map(([district, name, tags]) => ({ tier: "landmark", district, name, tags, subtype: tags[0] }));

const checkinPoints = [
	...pointsFromBuckets("checkin", "东城区", { 餐饮美食: ["簋街", "五道营胡同"], 旅游景区: ["天坛公园", "龙潭中湖公园"] }),
	...pointsFromBuckets("checkin", "西城区", { 餐饮美食: ["华威约饭街"], 旅游景区: ["陶然亭公园", "北海公园"] }),
	...pointsFromBuckets("checkin", "丰台区", { 餐饮美食: ["万丰路餐饮街"], 旅游景区: ["北京园博园", "南宫旅游景区", "世界公园"], 融合消费: ["花乡奥莱村", "丽泽天街", "槐房万达广场"], 主题市集: ["北京花卉大观园“花街夜市”"] }),
	...pointsFromBuckets("checkin", "朝阳区", { 餐饮美食: ["霄云美食街", "朝阳合生汇·21街区", "半淘买生活广场餐饮街区", "月色码头餐饮街区", "好运街"], 旅游景区: ["红领巾公园", "温榆河公园"], 融合消费: ["中骏世界城商业街", "望京合生麒麟新天地商业街", "新辰里购物中心暨餐饮区", "长楹天街", "THE BOX朝外年轻力中心", "悠唐购物中心"], "特色园区/街区": ["酷车小镇", "北投奥园1314", "浩华文创园"], 主题市集: ["潘家园旧货市场"] }),
	...pointsFromBuckets("checkin", "海淀区", { 餐饮美食: ["海淀悦界主题街区", "北京牡丹园特色商业街"], 融合消费: ["西三旗万象汇"], 旅游景区: ["中央广播电视塔"], "特色园区/街区": ["中关村壹号商业广场", "龙徽1910文化创新产业园", "北京卫星制造科技园区"] }),
	...pointsFromBuckets("checkin", "石景山区", { 餐饮美食: ["台湾街", "喜隆多购物中心餐饮区"], 融合消费: ["京西大悦城"], "特色园区/街区": ["模式口历史文化街"] }),
	...pointsFromBuckets("checkin", "门头沟区", { "特色园区/街区": ["檀谷"] }),
	...pointsFromBuckets("checkin", "房山区", { 餐饮美食: ["一站一街·中关村大街"], 融合消费: ["龙湖北京房山天街", "北京首创奥特莱斯"], "特色园区/街区": ["北京莱恩堡酒庄"], 主题市集: ["滨水森林公园东北门广场"] }),
	...pointsFromBuckets("checkin", "通州区", { 融合消费: ["通州万达广场"], "特色园区/街区": ["月亮河艺术小镇", "1988国际体育小镇", "东郎文创产业园", "环球12街区"] }),
	...pointsFromBuckets("checkin", "顺义区", { 餐饮美食: ["中粮祥云小镇商业街"] }),
	...pointsFromBuckets("checkin", "昌平区", { 餐饮美食: ["龙域购物中心西区商业街"] }),
	...pointsFromBuckets("checkin", "大兴区", { 餐饮美食: ["龙湖天街餐饮区"], 融合消费: ["荟聚"], 主题市集: ["兴观夜市"] }),
	...pointsFromBuckets("checkin", "怀柔区", { 融合消费: ["怀柔青春万达广场"], "特色园区/街区": ["顶秀美泉小镇—雁栖不夜谷", "科学城创新小街"] }),
	...pointsFromBuckets("checkin", "平谷区", { "特色园区/街区": ["钧丝邦创意园"], 主题市集: ["星光市集"] }),
	...pointsFromBuckets("checkin", "密云区", { 融合消费: ["密云万象汇"] }),
	...pointsFromBuckets("checkin", "延庆区", { 旅游景区: ["北京世园国际旅游度假区", "妫河夜画"], 融合消费: ["延庆万达广场"], "特色园区/街区": ["延庆环长城文化创意产业园", "永宁古城北街"] }),
	...pointsFromBuckets("checkin", "经开区", { 餐饮美食: ["赤花园创意产业美食餐饮街区"], 融合消费: ["大族广场购物中心", "龙湖北京亦庄天街"] })
];

const lifePoints = [
	...pointsFromBuckets("life", "东城区", { 品质生活圈: ["安定门老北京平房胡同生活圈", "前永康生活圈", "崇外大街西区生活圈"] }),
	...pointsFromBuckets("life", "朝阳区", { 品质生活圈: ["大羊坊便民生活圈", "万红路便民生活圈", "万科—拂林园便民生活圈", "林萃便民生活圈", "合生汇便民生活圈", "奥运村北便民生活圈"] }),
	...pointsFromBuckets("life", "海淀区", { 品质生活圈: ["上地南区生活圈", "牡丹园—北极寺老城住宅生活圈"] }),
	...pointsFromBuckets("life", "丰台区", { 品质生活圈: ["三环新城便民生活圈", "方庄时代life生活圈"] }),
	...pointsFromBuckets("life", "门头沟区", { 品质生活圈: ["门头沟区龙湖生活圈"] }),
	...pointsFromBuckets("life", "房山区", { 品质生活圈: ["华冠生活圈", "悦都苑社区生活圈", "龙湖天街生活圈"] }),
	...pointsFromBuckets("life", "通州区", { 品质生活圈: ["领展生活圈", "通州贵友—淘乐城生活圈", "通州区西关生活圈"] }),
	...pointsFromBuckets("life", "顺义区", { 品质生活圈: ["顺义区恒大街便民生活圈", "绿港—东兴便民生活圈", "建新—怡馨便民生活圈"] }),
	...pointsFromBuckets("life", "大兴区", { 品质生活圈: ["首座御园—团河便民生活圈"] }),
	...pointsFromBuckets("life", "怀柔区", { 品质生活圈: ["泉河迎宾路东生活圈", "商业街生活圈", "雁栖镇柏泉生活圈"] }),
	...pointsFromBuckets("life", "平谷区", { 品质生活圈: ["兴谷光明生活圈", "国泰生活圈", "久润生活圈"] }),
	...pointsFromBuckets("life", "密云区", { 品质生活圈: ["学府生活圈", "檀城社区生活圈", "万德福生活圈"] }),
	...pointsFromBuckets("life", "延庆区", { 品质生活圈: ["新兴生活圈"] })
];

const coordinatesById = new Map(nightPointCoordinates.map((point) => [point.id, point]));
const pointCatalogue = [...landmarkPoints, ...checkinPoints, ...lifePoints].map((point, index) => {
	const id = `night-point-${index + 1}`;
	return { ...point, id, ...coordinatesById.get(id) };
});

export const nightSupplyMap = {
	eyebrow: "北京夜生活供给图谱 / 2024",
	title: "129 个夜间点位，如何落在北京地图上",
	lead: "这张图不再比较游客多少，而是把官方“夜京城”完整名单放回城市空间：每个圆点代表一个消费点位，颜色区分特色地标、打卡地与生活圈，筛选后可继续查看具体业态。",
	total: 129,
	overview: [
		{ label: "特色消费地标", value: 22, detail: "夜游、夜食、夜购、夜动" },
		{ label: "夜间消费打卡地", value: 73, detail: "覆盖五类特色业态" },
		{ label: "品质消费生活圈", value: 34, detail: "连接社区与便民服务" }
	],
	sceneLegend: [
		{ key: "tour", label: "夜游" },
		{ key: "food", label: "夜食" },
		{ key: "shop", label: "夜购" },
		{ key: "move", label: "夜动" }
	],
	map: {
		zoom: 8,
		columns: [209, 210, 211],
		rows: [96, 97],
		attribution: "OpenStreetMap contributors"
	},
	tiers: [
		{ key: "all", label: "全部", count: 129 },
		{ key: "landmark", label: "特色地标", count: 22 },
		{ key: "checkin", label: "打卡地", count: 73 },
		{ key: "life", label: "生活圈", count: 34 }
	],
	tierFilters: {
		landmark: ["夜游", "夜食", "夜购", "夜动"],
		checkin: ["餐饮美食", "旅游景区", "融合消费", "特色园区/街区", "主题市集"]
	},
	catalogue: pointCatalogue,
	featuredNames: ["什刹海—地外", "蓝色港湾—亮马河国际风情水岸", "新工体—三里屯太古里", "首钢园", "北京（通州）大运河文化旅游景区"],
	items: [
		{ label: "首钢园", type: "特色消费地标", scenes: ["tour", "move"], x: 24, y: 52, mobileX: 16, mobileY: 56, examples: "工业遗存夜游、体育运动与主题活动" },
		{ label: "什刹海—地外", shortLabel: "什刹海", type: "特色消费地标", scenes: ["tour", "food"], x: 45, y: 43, mobileX: 36, mobileY: 35, examples: "湖面夜游、胡同漫步与沿岸餐饮", focus: true },
		{ label: "前门大街", type: "特色消费地标", scenes: ["food", "shop"], x: 48, y: 61, mobileX: 39, mobileY: 69, examples: "中轴夜游动线、特色餐饮与夜间消费" },
		{ label: "奥林匹克中心区", shortLabel: "奥林中心", type: "特色消费地标", scenes: ["tour", "move"], x: 50, y: 24, mobileX: 57, mobileY: 17, examples: "夜景游览、体育运动与主题表演" },
		{ label: "亮马河水岸", type: "特色消费地标", scenes: ["tour", "food", "shop"], x: 62, y: 39, mobileX: 69, mobileY: 34, examples: "水岸夜游、餐饮休闲与商业消费", focus: true },
		{ label: "新工体—三里屯", shortLabel: "工体—三里屯", type: "特色消费地标", scenes: ["food", "shop", "move"], x: 61, y: 53, mobileX: 61, mobileY: 58, examples: "夜间餐饮、艺术策展、商业活动与体育演出" },
		{ label: "大运河景区", type: "特色消费地标", scenes: ["tour", "food", "move"], x: 77, y: 57, mobileX: 79, mobileY: 62, examples: "运河夜游、滨水消费与文化活动" },
		{ label: "环球城市大道", shortLabel: "环球大道", type: "特色消费地标", scenes: ["food", "shop", "move"], x: 86, y: 68, mobileX: 88, mobileY: 84, examples: "餐饮、零售与主题娱乐延续至夜间" }
	],
	source: "北京市商务局《2024 年度“夜京城”地标、打卡地、生活圈》",
	sourceUrl: "https://sw.beijing.gov.cn/zwxx/swxx/202408/t20240827_3783142.html",
	note: "129 个点位由 22 个特色消费地标、73 个打卡地和 34 个生活圈构成。地图以 Web Mercator 投影统一计算底图与坐标；实心点对应可核验场所，范围环对应街区或生活圈中心，方框表示仅核验到城区层级的点位，不作为导航坐标。"
};

export const nightSupply = {
	eyebrow: "夜京城供给 / 2024",
	title: "129 个夜间消费点位，覆盖北京 16 区与经开区",
	lead: "从一处地标到一整片生活圈，北京的夜间供给正在向更广的城市空间铺开。三类点位共同覆盖夜游、夜食、夜购与夜动四种场景。",
	total: 129,
	items: [
		{
			label: "打卡地",
			value: 73,
			display: "73 个",
			tone: "primary",
			detail: "覆盖餐饮美食、旅游景区、融合消费、特色园区/街区、主题市集 5 类",
			examples: ["THE BOX 朝外", "北京园博园", "簋街", "潘家园"],
			hoverGroups: [
				{ label: "融合消费", places: "THE BOX 朝外、长楹天街、大族广场" },
				{ label: "旅游景区", places: "北京园博园、妫河夜画、世界公园" },
				{ label: "餐饮美食", places: "簋街、华威约饭街、海淀悦界" },
				{ label: "园区街区", places: "模式口、月亮河、1988 体育小镇" },
				{ label: "主题市集", places: "潘家园、花街夜市、星光市集" }
			]
		},
		{
			label: "品质消费生活圈",
			value: 34,
			display: "34 个",
			tone: "secondary",
			detail: "把夜间消费放进家门口的便民服务与社区文化空间",
			examples: ["安定门", "上地南区", "房山天街"],
			hoverGroups: [
				{ label: "安定门", places: "胡同小店、美食餐厅、Livehouse、酒吧" },
				{ label: "上地南区", places: "咖啡、茶空间、图书馆、文化中心、健身" },
				{ label: "房山天街", places: "消夏夜市、文创市集、音乐表演" }
			]
		},
		{
			label: "特色消费地标",
			value: 22,
			display: "22 个",
			tone: "accent",
			detail: "夜游、夜食、夜购、夜动 4 类综合场景",
			examples: ["什刹海—地外", "亮马河水岸", "王府井", "新工体—三里屯"],
			hoverGroups: [
				{ label: "夜游", places: "什刹海—地外、亮马河水岸、大运河、雁栖湖" },
				{ label: "夜食", places: "前门、朝阳大悦城、隆福寺、环球城市大道" },
				{ label: "夜购", places: "王府井、北京 CBD、新工体—三里屯" },
				{ label: "夜动", places: "798、奥林匹克中心区、五棵松、首钢园" }
			]
		}
	],
	coverage: "16 区 + 经开区",
	pulse: { value: "+17.1%", label: "2024 年端午假期，北京夜间服务消费人次同比增长" },
	source: "北京市商务局（点位）",
	sourceUrl: "https://sw.beijing.gov.cn/zwxx/swxx/202408/t20240827_3783142.html",
	extraSource: "北京市人民政府（端午数据）",
	extraSourceUrl: "https://www.beijing.gov.cn/gongkai/shuju/sjjd/202406/t20240611_3708135.html",
	note: "点位数量为 2024 年“夜京城”发布口径；假期增幅来自北京市 2024 年端午假日消费数据。"
};

export const nanluoPressure = {
	eyebrow: "南锣鼓巷 / 空间与客流",
	title: "8 米宽的主街，节假日一天承接约 18 万人",
	lead: "南锣鼓巷的拥挤并不抽象。2023 年平日客流约 13 万人次，节假日升至约 18 万人次；而人流主要汇入一条不足 800 米的主街。",
	facts: [
		{ value: "787 米", label: "主街南北长度" },
		{ value: "8 米", label: "公开资料所载街宽" },
		{ value: "16 条", label: "东西向胡同" }
	],
	days: [
		{ label: "平日", detail: "2023 日均", year: "2023", scope: "全天客流", density: "折合主街每米约 165 人次/日", delta: "平日基准", factOffset: 0, value: 13, display: "约 13 万人次" },
		{ label: "节假日", detail: "2023 日均", year: "2023", scope: "全天客流", density: "折合主街每米约 229 人次/日", delta: "较平日约 +38.5%", factOffset: 13, value: 18, display: "约 18 万人次" }
	],
	visitorFacts: [
		{ value: "787 米", title: "一条南北主街", detail: "夜游人流最终压缩进不足 800 米的线性空间", source: "街区公开资料" },
		{ value: "约 8 米", title: "主街公开宽度", detail: "胡同尺度决定高峰时段需要持续疏导", source: "街区公开资料" },
		{ value: "16 条", title: "东西向胡同", detail: "主街两侧支巷共同构成夜游漫步网络", source: "街区公开资料" },
		{ value: "13 万人次", title: "2023 平常日均", detail: "全日客流基线，也是夜间承载的上游总量", source: "北京东城·2024" },
		{ value: "18 万人次", title: "2023 假日日均", detail: "节假日全天客流较平日再增约 5 万人次", source: "北京东城·2024" },
		{ value: "+38.5%", title: "假日客流增幅", detail: "由 18 万与 13 万的公开日均值计算", source: "据公开数据计算" },
		{ value: "约 165 人次", title: "平日每米承载", detail: "以 13 万人次除以 787 米得到的空间量级", source: "据公开数据计算" },
		{ value: "约 229 人次", title: "假日每米承载", detail: "以 18 万人次除以 787 米得到的空间量级", source: "据公开数据计算" },
		{ value: "10 万+", title: "春节后日均客流", detail: "2023 年春节以来日均游客已突破十万人", source: "北京东城·2023" },
		{ value: "33 吨/日", title: "整治前垃圾量", detail: "超大客流把夜间清扫压力延伸到闭店之后", source: "北京东城·2024" },
		{ value: "−12.3 吨", title: "整治后日均减量", detail: "居商共治后每天少产生约 12.3 吨垃圾", source: "北京东城·2024" },
		{ value: "约 20.7 吨", title: "整治后日均量", detail: "由 33 吨减去 12.3 吨计算", source: "据公开数据计算" },
		{ value: "80 个", title: "沿街小型垃圾桶", detail: "配合随清随运，维持晚间街面洁净", source: "北京东城·2024" },
		{ value: "28 组", title: "主街垃圾桶组", detail: "2023 年应对客流激增时增设的设施", source: "北京东城·2023" },
		{ value: "25 吨/日", title: "高客流期其他垃圾", detail: "游客激增后垃圾量出现的峰值量级", source: "北京东城·2023" },
		{ value: "4 吨/日", title: "高峰前垃圾基线", detail: "同一报道中给出的日常对照值", source: "北京东城·2023" },
		{ value: "6.25 倍", title: "垃圾量峰谷差", detail: "25 吨相对 4 吨的放大量级", source: "据公开数据计算" },
		{ value: "近 3/4", title: "片区垃圾占比", detail: "高峰时一条主街接近交道口地区垃圾总量四分之三", source: "北京东城·2023" },
		{ value: "166 家", title: "取消窗口售餐", detail: "2023 年商户全面转为店内用餐，给主街让出流动空间", source: "北京东城·2023" },
		{ value: "17:00—19:00", title: "地铁晚高峰", detail: "南锣鼓巷站公开客流特征中的晚高峰区间", source: "北京市交通委" },
		{ value: "约 19:00", title: "晚高峰尖峰", detail: "地铁站客流在晚七点左右达到峰值", source: "北京市交通委" },
		{ value: "6 号线 + 8 号线", title: "两线换乘入口", detail: "轨道交通把夜游客流直接送到街区南口", source: "北京市交通委" },
		{ value: "4 条", title: "站内换乘通道", detail: "错层侧式车站依靠四条通道组织换乘", source: "北京市交通委" },
		{ value: "12 届", title: "南锣戏剧展演季", detail: "截至 2024 年底已连续形成街区文化品牌", source: "北京东城·2025" },
		{ value: "1200 场+", title: "累计戏剧演出", detail: "戏剧为胡同夜晚提供不止餐饮的内容入口", source: "北京东城·2025" },
		{ value: "30 万+", title: "累计戏剧观众", detail: "十二届南锣鼓巷戏剧展演季累计触达", source: "北京东城·2025" },
		{ value: "14 部", title: "2024 展演剧目", detail: "经典、原创回顾与新创首演共同组成", source: "北京东城·2025" },
		{ value: "38 场", title: "2024 剧场演出", detail: "展演季把观演动线延伸进街区周边剧场", source: "北京东城·2025" },
		{ value: "2000 张+", title: "惠民演出票", detail: "降低夜间文化消费的参与门槛", source: "北京东城·2025" },
		{ value: "近 3 万人", title: "2024 展演观众", detail: "本届剧场板块公开的到场观众量级", source: "北京东城·2025" },
		{ value: "3 个月", title: "2024 展演周期", detail: "从 9 月持续到 12 月，连接入秋后的城市夜晚", source: "北京东城·2025" }
	],
	sources: [
		{ label: "北京东城（2024 街区客流与治理）", url: "https://www.bjdch.gov.cn/ywdt/xdcb/202407/P020240725531707335660.pdf" },
		{ label: "北京东城（2023 垃圾治理）", url: "https://www.bjdch.gov.cn/zwgk/hygq/202303/t20230324_3001188.html" },
		{ label: "北京东城（2023 商户调整）", url: "https://www.bjdch.gov.cn/mldc/whxx/xxzl/202310/t20231009_3272737.html" },
		{ label: "北京市交通委（南锣鼓巷站）", url: "https://jtw.beijing.gov.cn/xxgk/dtxx/201312/t20131226_336719.html" },
		{ label: "北京东城（2024 戏剧展演季）", url: "https://www.bjdch.gov.cn/ywdt/dcyw/202501/t20250102_3979010.html" }
	],
	note: "圆点仍表示 2023 年全日客流，每个圆点的悬停信息均改为南锣鼓巷街区本身：空间承载、晚高峰入口、夜间文化内容与闭店后的治理压力；计算值已在卡片中标明。"
};

export const shichahaiRelay = {
	eyebrow: "什刹海 / 从傍晚到清晨",
	title: "夜航到午夜，巡逻与清洁继续接班",
	lead: "一段看似轻松的水上体验，背后覆盖了码头运营、夜间巡逻和清晨保洁。它们来自不同年份的公开报道，却共同勾勒出夜游空间的运行周期。",
	facts: [
		{ value: "3 片", label: "西海、后海、前海" },
		{ value: "6 处", label: "2024 年报道码头数" },
		{ value: "约 1000", label: "2024 夏季船次/日" },
		{ value: "Ⅱ—Ⅲ类", label: "近年常见水质水平" }
	],
	rows: [
		{ label: "游客与夜航", detail: "2024 报道", start: 18, end: 24, time: "夜间—24:00" },
		{ label: "停止售票", detail: "2024 报道", start: 23, end: 24, time: "23:00—24:00" },
		{ label: "夜间巡逻", detail: "2026 报道", start: 22, end: 30, time: "22:00—06:00" },
		{ label: "水上保洁", detail: "2024 报道", start: 29, end: 30, time: "05:00—06:00" }
	],
	source: "北京市水务局、北京市公安局",
	sourceUrl: "https://swj.beijing.gov.cn/swdt/ztzl/sstxczl/sstzx/202408/t20240828_3783599.html",
	note: "夜航时间、船次会受季节与天气影响；巡逻时段来自 2026 年公开报道，图示为城市运行关系而非同日排班。"
};

export const performanceGrowth = {
	eyebrow: "北京演艺市场 / 2024",
	title: "票房增长 73.6%，夜晚获得了更多内容入口",
	lead: "演出场次、观众与票房同时增长，其中票房增速最明显。79 家演艺新空间又把演出带进商圈、园区与更日常的城市空间。",
	totals: [
		{ value: "5.7 万+", label: "营业性演出", detail: "全年总量" },
		{ value: "1280 万+", label: "观众人次", detail: "全年总量" },
		{ value: "39 亿+", label: "演出票房", detail: "全年总量" },
		{ value: "79 家", label: "演艺新空间", detail: "多元空间供给" }
	],
	growth: [
		{ label: "演出场次", detail: "同比 2023", value: 15.6, display: "+15.6%" },
		{ label: "观众人次", detail: "同比 2023", value: 12.5, display: "+12.5%" },
		{ label: "票房收入", detail: "同比 2023", value: 73.6, display: "+73.6%" },
		{ label: "大型演出场次", detail: "同比 2023", value: 65, display: "+65%" }
	],
	source: "北京市文化和旅游局《2024 年北京演艺市场盘点》",
	sourceUrl: "https://whlyj.beijing.gov.cn/zwgk/xwzx/gzdt/202501/t20250116_3990475.html",
	note: "年度营业性演出包含日间场次；图中将其作为北京文化内容供给的背景，不直接等同于夜间演出规模。"
};

export const systemFlow = {
	eyebrow: "城市夜晚 / 六个数据索引",
	title: "从有去处，到看完演出还能回得去",
	lead: "六个不同口径的公开数据，分别指向夜间供给、消费需求、文化内容和公共交通。它们不彼此比较，却能拼出北京夜晚延长的城市链条。",
	items: [
		{ phase: "供给", value: "129", unit: "个", year: "2024", title: "夜间消费点位", text: "22 个地标、73 个打卡地、34 个生活圈。" },
		{ phase: "需求", value: "+17.1", unit: "%", year: "2024 端午", title: "夜间服务消费人次", text: "假期夜间服务消费人次同比增长。" },
		{ phase: "内容", value: "5.7万+", unit: "场", year: "2024", title: "营业性演出", text: "文化内容为夜间停留增加新入口。" },
		{ phase: "空间", value: "79", unit: "家", year: "2024", title: "演艺新空间", text: "演出进入商圈、园区与更新空间。" },
		{ phase: "交通", value: "36", unit: "条", year: "2019", title: "夜班公交线路", text: "地铁收班后继续承接夜归需求。" },
		{ phase: "归途", value: "848", unit: "公里", year: "2019", title: "夜班公交线网", text: "日均发车 792 次，服务一万余人。" }
	],
	sources: [
		{ label: "北京市商务局", url: "https://sw.beijing.gov.cn/zwxx/swxx/202408/t20240827_3783142.html" },
		{ label: "北京市人民政府", url: "https://www.beijing.gov.cn/gongkai/shuju/sjjd/202406/t20240611_3708135.html" },
		{ label: "北京市文化和旅游局", url: "https://whlyj.beijing.gov.cn/zwgk/xwzx/gzdt/202501/t20250116_3990475.html" },
		{ label: "北京市交通委员会", url: "https://jtw.beijing.gov.cn/xxgk/dtxx/201907/t20190719_348839.html" }
	],
	note: "六组数字年份与统计口径不同，用于呈现供给、需求、内容和交通环节，不作绝对量或年度趋势比较。"
};
