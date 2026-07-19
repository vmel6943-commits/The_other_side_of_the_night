export const nightSecurityPanel = {
	eyebrow: "北京夜巡 / 城市治理数据",
	title: "从 22:00 到 06:00，北京夜游背后还有一张巡控网",
	lead: "夜间安全并不只靠景区门口的一辆警车。北京把夜巡队、24 小时警务室和群防力量连接起来，再根据水域、商圈、交通口与背街小巷的风险差异分层布防。",
	cityMetrics: [
		{ value: "352", unit: "个", label: "派出所建成夜巡队", detail: "覆盖全市基层派出所", percent: 59.3 },
		{ value: "594", unit: "个", label: "警务室 7×24 开放", detail: "形成全天候求助节点", percent: 100 }
	],
	caseStudy: {
		eyebrow: "什刹海样本",
		start: "22:00",
		end: "06:00",
		label: "专职夜巡重点时段",
		image: {
			src: "https://q3.itc.cn/q_70/images03/20260517/0cdc9c28291d483194832f5755ada419.jpeg",
			alt: "夜幕下两名民警沿什刹海临水街区巡逻",
			caption: "夜色中的什刹海，巡逻民警沿临水步道穿过商户与游客之间。",
			source: "新京报（北京警方供图）",
			sourceUrl: "https://www.sohu.com/a/1023913663_114988"
		},
		context: [
			{ value: "3", unit: "片", label: "前海、后海、西海" },
			{ value: "60+", unit: "条", label: "胡同" },
			{ value: "300+", unit: "家", label: "特色商户" }
		]
	},
	zones: [
		{
			level: "一级",
			place: "前海酒吧街、银锭桥、金锭桥",
			share: "70%",
			shareLabel: "辖区夜间警情",
			risk: "酒后滋事 · 噪音扰民 · 临水遇险 · 消费纠纷",
			action: "定点驻守＋每 15 分钟一轮巡查"
		},
		{
			level: "二级",
			place: "环湖步道、沿街商户、民宿、公交地铁口",
			share: "重点检查",
			shareLabel: "夜间经营与出入口",
			risk: "非机动车被盗 · 非法揽客",
			action: "以安全检查为重点加强巡防"
		},
		{
			level: "三级",
			place: "胡同巷口、偏僻步道、停车场边角",
			share: "网格覆盖",
			shareLabel: "背街小巷与边角空间",
			risk: "照明弱区 · 巡防盲点",
			action: "分组负责专属片区，确保无死角"
		}
	],
	response: [
		{ step: "01", title: "派出所统筹", detail: "夜间统一调度专职巡防力量" },
		{ step: "02", title: "多部门联动", detail: "街道、城管、市场监管、消防与文旅共同处置" },
		{ step: "03", title: "200+ 名群防力量补位", detail: "景区安保、物业、网格员与志愿者分片值守" }
	],
	routeProfile: {
		eyebrow: "夜巡线路样本 / 昌平",
		title: "巡逻车、重点线路与社区网格，怎样接成一条夜间响应链",
		intro: "在城乡接合地区，夜巡不是围着单一商圈转，而是用车辆、派出所、必停点位和社区网格逐级延伸。",
		points: [
			{ value: "8", unit: "部", label: "日常路面巡逻车" },
			{ value: "72", unit: "名", label: "集中夜间警力" },
			{ value: "23", unit: "个", label: "派出所接入" },
			{ value: "10", unit: "条", label: "重点线路" },
			{ value: "47", unit: "个", label: "必停点位" },
			{ value: "50", unit: "个", label: "社区网格" }
		],
		weekend: "周五晚与周末，再增加 24 部巡逻车投向夜市、酒吧、商圈和景区。"
	},
	actionMetrics: [
		{ value: "1.3万+", label: "排查整改安全隐患", percent: 100 },
		{ value: "6200+", label: "查处涉牌违法", percent: 47.7 },
		{ value: "400+", label: "查处酒驾", percent: 3.1 }
	],
	outcomes: [
		{ value: "-27.8%", magnitude: 27.8, label: "什刹海 22:00—06:00 治安警情", detail: "2026 年同比下降" },
		{ value: "-30%+", magnitude: 30, label: "北京全市接报扒窃警情", detail: "2026 春夏平安行动以来同比下降" }
	],
	serviceResults: [
		{ value: "0", unit: "起", label: "环湖核心区夜间入室盗窃" },
		{ value: "7", unit: "起", label: "临水落水救援警情" },
		{ value: "3", unit: "分钟", label: "一次银锭桥落水救援用时" }
	],
	caseNote: "不同结果对应不同统计范围：27.8% 指什刹海夜间治安警情，超 30% 指北京全市扒窃警情，二者不作直接横向比较。",
	takeaway: "北京夜巡的逻辑不是把所有警力平均铺开，而是让警力跟着时间、客流和风险走：最热闹处定点驻守，沿湖与交通口重点检查，背街小巷再用网格巡逻补齐。夜游越丰富，安全服务就越需要精细到具体时段和具体位置。",
	sources: [
		{ label: "北京市公安局《北京警方创新夜间巡控模式》（2026）", url: "https://gaj.beijing.gov.cn/xxfb/jwbd/202607/t20260703_4746539.html" },
		{ label: "北京市公安局基层警务数据（2026）", url: "https://gaj.beijing.gov.cn/xxfb/tpxw/202602/t20260214_4517242.html" },
		{ label: "北京警方十波次夏夜巡防清整专项行动（2025）", url: "https://gaj.beijing.gov.cn/xxfb/jwbd/202508/t20250828_4186125.html" },
		{ label: "北京警方严打街头侵财犯罪（2026）", url: "https://gaj.beijing.gov.cn/xxfb/jwbd/202606/t20260618_4707090.html" }
	],
	note: "全市夜巡队、警务室、昌平夜巡链路与什刹海指标来自 2026 年公开报道；夏夜清整行动数据为 2025 年 7 月中旬至 8 月底十个波次累计值。不同年份、地域与警情类型均在图中分开标注。"
};

export const performancePanel = {
	columns: 4,
	eyebrow: "北京演艺供给 / 2024",
	title: "5.7 万余场演出，怎样改变北京夜晚的内容密度",
	lead: "2024 年，北京营业性演出超过 5.7 万场，观众超过 1280 万人次。剧场与 79 家演艺新空间，让夜生活从餐饮消费进一步延伸到内容消费。",
	metrics: [
		{ value: "5.7万+", unit: "场", label: "营业性演出", detail: "2024全年总量，同比增长15.6%" },
		{ value: "1280万+", unit: "人次", label: "观众规模", detail: "2024全年总量，同比增长12.5%" },
		{ value: "39亿+", unit: "元", label: "演出票房", detail: "2024全年总量，同比增长73.6%" },
		{ value: "79", unit: "家", label: "演艺新空间", detail: "多元空间让观演更贴近日常夜生活" },
		{ value: "5000+", unit: "台", label: "精品剧目", detail: "全年在京上演的国内外精品内容" },
		{ value: "约120", unit: "部", label: "新创及复排剧目", detail: "市属院团及国家大剧院全年推出" },
		{ value: "25", unit: "家", label: "空间培育项目", detail: "演艺服务平台推进空间与内容结合" },
		{ value: "580+", unit: "场", label: "“大戏看北京”展演", detail: "113部剧目，三个月吸引观众22万余人次" }
	],
	takeaway: "演出让人群在夜间重新聚集，散场又把客流送回街道。文化供给越丰富，周边服务与深夜交通的承接越重要。",
	source: "北京市文化和旅游局《2024年北京演艺市场盘点》",
	sourceUrl: "https://whlyj.beijing.gov.cn/zwgk/xwzx/gzdt/202501/t20250116_3990475.html",
	note: "以上为全年营业性演出数据，包含日间场次；本图仅用于观察文化内容供给底盘，不将其直接换算为夜经济成绩。"
};
