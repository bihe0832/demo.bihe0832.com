// 小学生必背古诗词75首数据
const poems75 = [
    {
        id: 1,
        title: "江南",
        author: "汉乐府",
        dynasty: "汉",
        content: "江南可采莲，莲叶何田田。\n鱼戏莲叶间。\n鱼戏莲叶东，鱼戏莲叶西，\n鱼戏莲叶南，鱼戏莲叶北。",
        grade: "一年级上"
    },
    {
        id: 2,
        title: "长歌行",
        author: "汉乐府",
        dynasty: "汉",
        content: "青青园中葵，朝露待日晞。\n阳春布德泽，万物生光辉。\n常恐秋节至，焜黄华叶衰。\n百川东到海，何时复西归？\n少壮不努力，老大徒伤悲。",
        grade: "六年级"
    },
    {
        id: 3,
        title: "敕勒歌",
        author: "北朝民歌",
        dynasty: "北朝",
        content: "敕勒川，阴山下。\n天似穹庐，笼盖四野。\n天苍苍，野茫茫，\n风吹草低见牛羊。",
        grade: "二年级上"
    },
    {
        id: 4,
        title: "咏鹅",
        author: "骆宾王",
        dynasty: "唐",
        content: "鹅，鹅，鹅，曲项向天歌。\n白毛浮绿水，红掌拨清波。",
        grade: "一年级上"
    },
    {
        id: 5,
        title: "风",
        author: "李峤",
        dynasty: "唐",
        content: "解落三秋叶，能开二月花。\n过江千尺浪，入竹万竿斜。",
        grade: "一年级上"
    },
    {
        id: 6,
        title: "咏柳",
        author: "贺知章",
        dynasty: "唐",
        content: "碧玉妆成一树高，万条垂下绿丝绦。\n不知细叶谁裁出，二月春风似剪刀。",
        grade: "二年级下"
    },
    {
        id: 7,
        title: "回乡偶书",
        author: "贺知章",
        dynasty: "唐",
        content: "少小离家老大回，乡音无改鬓毛衰。\n儿童相见不相识，笑问客从何处来。",
        grade: "三年级"
    },
    {
        id: 8,
        title: "凉州词",
        author: "王之涣",
        dynasty: "唐",
        content: "黄河远上白云间，一片孤城万仞山。\n羌笛何须怨杨柳，春风不度玉门关。",
        grade: "四年级"
    },
    {
        id: 9,
        title: "登鹳雀楼",
        author: "王之涣",
        dynasty: "唐",
        content: "白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。",
        grade: "二年级上"
    },
    {
        id: 10,
        title: "春晓",
        author: "孟浩然",
        dynasty: "唐",
        content: "春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。",
        grade: "一年级下"
    },
    {
        id: 11,
        title: "凉州词",
        author: "王翰",
        dynasty: "唐",
        content: "葡萄美酒夜光杯，欲饮琵琶马上催。\n醉卧沙场君莫笑，古来征战几人回。",
        grade: "五年级"
    },
    {
        id: 12,
        title: "出塞",
        author: "王昌龄",
        dynasty: "唐",
        content: "秦时明月汉时关，万里长征人未还。\n但使龙城飞将在，不教胡马度阴山。",
        grade: "四年级"
    },
    {
        id: 13,
        title: "芙蓉楼送辛渐",
        author: "王昌龄",
        dynasty: "唐",
        content: "寒雨连江夜入吴，平明送客楚山孤。\n洛阳亲友如相问，一片冰心在玉壶。",
        grade: "四年级"
    },
    {
        id: 14,
        title: "鹿柴",
        author: "王维",
        dynasty: "唐",
        content: "空山不见人，但闻人语响。\n返景入深林，复照青苔上。",
        grade: "三年级"
    },
    {
        id: 15,
        title: "送元二使安西",
        author: "王维",
        dynasty: "唐",
        content: "渭城朝雨浥轻尘，客舍青青柳色新。\n劝君更尽一杯酒，西出阳关无故人。",
        grade: "四年级"
    },
    {
        id: 16,
        title: "九月九日忆山东兄弟",
        author: "王维",
        dynasty: "唐",
        content: "独在异乡为异客，每逢佳节倍思亲。\n遥知兄弟登高处，遍插茱萸少一人。",
        grade: "三年级"
    },
    {
        id: 17,
        title: "静夜思",
        author: "李白",
        dynasty: "唐",
        content: "床前明月光，疑是地上霜。\n举头望明月，低头思故乡。",
        grade: "一年级下"
    },
    {
        id: 18,
        title: "古朗月行",
        author: "李白",
        dynasty: "唐",
        content: "小时不识月，呼作白玉盘。\n又疑瑶台镜，飞在青云端。",
        grade: "一年级上"
    },
    {
        id: 19,
        title: "望庐山瀑布",
        author: "李白",
        dynasty: "唐",
        content: "日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。",
        grade: "二年级上"
    },
    {
        id: 20,
        title: "赠汪伦",
        author: "李白",
        dynasty: "唐",
        content: "李白乘舟将欲行，忽闻岸上踏歌声。\n桃花潭水深千尺，不及汪伦送我情。",
        grade: "一年级下"
    },
    {
        id: 21,
        title: "黄鹤楼送孟浩然之广陵",
        author: "李白",
        dynasty: "唐",
        content: "故人西辞黄鹤楼，烟花三月下扬州。\n孤帆远影碧空尽，唯见长江天际流。",
        grade: "四年级"
    },
    {
        id: 22,
        title: "早发白帝城",
        author: "李白",
        dynasty: "唐",
        content: "朝辞白帝彩云间，千里江陵一日还。\n两岸猿声啼不住，轻舟已过万重山。",
        grade: "三年级上"
    },
    {
        id: 23,
        title: "望天门山",
        author: "李白",
        dynasty: "唐",
        content: "天门中断楚江开，碧水东流至此回。\n两岸青山相对出，孤帆一片日边来。",
        grade: "三年级"
    },
    {
        id: 24,
        title: "别董大",
        author: "高适",
        dynasty: "唐",
        content: "千里黄云白日曛，北风吹雁雪纷纷。\n莫愁前路无知己，天下谁人不识君。",
        grade: "四年级"
    },
    {
        id: 25,
        title: "绝句",
        author: "杜甫",
        dynasty: "唐",
        content: "两个黄鹂鸣翠柳，一行白鹭上青天。\n窗含西岭千秋雪，门泊东吴万里船。",
        grade: "二年级下"
    },
    {
        id: 26,
        title: "春夜喜雨",
        author: "杜甫",
        dynasty: "唐",
        content: "好雨知时节，当春乃发生。\n随风潜入夜，润物细无声。\n野径云俱黑，江船火独明。\n晓看红湿处，花重锦官城。",
        grade: "五年级"
    },
    {
        id: 27,
        title: "绝句",
        author: "杜甫",
        dynasty: "唐",
        content: "迟日江山丽，春风花草香。\n泥融飞燕子，沙暖睡鸳鸯。",
        grade: "三年级"
    },
    {
        id: 28,
        title: "江畔独步寻花",
        author: "杜甫",
        dynasty: "唐",
        content: "黄四娘家花满蹊，千朵万朵压枝低。\n留连戏蝶时时舞，自在娇莺恰恰啼。",
        grade: "三年级"
    },
    {
        id: 29,
        title: "闻官军收河南河北",
        author: "杜甫",
        dynasty: "唐",
        content: "剑外忽传收蓟北，初闻涕泪满衣裳。\n却看妻子愁何在，漫卷诗书喜欲狂。\n白日放歌须纵酒，青春作伴好还乡。\n即从巴峡穿巫峡，便下襄阳向洛阳。",
        grade: "六年级"
    },
    {
        id: 30,
        title: "江南逢李龟年",
        author: "杜甫",
        dynasty: "唐",
        content: "岐王宅里寻常见，崔九堂前几度闻。\n正是江南好风景，落花时节又逢君。",
        grade: "五年级"
    },
    {
        id: 31,
        title: "游子吟",
        author: "孟郊",
        dynasty: "唐",
        content: "慈母手中线，游子身上衣。\n临行密密缝，意恐迟迟归。\n谁言寸草心，报得三春晖。",
        grade: "三年级"
    },
    {
        id: 32,
        title: "江雪",
        author: "柳宗元",
        dynasty: "唐",
        content: "千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。",
        grade: "二年级上"
    },
    {
        id: 33,
        title: "寻隐者不遇",
        author: "贾岛",
        dynasty: "唐",
        content: "松下问童子，言师采药去。\n只在此山中，云深不知处。",
        grade: "一年级下"
    },
    {
        id: 34,
        title: "枫桥夜泊",
        author: "张继",
        dynasty: "唐",
        content: "月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。",
        grade: "五年级"
    },
    {
        id: 35,
        title: "渔歌子",
        author: "张志和",
        dynasty: "唐",
        content: "西塞山前白鹭飞，桃花流水鳜鱼肥。\n青箬笠，绿蓑衣，斜风细雨不须归。",
        grade: "四年级"
    },
    {
        id: 36,
        title: "塞下曲",
        author: "卢纶",
        dynasty: "唐",
        content: "月黑雁飞高，单于夜遁逃。\n欲将轻骑逐，大雪满弓刀。",
        grade: "四年级"
    },
    {
        id: 37,
        title: "望洞庭",
        author: "刘禹锡",
        dynasty: "唐",
        content: "湖光秋月两相和，潭面无风镜未磨。\n遥望洞庭山水翠，白银盘里一青螺。",
        grade: "四年级"
    },
    {
        id: 38,
        title: "浪淘沙",
        author: "刘禹锡",
        dynasty: "唐",
        content: "九曲黄河万里沙，浪淘风簸自天涯。\n如今直上银河去，同到牵牛织女家。",
        grade: "五年级"
    },
    {
        id: 39,
        title: "赋得古原草送别",
        author: "白居易",
        dynasty: "唐",
        content: "离离原上草，一岁一枯荣。\n野火烧不尽，春风吹又生。\n远芳侵古道，晴翠接荒城。\n又送王孙去，萋萋满别情。",
        grade: "二年级下"
    },
    {
        id: 40,
        title: "池上",
        author: "白居易",
        dynasty: "唐",
        content: "小娃撑小艇，偷采白莲回。\n不解藏踪迹，浮萍一道开。",
        grade: "一年级下"
    },
    {
        id: 41,
        title: "忆江南",
        author: "白居易",
        dynasty: "唐",
        content: "江南好，风景旧曾谙。\n日出江花红胜火，春来江水绿如蓝。\n能不忆江南？",
        grade: "四年级"
    },
    {
        id: 42,
        title: "悯农（其一）",
        author: "李绅",
        dynasty: "唐",
        content: "春种一粒粟，秋收万颗子。\n四海无闲田，农夫犹饿死。",
        grade: "二年级下"
    },
    {
        id: 43,
        title: "悯农（其二）",
        author: "李绅",
        dynasty: "唐",
        content: "锄禾日当午，汗滴禾下土。\n谁知盘中餐，粒粒皆辛苦。",
        grade: "一年级上"
    },
    {
        id: 44,
        title: "小儿垂钓",
        author: "胡令能",
        dynasty: "唐",
        content: "蓬头稚子学垂纶，侧坐莓苔草映身。\n路人借问遥招手，怕得鱼惊不应人。",
        grade: "二年级上"
    },
    {
        id: 45,
        title: "清明",
        author: "杜牧",
        dynasty: "唐",
        content: "清明时节雨纷纷，路上行人欲断魂。\n借问酒家何处有？牧童遥指杏花村。",
        grade: "三年级"
    },
    {
        id: 46,
        title: "山行",
        author: "杜牧",
        dynasty: "唐",
        content: "远上寒山石径斜，白云生处有人家。\n停车坐爱枫林晚，霜叶红于二月花。",
        grade: "三年级"
    },
    {
        id: 47,
        title: "江南春",
        author: "杜牧",
        dynasty: "唐",
        content: "千里莺啼绿映红，水村山郭酒旗风。\n南朝四百八十寺，多少楼台烟雨中。",
        grade: "四年级"
    },
    {
        id: 48,
        title: "乐游原",
        author: "李商隐",
        dynasty: "唐",
        content: "向晚意不适，驱车登古原。\n夕阳无限好，只是近黄昏。",
        grade: "五年级"
    },
    {
        id: 49,
        title: "蜂",
        author: "罗隐",
        dynasty: "唐",
        content: "不论平地与山尖，无限风光尽被占。\n采得百花成蜜后，为谁辛苦为谁甜？",
        grade: "四年级"
    },
    {
        id: 50,
        title: "元日",
        author: "王安石",
        dynasty: "宋",
        content: "爆竹声中一岁除，春风送暖入屠苏。\n千门万户曈曈日，总把新桃换旧符。",
        grade: "三年级"
    },
    {
        id: 51,
        title: "泊船瓜洲",
        author: "王安石",
        dynasty: "宋",
        content: "京口瓜洲一水间，钟山只隔数重山。\n春风又绿江南岸，明月何时照我还？",
        grade: "五年级"
    },
    {
        id: 52,
        title: "书湖阴先生壁",
        author: "王安石",
        dynasty: "宋",
        content: "茅檐长扫净无苔，花木成畦手自栽。\n一水护田将绿绕，两山排闼送青来。",
        grade: "六年级"
    },
    {
        id: 53,
        title: "六月二十七日望湖楼醉书",
        author: "苏轼",
        dynasty: "宋",
        content: "黑云翻墨未遮山，白雨跳珠乱入船。\n卷地风来忽吹散，望湖楼下水如天。",
        grade: "五年级"
    },
    {
        id: 54,
        title: "饮湖上初晴后雨",
        author: "苏轼",
        dynasty: "宋",
        content: "水光潋滟晴方好，山色空蒙雨亦奇。\n欲把西湖比西子，淡妆浓抹总相宜。",
        grade: "三年级"
    },
    {
        id: 55,
        title: "惠崇春江晚景",
        author: "苏轼",
        dynasty: "宋",
        content: "竹外桃花三两枝，春江水暖鸭先知。\n蒌蒿满地芦芽短，正是河豚欲上时。",
        grade: "三年级"
    },
    {
        id: 56,
        title: "题西林壁",
        author: "苏轼",
        dynasty: "宋",
        content: "横看成岭侧成峰，远近高低各不同。\n不识庐山真面目，只缘身在此山中。",
        grade: "四年级"
    },
    {
        id: 57,
        title: "夏日绝句",
        author: "李清照",
        dynasty: "宋",
        content: "生当作人杰，死亦为鬼雄。\n至今思项羽，不肯过江东。",
        grade: "五年级"
    },
    {
        id: 58,
        title: "三衢道中",
        author: "曾几",
        dynasty: "宋",
        content: "梅子黄时日日晴，小溪泛尽却山行。\n绿阴不减来时路，添得黄鹂四五声。",
        grade: "三年级"
    },
    {
        id: 59,
        title: "示儿",
        author: "陆游",
        dynasty: "宋",
        content: "死去元知万事空，但悲不见九州同。\n王师北定中原日，家祭无忘告乃翁。",
        grade: "五年级"
    },
    {
        id: 60,
        title: "秋夜将晓出篱门迎凉有感",
        author: "陆游",
        dynasty: "宋",
        content: "三万里河东入海，五千仞岳上摩天。\n遗民泪尽胡尘里，南望王师又一年。",
        grade: "五年级"
    },
    {
        id: 61,
        title: "四时田园杂兴（其二十五）",
        author: "范成大",
        dynasty: "宋",
        content: "梅子金黄杏子肥，麦花雪白菜花稀。\n日长篱落无人过，惟有蜻蜓蛱蝶飞。",
        grade: "四年级"
    },
    {
        id: 62,
        title: "四时田园杂兴（其三十一）",
        author: "范成大",
        dynasty: "宋",
        content: "昼出耘田夜绩麻，村庄儿女各当家。\n童孙未解供耕织，也傍桑阴学种瓜。",
        grade: "四年级"
    },
    {
        id: 63,
        title: "小池",
        author: "杨万里",
        dynasty: "宋",
        content: "泉眼无声惜细流，树阴照水爱晴柔。\n小荷才露尖尖角，早有蜻蜓立上头。",
        grade: "一年级下"
    },
    {
        id: 64,
        title: "晓出净慈寺送林子方",
        author: "杨万里",
        dynasty: "宋",
        content: "毕竟西湖六月中，风光不与四时同。\n接天莲叶无穷碧，映日荷花别样红。",
        grade: "二年级下"
    },
    {
        id: 65,
        title: "春日",
        author: "朱熹",
        dynasty: "宋",
        content: "胜日寻芳泗水滨，无边光景一时新。\n等闲识得东风面，万紫千红总是春。",
        grade: "三年级"
    },
    {
        id: 66,
        title: "观书有感",
        author: "朱熹",
        dynasty: "宋",
        content: "半亩方塘一鉴开，天光云影共徘徊。\n问渠那得清如许？为有源头活水来。",
        grade: "五年级"
    },
    {
        id: 67,
        title: "题临安邸",
        author: "林升",
        dynasty: "宋",
        content: "山外青山楼外楼，西湖歌舞几时休？\n暖风熏得游人醉，直把杭州作汴州。",
        grade: "五年级"
    },
    {
        id: 68,
        title: "游园不值",
        author: "叶绍翁",
        dynasty: "宋",
        content: "应怜屐齿印苍苔，小扣柴扉久不开。\n春色满园关不住，一枝红杏出墙来。",
        grade: "五年级"
    },
    {
        id: 69,
        title: "乡村四月",
        author: "翁卷",
        dynasty: "宋",
        content: "绿遍山原白满川，子规声里雨如烟。\n乡村四月闲人少，才了蚕桑又插田。",
        grade: "四年级"
    },
    {
        id: 70,
        title: "墨梅",
        author: "王冕",
        dynasty: "元",
        content: "我家洗砚池头树，朵朵花开淡墨痕。\n不要人夸好颜色，只留清气满乾坤。",
        grade: "四年级"
    },
    {
        id: 71,
        title: "石灰吟",
        author: "于谦",
        dynasty: "明",
        content: "千锤万凿出深山，烈火焚烧若等闲。\n粉骨碎身浑不怕，要留清白在人间。",
        grade: "六年级"
    },
    {
        id: 72,
        title: "竹石",
        author: "郑燮",
        dynasty: "清",
        content: "咬定青山不放松，立根原在破岩中。\n千磨万击还坚劲，任尔东西南北风。",
        grade: "六年级"
    },
    {
        id: 73,
        title: "所见",
        author: "袁枚",
        dynasty: "清",
        content: "牧童骑黄牛，歌声振林樾。\n意欲捕鸣蝉，忽然闭口立。",
        grade: "一年级"
    },
    {
        id: 74,
        title: "村居",
        author: "高鼎",
        dynasty: "清",
        content: "草长莺飞二月天，拂堤杨柳醉春烟。\n儿童散学归来早，忙趁东风放纸鸢。",
        grade: "二年级下"
    },
    {
        id: 75,
        title: "己亥杂诗",
        author: "龚自珍",
        dynasty: "清",
        content: "九州生气恃风雷，万马齐喑究可哀。\n我劝天公重抖擞，不拘一格降人才。",
        grade: "六年级"
    }
];

// 艾宾浩斯记忆曲线复习间隔（天数）
const reviewIntervals = [1, 2, 4, 7, 15, 30];
