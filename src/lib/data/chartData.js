const liangmaheSystem = {
	chartType: "liangmaheMetrics",
	eyebrow: "LIANGMA RIVER / 2019-2024",
	confidence: "A",
	title: "6公里航线之外，亮马河改变了什么？",
	dek: "水岸改造先把河道、绿道和公共空间连起来，随后带动客流、商业与文化活动增长。图中把空间规模和治理后的变化分开呈现，避免混用单位。",
	spaceMetrics: [
		{ value: "10", unit: "公里", label: "亮马河河道", detail: "穿越使馆区、燕莎、蓝港与朝阳公园", topic: "space" },
		{ value: "6", unit: "公里", label: "旅游通航航线", detail: "串联燕莎、蓝色港湾、郡王府与红领巾湖", topic: "mobility" },
		{ value: "18", unit: "公里", label: "滨水绿道", detail: "两岸公共步行系统贯通", topic: "mobility" },
		{ value: "80", unit: "万平方米", label: "国际风情水岸", detail: "其中75%为市民休闲公共空间", topic: "space" },
		{ value: "75", unit: "%", label: "公共空间占比", detail: "水岸优先承载市民休闲与公共生活", topic: "space" },
		{ value: "24桥", unit: "18景", label: "沿河景观节点", detail: "形成“1河2湖24桥18景”空间骨架", topic: "space" }
	],
	impactMetrics: [
		{ value: 14, displayValue: "+14%", label: "周边总客流", period: "治理后两年", topic: "people" },
		{ value: 40, displayValue: "+40%", label: "重点商业项目销售额", period: "治理后两年", topic: "commerce" },
		{ value: 32, displayValue: "+32%", label: "商业活跃度", period: "治理后两年", topic: "commerce" },
		{ value: 45, displayValue: "+40%-50%", label: "商业带客流", period: "2019年至2024年", topic: "people" },
		{ value: 75, displayValue: "+70%-80%", label: "蓝港等重点节点客流", period: "2019年至2024年", topic: "people" },
		{ value: 37, displayValue: "+37%", label: "周边商业收入", period: "2023年同比", topic: "commerce" }
	],
	spotlights: [
		{ value: "19.7万", label: "2023跨年夜商圈消费者", note: "人次", topic: "people" },
		{ value: "约40亿", label: "2023年周边商业收入", note: "同比增长37%", topic: "commerce" },
		{ value: "30+", label: "2024年沿河微演出", note: "场", topic: "culture" },
		{ value: "22家", label: "沿岸参与治理单位", note: "政企共建", topic: "governance" },
		{ value: "23个", label: "被滨河公园连通的小区", note: "公共生活", topic: "governance" }
	],
	source: "北京市水务局《多元共治点亮亮马河》《你好，亮马河》（2023、2024）",
	note: "空间规模为亮马河国际风情水岸公开建设数据；客流、销售额和商业活跃度为治理后两年变化；跨年客流、商业收入与微演出分别标注对应年份。"
};

const sanlitunComplexity = {
	chartType: "nightGuardChain",
	eyebrow: "SANLITUN / A-B SIDE",
	confidence: "A",
	title: "近百家酒吧、4万居民：三里屯的热闹如何被接住？",
	dek: "同一片街区叠加了酒吧、使馆、写字楼、商业区和居民生活。四个公开数字把可见的消费入口与背后的警务压力放在同一条链路上。",
	chainTitle: "从热度入口到处置响应：三类街区的守护链",
	beijingALens: {
		title: "北京三里屯：霓虹被看见的一面",
		subtitle: "近百家酒吧、4万余名居民与70余名民警，共同说明这里既是消费入口，也是复合治理现场。",
		type: "北京 A 面放大镜",
		items: [
			{ label: "辖区酒吧", value: "近100", unit: "家", detail: "新华社2025年公开报道", status: "hard" },
			{ label: "辖区居民", value: "4万+", unit: "人", detail: "夜生活街区也是日常居住空间", status: "hard" },
			{ label: "三里屯派出所民警", value: "70+", unit: "名", detail: "承担复合街区安全保障", status: "hard" },
			{ label: "日均接报警情", value: "80+", unit: "起", detail: "入夜后警务更加繁忙", status: "hard" }
		],
		conclusion: "三里屯的 A 面和 B 面发生在同一片街区：消费、居住、外交、办公与治安并不是彼此分开的系统。"
	},
	chainColumns: [
		{ key: "heat", label: "热度入口", description: "夜间聚集从哪里发生" },
		{ key: "complexity", label: "复合场景", description: "哪些城市功能彼此叠加" },
		{ key: "guardian", label: "守护系统", description: "谁承接夜间秩序" },
		{ key: "signal", label: "响应结果", description: "如何感知并处理压力" }
	],
	guardChains: [
		{
			city: "北京",
			district: "三里屯",
			type: "国际酒吧街型",
			accent: true,
			summary: "酒吧、使馆、写字楼、商业区与4万余名居民叠加，构成高密度复合夜间街区。",
			nodes: {
				heat: { label: "近百家酒吧", value: "近100家", detail: "酒吧和商业空间形成夜生活入口。", status: "hard" },
				complexity: { label: "商业 + 外交 + 居住", value: "4万+居民", detail: "夜游目的地同时也是生活社区。", status: "hard" },
				guardian: { label: "三里屯派出所", value: "70+民警", detail: "一线警力维护辖区安全。", status: "hard" },
				signal: { label: "日均接报警情", value: "80+起/日", detail: "公开报道中的日均接报警情。", status: "hard" }
			},
			hoverTitle: "北京｜三里屯",
			hoverText: "消费、居住、外交和办公功能叠加，使警务压力与夜间热度同步上升。",
			sourceLabel: "新华社，2025-01-10"
		},
		{
			city: "长沙",
			district: "解放西 / 坡子街",
			type: "烟火娱乐街型",
			summary: "夜宵、娱乐、旅馆和游客打卡叠加，守护重点落在高频巡逻、调解与现场处置。",
			nodes: {
				heat: { label: "夜宵 + 娱乐", value: "高密聚集", detail: "消费和游客共同形成热度入口。", status: "context" },
				complexity: { label: "游客 + 商户 + 居民", value: "复合场景", detail: "高密度商业与本地生活叠加。", status: "context" },
				guardian: { label: "坡子街派出所", value: "街面守护", detail: "夜间巡逻、调解与现场处置。", status: "context" },
				signal: { label: "快速响应", value: "现场处置", detail: "在高流动街区及时化解冲突。", status: "context" }
			},
			hoverTitle: "长沙｜解放西 / 坡子街",
			hoverText: "烟火娱乐街型夜晚更依赖街面巡逻、现场调解与高频响应。",
			sourceLabel: "湖南公开报道与《守护解放西》公开内容"
		},
		{
			city: "上海",
			district: "外滩",
			type: "景观大客流型",
			summary: "滨水景观、节假日与跨年客流叠加，守护重点从单点处置转向客流监测、疏导和动态调度。",
			nodes: {
				heat: { label: "滨水景观入口", value: "大客流", detail: "景观打卡形成集中客流。", status: "context" },
				complexity: { label: "节假日 + 跨年", value: "峰值叠加", detail: "时间节点放大空间压力。", status: "context" },
				guardian: { label: "监测 + 疏导", value: "动态调度", detail: "按客流变化组织现场力量。", status: "context" },
				signal: { label: "人流密度", value: "分级响应", detail: "用客流信号触发疏导。", status: "context" }
			},
			hoverTitle: "上海｜外滩",
			hoverText: "景观大客流型夜晚更依赖客流监测、现场疏导和动态调度。",
			sourceLabel: "上海市政府与公安公开信息"
		}
	],
	legend: [
		{ key: "hard", label: "公开数值", description: "明确数字与公开来源" },
		{ key: "context", label: "机制说明", description: "用于解释街区治理结构" }
	],
	source: "新华社《霓虹灯下的最美“警”色》、湖南公安与上海市政府公开信息",
	note: "三里屯四项数字均来自新华社2025年1月10日报道；长沙、上海用于补充不同夜间街区的守护机制，不作数值排名。"
};

const performanceComparison = {
	chartType: "performanceBubbleMap",
	eyebrow: "BEIJING PERFORMANCE / 2024",
	confidence: "A",
	badge: "2024官方年度数据",
	title: "5.7万场、1280万人次、39亿元：北京演出供给有多密？",
	dek: "北京的年度营业性演出场次约为全国省级平均的3.6倍。左侧比较供给量级，右侧继续解释增长、空间和内容从哪里来。",
	mainComparison: [
		{ label: "营业性演出场次", unit: "2024全年", beijing: 5.7, beijingLabel: "5.7万场", nationalAverage: 1.58, nationalLabel: "1.58万场", ratio: "约3.6倍", note: "全国48.84万场按31个省级行政区折算" },
		{ label: "观众人次", unit: "2024全年", beijing: 1280, beijingLabel: "1280万+", nationalAverage: 568.3, nationalLabel: "568.3万", ratio: "约2.3倍", note: "全国17618.16万人次按31个省级行政区折算" },
		{ label: "票房收入", unit: "2024全年", beijing: 39, beijingLabel: "39亿元+", nationalAverage: 18.7, nationalLabel: "18.7亿元", ratio: "约2.1倍", note: "全国579.54亿元按31个省级行政区折算" }
	],
	dailyBeijing: [
		{ label: "平均每天演出", value: "约156", unit: "场", formula: "5.7万场 / 366天" },
		{ label: "平均每天观众", value: "约3.5", unit: "万人次", formula: "1280万人次 / 366天" },
		{ label: "平均每天票房", value: "约1066", unit: "万元", formula: "39亿元 / 366天" }
	],
	growthBars: [
		{ label: "营业性演出场次", value: 15.6, displayValue: "+15.6%" },
		{ label: "观众人次", value: 12.5, displayValue: "+12.5%" },
		{ label: "票房收入", value: 73.6, displayValue: "+73.6%" },
		{ label: "大型演出场次", value: 65, displayValue: "+65%" }
	],
	spaceBase: [
		{ label: "演艺新空间", value: 79, unit: "家" },
		{ label: "空间培育项目", value: 25, unit: "个" }
	],
	contentTypes: [
		{ label: "国内外精品剧目", value: 5000, displayValue: "5000+台" },
		{ label: "在京首演剧目", value: 160, displayValue: "160+台" },
		{ label: "新创及复排剧目", value: 120, displayValue: "约120部" }
	],
	beyondTitle: "内容供给继续铺开",
	beyondTheater: [
		{ label: "大戏看北京精品剧目", value: 113, unit: "部" },
		{ label: "展演季演出", value: 580, unit: "+场" },
		{ label: "展演季观众", value: 22, unit: "+万人" },
		{ label: "演艺平台精品项目", value: 275, unit: "台" }
	],
	source: "北京市文化和旅游局《2024年北京演艺市场盘点》、中国演出行业协会《2024年全国演出市场简报》",
	note: "北京年度数据包含日间与夜间营业性演出；全国省均由全国总量除以31个省级行政区，仅用于观察量级；日均按2024年366天换算。"
};

const nightServicePeople = {
	chartType: "servicePeopleNetwork",
	eyebrow: "BEIJING NIGHT BUS / 2019",
	confidence: "A",
	title: "23:20之后，36条夜班线怎样接住一万余人？",
	dek: "2019年公开运营数据显示，北京夜班公交以848公里线网、日均792次发车承接一万余名乘客，并按凌晨时段调整班次间隔。",
	mapNote: "六类线路关系示意，非真实比例地图",
	routes: [
		{ id: "夜1", slug: "night1", name: "长安街东西轴", type: "axis", path: "M 9 54 L 22 54 L 35 54 L 48 54 L 58 54 L 67 54 L 77 54 L 88 54", labelX: 8, labelY: 49, nodes: [{ label: "老山/五棵松", x: 9, y: 54, major: true }, { label: "军博", x: 22, y: 54 }, { label: "西单", x: 35, y: 54 }, { label: "天安门", x: 48, y: 54, major: true }, { label: "王府井", x: 58, y: 54 }, { label: "北京站", x: 67, y: 54 }, { label: "国贸", x: 77, y: 54, major: true }, { label: "四惠", x: 88, y: 54 }], note: "连接长安街沿线夜间返程节点。", detail: "串联西部居住区、核心区、北京站与东部节点。", emphasis: "primary" },
		{ id: "夜2", slug: "night2", name: "南北中轴线", type: "axis", path: "M 49 16 L 49 36 L 49 54 L 49 61 L 49 82", labelX: 51, labelY: 24, nodes: [{ label: "德胜门", x: 49, y: 16, major: true }, { label: "地安门/前门", x: 49, y: 36 }, { label: "天桥", x: 49, y: 61 }, { label: "南苑方向", x: 49, y: 82 }], note: "连接老城南北向夜间通道。", detail: "补足中心城南北方向的夜间连接。", emphasis: "secondary" },
		{ id: "夜20", slug: "night20", name: "二环环线", type: "ring", path: "M 33 38 L 64 38 L 64 68 L 33 68 Z", labelX: 32, labelY: 36, nodes: [{ label: "北", x: 49, y: 38 }, { label: "西", x: 33, y: 53 }, { label: "南", x: 49, y: 68 }, { label: "东", x: 64, y: 53 }], note: "承担内城环线夜间托底。", detail: "二环方向形成内城夜间环线骨架。", emphasis: "secondary" },
		{ id: "夜30", slug: "night30", name: "三环环线", type: "ring", path: "M 22 29 L 77 29 L 77 78 L 22 78 Z", labelX: 65, labelY: 34, nodes: [{ label: "北", x: 50, y: 29 }, { label: "西", x: 22, y: 54 }, { label: "南", x: 50, y: 78 }, { label: "东", x: 77, y: 54 }], note: "承担三环沿线夜间联系。", detail: "更外围的夜间绕行与换乘连接。", emphasis: "secondary" },
		{ id: "夜27", slug: "night27", name: "CBD—通州方向", type: "branch", path: "M 77 54 L 88 54 L 92 61 L 95 70", labelX: 67, labelY: 75, nodes: [{ label: "国贸/大北窑", x: 77, y: 54, major: true }, { label: "四惠", x: 88, y: 54 }, { label: "通州方向", x: 92, y: 61 }, { label: "武夷花园", x: 95, y: 70 }], note: "连接CBD与通州方向夜归人群。", detail: "夜班线网已延伸至通州武夷花园。", emphasis: "primary" },
		{ id: "夜38", slug: "night38", name: "北部居住区方向", type: "branch", path: "M 49 16 L 57 14 L 64 19 L 70 27", labelX: 55, labelY: 22, nodes: [{ label: "德胜门", x: 49, y: 16, major: true }, { label: "高校/医院", x: 57, y: 14 }, { label: "西三旗/清河", x: 64, y: 19 }, { label: "回龙观方向", x: 70, y: 27 }], note: "串联北部居住区与夜间工作节点。", detail: "夜班线网延伸至回龙观、天通苑等大型居住区。", emphasis: "primary" }
	],
	busStats: [
		{ label: "夜班公交线路", value: "36条" },
		{ label: "线网总长度", value: "848公里" },
		{ label: "日均乘客", value: "1万余人" },
		{ label: "日均发车", value: "792次" },
		{ label: "运营时段", value: "23:20-04:50" },
		{ label: "满载加密阈值", value: "80%" }
	],
	nightDistrictCoverage: [
		{ area: "夜京城地标", items: [{ label: "公交线路", value: 110, display: "110条" }, { label: "夜班线路", value: 14, display: "14条" }, { label: "站位", value: 40, display: "近40处" }] },
		{ area: "夜京城商圈", items: [{ label: "公交线路", value: 182, display: "182条" }, { label: "夜班线路", value: 21, display: "21条" }, { label: "站位", value: 100, display: "约100处" }] }
	],
	supportServices: [
		{ role: "网约车 / 出租车", metric: "弹性运力", subMetric: "补充跨区与末班后出行", note: "服务类型" },
		{ role: "即时配送 / 外卖骑手", metric: "即时履约", subMetric: "连接夜间消费与劳动", note: "服务类型" },
		{ role: "代驾", metric: "安全返程", subMetric: "承接饮酒后的回家路", note: "服务类型" },
		{ role: "共享单车 / 夜骑", metric: "末端接驳", subMetric: "连接车站与短途目的地", note: "服务类型" },
		{ role: "交警 / 安保", metric: "秩序维护", subMetric: "治理服务", note: "治理服务" },
		{ role: "环卫 / 街区服务", metric: "夜间收尾", subMetric: "街区运维", note: "治理服务" }
	],
	intervals: [
		{ start: "23:20", end: "24:00", interval: 20, label: "20分钟/班" },
		{ start: "24:00", end: "01:00", interval: 30, label: "30分钟/班" },
		{ start: "01:00", end: "03:40", interval: 40, label: "40分钟/班" },
		{ start: "03:40", end: "04:10", interval: 30, label: "30分钟/班" },
		{ start: "04:10", end: "04:50", interval: 20, label: "20分钟/班" }
	],
	timeNote: "满载率达到80%以上时增加运力。",
	source: "北京市交通委员会2019年夜班公交公开运营数据",
	note: "36条线路、848公里、日均1万余名乘客与792次发车均为2019年公开口径；线路图为编辑示意，右侧服务卡表达公交之外的补位角色。"
};

const cityNightMatrix = {
	chartType: "cityMatrix",
	eyebrow: "NATIONAL NIGHT CLUSTERS",
	confidence: "A",
	title: "345个国家级集聚区中，八座城市如何组织夜晚？",
	dek: "三批国家级夜间文化和旅游消费集聚区构成全国供给底盘；坐标图进一步用八座城市说明，夜晚可以由商业、公共生活、日常烟火或文旅景观组织。",
	batchSummary: [
		{ label: "第一批", value: 120, year: "2021" },
		{ label: "第二批", value: 123, year: "2022" },
		{ label: "第三批", value: 102, year: "2024" },
		{ label: "三批合计", value: 345, year: "" }
	],
	axes: { x: ["消费商业型", "公共生活型"], y: ["日常烟火型", "文旅景观型"] },
	cities: [
		{ city: "北京", clusterCount: 14, batches: [6, 5, 3], type: "公共空间 + 演艺文娱 + 国际街区", x: 63, y: 59 },
		{ city: "上海", clusterCount: 16, batches: [6, 6, 4], type: "品质文娱 + 国际消费", x: 30, y: 65 },
		{ city: "重庆", clusterCount: 15, batches: [6, 6, 3], type: "山城夜景 + 立体交通", x: 42, y: 75 },
		{ city: "杭州", clusterCount: 3, batches: [2, 1, 0], type: "水岸休闲 + 骑行漫游", x: 73, y: 52 },
		{ city: "成都", clusterCount: 5, batches: [2, 3, 0], type: "文旅休闲 + 慢生活", x: 77, y: 33 },
		{ city: "长沙", clusterCount: 4, batches: [2, 2, 0], type: "烟火消费 + 热门商圈", x: 25, y: 25 },
		{ city: "深圳", clusterCount: 2, batches: [0, 1, 1], type: "科技灯光 + 年轻商业", x: 36, y: 48 },
		{ city: "西安", clusterCount: 4, batches: [2, 2, 0], type: "历史IP + 沉浸夜游", x: 56, y: 77 }
	],
	source: "文化和旅游部三批国家级夜间文化和旅游消费集聚区名单",
	note: "120、123和102分别是三批入选项目数，合计345个；圆内数字和圆点大小均表示该城市三批累计入选数量，坐标位置为编辑归纳，不代表官方评分。"
};

export const chartData = {
	liangmaheSystem,
	sanlitunComplexity,
	performanceComparison,
	nightServicePeople,
	cityNightMatrix
};
