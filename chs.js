/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "2x Earth density": "2 倍泥土密度",
    "A long stick with a flat metal plate at one end. The perfect tool for squishing dirt or less lethal jousting.": "一根长棍，一端有一块扁平的金属板。用于挤压污垢或不那么致命的角斗的完美工具。",
    "A marvel of modern science. Vibrates the earth at incredible frequencies to squeeze out every last bit of empty space.": "现代科学的奇迹。以令人难以置信的频率振动泥土，以挤出最后一点空白。",
    "A miniature black hole which can compact earth to a ridiculous degree. You can also say it ate your homework.": "一个微型黑洞，可以将泥土压缩到一个荒谬的程度。你也可以说它吃了你的作业。",
    "A Minor Case of Wormhole": "一个小虫洞案例",
    "A repurposed trash compactor can smash earth into a dense cube. Ignore the stench and raccoons.": "改造后的垃圾压实机可以将泥土粉碎成一个致密的立方体。忽略恶臭和浣熊。",
    "Achievement: Baby's First Block": "成就：宝宝的第一个街区",
    "An old prospector offers to sell you a spare pickaxe and shovel so you can gather earth from a little bit deeper": "一位老探矿者提议卖给你一把备用的镐和铲子，这样你就可以从更深的地方收集泥土",
    "Ant farm": "蚂蚁农场",
    "Attach a sprinkler system to your water tank to spray directly into the Chasm": "将自动喷水灭火系统连接到水箱以直接喷入 峡谷",
    "Auto": "自动",
    "Auto-drop Earth": "自动掉落泥土",
    "Auto-drop Water": "自动滴水",
    "Auto-gather Earth": "自动收集泥土",
    "Auto-gather Water": "自动收集水",
    "Baby's First Block": "宝宝的第一个街区",
    "Catapult": "弹射",
    "Chasm": "峡谷",
    "Collect 1 total void particle": "收集 1 个总虚空粒子",
    "Collect 1,000,000 total void particles": "收集 1,000,000 个总虚空粒子",
    "Collect 10,000 total void particles": "收集 10,000 个总虚空粒子",
    "Collect 100 total void particles": "收集 100 个总虚空粒子",
    "Debug": "调试",
    "Drop": "丢掉",
    "Dumping water into the Chasm might speed things up, but you'll have to build some water tanks first": "将水倒入峡谷可能会加快速度，但您必须先建造一些水箱",
    "Earth": "泥土",
    "Eye Feel Extremely Unwell": "眼睛感觉极度不适",
    "Flinging dirt into the Chasm is a lot more fun than dumping it in by hand": "将泥土扔进峡谷比用手倾倒更有趣",
    "Free Upgrades": "免费升级",
    "Gain 100 of each resource": "获得每种资源 100",
    "Gather": "收集",
    "Gravity Well": "重力井",
    "Macrosonic Agitator": "超声波搅拌器",
    "Nothing to Worry About": "没什么好担心的",
    "Prospector's Tools": "勘探者的工具",
    "Rain barrels": "雨桶",
    "Re-price Upgrades": "重新定价升级",
    "Reality Sprang a Leak": "现实出现了漏洞",
    "Research": "研究",
    "Small chance of gathering copper ore": "收集铜矿石的几率很小",
    "Sprinkler": "洒水器",
    "Steel-toed Boots": "钢趾靴",
    "Stored:": "存储：",
    "Tamping Rod": "夯杆",
    "These little guys can help you move mountains of earth... Very, very slowly": "这些小家伙可以帮助你移动泥土的山脉......非常非常缓慢",
    "Trash Compactor": "垃圾压实机",
    "undefined": "不明确的",
    "Unlock Achievements": "解锁成就",
    "Unlock Water": "解锁水",
    "Unlocked: Achievements tab": "解锁：成就标签",
    "Unlocked: Research tab": "解锁：研究标签",
    "Value:": "价值：",
    "Void Particles": "虚空粒子",
    "Water": "水",
    "Water storage": "储水",
    "When matter is dropped into the Chasm, it releases small clouds of nothing. Not nothing... Something? Something that is nothing.": "当物质落入鸿沟时，它会释放出一团虚无的小云。不是什么...什么？什么都不是的东西。",
    "x.x.x": "x.x.x",
    "You are going need to make some improvements around here if you ever want to fill the Chasm.": "如果您想填补鸿沟，您将需要在此处进行一些改进。",
    "You can fit a lot more dirt into your storage with a few well-placed stomps": "您可以通过一些放置良好的踏板将更多的污垢放入您的存储空间",
    "You drop a block of dirt into the Chasm's maw. A few motes of some mysterious substance float from the depths to the surface.": "你将一块泥土扔进裂隙的嘴里。一些神秘物质的微尘从深处飘到地表。",
    "You stand in front of a massive, seemingly bottomless Chasm in the middle of nowhere. Some wretched urge inside you insists that you fill it up.": "你站在一个巨大的、看似无底洞的深渊前。你内心的某种可怜的冲动坚持要你把它填满。",
    "You still remember dropping your first block into the Chasm... Things were simpler back then.": "你还记得把你的第一个街区扔进峡谷……那时事情还简单。",
    "Your back hurts from carrying so much water. Let mother nature do some of the work herself": "背着这么多水，你的背很痛。让大自然母亲自己做一些工作",
    "Dropping things into the Chasm seems to release clouds of nothing. I'm pretty sure the universe isn't supposed to do that.": "把东西扔进深渊似乎会释放出虚无的乌云。我很确定宇宙不应该这样做。",
    "How much nothing can there be, anyway?": "到底能有多少东西呢？",
    "If you gaze long enough into the abyss... The abyss will sprout creepy eyes and wink at you.": "如果你凝视深渊足够长的时间…深渊会长出令人毛骨悚然的眼睛并向你眨眼。",
    "Worms? In my hole??": "蠕虫？在我的洞里？？",
    "Gravity Strands": "重力股",
    "Soul Shards": "灵魂碎片",
    "Spirit Sand": "精神砂",
    "When dense matter is dropped into the Chasm, it releases gossamer strands of gravity. Our researchers say gravity has no carrying particle, but here it is.": "当稠密的物质掉进峡谷时，它释放出薄纱般的重力。我们的研究人员说，重力没有携带粒子，但它在这里。",
    "When human flesh is dropped into the Chasm, it screams. Glassy shards grow around the edge of the pit... It's best not to consider what they are made of.": "当人肉掉进峡谷时，它会尖叫。玻璃碎片在坑的边缘生长……最好不要考虑它们是由什么构成的。",
    "When living matter is dropped into the Chasm, it sprays grains of silver-green sand. Our researchers are convinced this sand has something to do with a metaphysical 'life-force'.": "当生物掉进峡谷时，会喷出银绿色的沙粒。我们的研究人员相信，这种沙子与形而上学的“生命力”有关。",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Five finger discount!": "五指折扣！",
    "It's like un-cheating.": "就像不作弊一样。",
    "A sense of pride and acomplishment washes over you.": "一种自豪感和成就感席卷您。",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "blur_circular": "blur_circular",
    "call_to_action": "call_to_action",
    "lib_chasm": "lib_chasm",
    "menu": "menu",
    "gesture": "gesture",
    "flare": "flare",
    "whatshot": "whatshot",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^成本(.+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);