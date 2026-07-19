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

export const holidayHotspots = {
	eyebrow: "2025 年春节 8 天 / 北京内部",
	title: "游客流向哪里，夜晚就从哪里继续生长",
	lead: "王府井、天安门、前门等传统目的地仍占据最大客流，亮马河与南锣鼓巷也进入全市热门景区（地区）前十。旧城与新水岸，已经同时出现在北京旅行版图上。",
	max: 239,
	map: {
		zoom: 12,
		columns: [3371, 3372, 3373],
		rows: [1551, 1552],
		attribution: "OpenStreetMap contributors"
	},
	items: [
		{ label: "王府井", context: "传统商业街区", value: 239, display: "239 万人次", shortDisplay: "239 万", x: 53.2, y: 46.8 },
		{ label: "天安门地区", context: "核心地标", value: 209.4, display: "209.4 万人次", shortDisplay: "209.4 万", x: 42.8, y: 51.2 },
		{ label: "前门大街", context: "中轴商业空间", value: 126.8, display: "126.8 万人次", shortDisplay: "126.8 万", x: 45, y: 63 },
		{ label: "亮马河水岸", context: "本篇水岸路径", value: 119.2, display: "119.2 万人次", shortDisplay: "119.2 万", x: 75, y: 21.6, focus: true },
		{ label: "南锣鼓巷", context: "本篇旧城路径", value: 44.9, display: "44.9 万人次", shortDisplay: "44.9 万", x: 47.3, y: 29.8, focus: true }
	],
	source: "北京市文化和旅游局",
	sourceUrl: "https://whlyj.beijing.gov.cn/zwgk/xwzx/gzdt/202502/t20250205_4003564.html",
	note: "数据为 2025 年春节 8 天全日游客量，不是夜间客流；图中只选取与本文路径相关或用于提供量级参照的五个点位。"
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
