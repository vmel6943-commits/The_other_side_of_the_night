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

export const story = {meta:{title:"夜晚的另一面",shortTitle:"夜晚的另一面",description:"两个女孩的三日夜游，看见城市夜经济的 A 面与 B 面。",credits:"数据新闻作品《夜晚的另一面》"},nav:{brand:"夜晚的另一面",brandImage:"/assets/images/brand/nav-brand.png"},hero:{title:"夜晚的另一面",titleWords:["夜晚","的","另一面"],label:"城市夜经济数据新闻",subtitle:"两个女孩的三日夜游，看见城市夜经济里被灯光、路线、服务、秩序和回家路共同托住的一晚。",bubbles:["A 面","B 面","北京夜游","回家路"],image:{src:"/assets/images/hero/hero-night-other-side.png",label:"北京夜晚总视觉",alt:"北京夜晚、两个女孩与城市灯光的总视觉插画"},narrators:[{id:"xia",name:"小夏",role:"观察者",bio:"带着相机和攻略出发，原本只想拍下北京夜晚最好看的 A 面。",avatar:{src:"/assets/images/characters/xia-avatar.png",label:"小夏头像",alt:"小夏人物头像"}},{id:"wanwan",name:"晚晚",role:"记录者",bio:"喜欢在热闹之后多停一会儿，追问城市夜晚背后的运行逻辑。",avatar:{src:"/assets/images/characters/wanwan-avatar.png",label:"晚晚头像",alt:"晚晚人物头像"}}]},sections:[section({id:"intro",num:1,kicker:"出发",title:"夜晚从什么时候开始？",dek:"两个女孩带着攻略来到北京，却在夜晚看见另一套城市系统。",cover:{src:"/assets/images/covers/cover-intro-train-arrival.png",label:"火车抵达北京，路灯亮起",alt:"火车驶入北京站，城市灯光逐渐亮起"},nodes:[{type:"Text",speaker:"晚晚",variant:"dialogue",value:{align:"left",text:["“你说，一座城市的夜晚，到底是从什么时候开始的？”","火车驶入北京站的时候，天刚擦黑。晚晚趴在车窗边往外看，站台的灯、路口的灯、远处楼宇的灯一盏盏亮起来，像有人在大地上撒了一把星星。她原本以为，夜晚大概就是从这些灯亮起来的一刻开始的。"]}},{type:"Text",speaker:"小夏",variant:"dialogue",value:{align:"right",text:["“从霓虹灯亮起来开始？”小夏头也不抬地翻着攻略。她的收藏夹里塞满了北京夜游关键词：亮马河坐船、三里屯喝酒、剧场看话剧、长安街夜骑，每一站都在社交平台上闪着光。","她们是来北京夜游的。按照原本的计划，这会是一次很普通的打卡：拍好看的照片，去热闹的地方，收集几段能发朋友圈的夜晚。"]}},{type:"Text",speaker:"旁白",variant:"aside",value:{align:"left",text:["攻略写下的是城市夜晚的 A 面：游船、酒杯、票根、路灯、骑行路线，都是可以被看见、被拍下、被收藏的片刻。","但一座城市真正的夜晚，往往藏在这些片刻背后。谁让灯继续亮着？谁维持人流秩序？谁把桌椅收回店里？谁在散场后等到最后一批人离开？谁把游客和居民安全送回家？这趟夜游要看的，不只是热闹本身。"]}},{type:"Card",value:{eyebrow:"三日夜游计划",title:"从打卡开始，往城市深处走",body:"第一站亮马河，第二站三里屯，第三站剧场散场，最后骑过长安街。她们原本想看北京夜晚的 A 面，却在每一次靠岸、收街、散场和回家时，遇见了城市运行的 B 面。",image:{src:"/assets/images/cards/card-three-day-plan.png",label:"三日夜游计划",alt:"三日夜游计划卡片插画"},icon:"✦",caption:"从打卡路线出发，夜游逐渐走向城市系统。"}},{type:"Text",speaker:"旁白",variant:"transition",value:{align:"right",text:["三天后，她们真正记住的，不只是攻略里的“必打卡”。","是码头上举着喇叭的工作人员，是凌晨搬桌椅的店员，是剧场门口站到最后的安保，也是夜班公交站台旁等单的代驾司机。夜晚并不是一束灯光照亮的消费场景，而是一套被人、空间、服务和秩序共同托住的城市系统。"]}}]}),section({id:"liangmahe",num:2,kicker:"亮马河",title:"一条河的两种入口",dek:"坐船是一种入口，散步也是一种入口。",cover:{src:"/assets/images/covers/cover-liangmahe-blue-hour.png",label:"亮马河蓝调时刻",alt:"亮马河夜航与水岸灯光"},nodes:[{type:"Text",speaker:"旁白",variant:"body",value:{align:"left",text:["傍晚六点，天刚晕开藏蓝色。小夏和晚晚在燕莎码头检票登船，船顺着水面往蓝港方向漂。河面被灯光切成一段一段，船窗里是暖色的影子，窗外是慢慢退后的树、桥和岸边人群。","两岸绿道铺得平整，野餐的人群、遛狗的住户、抱着吉他的驻唱歌手依次往后退。这里没有夜市的油烟和吆喝声，也没有商场里集中的音乐，只剩城市入夜时独有的松弛。她们以为自己买到的是一张船票，后来才发现，船只是进入这条河的一种方式。"]}},{type:"Image",value:{src:"/assets/images/scenes/scene-liangmahe-cruise.png",label:"亮马河夜航主场景",alt:"亮马河夜航、游船、水岸灯光和散步人群",caption:"A 面：坐船漂过六点的蓝调时刻。"}},{type:"Text",speaker:"小夏",variant:"quote",value:{align:"right",text:["“原来最火的夜游项目，核心不一定是花钱坐船，也可能是免费散步。”","靠岸前，小夏看见岸边的人比船上的人还多。有人坐在台阶上聊天，有人推着婴儿车慢慢走，有人只是靠着栏杆发呆。她后来才知道，水岸和绿道对所有人开放。许多人不是来消费的，只是来遛弯、野餐、遛狗，或者在河边吹一会儿晚风。"]}},{type:"Card",value:{eyebrow:"A 面 / B 面",title:"船票之外，还有一整条开放的水岸",body:"亮马河的吸引力不只来自夜航船票，也来自被打开的公共空间。消费是入口之一，公共生活同样是夜经济的底色。",image:{src:"/assets/images/cards/card-liangmahe-ticket-greenway.png",label:"船票与水岸",alt:"船票与开放水岸双入口卡片插画"},icon:"⛴",caption:"同一条水岸，同时容纳夜航消费和公共生活。"}},{type:"Text",speaker:"旁白",variant:"aside",value:{align:"left",text:["靠岸时，码头工作人员举着喇叭疏导乘客，保洁员弯腰捡起被风吹落的纸巾，安保沿着步道慢慢巡逻。船停下以后，夜晚并没有停止运行。","这份看起来“天生的松弛”，其实依赖河道治理、空间改造、票务调度、夜间运维和回家服务。亮马河的夜晚不是单点消费，而是一条被重新组织过的城市水岸：有人在船上买票，也有人在岸边免费进入同一个夜晚。"]}},{type:"Chart",value:chartData.liangmaheSystem}]}),section({id:"sanlitun",num:3,kicker:"三里屯",title:"霓虹背后的承载",dek:"热闹越集中，背后的秩序越不能缺席。",cover:{src:"/assets/images/covers/cover-sanlitun-neon.png",label:"三里屯凌晨霓虹",alt:"三里屯夜晚街区、外摆、霓虹和人流"},nodes:[{type:"Text",speaker:"旁白",variant:"body",value:{align:"left",text:["从亮马河往南走，到三里屯时已是晚上九点。沿街外摆坐得满满当当，各国料理的招牌亮成一片，年轻人端着酒杯在路边聊天。往工体方向走，夜店门口排着长队，出租车和网约车在路边缓慢移动。","这大概是她们出发前想象中最典型的城市夜生活：霓虹、音乐、酒杯、社交和不愿结束的夜晚。整条街都透着鲜活的都市感，像一台全速运转的夜间机器。"]}},{type:"Image",value:{src:"/assets/images/scenes/scene-sanlitun-a-side.png",label:"三里屯 A 面",alt:"三里屯夜间外摆、霓虹和年轻人",caption:"A 面：酒杯、外摆、霓虹和仍然醒着的街区。"}},{type:"Text",speaker:"旁白",variant:"transition",value:{align:"right",text:["凌晨两点准备离开时，街上的热闹悄悄换了主角。","店员把外摆桌椅一张张搬回店内，环卫工推着清扫车收拾酒瓶与纸巾，城管队员沿着街区巡查秩序。刚刚还被杯盏和音乐填满的街角，开始显露出另一种节奏：不是消费的节奏，而是收尾、清理和恢复秩序的节奏。"]}},{type:"Text",speaker:"小夏",variant:"dialogue",value:{align:"left",text:["路过三里屯派出所门口时，小夏忍不住往里看了一眼。大厅里还亮着灯，有人进出，有人坐在窗口前说话。","她后来写下这一句：霓虹最亮的地方，也是派出所最忙的地方。三里屯的 A 面有多热闹，B 面就有多清醒。酒吧街不是只由酒吧组成，它还由报警电话、巡逻路线、清扫车、代驾订单和许多人的夜班共同组成。"]}},{type:"Images",value:{images:[{src:"/assets/images/stacks/stack-sanlitun-close-tables.png",label:"外摆收街",alt:"店员收拾外摆桌椅",caption:""},{src:"/assets/images/stacks/stack-sanlitun-police-light.png",label:"派出所灯光",alt:"三里屯派出所夜间灯光",caption:""},{src:"/assets/images/stacks/stack-sanlitun-cleaner-security.png",label:"环卫或安保",alt:"夜间环卫或安保人员工作",caption:""}],caption:"B 面：收街、巡逻、清扫和夜间秩序。"}},{type:"Text",speaker:"旁白",variant:"aside",value:{align:"right",text:["三里屯的夜晚不是单一场景，而是酒吧、外摆、人流、交通、警情和夜间劳动叠在一起的高密度系统。","对游客来说，它是目的地；对城市来说，它是需要持续调度的现场。热闹越集中，越需要有人在灯光之外保持清醒。所谓“越夜越美丽”，并不只是一句消费口号，也是一道治理题。"]}},{type:"Card",value:{eyebrow:"B 面现场",title:"越热闹的地方，越不能没有秩序",body:"酒吧、外摆、人流、警情和交通共同叠加，三里屯不是单纯的消费场景，而是一套高密度夜间治理现场。",image:{src:"/assets/images/stacks/stack-sanlitun-close-tables.png",label:"三里屯秩序现场",alt:"三里屯夜间秩序现场卡片插画"},icon:"✦",caption:"外摆、人流和秩序共同组成夜间现场。"}},{type:"Chart",value:chartData.sanlitunComplexity}]}),section({id:"theater",num:4,kicker:"剧场",title:"不只吃喝的夜晚",dek:"夜晚也属于演出、讨论、散场和仍亮着的灯。",cover:{src:"/assets/images/covers/cover-theater-night.png",label:"剧场散场",alt:"北京小剧场夜间散场，人群走出剧场"},nodes:[{type:"Text",speaker:"旁白",variant:"body",value:{align:"left",text:["第二天晚上，她们走进一家小剧场。演出结束时，门口的人没有立刻散去，有人还在讨论剧情，有人举着票根合影，也有人站在路边等车。","和三里屯不同，这里的夜晚没有那么喧闹。它没有持续不断的音乐，也没有密集闪烁的酒吧招牌，却有另一种停不下来的余温：一场演出结束以后，观众还愿意在夜色里多站一会儿。"]}},{type:"Image",value:{src:"/assets/images/scenes/scene-theater-after-show.png",label:"剧场散场主图",alt:"剧场门口观众散场和讨论剧情",caption:"A 面：演出结束后，夜晚还没有结束。"}},{type:"Text",speaker:"晚晚",variant:"quote",value:{align:"right",text:["“原来北京的夜生活，不一定要很吵。”","晚晚发现，夜晚也可以属于话剧、音乐、展览和一场散场后的讨论。人们从剧场走出来，手里攥着票根，嘴里还在复述台词。这样的夜晚不是消费的高潮，而像一段情绪的延长。"]}},{type:"Text",speaker:"旁白",variant:"aside",value:{align:"left",text:["散场并不是演出的终点。观众离开后，场务要清点座位，工作人员要引导人流，安保要等到最后一批观众离开，附近的便利店、餐饮和交通也被这场夜间文化消费继续牵动。","如果说酒吧街代表了夜晚的消费热度，那么剧场门口的散场，则提醒我们：城市夜晚也需要稳定的内容供给、可抵达的交通和温和的公共秩序。夜经济不只是把人留下来消费，也包括给人一个愿意停留的理由。"]}},{type:"Card",value:{eyebrow:"文化夜经济",title:"票根也是一种夜生活入口",body:"剧场、Livehouse、博物馆夜场和夜间展览，共同构成北京夜晚的文化供给。它们让城市夜晚从吃喝玩乐，延伸到内容、审美和公共文化生活。",image:{src:"/assets/images/cards/card-theater-ticket.png",label:"票根与舞台灯",alt:"票根与舞台灯卡片插画"},icon:"🎭",caption:"票根把夜晚从消费带向内容供给。"}},{type:"Chart",value:chartData.performanceComparison}]}),section({id:"ride",num:5,kicker:"夜骑",title:"免费的夜风也有成本",dek:"不消费的夜晚，也需要公共服务托底。",cover:{src:"/assets/images/covers/cover-ride-changan.png",label:"长安街夜骑",alt:"两个女孩夜骑长安街，路灯向远处延伸"},nodes:[{type:"Text",speaker:"旁白",variant:"body",value:{align:"left",text:["第三天凌晨，她们扫了两辆共享单车，沿着长安街骑了一个多小时。路灯一盏接着一盏向远处延伸，风从耳边掠过去，白天拥挤的街道在夜里显得格外开阔。","这是整趟夜游里最不像消费的一站。没有船票，没有酒单，也没有剧场门票，只有风、路灯、宽阔的道路和偶尔驶过的夜班公交。小夏说，这可能是北京夜晚最便宜，也最难忘的一段。"]}},{type:"Image",value:{src:"/assets/images/scenes/scene-ride-changan-bike.png",label:"长安街夜骑主图",alt:"长安街夜骑，路灯、共享单车和夜色",caption:"A 面：不花钱的快乐，也可以成为城市夜晚的记忆。"}},{type:"Text",speaker:"小夏",variant:"aside",value:{align:"right",text:["骑到后来，小夏忽然意识到：免费的夜风，也不是完全没有成本。","路灯要亮着，单车要有人调度，夜班公交要有人开，路口要有人巡逻。所谓自由，并不是凭空出现的，它被很多不显眼的服务托住。城市给人的安全感，常常就藏在这些不被打卡的细节里。"]}},{type:"Text",speaker:"晚晚",variant:"quote",value:{align:"left",text:["“原来不消费的夜晚，也不是完全轻飘飘的。”","晚晚说，夜骑看起来只属于个人的兴致，但它背后连着路灯、单车调度、夜班公交、交警巡逻和最后一公里的回家方式。能在凌晨骑过一条明亮的街，本身就是一种城市服务。"]}},{type:"Card",value:{eyebrow:"回家路",title:"夜晚的最后一站，是安全到家",body:"夜骑、夜班公交、代驾、路灯和安保，共同构成夜间出行的兜底网络。夜经济不只发生在消费现场，也发生在每个人离开现场之后。",image:{src:"/assets/images/cards/card-night-service-chain.png",label:"夜间回家服务链",alt:"夜间回家服务链卡片插画"},icon:"🚲",caption:"夜间回家路由交通、照明和服务共同托底。"}},{type:"Chart",value:chartData.nightServicePeople}]}),section({id:"cities",num:6,kicker:"八城",title:"每座城市都有自己的夜晚性格",dek:"夜经济不只有夜市和烧烤，它有很多种城市表达。",cover:{src:"/assets/images/covers/cover-cities-night-map.png",label:"全国城市夜色地图",alt:"中国城市夜色地图与八城灯点"},nodes:[{type:"Text",speaker:"旁白",variant:"body",value:{align:"left",text:["三天走下来，她们发现了一件更有意思的事：夜经济并不是一种固定模板。","北京的夜晚有亮马河这样的公共空间，有三里屯这样的高密度消费街区，有剧场和演出，也有长安街夜骑这样几乎不花钱的城市体验。把视线从北京拉远，会发现每座城市都在用自己的资源组织夜晚。"]}},{type:"Image",value:{src:"/assets/images/scenes/scene-cities-night-grid.png",label:"全国城市夜色拼贴主图",alt:"多个城市夜景拼贴，北京、上海、重庆、西安、长沙、成都、杭州、深圳以小窗口或地图线索呈现",caption:"从北京出发，把夜晚放到全国城市图谱里。"}},{type:"Images",value:{images:[{src:"/assets/images/stacks/stack-city-shanghai.png",label:"上海/外滩",alt:"上海夜经济地标",caption:""},{src:"/assets/images/stacks/stack-city-chongqing.png",label:"重庆/两江游",alt:"重庆夜游地标",caption:""},{src:"/assets/images/stacks/stack-city-xian.png",label:"西安/大唐不夜城",alt:"西安夜经济地标",caption:""}],caption:"不同城市，长出不同的夜晚性格。"}},{type:"Text",speaker:"晚晚",variant:"quote",value:{align:"right",text:["“原来夜晚不是越热闹越好，而是越有自己的性格越好。”","晚晚说，北京的夜晚偏向文化、公共空间和秩序系统；而放到全国地图上，它只是许多城市夜晚中的一种。真正值得比较的，不是谁更会熬夜，而是谁把夜晚变成了更有辨识度的城市表达。"]}},{type:"Text",speaker:"旁白",variant:"aside",value:{align:"left",text:["所以结尾处，我们不想把城市简单排成“谁更热闹”。更重要的问题是：每座城市把夜晚交给了什么？","上海更像国际消费与演艺入口，重庆把山水夜游做成城市名片，西安依靠历史 IP 聚集人流，长沙保留烟火气，成都强调休闲生活，杭州连接景区和街区，深圳则把更新街区变成年轻人的夜间场景。不同城市的夜晚，其实是不同城市治理、产业、空间和文化资源的组合结果。"]}},{type:"Card",value:{eyebrow:"城市类型图鉴",title:"不是比谁更热闹，而是看谁更有辨识度",body:"上海、重庆、西安、成都、长沙、杭州、深圳与北京，各自代表了不同类型的夜经济路径。夜晚不是一种单一模板，而是一座城市如何使用自身资源的结果。",image:{src:"/assets/images/cards/card-city-types.png",label:"八城类型图鉴",alt:"八城夜经济类型图鉴卡片插画"},icon:"✹",caption:"八座城市对应不同夜晚类型。"}},{type:"Chart",value:chartData.cityNightMatrix}]})],methodology:{title:"数据来源与说明",note:"本作品正处于修改阶段，数据、图表与文案仍在持续校核中，后续版本将更加完善。",items:[{label:"官方统计",body:"优先使用北京市商务局、北京市文化和旅游局、朝阳区政府、文旅部等官方或半官方公开资料。涉及政策、集聚区、演出、文旅消费等内容时，以公开发布口径为准。"},{label:"二次计算",body:"涉及密度、年化估算、占比等内容时，图表和方法论会明确标注计算方式。二次计算只用于辅助理解，不替代官方统计。"},{label:"社媒热度",body:"社媒浏览量、打卡量只作为传播热度参考，不等同于实际客流或消费额。正文中会区分“传播热度”和“线下消费/客流”。"},{label:"数据缺口",body:"夜间专项消费额、夜间就业人数、部分商圈细分数据暂无统一公开统计，正文中不做未经核实的推断，也不把平台数据直接外推为全行业数据。"}],source:{label:"完整数据集与计算过程",body:"全部原始数据、引用来源与二次计算说明将整理后开源，待数据集上传完成后此处会更新为实际仓库地址。",repoText:"GitHub 数据仓库（占位，上传后更新）",repoUrl:""}},footer:{credits:"数据新闻作品《夜晚的另一面》",lab:"树莓🍓Lab",members:"马雨秋 曹馨熠 赵珂涵",email:"2388983944@qq.com"}};
