/* ===================== DATA ===================== */
const METHODS = [
  {
    id:"hoffmann",
    name:"日常無腦浸泡法",
    sub:"James Hoffmann · Everyday",
    tool:"Hario Switch ＋ Sibarist 快速濾紙",
    roast:"不限 · 容錯率極高",
    flavorTags:["平衡","明亮酸","Body"],
    flavorText:"新手零失誤，閉眼沖都好喝",
    desc:"最簡單的純浸泡法。用高流速濾紙避免悶煮過久，得到乾淨又平衡的一杯。<b>原廠濾紙流速慢</b>，建議搭配 Sibarist 等快速濾紙。",
    difficulty:1,
    params:{coffee:"15 g",water:"250 g",ratio:"約 1:16.7",grind:"偏細（比杯測再細一點）",temp:"沸水 / 高溫"},
    valveMode:"switch",
    total:180,
    steps:[
      {t:0,label:"浸泡 / 悶蒸",valve:"close",temp:"沸水",water:250,act:"注入約 <b>30g</b> 沸水輕晃均勻，立刻注滿至 <b>250g</b>",note:"讓粉與水充分混合，浸泡帶來極佳的包容性。"},
      {t:120,label:"攪拌與靜置",valve:"close",temp:"—",water:250,act:"輕輕<b>攪拌</b>咖啡液，靜置約 15 秒讓粉床沉澱",note:"幫助萃取均勻、讓細粉下沉。"},
      {t:135,label:"濾出",valve:"open",temp:"—",water:250,act:"按下開關，<b>濾出</b>咖啡液",note:"Sibarist 約 45 秒流完（總時間近 3 分鐘）；原廠濾紙約需 4 分 25 秒。"}
    ]
  },
  {
    id:"devil-og",
    name:"原版惡魔手沖",
    sub:"Tetsu Kasuya · 開－關",
    tool:"Hario Switch",
    roast:"任何豆 · 任何烘焙度",
    flavorTags:["極乾淨","香氣強","無苦澀"],
    flavorText:"百搭保證好喝的高容錯配方",
    desc:"前段<b>高溫滴濾</b>逼出香氣與酸甜，後段<b>降溫＋浸泡</b>避開容易苦澀的成分。能讓平庸的豆子瞬間變好喝。",
    difficulty:2,
    params:{coffee:"20 g",water:"280 g",ratio:"1:14",grind:"偏細（C40 約 20 格）",temp:"93°C → 70°C"},
    valveMode:"switch",
    total:180,
    steps:[
      {t:0,label:"悶蒸與滴濾",valve:"open",temp:"93°C",water:60,act:"打開開關，注入 <b>60g</b> 熱水",note:"一開始就快速溶出好風味。"},
      {t:30,label:"高溫滴濾",valve:"open",temp:"93°C",water:120,act:"注水至累計 <b>120g</b>",note:"延續第一段，徹底帶出香氣與酸甜。"},
      {t:72,label:"低溫浸泡",valve:"close",temp:"70°C",water:280,act:"<b>關閉開關</b>，注入冷水至累計 <b>280g</b>",note:"後段成分易苦澀，降溫並改用效率較差的浸泡法來阻擋雜味。"},
      {t:105,label:"濾出",valve:"open",temp:"—",water:280,act:"按下開關，<b>濾出</b>咖啡液",note:"總時間約 3:00 結束，超時可直接移開。"}
    ]
  },
  {
    id:"devil-evo",
    name:"進化版惡魔手沖",
    sub:"Tetsu Kasuya · 關－開－關",
    tool:"Hario Switch",
    roast:"精品豆 · 淺焙",
    flavorTags:["風味完整","柔甜","果汁感"],
    flavorText:"分段萃取，喝懂一支豆的全貌",
    desc:"以<b>關閉開關浸泡悶蒸</b>創造完美蒸壓，中段高溫滴濾釋放層次，最後<b>低溫浸泡</b>補足甜度與口感、阻擋苦澀。",
    difficulty:3,
    params:{coffee:"20 g",water:"300 g",ratio:"1:15",grind:"偏粗（C40 約 28 格）",temp:"92°C → 70~80°C"},
    valveMode:"switch",
    total:210,
    steps:[
      {t:0,label:"浸泡悶蒸",valve:"close",temp:"92°C",water:50,act:"<b>關閉開關</b>，注入 <b>40~50g</b> 熱水",note:"封閉開關能創造完美的「蒸壓」，讓粉粒均勻吸水，更利於後續風味釋放。"},
      {t:40,label:"高溫滴濾",valve:"open",temp:"92°C",water:120,act:"<b>打開開關</b>，注水至累計 <b>120g</b>",note:"釋放香氣與酸質。"},
      {t:90,label:"高溫滴濾",valve:"open",temp:"92°C",water:200,act:"注水至累計 <b>200g</b>",note:"水流完也繼續等，粗研磨需拉長時間萃取。"},
      {t:130,label:"低溫浸泡",valve:"close",temp:"70~80°C",water:300,act:"<b>關閉開關</b>，注入冷水至累計 <b>300g</b>",note:"用低溫浸泡補足口感與甜度，阻擋後段苦澀。"},
      {t:165,label:"濾出",valve:"open",temp:"—",water:300,act:"按下開關，<b>濾出</b>咖啡液",note:"總時間約 3:10~3:30 結束。"}
    ]
  },
  {
    id:"neo",
    name:"Neo Brew 十段法",
    sub:"Tetsu Kasuya · 極粗研磨",
    tool:"Hario Pegasus（Neo）最優，或 V60 / Switch（全程打開）",
    roast:"極推薦淺焙 · 不適合深焙",
    flavorTags:["糖漿濃稠","巨大甜感"],
    flavorText:"顛覆想像的低酸進階玩法",
    desc:"全程滴濾，用<b>極高溫＋極粗研磨</b>搭配 <b>10 段注水</b>堆疊質地。每次水流穿過粉層都在累積濃稠口感。隨溫度下降，果凍感越明顯。",
    difficulty:3,
    params:{coffee:"20 g",water:"300 g",ratio:"1:15",grind:"極粗（C40 約 40~45 格，碎粒狀）",temp:"95~96°C（極高溫）"},
    valveMode:"always-open",
    total:210,
    steps:[
      {t:0,label:"悶蒸",valve:"open",temp:"96°C",water:30,act:"注入 <b>30g</b> 熱水",note:"極粗研磨容易讓水流失，需高溫榨取風味。開關全程打開。"},
      {t:30,label:"第 2 段注水",valve:"open",temp:"95~96°C",water:60,act:"注入 30g，累計至 <b>60g</b>"},
      {t:45,label:"第 3 段注水",valve:"open",temp:"95~96°C",water:90,act:"注入 30g，累計至 <b>90g</b>"},
      {t:60,label:"第 4 段注水",valve:"open",temp:"95~96°C",water:120,act:"注入 30g，累計至 <b>120g</b>"},
      {t:75,label:"第 5 段注水",valve:"open",temp:"95~96°C",water:150,act:"注入 30g，累計至 <b>150g</b>"},
      {t:90,label:"第 6 段注水",valve:"open",temp:"95~96°C",water:180,act:"注入 30g，累計至 <b>180g</b>"},
      {t:105,label:"第 7 段注水",valve:"open",temp:"95~96°C",water:210,act:"注入 30g，累計至 <b>210g</b>"},
      {t:120,label:"第 8 段注水",valve:"open",temp:"95~96°C",water:240,act:"注入 30g，累計至 <b>240g</b>",note:"約 2:15 後粉床會因粗粉堆疊開始微塞。"},
      {t:135,label:"第 9 段注水",valve:"open",temp:"95~96°C",water:270,act:"注入 30g，累計至 <b>270g</b>"},
      {t:150,label:"第 10 段（最終）",valve:"open",temp:"95~96°C",water:300,act:"注入最後 30g，累計至 <b>300g</b>",note:"等待液體完全滴落即完成（約 3:30）。隨溫度下降果凍質地越明顯；嫌淡可調至 40 格。"}
    ]
  }
];

const GOALS = [
  {roast:"淺焙 · 花果香豐富",light:true,t:"糖漿般甜感",d:"果凍濃稠、修飾刺激酸、放大正面風味",mid:"neo"},
  {roast:"淺焙 · 風味層次多",light:true,t:"完整產地風味",d:"前中後段明確、柔甜、悠長尾韻",mid:"devil-evo"},
  {roast:"任何烘焙度",light:false,t:"乾淨百搭",d:"雜味少、香氣飽滿、尾韻滑順",mid:"devil-og"},
  {roast:"任何烘焙度",light:false,t:"平衡明亮",d:"清脆酸質、飽滿 Body、輕鬆無腦",mid:"hoffmann"}
];

