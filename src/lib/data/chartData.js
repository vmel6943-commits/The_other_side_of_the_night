const liangmaheSystem = {
	chartType: "riverGroupedBars",
	eyebrow: "RIVER NIGHT INDEX",
	confidence: "A",
	title: "一条河，怎样撑起城市夜晚？",
	dek: "同样是河流夜游，有的城市靠百万级游客，有的靠高夜游占比，有的靠航班运力，有的靠周边消费外溢。亮马河的特别之处，不是单项最大，而是水岸、夜航、商圈和公共生活叠加。",
	columns: [
		{
			key: "flow",
			label: "客流热度",
			shortLabel: "客流",
			description: "游客接待量或水岸客流热度。不同城市统计周期不完全一致。"
		},
		{
			key: "operation",
			label: "运营强度",
			shortLabel: "运营",
			description: "航班、航次、船舶、客位、通航里程等运营能力。因口径不同，转为指数显示。"
		},
		{
			key: "consumption",
			label: "消费外溢",
			shortLabel: "消费",
			description: "旅游收入、企业营收增量、商户、商业贡献率等周边消费外溢。"
		},
		{
			key: "night",
			label: "夜间化程度",
			shortLabel: "夜间",
			description: "夜班占比、夜航时段、夜间经济贡献率或夜游特征。"
		}
	],
	cities: [
		{
			city: "北京",
			project: "亮马河",
			type: "公共空间复合型水岸",
			accent: true,
			values: {
				flow: {
					index: 85,
					raw: "年度总游客量超千万人次；2025春节8天游客119.22万人次；游船年接待10余万人次",
					status: "partial",
					note: "北京为全域水岸客流、节假日样本和游船客流混合口径，不与全年游船客流直接排名。"
				},
				operation: {
					index: 72,
					raw: "6公里旅游通航、18公里滨水绿道、28艘游船、最大运力3000座次、单航次40—45分钟",
					status: "hard"
				},
				consumption: {
					index: 82,
					raw: "2025春节旅游收入15371.34万元；沿岸87家商户；首店/旗舰店占比35%；夜间经济贡献率40%",
					status: "partial",
					note: "收入为春节假期样本，商户与贡献率用于说明水岸商业外溢。"
				},
				night: {
					index: 62,
					raw: "夜航18:00—22:00；小环线夜间票90元；夜间经济贡献率40%",
					status: "partial"
				}
			},
			hoverTitle: "北京｜亮马河",
			hoverContext: [
				"类型：公共空间复合型水岸",
				"空间连接：第二使馆区、第三使馆区、燕莎、蓝色港湾、朝阳公园",
				"公共生活：绿道、散步、遛狗、野餐、夜航、码头",
				"运维节点：票务、安保、保洁、码头调度"
			],
			sourceLabel: "A组权威数字、B部分北京数据、亮马河公开资料"
		},
		{
			city: "广州",
			project: "珠江游",
			type: "大规模城市水上夜游",
			values: {
				flow: {
					index: 100,
					raw: "2024全年客流量超423万人次，同比增长2.91%",
					status: "hard"
				},
				operation: {
					index: 68,
					raw: "纯电动船10艘、2987客位；市中心城区珠江游码头靠泊能力提升至2000吨级",
					status: "hard"
				},
				consumption: {
					index: 48,
					raw: "夜游、日游、音乐航班、粤剧航班、水上茶居、文创市集、美食夜市、月色音乐会等业态",
					status: "context",
					note: "缺少与其他城市同口径的水上夜游消费收入。"
				},
				night: {
					index: 70,
					raw: "有夜游产品和夜经济业态，但未找到夜班客运占比公开口径",
					status: "context"
				}
			},
			hoverTitle: "广州｜珠江游",
			hoverContext: [
				"类型：大规模城市水上夜游",
				"关键词：珠江夜游、世界级旅游品牌、水上消费",
				"产品：音乐航班、粤剧航班、水上茶居、文创市集、美食夜市"
			],
			sourceLabel: "广州市港务局公开信息"
		},
		{
			city: "上海",
			project: "浦江游览",
			type: "国际都市观光型水上夜游",
			values: {
				flow: {
					index: 99,
					raw: "截至2024年12月中旬接待客流413.4万人次，预计2024全年420万人次",
					status: "hard"
				},
				operation: {
					index: 95,
					raw: "截至2024年12月中旬，营运航班21837班次",
					status: "hard"
				},
				consumption: {
					index: 58,
					raw: "增开错峰保障航班1279班次，增加游客30.3万人次，增加企业营收3742万元",
					status: "hard"
				},
				night: {
					index: 55,
					raw: "以黄浦江两岸观光和游船+演出、游船+联动为主要特征，未找到夜班占比公开口径",
					status: "context"
				}
			},
			hoverTitle: "上海｜浦江游览",
			hoverContext: [
				"类型：国际都市观光型水上夜游",
				"关键词：黄浦江、外滩、游船+演出、游船+联动",
				"特点：游船可以变成剧场、宴会厅、会议厅、摄影棚等复合文旅空间"
			],
			sourceLabel: "上海市国资委 / 久事集团公开信息"
		},
		{
			city: "重庆",
			project: "两江游",
			type: "高夜游占比型水上夜游",
			values: {
				flow: {
					index: 62,
					raw: "2024年1—8月累计接待游客262.6万人次",
					status: "hard",
					note: "重庆为1—8月阶段数据，不是全年数据。"
				},
				operation: {
					index: 60,
					raw: "2024年1—8月夜班客运量220.1万人次，夜班平均载客率75%",
					status: "hard"
				},
				consumption: {
					index: 42,
					raw: "缺少同口径水上夜游消费收入；与解放碑、洪崖洞、山城夜景传播强绑定",
					status: "context"
				},
				night: {
					index: 100,
					raw: "2024年1—8月夜班客运量220.1万人次，占83.8%",
					status: "hard"
				}
			},
			hoverTitle: "重庆｜两江游",
			hoverContext: [
				"类型：高夜游占比型水上夜游",
				"关键词：山城夜景、两江水面、立体交通",
				"特点：夜班客运占比极高，适合说明河流夜游的夜间化程度"
			],
			sourceLabel: "重庆市政府公开信息"
		},
		{
			city: "南京",
			project: "秦淮河夜游",
			type: "历史街区河道夜游",
			values: {
				flow: {
					index: 28,
					raw: "2023年上半年游客接待总量120万人次",
					status: "hard",
					note: "南京为2023年上半年数据，不是2024全年数据。"
				},
				operation: {
					index: 100,
					raw: "2023年上半年船舶运营航次累计4.6万次，70条游船",
					status: "hard"
				},
				consumption: {
					index: 72,
					raw: "2023年上半年营业收入超1亿元；7月夜游营收较去年同期增长150%",
					status: "hard"
				},
				night: {
					index: 75,
					raw: "以秦淮河夜游、夫子庙历史街区和沉浸式游船为核心，未找到夜游占比公开口径",
					status: "context"
				}
			},
			hoverTitle: "南京｜秦淮河夜游",
			hoverContext: [
				"类型：历史街区河道夜游",
				"关键词：秦淮河、夫子庙、画舫、沉浸式夜游",
				"特点：河道夜游与历史街区、文旅消费、夜间排队场景绑定"
			],
			sourceLabel: "人民网 / 江苏公开报道"
		}
	],
	legend: [
		{ key: "hard", label: "硬数据", description: "有明确数值、时间和公开来源" },
		{ key: "partial", label: "部分可比", description: "有数据，但口径与其他城市不完全一致" },
		{ key: "context", label: "情境指标", description: "用于解释类型，不作严格数量比较" }
	],
	source: "广州市港务局、上海市国资委 / 久事集团、重庆市政府、人民网 / 江苏报道、A组权威数字与B部分北京数据",
	note: "柱高为0—100维度指数，用于展示不同城市水岸夜游能力结构；hover显示原始数据与口径。不同城市统计周期和指标口径不完全一致，不能作为严格排名。",
	risk: "客流、运营、消费、夜间化四类指标单位不同，因此图中使用指数化柱高。缺少同口径数据的指标以弱化柱或情境柱呈现，不按0处理。"
};

const sanlitunComplexity = {
	eyebrow: "A / B SIDE",
	title: "热闹之后，谁在守护？",
	dek: "三里屯的 A 面是外摆、酒吧和商圈客流；而在更大的城市夜晚里，解放西、外滩等高热度街区也各自发展出不同的守护方式。热闹不是自然消散的，而是被一套看不见的城市系统接住。",
	chartType: "nightGuardChain",
	confidence: "B",
	beijingALens: {
		title: "北京三里屯：霓虹被看见的一面",
		subtitle: "国际街区、酒吧街、外摆和太古里客流，共同构成北京夜生活的 A 面入口。",
		type: "北京 A 面放大镜",
		items: [
			{
				label: "春节假期太古里客流",
				value: "39.7",
				unit: "万人次",
				detail: "用于呈现核心商圈假期人流热度",
				status: "hard"
			},
			{
				label: "备案注册酒吧",
				value: "70+",
				unit: "家",
				detail: "体现三里屯酒吧街夜间业态密度",
				status: "hard"
			},
			{
				label: "现有外摆店铺",
				value: "14",
				unit: "家",
				detail: "三里屯太古里南北区外摆空间",
				status: "hard"
			},
			{
				label: "外摆面积",
				value: "750",
				unit: "㎡",
				detail: "现有外摆总面积",
				status: "hard"
			},
			{
				label: "规划新增外摆",
				value: "+16",
				unit: "家",
				detail: "新增后外摆空间预计进一步扩大",
				status: "partial"
			}
		],
		conclusion: "三里屯的热闹不是抽象的，它首先表现为可停留、可消费、可拍照、可社交的街区空间。"
	},
	chainColumns: [
		{
			key: "heat",
			label: "热度入口",
			description: "人流、客流或夜间聚集的入口数据"
		},
		{
			key: "complexity",
			label: "复杂场景",
			description: "让街区变复杂的空间和业态"
		},
		{
			key: "guardian",
			label: "守护系统",
			description: "承接夜间秩序的人员、机构或技术系统"
		},
		{
			key: "signal",
			label: "压力信号 / 处置结果",
			description: "警情、处警、报警量或风险压降"
		}
	],
	guardChains: [
		{
			city: "北京",
			district: "三里屯",
			type: "国际酒吧街型",
			accent: true,
			summary: "酒吧、使馆、写字楼和商业区叠加，使三里屯成为高度复合的夜间街区。",
			nodes: {
				heat: {
					label: "39.7万春节客流",
					value: "39.7万",
					detail: "2025年春节假期太古里客流。",
					status: "hard"
				},
				complexity: {
					label: "酒吧 + 使馆 + 外摆",
					value: "70+酒吧",
					detail: "多个使馆、近百家酒吧、写字楼、酒吧街、商业区叠加；另有14家外摆、750㎡外摆面积。",
					status: "partial"
				},
				guardian: {
					label: "三里屯派出所",
					value: "70+民警",
					detail: "70多位民警维护辖区使馆、酒吧、居民和商业区安全。",
					status: "hard"
				},
				signal: {
					label: "日均80+起警情",
					value: "80+起/日",
					detail: "平均每天接报警情80余起，入夜后更加忙碌。",
					status: "hard"
				}
			},
			hoverTitle: "北京｜三里屯",
			hoverText: "国际酒吧街型夜晚：热闹来自外摆、酒吧和商圈客流，复杂度来自使馆区、写字楼、商业区、居民和夜间警情的叠加。",
			sourceLabel: "A组/B部分北京数据 + 新华社公开报道"
		},
		{
			city: "长沙",
			district: "解放西 / 坡子街",
			type: "烟火娱乐街型",
			summary: "解放西是夜宵、酒吧、KTV、旅馆和游客打卡共同叠加的烟火型夜间街区。",
			nodes: {
				heat: {
					label: "日均43万人流",
					value: "43万/日",
					detail: "坡子街派出所辖区日均人流量达43万人次，节假日可超100万人次。",
					status: "hard"
				},
				complexity: {
					label: "娱乐场所 + 经营户",
					value: "9600+经营户",
					detail: "酒吧、KTV等娱乐场所53家，旅馆400余家，个体经营户9600余家。",
					status: "hard"
				},
				guardian: {
					label: "坡子街派出所",
					value: "守护解放西",
					detail: "《守护解放西》让坡子街派出所成为大众理解夜间警务的入口。",
					status: "context"
				},
				signal: {
					label: "日均100+起处警",
					value: "100+起/日",
					detail: "公开报道提到坡子街派出所日均处警量超过100起。",
					status: "hard"
				}
			},
			hoverTitle: "长沙｜解放西 / 坡子街",
			hoverText: "烟火娱乐街型夜晚：高密度人流、娱乐场所、旅馆和经营户形成夜间烟火气，也带来高频处警需求。",
			sourceLabel: "湖南/新华社公开报道"
		},
		{
			city: "上海",
			district: "外滩",
			type: "景观大客流型",
			summary: "外滩不是酒吧街型夜生活，而是景观打卡和节假日大客流管理的典型场景。",
			nodes: {
				heat: {
					label: "日均约40万人流",
					value: "40万/日",
					detail: "外滩及南京东路等区域常态化大客流，公开报道提到日均约40万人流。",
					status: "hard"
				},
				complexity: {
					label: "景观客流 + 跨年节点",
					value: "大客流",
					detail: "滨水景观、南京东路、节假日和跨年客流叠加。",
					status: "context"
				},
				guardian: {
					label: "智能安防 + 指挥调度",
					value: "动态管控",
					detail: "通过视频采集、轨迹追踪、信息分析和按客流调度警力等方式进行大客流管理。",
					status: "context"
				},
				signal: {
					label: "警情类不足5起/日",
					value: "<5起/日",
					detail: "公开报道提到区域每天110报警量降至约40起，其中警情类报警不足5起。",
					status: "hard"
				}
			},
			hoverTitle: "上海｜外滩",
			hoverText: "景观大客流型夜晚：重点不在酒吧消费，而在滨水景观、大客流预警、客流疏导和智能安防。",
			sourceLabel: "上海公安公开报道"
		}
	],
	legend: [
		{
			key: "hard",
			label: "硬数据",
			description: "有明确数字、时间或公开来源"
		},
		{
			key: "partial",
			label: "部分可比",
			description: "有数据，但口径与其他街区不完全一致"
		},
		{
			key: "context",
			label: "情境指标",
			description: "用于解释街区类型，不作数量排名"
		}
	],
	source: "A组/B部分北京数据、新华社、湖南公开报道、上海公安公开报道",
	note: "本图不比较哪个街区更“乱”，而是展示三类高热度夜间街区的不同守护机制。警情、处警、报警量并非完全同一口径，不能直接排名。",
	risk: "北京三里屯、长沙解放西、上海外滩的统计口径、辖区尺度和治理场景不同，图表用于解释类型差异，不作严格横向排名。"
};

const performanceComparison = {
	chartType: "performanceBubbleMap",
	eyebrow: "PERFORMANCE BAR COLLECTION",
	confidence: "A",
	badge: "官方数据 / 平台样本",
	title: "每天156场演出之后，北京的夜晚还没有结束",
	dek: "2024年，北京营业性演出场次约为全国省级平均的3.6倍。剧场散场后，脱口秀、演艺新空间、LiveHouse、小酒馆和精酿吧继续把夜晚延长为一种内容消费。",
	mainComparison: [
		{
			label: "营业性演出场次",
			unit: "万场",
			beijing: 5.7,
			beijingLabel: "5.7万场",
			nationalAverage: 1.58,
			nationalLabel: "1.58万场",
			ratio: "约3.6倍",
			note: "全国48.84万场按31个省级行政区折算"
		},
		{
			label: "观众人次",
			unit: "万人次",
			beijing: 1280.8,
			beijingLabel: "1280.8万人次",
			nationalAverage: 568.3,
			nationalLabel: "568.3万人次",
			ratio: "约2.3倍",
			note: "全国17618.16万人次按31个省级行政区折算"
		},
		{
			label: "票房收入",
			unit: "亿元",
			beijing: 39,
			beijingLabel: "39亿元",
			nationalAverage: 18.7,
			nationalLabel: "18.7亿元",
			ratio: "约2.1倍",
			note: "全国579.54亿元按31个省级行政区折算"
		}
	],
	dailyBeijing: [
		{ label: "平均每天演出", value: "约156", unit: "场/日", formula: "5.7万场 / 365" },
		{ label: "平均每天观众", value: "约3.5", unit: "万人次/日", formula: "1280.8万人次 / 365" },
		{ label: "平均每天票房", value: "约1068", unit: "万元/日", formula: "39亿元 / 365" }
	],
	spaceBase: [
		{ label: "演出场所", value: 352, unit: "家" },
		{ label: "演艺新空间", value: 79, unit: "家" },
		{ label: "演艺空间培育项目", value: 25, unit: "家" }
	],
	contentTypes: [
		{ label: "脱口秀", value: 10000, displayValue: "超1万场" },
		{ label: "曲艺", value: 5000, displayValue: "超5000场" },
		{ label: "话剧", value: 5000, displayValue: "超5000场" },
		{ label: "杂技魔术", value: 5000, displayValue: "超5000场" },
		{ label: "儿童剧", value: 5000, displayValue: "超5000场" },
		{ label: "大型演唱会", value: 165, displayValue: "165场" }
	],
	growthBars: [
		{ label: "北京票房收入", value: 73.6, displayValue: "+73.6%" },
		{ label: "北京大型演出场次", value: 65, displayValue: "+65%" },
		{ label: "全国万人以上演唱会场次", value: 84.37, displayValue: "+84.37%" },
		{ label: "全国演唱会场次", value: 49.9, displayValue: "+49.90%" }
	],
	beyondTheater: [
		{ label: "全国40城特色酒吧", value: 630, unit: "家" },
		{ label: "首次上榜酒吧", value: 99, unit: "家" },
		{ label: "北京上榜酒吧", value: 63, unit: "家" },
		{ label: "全国LiveHouse上榜", value: 86, unit: "家" },
		{ label: "全国特色小酒馆上榜", value: 122, unit: "家" },
		{ label: "全国精酿啤酒吧上榜", value: 31, unit: "家" }
	],
	sourceNote:
		"数据来源：2024年北京市文化和旅游统计公报、北京市文化和旅游局2024年北京演艺市场盘点、中国演出行业协会《2024年全国演出市场简报》、美团2024年酒吧指南。全国省均为按31个省级行政区粗略折算，不代表官方排名；酒吧相关数据为平台榜单样本，不代表全量门店数。",
	axes: {
		x: {
			key: "audiencePerShow",
			label: "单场平均观众",
			unit: "人/场",
			min: 0,
			max: 14000,
			compressed: true
		},
		y: {
			key: "ticketPerAudience",
			label: "人均票房",
			unit: "元/人次",
			min: 0,
			max: 850
		},
		radius: {
			key: "boxOffice",
			label: "总票房",
			unit: "亿元"
		}
	},
	points: [
		{
			id: "national",
			name: "全国整体",
			category: "全国整体",
			performances: 488400,
			audience: 17618.16,
			audienceUnit: "万人次",
			boxOffice: 579.54,
			boxOfficeUnit: "亿元",
			audiencePerShow: 361,
			ticketPerAudience: 329,
			radiusIndex: 80,
			status: "national",
			hoverTitle: "全国整体｜2024营业性演出",
			hoverStats: ["48.84万场", "17618.16万人次", "579.54亿元票房", "约361人/场", "约329元/人次"],
			hoverText: "全国整体是所有营业性演出的平均位置，包含剧场类、大型演出和旅游演艺等不同类型。",
			sourceLabel: "中国演出行业协会 2024全国演出市场简报"
		},
		{
			id: "theater",
			name: "剧场类",
			category: "全国分类",
			performances: 296400,
			audience: 5424.11,
			audienceUnit: "万人次",
			boxOffice: 119.29,
			boxOfficeUnit: "亿元",
			audiencePerShow: 183,
			ticketPerAudience: 220,
			radiusIndex: 38,
			status: "type",
			hoverTitle: "剧场类演出｜小规模、高频次",
			hoverStats: ["29.64万场", "5424.11万人次", "119.29亿元票房", "约183人/场", "约220元/人次"],
			hoverText: "剧场类演出包含演艺新空间、小剧场等，更接近城市夜晚里的高频、小中规模内容供给。",
			sourceLabel: "中国演出行业协会 2024全国演出市场简报"
		},
		{
			id: "large",
			name: "大型演出",
			category: "全国分类",
			performances: 2700,
			audience: 3651.82,
			audienceUnit: "万人次",
			boxOffice: 296.36,
			boxOfficeUnit: "亿元",
			audiencePerShow: 13525,
			ticketPerAudience: 812,
			radiusIndex: 64,
			status: "type",
			hoverTitle: "大型演出｜大人群、高票价",
			hoverStats: ["0.27万场", "3651.82万人次", "296.36亿元票房", "约13525人/场", "约812元/人次"],
			hoverText: "大型演出用较少场次承接巨大人群，票房贡献突出，是演唱会、音乐节等夜间大事件的代表。",
			sourceLabel: "中国演出行业协会 2024全国演出市场简报"
		},
		{
			id: "tourism",
			name: "旅游演艺",
			category: "全国分类",
			performances: 189300,
			audience: 8542.23,
			audienceUnit: "万人次",
			boxOffice: 163.89,
			boxOfficeUnit: "亿元",
			audiencePerShow: 451,
			ticketPerAudience: 192,
			radiusIndex: 45,
			status: "type",
			hoverTitle: "旅游演艺｜中等规模、文旅场景",
			hoverStats: ["18.93万场", "8542.23万人次", "163.89亿元票房", "约451人/场", "约192元/人次"],
			hoverText: "旅游演艺通常和景区、文旅消费结合，观众规模高于剧场类，但人均票房较低。",
			sourceLabel: "中国演出行业协会 2024全国演出市场简报"
		},
		{
			id: "beijing",
			name: "北京",
			category: "城市整体",
			performances: 57000,
			audience: 1280,
			audienceUnit: "万人次",
			boxOffice: 39,
			boxOfficeUnit: "亿元",
			audiencePerShow: 225,
			ticketPerAudience: 305,
			radiusIndex: 30,
			status: "city",
			accent: true,
			hoverTitle: "北京｜城市演艺供给",
			hoverStats: ["5.7万场", "1280万人次", "39亿元票房", "约225人/场", "约305元/人次"],
			hoverText: "北京不是最大型人群聚集的演出夜晚，但它的特点是多点、高频、内容密集，兼具剧场、新空间和大型活动。",
			sourceLabel: "北京市文化和旅游局 2024演艺市场数据"
		}
	],
	beijingDensity: {
		title: "北京 2024：每天都有多少内容在上演？",
		items: [
			{
				label: "平均每天演出",
				value: "约156",
				unit: "场/日",
				detail: "5.7万场 / 365"
			},
			{
				label: "平均每天观众",
				value: "约3.5",
				unit: "万人次/日",
				detail: "1280万人次 / 365"
			},
			{
				label: "平均每天票房",
				value: "约1068",
				unit: "万元/日",
				detail: "39亿元 / 365"
			},
			{
				label: "演出场所",
				value: "352",
				unit: "家",
				detail: "2024年北京演出场所数量"
			},
			{
				label: "演艺新空间",
				value: "79",
				unit: "家",
				detail: "全市累计认定演艺新空间"
			}
		]
	},
	nightContentFormats: {
		title: "夜晚内容不只在剧场里",
		intro:
			"这些不是传统剧院里的大演出，而是更贴近日常夜晚的内容场景：听歌、喝一杯、看一场脱口秀，或在商圈里进入一个演艺新空间。",
		groups: [
			{
				key: "barLivehouse",
				label: "酒吧 / LiveHouse",
				status: "platform",
				items: [
					{
						label: "北京特色酒吧上榜",
						value: "63",
						unit: "家",
						detail: "美团2024年酒吧指南中，北京共有63家特色酒吧上榜。",
						confidence: "B"
					},
					{
						label: "北京酒吧订单",
						value: "+120%",
						detail: "北京酒吧消费订单量同比增长超过120%。",
						confidence: "B"
					},
					{
						label: "北京 LiveHouse 订单",
						value: "+500%",
						detail: "北京 LiveHouse 订单量同比增长超过500%。",
						confidence: "B"
					},
					{
						label: "朝阳区 LiveHouse",
						value: "全国前三",
						detail: "北京朝阳区是全国 LiveHouse 门店数最多的三大城区之一。",
						confidence: "B"
					}
				],
				takeaway: "酒吧和 LiveHouse 把演出、社交和夜间消费连接在一起，是更贴近日常夜生活的内容入口。"
			},
			{
				key: "nationalBarFormats",
				label: "小酒馆 / 精酿 / 现场音乐",
				status: "platform",
				items: [
					{
						label: "全国特色酒吧样本",
						value: "630",
						unit: "家",
						detail: "美团2024年酒吧指南覆盖全国40城，共630家特色酒吧上榜。",
						confidence: "B"
					},
					{
						label: "LiveHouse 上榜",
						value: "86",
						unit: "家",
						detail: "全国40城上榜特色酒吧中，LiveHouse 共86家。",
						confidence: "B"
					},
					{
						label: "特色小酒馆",
						value: "122",
						unit: "家",
						detail: "全国40城上榜特色酒吧中，特色小酒馆122家。",
						confidence: "B"
					},
					{
						label: "精酿啤酒吧",
						value: "31",
						unit: "家",
						detail: "全国40城上榜特色酒吧中，优质精酿啤酒吧31家。",
						confidence: "B"
					}
				],
				takeaway: "夜晚内容正在从传统酒吧继续细分为现场音乐、小酒馆、精酿和复合社交空间。"
			},
			{
				key: "standup",
				label: "脱口秀 / 喜剧空间",
				status: "industry",
				items: [
					{
						label: "脱口秀场次",
						value: "+54.1%",
						detail: "2025年上半年，全国脱口秀演出场次同比增长54.1%。",
						confidence: "B"
					},
					{
						label: "脱口秀票房",
						value: "+134.9%",
						detail: "2025年上半年，全国脱口秀票房同比增长134.9%。",
						confidence: "B"
					},
					{
						label: "30岁以下观众",
						value: "52%+",
						detail: "2025年上半年，脱口秀30岁以下观众购票占比超过52%。",
						confidence: "B"
					},
					{
						label: "单人观演",
						value: "74.6%",
						detail: "脱口秀观众中，单人观演占比达到74.6%。",
						confidence: "B"
					}
				],
				takeaway: "脱口秀说明夜间内容消费不一定依赖聚餐组局，也可以是轻量、个人化、年轻化的夜间文化消费。"
			},
			{
				key: "newSpaces",
				label: "演艺新空间 / 小剧场",
				status: "official",
				items: [
					{
						label: "北京演艺新空间",
						value: "79",
						unit: "家",
						detail: "全市累计认定演艺新空间79家。",
						confidence: "A"
					},
					{
						label: "北京演出场所",
						value: "352",
						unit: "家",
						detail: "2024年北京352家演出场所共举办营业性演出5.7万场。",
						confidence: "A"
					}
				],
				takeaway: "演艺新空间让演出从传统剧场外溢到商业空间、园区街区、文物古建和复合消费场景。"
			}
		],
		tags: ["LiveHouse", "驻唱 / 现场音乐", "小酒馆", "精酿酒吧", "脱口秀", "小剧场", "沉浸式演艺", "演艺新空间"],
		note:
			"酒吧、LiveHouse、小酒馆数据来自平台指南和消费订单，不是官方全量统计；脱口秀为全国行业趋势，不是北京单独数据；LiveHouse 和驻唱酒吧暂无北京官方统一数量口径，因此不写北京总量。"
	},
	holidayNote: {
		title: "假期会把演出夜晚推到高峰",
		text: "2024年国庆7天，全国营业性演出4.43万场、票房22.09亿元、观众1169.7万人次。它是7天假期口径，不进入全年坐标主图。",
		status: "context"
	},
	legend: [
		{
			key: "national",
			label: "全国整体",
			description: "全国营业性演出总体平均位置"
		},
		{
			key: "type",
			label: "全国分类",
			description: "剧场类、大型演出、旅游演艺等类型"
		},
		{
			key: "city",
			label: "北京",
			description: "作品主线城市，按城市整体演艺市场数据计算"
		}
	],
	source:
		"数据来源：北京市文化和旅游局、北京市文化和旅游统计公报、中国演出行业协会《2024年全国演出市场简报》、美团2024年酒吧指南。全国省均为按31个省级行政区折算；酒吧数据为平台榜单样本。",
	note: "",
	risk: ""
};

const nightServicePeople = {
	title: "23:20之后，北京还有哪些服务还在路上？",
	eyebrow: "SERVICE ROUTES",
	dek: "当地铁和日间公交陆续收班，夜班公交继续把长安街、二环、三环、通州方向和北部居住区接起来；在公交之外，网约车、代驾、骑手、共享单车和城市治理服务继续补位。",
	chartType: "servicePeopleNetwork",
	confidence: "B",
	mapNote: "抽象线路示意图，非真实比例地图",
	routes: [
		{
			id: "夜1",
			slug: "night1",
			name: "长安街东西轴",
			type: "axis",
			path: "M 9 54 L 22 54 L 35 54 L 48 54 L 58 54 L 67 54 L 77 54 L 88 54",
			labelX: 8,
			labelY: 49,
			nodes: [
				{ label: "老山/五棵松", x: 9, y: 54, major: true },
				{ label: "军博", x: 22, y: 54 },
				{ label: "西单", x: 35, y: 54 },
				{ label: "天安门", x: 48, y: 54, major: true },
				{ label: "王府井", x: 58, y: 54 },
				{ label: "北京站", x: 67, y: 54 },
				{ label: "国贸", x: 77, y: 54, major: true },
				{ label: "四惠", x: 88, y: 54 }
			],
			note: "连接长安街沿线夜间返程节点。",
			detail: "长安街东西轴主线，串联西部居住区、核心区、北京站与东部商圈。",
			emphasis: "primary"
		},
		{
			id: "夜2",
			slug: "night2",
			name: "南北中轴线",
			type: "axis",
			path: "M 49 16 L 49 36 L 49 54 L 49 61 L 49 82",
			labelX: 51,
			labelY: 24,
			nodes: [
				{ label: "德胜门", x: 49, y: 16, major: true },
				{ label: "地安门/前门", x: 49, y: 36 },
				{ label: "天桥", x: 49, y: 61 },
				{ label: "南苑方向", x: 49, y: 82 }
			],
			note: "连接老城南北向夜间通道。",
			detail: "南北中轴线补足中心城南北方向的夜间连接。",
			emphasis: "secondary"
		},
		{
			id: "夜20",
			slug: "night20",
			name: "二环环线",
			type: "ring",
			path: "M 33 38 L 64 38 L 64 68 L 33 68 Z",
			labelX: 32,
			labelY: 36,
			nodes: [
				{ label: "夜20北", x: 50, y: 38 },
				{ label: "夜20西", x: 34, y: 52 },
				{ label: "夜20南", x: 50, y: 66 },
				{ label: "夜20东", x: 66, y: 52 }
			],
			note: "内城环线托底。",
			detail: "二环内外方向形成夜间环线骨架。",
			emphasis: "secondary"
		},
		{
			id: "夜30",
			slug: "night30",
			name: "三环环线",
			type: "ring",
			path: "M 22 29 L 77 29 L 77 78 L 22 78 Z",
			labelX: 65,
			labelY: 34,
			nodes: [
				{ label: "夜30北", x: 50, y: 30 },
				{ label: "夜30西", x: 24, y: 52 },
				{ label: "夜30南", x: 50, y: 74 },
				{ label: "夜30东", x: 76, y: 52 }
			],
			note: "三环夜间环线。",
			detail: "三环方向承担更外围的夜间绕行与换乘连接。",
			emphasis: "secondary"
		},
		{
			id: "夜27",
			slug: "night27",
			name: "CBD—通州夜归线",
			type: "branch",
			path: "M 77 54 L 88 54 L 92 61 L 95 70",
			labelX: 67,
			labelY: 75,
			nodes: [
				{ label: "国贸/大北窑", x: 77, y: 54, major: true },
				{ label: "四惠", x: 88, y: 54 },
				{ label: "通州方向", x: 92, y: 61 },
				{ label: "武夷花园", x: 95, y: 70 }
			],
			note: "公开报道提到约25公里、28个站，连接CBD与通州方向夜归人群。",
			detail: "CBD—通州夜归线：约25公里、28个站，连接CBD与通州方向夜归人群。",
			emphasis: "primary"
		},
		{
			id: "夜38",
			slug: "night38",
			name: "居住区—医院—互联网公司线",
			type: "branch",
			path: "M 49 16 L 57 14 L 64 19 L 70 27",
			labelX: 55,
			labelY: 22,
			nodes: [
				{ label: "德胜门", x: 49, y: 16, major: true },
				{ label: "高校/医院", x: 57, y: 14 },
				{ label: "西三旗/清河", x: 64, y: 19 },
				{ label: "回龙观方向", x: 70, y: 27 }
			],
			note: "串联北部居住区、医院和互联网公司。",
			detail: "夜38串联北部居住区、医院和互联网公司，是凌晨北向回家的补位通道。",
			emphasis: "primary"
		}
	],
	busStats: [
		{ label: "夜班公交线路", value: 36, unit: "条" },
		{ label: "夜间线网长度", value: 848, unit: "公里" },
		{ label: "日均乘客", value: "1万余", unit: "人" },
		{ label: "日均发车", value: 792, unit: "次" },
		{ label: "通常首发", value: "23:20", unit: "" },
		{ label: "满载加密阈值", value: 80, unit: "%" }
	],
	nightDistrictCoverage: [
		{
			area: "夜京城地标",
			items: [
				{ label: "公交", value: 110, unit: "条", display: "110条" },
				{ label: "夜班线", value: 14, unit: "条", display: "14条" },
				{ label: "站位", value: 40, unit: "处", display: "近40处" }
			]
		},
		{
			area: "夜京城商圈",
			items: [
				{ label: "公交", value: 182, unit: "条", display: "182条" },
				{ label: "夜班线", value: 21, unit: "条", display: "21条" },
				{ label: "站位", value: 100, unit: "处", display: "约100处" }
			]
		}
	],
	supportServices: [
		{
			role: "网约车 / 出租车",
			metric: "10.07亿单",
			subMetric: "全国全时段口径",
			note: "不代表北京夜间专属。"
		},
		{
			role: "即时配送 / 外卖骑手",
			metric: "预计超480亿单",
			subMetric: "全国行业口径",
			note: "平台与行业数据。"
		},
		{
			role: "代驾",
			metric: "酒后代驾97.8%",
			subMetric: "较早行业报告",
			note: "夜间场景参考。"
		},
		{
			role: "共享单车 / 夜骑",
			metric: "周转约2-3倍",
			subMetric: "北京平台报道",
			note: "可连接夜骑章节。"
		},
		{
			role: "交警 / 安保",
			metric: "秩序维护",
			subMetric: "治理服务类型",
			note: "不做人群数量外推。"
		},
		{
			role: "环卫 / 街区服务",
			metric: "夜间收尾",
			subMetric: "观察服务类型",
			note: "不做人群数量外推。"
		}
	],
	intervals: [
		{ start: "23:20", end: "24:00", interval: 20, label: "20分钟/班" },
		{ start: "24:00", end: "01:00", interval: 30, label: "30分钟/班" },
		{ start: "01:00", end: "03:40", interval: 40, label: "40分钟/班" },
		{ start: "03:40", end: "04:10", interval: 30, label: "30分钟/班" },
		{ start: "04:10", end: "04:50", interval: 20, label: "20分钟/班" }
	],
	timeNote: "36条夜班线按夜间时段调整发车间隔，满载率达80%以上时增加运力。",
	source: "北京公交官网、新华社、北京市交通部门、交通运输部、人民日报、美团单车、滴滴代驾行业报告。",
	note: "公交与夜骑为北京相关；网约车、即时配送、代驾等为全国或平台口径，不做北京夜间专属人数外推。",
	risk: ""
};

const cityNightMatrix = {
	title: "中国城市夜晚性格坐标系",
	eyebrow: "CITY MATRIX",
	dek: "夜经济不是谁最热闹，而是不同城市如何用自身资源组织夜晚。",
	chartType: "cityMatrix",
	confidence: "B",
	axes: {
		x: ["消费商业型", "公共生活型"],
		y: ["日常烟火型", "文旅景观型"]
	},
	cities: [
		{
			city: "北京",
			clusterCount: 14,
			type: "公共空间+演艺文娱+国际街区",
			x: 63,
			y: 59,
			keywords: ["亮马河", "三里屯", "演艺", "夜骑"]
		},
		{
			city: "上海",
			clusterCount: 16,
			type: "品质文娱+国际消费",
			x: 30,
			y: 65,
			keywords: ["外滩", "演艺", "国际消费"]
		},
		{
			city: "重庆",
			clusterCount: 15,
			type: "山城夜景+立体交通+夜游传播",
			x: 42,
			y: 75,
			keywords: ["两江游", "桥梁", "立体夜景"]
		},
		{
			city: "杭州",
			clusterCount: 3,
			type: "水岸休闲+骑行漫游",
			x: 73,
			y: 52,
			keywords: ["水岸", "湖滨", "骑行"]
		},
		{
			city: "成都",
			clusterCount: 5,
			type: "文旅休闲+慢生活",
			x: 77,
			y: 33,
			keywords: ["茶馆", "街区", "松弛"]
		},
		{
			city: "长沙",
			clusterCount: 4,
			type: "烟火消费+网红商圈",
			x: 25,
			y: 25,
			keywords: ["夜市", "小吃", "网红商圈"]
		},
		{
			city: "深圳",
			clusterCount: 2,
			type: "科技灯光+年轻商业",
			x: 36,
			y: 48,
			keywords: ["灯光", "更新街区", "年轻消费"]
		},
		{
			city: "西安",
			clusterCount: 4,
			type: "历史IP+沉浸夜游",
			x: 56,
			y: 77,
			keywords: ["唐风", "不夜城", "沉浸夜游"]
		}
	],
	source: "A组权威数字表、文旅部三批国家级集聚区名单",
	note: "坐标为编辑归纳，用于解释城市类型，不代表官方评分。集聚区数量为硬数据。",
	risk: "坐标点不是官方排名；点位大小只表达国家级夜间文旅消费集聚区数量。"
};

export const chartData = {
	liangmaheSystem,
	sanlitunComplexity,
	performanceComparison,
	nightServicePeople,
	cityNightMatrix
};
