import { useState, useEffect } from "react";

const C = {
  bg: "#0a0a0a",
  surface: "#111111",
  surfaceHigh: "#1c1c1c",
  border: "#222222",
  red: "#E8291A",
  blue: "#3B82F6",
  green: "#22C55E",
  amber: "#F59E0B",
  white: "#F5F0EB",
  muted: "#777777",
  mutedLight: "#AAAAAA",
};

// ─── STATIC DATA (لا تتأثر باللغة) ─────────────────────────────
const SIZES = [
  { platform: "Instagram", name: "Square Post", w: 1080, h: 1080 },
  { platform: "Instagram", name: "Story / Reel", w: 1080, h: 1920 },
  { platform: "Instagram", name: "Landscape Post", w: 1080, h: 608 },
  { platform: "Twitter/X", name: "Post", w: 1200, h: 675 },
  { platform: "Twitter/X", name: "Header", w: 1500, h: 500 },
  { platform: "LinkedIn", name: "Post", w: 1200, h: 627 },
  { platform: "LinkedIn", name: "Cover", w: 1584, h: 396 },
  { platform: "YouTube", name: "Thumbnail", w: 1280, h: 720 },
  { platform: "YouTube", name: "Channel Art", w: 2560, h: 1440 },
  { platform: "TikTok", name: "Video Cover", w: 1080, h: 1920 },
  { platform: "Facebook", name: "Post", w: 1200, h: 630 },
  { platform: "Facebook", name: "Cover", w: 820, h: 312 },
  { platform: "Print", name: "A4 Portrait", w: 2480, h: 3508 },
  { platform: "Print", name: "Business Card", w: 1050, h: 600 },
];

const SERVICES_AR = [
  { id: "logo", label: "لوجو", baseRate: 10 },
  { id: "social", label: "سوشيال ميديا", baseRate: 5 },
  { id: "brand", label: "هوية بصرية", baseRate: 40 },
  { id: "print", label: "مطبوعات", baseRate: 4 },
  { id: "ui", label: "تصميم UI", baseRate: 15 },
  { id: "motion", label: "موشن جرافيك", baseRate: 10 },
];
const SERVICES_EN = [
  { id: "logo", label: "Logo", baseRate: 10 },
  { id: "social", label: "Social Media", baseRate: 5 },
  { id: "brand", label: "Brand Identity", baseRate: 40 },
  { id: "print", label: "Print Design", baseRate: 4 },
  { id: "ui", label: "UI Design", baseRate: 15 },
  { id: "motion", label: "Motion Design", baseRate: 10 },
];

const COMPLEXITY_AR = [
  { id: "simple", label: "بسيط", multiplier: 1.0 },
  { id: "medium", label: "متوسط", multiplier: 1.5 },
  { id: "complex", label: "معقد", multiplier: 2.2 },
];
const COMPLEXITY_EN = [
  { id: "simple", label: "Simple", multiplier: 1.0 },
  { id: "medium", label: "Medium", multiplier: 1.5 },
  { id: "complex", label: "Complex", multiplier: 2.2 },
];

const PACKAGES_AR = [
  {
    id: "bronze",
    label: "برونز 🥉",
    color: "#CD7F32",
    price: "يبدأ من 1300 جنيه",
    items: [
      "لوجو واحد ",
      "تعديلين فقط",
      "تسليم PNG و PDF",
      "وقت التسليم: 4 أيام",
    ],
  },
  {
    id: "silver",
    label: "سيلفر 🥈",
    color: "#94A3B8",
    price: "يبدأ من 2000 جنيه",
    items: [
      "لوجو + عدة العلامة التجاريه ",
      "3 تعديلات ",
      "كل الصيغ (AI, PNG, PDF)",
      "وقت التسليم: 3 أيام",
    ],
  },
  {
    id: "gold",
    label: "جولد 🥇",
    color: "#F59E0B",
    price: "يبدأ من 5500 جنيه",
    items: [
      "هوية بصرية كاملة",
      "إرشادات العلامة التجارية pdf",
      "  6 تعديلات ",
      "وقت التسليم: 5 يوم",
      "دعم 7 ايام بعد التسليم",
    ],
  },
];
const PACKAGES_EN = [
  {
    id: "bronze",
    label: "Bronze 🥉",
    color: "#CD7F32",
    price: "Starting from $27",
    items: [
      "1 logo ",
      "2 revisions only",
      "PNG & PDF delivery",
      "Delivery: 4 days",
    ],
  },
  {
    id: "silver",
    label: "Silver 🥈",
    color: "#94A3B8",
    price: "Starting from $60",
    items: [
      "Logo + Brand kit ",
      "3 revisions ",
      "All formats (AI, PNG, PDF)",
      "Delivery: 3 days",
    ],
  },
  {
    id: "gold",
    label: "Gold 🥇",
    color: "#F59E0B",
    price: "Starting from $115",
    items: [
      "Full brand identity",
      "Brand Guidelines PDF",
      "6 revisions",
      "Delivery: 5 days",
      "1 week support",
    ],
  },
];

const TIPS_AR = [
  "سلّم الملفات بالصيغة اللي طلبها العميل — مش اللي تحبها أنت.",
  "استخدم شبكة 8px لمسافات منتظمة في كل تصاميمك.",
  "ما ترسلش ملف نهائي من غير ما تضم معاه الخطوط.",
  "رقّم ملفاتك: v1, v2 — مش 'final_FINAL'.",
  "المساحة الفارغة مش هدر — هي راحة للعين.",
  "ابعت preview بدقة منخفضة قبل الملف النهائي.",
  "سمّي ليرات الـ Figma صح — نفسك هتشكرك لاحقاً.",
  "عرض 3 خيارات بس للعميل — أكتر من كده = ارتباك.",
  "عقد أولاً، شغل بعدين. بلا استثناءات.",
  "الحاجة البسيطة اللي بتوصل صح أحسن من المعقدة الجميلة.",
];
const TIPS_EN = [
  "Deliver files in the format the client asked for — not what you prefer.",
  "Use an 8px grid for consistent spacing across all designs.",
  "Never send a final file without packaging the fonts.",
  "Version your files: v1, v2 — not 'final_FINAL'.",
  "White space isn't wasted — it gives the eye room to breathe.",
  "Send a low-res preview before the final file.",
  "Name your Figma layers properly — your future self will thank you.",
  "Show the client 3 options max — more = confusion.",
  "Contract first, work second. No exceptions.",
  "A simple idea that communicates well beats a complex beautiful one.",
];

const CHECKLIST_AR = [
  "صدّرت كل الأصول بالدقة الصح (72dpi شاشة / 300dpi طباعة)",
  "الخطوط مضمومة أو مرفقة مع الملف",
  "ضبطت color profile صح (RGB أو CMYK)",
  "الملف معلوم عليه رقم الإصدار (v1, v2…)",
  "بعتت الملف بالصيغة المتفق عليها",
  "نسخة احتياطية على السحابة",
  "الفاتورة أو رابط الدفع اتبعت مع التسليم",
  "رسالة متابعة بعيتها للعميل مع التسليم",
];
const CHECKLIST_EN = [
  "Exported all assets at correct resolution (72dpi screen / 300dpi print)",
  "Fonts are embedded or packaged with the file",
  "Color profile set correctly (RGB or CMYK)",
  "File is version-numbered (v1, v2…)",
  "File sent in the agreed format",
  "Backup copy saved to cloud",
  "Invoice or payment link sent with delivery",
  "Follow-up message sent to the client",
];

const LEARN_AR = [
  {
    icon: "🎯",
    t: "الوضوح أهم من الجمال",
    b: "التصميم الكويس بيوصل الرسالة بسرعة. لو المستخدم مش عارف يعمل إيه، التصميم فاشل بغض النظر عن جماله.",
  },
  {
    icon: "🎨",
    t: "التناسق هو السر",
    b: "الألوان والخطوط والمسافات لازم تكون منظمة. الفوضى البصرية بتخلي الناس يهربوا.",
  },
  {
    icon: "❌",
    t: "الأخطاء الشائعة",
    b: "الكلام الكتير، الألوان الكتير، الخطوط الكتير — كل حاجة زيادة بتضر. أقل = أحسن.",
  },
  {
    icon: "💡",
    t: "إيه اللي تسأل عنه؟",
    b: "اسأل عن Portfolio، عدد التعديلات، وقت التسليم، وصيغة الملفات.",
  },
  {
    icon: "💸",
    t: "ليه السعر بيختلف؟",
    b: "التجربة والوقت والتعقيد وعدد التعديلات كلها بتأثر على السعر. الأرخص مش دايماً الأنسب.",
  },
];
const LEARN_EN = [
  {
    icon: "🎯",
    t: "Clarity beats beauty",
    b: "Good design communicates quickly. If the user doesn't know what to do, the design fails — no matter how pretty.",
  },
  {
    icon: "🎨",
    t: "Consistency is the secret",
    b: "Colors, fonts, and spacing must be organized. Visual chaos makes people leave fast.",
  },
  {
    icon: "❌",
    t: "Common mistakes",
    b: "Too much text, too many colors, too many fonts — everything extra hurts. Less = more.",
  },
  {
    icon: "💡",
    t: "What to ask a designer?",
    b: "Ask about their portfolio, number of revisions, delivery time, and file formats.",
  },
  {
    icon: "💸",
    t: "Why do prices vary?",
    b: "Experience, time, complexity, and revisions all affect pricing. Cheapest isn't always best.",
  },
];

const TRACK_AR = [
  {
    icon: "📋",
    label: "الاستلام والبريف",
    desc: "المصمم بيستلم التفاصيل كاملة ويتأكد من المتطلبات. وقت التواصل: 1-2 يوم.",
  },
  {
    icon: "🎨",
    label: "المسودة الأولى",
    desc: "بيبدأ على الأفكار الأولية ويبعتهالك للمراجعة. عادةً 3-5 أيام عمل.",
  },
  {
    icon: "🔁",
    label: "التعديلات",
    desc: "بتراجع وبتطلب تعديلات حسب الباقة اللي اخترتها.",
  },
  {
    icon: "✅",
    label: "الإقرار النهائي",
    desc: "لما توافق على التصميم النهائي، بيبدأ تجهيز كل الملفات.",
  },
  {
    icon: "📦",
    label: "التسليم الكامل",
    desc: "بيبعتلك الملفات بكل الصيغ المتفق عليها مع ملاحظات الاستخدام.",
  },
];
const TRACK_EN = [
  {
    icon: "📋",
    label: "Brief & Onboarding",
    desc: "The designer receives all details and confirms requirements. 1-2 days.",
  },
  {
    icon: "🎨",
    label: "First Draft",
    desc: "Initial concepts are created and sent for review. Usually 3-5 working days.",
  },
  {
    icon: "🔁",
    label: "Revisions",
    desc: "You review and request changes per your package.",
  },
  {
    icon: "✅",
    label: "Final Approval",
    desc: "Once you approve the final design, file preparation begins.",
  },
  {
    icon: "📦",
    label: "Full Delivery",
    desc: "All files delivered in agreed formats with usage notes.",
  },
];

// روابط التواصل — عدّلها بتاعتك
const LINKS = {
  whatsapp: "https://wa.me/201001799535",
  behance: "https://www.behance.net/youssefibrahim104",
  facebook: "https://www.facebook.com/share/1DdhDXCCxi/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/youssefibrahim.a/",
};

// ─── LABELS بالعربي والإنجليزي ───────────────────────────────────
const L = {
  ar: {
    dir: "rtl",
    splashTag: "Created by Youssef Ibrahim",
    welcomeTo: "مرحباً بك في DesignR",
    whoAreYou: "أنت…؟",
    chooseMode: "اختار الوضع المناسب ليك",
    canSwitch: "يمكنك تغيير الوضع في أي وقت من الإعدادات",
    designerTitle: "مصمم",
    designerSub: "طوّر شغلك واكسب أكتر",
    clientTitle: "عميل",
    clientSub: "افهم التصميم واشتري بثقة",
    dFeats: [
      "نصائح يومية",
      "مقاسات المنصات",
      "حاسبة تسعير",
      "Delivery Checklist",
    ],
    cFeats: ["باقات وأسعار واضحة", "تعلم أساسيات التصميم", "تابع مشروعك"],
    designerMode: "Designer Mode",
    dashboard: "Dashboard",
    proPlan: "Pro Plan — مفعّل",
    freePlan: "Free Plan",
    proDesc: "كل الأدوات متاحة",
    freeDesc: "نصائح، مقاسات وchecklist مجاناً",
    tipOfDay: "💡 نصيحة اليوم",
    nextTip: "NEXT ›",
    quickTools: "⚡ Quick Tools",
    toolSizes: "مقاسات المنصات",
    toolCheck: "Delivery Checklist",
    toolPricing: "حاسبة التسعير",
    toolAudit: "AI Audit",
    navHome: "الرئيسية",
    navSizes: "مقاسات",
    navCheck: "Check",
    navContact: "تواصل",
    sizesTitle: "مقاسات المنصات",
    allFilter: "الكل",
    checkTitle: "Delivery Checklist",
    checkProgress: (d, t) => `${d}/${t} مكتمل`,
    pricingTitle: "حاسبة التسعير",
    pricingTag: "💰 Pricing Calculator",
    svcType: "نوع الخدمة",
    cplxLabel: "مستوى التعقيد",
    hrsLabel: "عدد الساعات",
    hrsUnit: "ساعة",
    calcBtn: "احسب السعر 🧮",
    resultTag: "✅ النتيجة",
    minLbl: "الحد الأدنى",
    recLbl: "الموصى به",
    maxLbl: "الحد الأقصى",
    auditTag: "🤖 AI Design Audit — PRO",
    auditTitle: "مراجعة تصميمك بالذكاء الاصطناعي",
    auditHint:
      "صف تصميمك: نوعه، هدفه، الألوان، الجمهور المستهدف، وأي تفاصيل مهمة.",
    auditPlaceholder:
      "مثال: لوجو لمطعم شاورما في القاهرة، للشباب، ألوان أحمر وأسود…",
    auditBtn: "ابدأ المراجعة 🔍",
    auditLoading: "جاري تحليل تصميمك…",
    auditAgain: "← مراجعة تصميم آخر",
    clientMode: "Client Mode",
    clientHello: "مرحباً 👋",
    clientIntro:
      "DesignR بيساعدك تفهم التصميم، تختار الخدمة المناسبة، وتعرف السعر العادل — من غير مفاجآت.",
    startHere: "🚀 ابدأ من هنا",
    pkgNavLabel: "الباقات",
    pkgNavSub: "برونز · سيلفر · جولد",
    learnNavLabel: "إيه هو التصميم الكويس؟",
    learnNavSub: "أساسيات لكل عميل",
    trackNavLabel: "تابع مشروعك",
    trackNavSub: "اعرف كل خطوة في العملية",
    contactNavLabel: "تواصل معنا",
    contactNavSub: "واتساب، إيميل، سوشيال",
    navPkgs: "الباقات",
    navLearn: "تعلّم",
    navTrack: "تابع",
    pkgsTitle: "الباقات والأسعار",
    pkgsTap: "اضغط على الباقة لتفاصيلها",
    orderBtn: "طلب هذه الباقة ›",
    learnTitle: "التصميم الكويس",
    learnSub: "أساسيات لكل عميل",
    trackTitle: "متابعة المشروع",
    trackSub: "خطوات العملية كاملة",
    trackHint: "اضغط على كل خطوة لتفاصيلها.",
    contactTitle: "تواصل معنا",
    contactSub: "اختار القناة المناسبة ليك",
    contactDesc:
      "أنا هنا لمساعدتك! سواء عندك سؤال أو عايز تطلب خدمة — تواصل معايا على أي منصة.",
    contactChannels: "قنوات التواصل",
    whatsappLbl: "واتساب",
    whatsappSub: "للتواصل السريع والاستفسارات",
    emailLbl: "البريد الإلكتروني",
    emailSub: "للمشاريع والعروض الرسمية",
    behanceLbl: "Behance",
    behanceSub: "شوف أحدث أعمالي",
    facebookLbl: "فيسبوك",
    facebookSub: "تابعني وشوف آخر التحديثات",
    instagramLbl: "انستجرام",
    instagramSub: "تصاميمي اليومية والـ reels",
    responseTime: "⚡ وقت الرد المعتاد: خلال 24 ساعة",
  },
  en: {
    dir: "ltr",
    splashTag: "Smart Design Assistant",
    welcomeTo: "Welcome to DesignR",
    whoAreYou: "You are…?",
    chooseMode: "Pick the mode that fits you",
    canSwitch: "You can switch modes anytime from settings",
    designerTitle: "Designer",
    designerSub: "Level up your work & earn more",
    clientTitle: "Client",
    clientSub: "Understand design & buy with confidence",
    dFeats: [
      "Daily tips",
      "Platform sizes",
      "Pricing calculator",
      "Delivery checklist",
    ],
    cFeats: [
      "Clear packages & prices",
      "Learn design basics",
      "Track your project",
    ],
    designerMode: "Designer Mode",
    dashboard: "Dashboard",
    proPlan: "Pro Plan — Active",
    freePlan: "Free Plan",
    proDesc: "All tools unlocked",
    freeDesc: "Tips, sizes & checklist for free",
    tipOfDay: "💡 Tip of the Day",
    nextTip: "NEXT ›",
    quickTools: "⚡ Quick Tools",
    toolSizes: "Canvas Sizes",
    toolCheck: "Delivery Checklist",
    toolPricing: "Pricing Calc",
    toolAudit: "AI Audit",
    navHome: "Home",
    navSizes: "Sizes",
    navCheck: "Check",
    navContact: "Contact",
    sizesTitle: "Platform Sizes",
    allFilter: "All",
    checkTitle: "Delivery Checklist",
    checkProgress: (d, t) => `${d}/${t} complete`,
    pricingTitle: "Pricing Calculator",
    pricingTag: "💰 Pricing Calculator",
    svcType: "Service Type",
    cplxLabel: "Complexity",
    hrsLabel: "Estimated Hours",
    hrsUnit: "hrs",
    calcBtn: "Calculate Price 🧮",
    resultTag: "✅ Result",
    minLbl: "Minimum",
    recLbl: "Recommended",
    maxLbl: "Maximum",
    auditTag: "🤖 AI Design Audit — PRO",
    auditTitle: "AI-Powered Design Review",
    auditHint:
      "Describe your design: type, goal, colors, target audience, and key details.",
    auditPlaceholder:
      "e.g. Logo for a Cairo restaurant, targeting youth, red & black colors…",
    auditBtn: "Start Review 🔍",
    auditLoading: "Analyzing your design…",
    auditAgain: "← Review another design",
    clientMode: "Client Mode",
    clientHello: "Hello 👋",
    clientIntro:
      "DesignR helps you understand design, pick the right service, and know fair pricing — no surprises.",
    startHere: "🚀 Start Here",
    pkgNavLabel: "Packages & Pricing",
    pkgNavSub: "Bronze · Silver · Gold",
    learnNavLabel: "What is good design?",
    learnNavSub: "Basics for every client",
    trackNavLabel: "Track your project",
    trackNavSub: "Know every step in the process",
    contactNavLabel: "Contact Us",
    contactNavSub: "WhatsApp, Email, Social",
    navPkgs: "Packages",
    navLearn: "Learn",
    navTrack: "Track",
    pkgsTitle: "Packages & Pricing",
    pkgsTap: "Tap a package for details",
    orderBtn: "Order this package ›",
    learnTitle: "Good Design",
    learnSub: "Basics for every client",
    trackTitle: "Project Tracking",
    trackSub: "Full process walkthrough",
    trackHint: "Tap each step for details.",
    contactTitle: "Contact Us",
    contactSub: "Choose your preferred channel",
    contactDesc:
      "I'm here to help! Whether you have a question or want to order a service — reach out on any platform.",
    contactChannels: "Contact Channels",
    whatsappLbl: "WhatsApp",
    whatsappSub: "Quick chats & inquiries",
    emailLbl: "Email",
    emailSub: "Projects & official proposals",
    behanceLbl: "Behance",
    behanceSub: "Browse my latest work",
    facebookLbl: "Facebook",
    facebookSub: "Follow for updates",
    instagramLbl: "Instagram",
    instagramSub: "Daily designs & reels",
    responseTime: "⚡ Typical response time: within 24 hours",
  },
};

// ─── PHONE ───────────────────────────────────────────────────────
function Phone({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#050505",
        fontFamily: "'Helvetica Neue',Helvetica,sans-serif",
      }}
    >
      <div
        style={{
          width: 375,
          height: 812,
          background: C.bg,
          borderRadius: 52,
          border: "2px solid #252525",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 40px 80px rgba(0,0,0,.9)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 30,
            background: C.bg,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            zIndex: 100,
            border: "2px solid #252525",
            borderTop: "none",
          }}
        />
        <div
          style={{
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: C.white }}>
            9:41
          </span>
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              fontSize: 11,
              color: C.white,
            }}
          >
            <span>▌▌▌</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {children}
        </div>
        <div
          style={{
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 120,
              height: 4,
              background: "#2a2a2a",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── LANG TOGGLE ─────────────────────────────────────────────────
function LangBtn({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang((l) => (l === "ar" ? "en" : "ar"))}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 10px",
        background: C.surfaceHigh,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 13 }}>{lang === "ar" ? "🇬🇧" : "🇪🇬"}</span>
      <span style={{ fontSize: 10, color: C.white, fontWeight: 700 }}>
        {lang === "ar" ? "EN" : "AR"}
      </span>
    </button>
  );
}

// ─── SPLASH ──────────────────────────────────────────────────────
function Splash({ onDone, l }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const ts = [
      setTimeout(() => setP(1), 400),
      setTimeout(() => setP(2), 1100),
      setTimeout(() => setP(3), 2000),
      setTimeout(() => onDone(), 2900),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);
  const prog = ["15%", "55%", "85%", "100%"][p];
  return (
    <div
      style={{
        height: "100%",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 58%,rgba(232,41,26,.13) 0%,transparent 62%)",
        }}
      />
      <div
        style={{
          opacity: p >= 1 ? 1 : 0,
          transform: p >= 1 ? "scale(1)" : "scale(.75)",
          transition: "all .55s cubic-bezier(.34,1.56,.64,1)",
          marginBottom: 22,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            background: C.red,
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 50px rgba(232,41,26,.35)",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: -2,
            }}
          >
            D
          </span>
          <div
            style={{
              position: "absolute",
              bottom: -7,
              right: -7,
              width: 28,
              height: 28,
              background: C.bg,
              border: `2.5px solid ${C.red}`,
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 800,
              color: C.red,
            }}
          >
            R
          </div>
        </div>
      </div>
      <div
        style={{
          opacity: p >= 1 ? 1 : 0,
          transform: p >= 1 ? "translateY(0)" : "translateY(14px)",
          transition: "all .5s ease .1s",
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: -1.5,
            color: C.white,
          }}
        >
          Design<span style={{ color: C.red }}>R</span>
        </div>
      </div>
      <div
        style={{
          opacity: p >= 2 ? 1 : 0,
          transition: "all .4s ease",
          fontSize: 10,
          letterSpacing: 3.5,
          color: C.muted,
          textTransform: "uppercase",
          marginBottom: 70,
        }}
      >
        {l.splashTag}
      </div>
      <div style={{ position: "absolute", bottom: 64, left: 60, right: 60 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 9,
              color: "#333",
              letterSpacing: 1,
              fontFamily: "monospace",
            }}
          >
            LOADING
          </span>
          <span
            style={{
              fontSize: 9,
              color: C.red,
              letterSpacing: 1,
              fontFamily: "monospace",
            }}
          >
            {prog}
          </span>
        </div>
        <div
          style={{
            height: 2,
            background: "#1a1a1a",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: C.red,
              borderRadius: 2,
              width: prog,
              transition: "width .7s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── MODE SELECT ─────────────────────────────────────────────────
function ModeSelect({ onSelect, l, lang, setLang }) {
  const [hov, setHov] = useState(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);
  const modes = [
    {
      id: "designer",
      icon: "🎨",
      title: l.designerTitle,
      sub: l.designerSub,
      accent: C.red,
      feats: l.dFeats,
    },
    {
      id: "client",
      icon: "💼",
      title: l.clientTitle,
      sub: l.clientSub,
      accent: C.blue,
      feats: l.cFeats,
    },
  ];
  return (
    <div
      style={{
        height: "100%",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        direction: l.dir,
      }}
    >
      <div
        style={{
          padding: "24px 22px 16px",
          opacity: vis ? 1 : 0,
          transition: "all .35s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                color: C.red,
                textTransform: "uppercase",
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              {l.welcomeTo}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: C.white,
                letterSpacing: -1,
              }}
            >
              {l.whoAreYou}
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
              {l.chooseMode}
            </div>
          </div>
          <LangBtn lang={lang} setLang={setLang} />
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          justifyContent: "center",
        }}
      >
        {modes.map((m, i) => (
          <div
            key={m.id}
            onClick={() => onSelect(m.id)}
            onMouseEnter={() => setHov(m.id)}
            onMouseLeave={() => setHov(null)}
            style={{
              background: hov === m.id ? C.surfaceHigh : C.surface,
              border: `1.5px solid ${hov === m.id ? m.accent : C.border}`,
              borderRadius: 20,
              padding: "20px 18px",
              cursor: "pointer",
              transition: "all .2s",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(22px)",
              transitionDelay: `${0.1 + i * 0.1}s`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: `${m.accent}18`,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  border: `1px solid ${m.accent}28`,
                  flexShrink: 0,
                }}
              >
                {m.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.white }}>
                  {m.title}
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                  {m.sub}
                </div>
              </div>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: hov === m.id ? m.accent : C.surfaceHigh,
                  border: `1.5px solid ${hov === m.id ? m.accent : "#333"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: hov === m.id ? "#fff" : "#444",
                  transition: "all .2s",
                }}
              >
                ›
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {m.feats.map((f) => (
                <span
                  key={f}
                  style={{
                    fontSize: 10,
                    color: m.accent,
                    background: `${m.accent}12`,
                    border: `1px solid ${m.accent}22`,
                    padding: "3px 9px",
                    borderRadius: 7,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "16px 22px",
          textAlign: "center",
          fontSize: 11,
          color: "#383838",
          opacity: vis ? 1 : 0,
          transition: "opacity .4s ease .35s",
        }}
      >
        {l.canSwitch}
      </div>
    </div>
  );
}

// ─── PRICING MODAL ───────────────────────────────────────────────
function PricingModal({ onClose, l, lang }) {
  const SVCS = lang === "ar" ? SERVICES_AR : SERVICES_EN;
  const CPLX = lang === "ar" ? COMPLEXITY_AR : COMPLEXITY_EN;
  const [svc, setSvc] = useState(SVCS[0]);
  const [cplx, setCplx] = useState(CPLX[1]);
  const [hrs, setHrs] = useState(4);
  const [res, setRes] = useState(null);

  const calc = () => {
    const b = svc.baseRate * cplx.multiplier * hrs;
    setRes({
      min: Math.round(b * 0.85),
      rec: Math.round(b),
      max: Math.round(b * 1.25),
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,.88)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          background: "#0f0f0f",
          borderRadius: "24px 24px 0 0",
          border: `1px solid ${C.border}`,
          borderBottom: "none",
          maxHeight: "92%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          direction: l.dir,
        }}
      >
        {/* header */}
        <div
          style={{
            padding: "18px 18px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 2,
                color: C.red,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {l.pricingTag}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: C.white,
                marginTop: 2,
              }}
            >
              {l.pricingTitle}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: C.surfaceHigh,
              border: `1px solid ${C.border}`,
              color: C.muted,
              width: 32,
              height: 32,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
        {/* body */}
        <div style={{ overflowY: "auto", padding: "14px 18px 28px" }}>
          {/* service */}
          <FieldLabel>{l.svcType}</FieldLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 7,
              marginBottom: 14,
            }}
          >
            {SVCS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSvc(s);
                  setRes(null);
                }}
                style={{
                  padding: "10px 8px",
                  background: svc.id === s.id ? `${C.red}18` : C.surface,
                  border: `1.5px solid ${svc.id === s.id ? C.red : C.border}`,
                  borderRadius: 10,
                  color: svc.id === s.id ? C.red : C.mutedLight,
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: svc.id === s.id ? 700 : 400,
                  textAlign: "center",
                  transition: "all .15s",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {/* complexity */}
          <FieldLabel>{l.cplxLabel}</FieldLabel>
          <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
            {CPLX.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCplx(c);
                  setRes(null);
                }}
                style={{
                  flex: 1,
                  padding: "10px 6px",
                  background: cplx.id === c.id ? `${C.red}18` : C.surface,
                  border: `1.5px solid ${cplx.id === c.id ? C.red : C.border}`,
                  borderRadius: 10,
                  color: cplx.id === c.id ? C.red : C.mutedLight,
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: cplx.id === c.id ? 700 : 400,
                  textAlign: "center",
                  transition: "all .15s",
                }}
              >
                {c.label}
                <br />
                <span style={{ fontSize: 9, opacity: 0.7 }}>
                  ×{c.multiplier}
                </span>
              </button>
            ))}
          </div>
          {/* hours */}
          <FieldLabel>
            {l.hrsLabel}:{" "}
            <span style={{ color: C.red, fontWeight: 700 }}>
              {hrs} {l.hrsUnit}
            </span>
          </FieldLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <button
              onClick={() => {
                setHrs((h) => Math.max(1, h - 1));
                setRes(null);
              }}
              style={{
                width: 36,
                height: 36,
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                color: C.white,
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              −
            </button>
            <div
              style={{
                flex: 1,
                height: 6,
                background: "#1a1a1a",
                borderRadius: 3,
                position: "relative",
                cursor: "pointer",
              }}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setHrs(
                  Math.max(
                    1,
                    Math.min(
                      40,
                      Math.round(((e.clientX - r.left) / r.width) * 40)
                    )
                  )
                );
                setRes(null);
              }}
            >
              <div
                style={{
                  width: `${(hrs / 40) * 100}%`,
                  height: "100%",
                  background: C.red,
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${(hrs / 40) * 100}%`,
                  transform: "translate(-50%,-50%)",
                  width: 14,
                  height: 14,
                  background: C.red,
                  borderRadius: "50%",
                  border: "2px solid #0a0a0a",
                }}
              />
            </div>
            <button
              onClick={() => {
                setHrs((h) => Math.min(40, h + 1));
                setRes(null);
              }}
              style={{
                width: 36,
                height: 36,
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                color: C.white,
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
          {/* calc button */}
          <button
            onClick={calc}
            style={{
              width: "100%",
              padding: 14,
              background: C.red,
              border: "none",
              borderRadius: 14,
              color: "#fff",
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              marginBottom: 14,
            }}
          >
            {l.calcBtn}
          </button>
          {/* result */}
          {res && (
            <div
              style={{
                background: "#0d1a0d",
                border: `1px solid ${C.green}30`,
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 2,
                  color: C.green,
                  textTransform: "uppercase",
                  marginBottom: 12,
                  fontWeight: 700,
                }}
              >
                {l.resultTag}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { lbl: l.minLbl, v: res.min },
                  { lbl: l.recLbl, v: res.rec, h: true },
                  { lbl: l.maxLbl, v: res.max },
                ].map((r) => (
                  <div
                    key={r.lbl}
                    style={{
                      flex: 1,
                      background: r.h ? `${C.green}12` : "transparent",
                      border: `1px solid ${r.h ? C.green + "40" : C.border}`,
                      borderRadius: 10,
                      padding: "10px 8px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{ fontSize: 9, color: C.muted, marginBottom: 4 }}
                    >
                      {r.lbl}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: r.h ? C.green : C.white,
                      }}
                    >
                      ${r.v}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 10,
                  color: "#3a5a3a",
                  textAlign: "center",
                }}
              >
                {svc.label} · {cplx.label} · {hrs} {l.hrsUnit}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── AI AUDIT MODAL ──────────────────────────────────────────────
function AuditModal({ onClose, l }) {
  const [step, setStep] = useState("input");
  const [desc, setDesc] = useState("");
  const [result, setResult] = useState("");
  const run = async () => {
    if (!desc.trim()) return;
    setStep("loading");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "أنت خبير تصميم جرافيك محترف. راجع وصف التصميم وأعطِ تقييماً احترافياً بالعربية في 4 أقسام: ✅ نقاط القوة، ⚠️ نقاط التحسين، 💡 توصيات عملية، ⭐ التقييم من 10.",
          messages: [{ role: "user", content: `صف التصميم:\n${desc}` }],
        }),
      });
      const d = await r.json();
      setResult(
        d.content?.map((b) => (b.type === "text" ? b.text : "")).join("") ||
          "لم يتم الحصول على نتيجة."
      );
      setStep("result");
    } catch {
      setResult("حدث خطأ في الاتصال.");
      setStep("result");
    }
  };
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,.88)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          background: "#0f0f0f",
          borderRadius: "24px 24px 0 0",
          border: `1px solid ${C.border}`,
          borderBottom: "none",
          maxHeight: "92%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          direction: l.dir,
        }}
      >
        <div
          style={{
            padding: "18px 18px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 2,
                color: C.red,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {l.auditTag}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: C.white,
                marginTop: 2,
              }}
            >
              {l.auditTitle}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: C.surfaceHigh,
              border: `1px solid ${C.border}`,
              color: C.muted,
              width: 32,
              height: 32,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "14px 18px 28px", flex: 1 }}>
          {step === "input" && (
            <>
              <div
                style={{
                  fontSize: 13,
                  color: C.muted,
                  marginBottom: 12,
                  lineHeight: 1.65,
                }}
              >
                {l.auditHint}
              </div>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={5}
                placeholder={l.auditPlaceholder}
                style={{
                  width: "100%",
                  background: C.surface,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 12,
                  color: C.white,
                  fontSize: 13,
                  padding: 12,
                  resize: "none",
                  outline: "none",
                  lineHeight: 1.65,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={run}
                disabled={!desc.trim()}
                style={{
                  width: "100%",
                  marginTop: 12,
                  padding: 14,
                  background: desc.trim() ? C.red : "#1a1a1a",
                  border: "none",
                  borderRadius: 14,
                  color: desc.trim() ? "#fff" : "#444",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: desc.trim() ? "pointer" : "not-allowed",
                }}
              >
                {l.auditBtn}
              </button>
            </>
          )}
          {step === "loading" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px 0",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: `3px solid ${C.border}`,
                  borderTop: `3px solid ${C.red}`,
                  animation: "spin .9s linear infinite",
                  marginBottom: 16,
                }}
              />
              <div style={{ color: C.muted, fontSize: 13 }}>
                {l.auditLoading}
              </div>
            </div>
          )}
          {step === "result" && (
            <>
              <div
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: 16,
                  fontSize: 13,
                  color: C.mutedLight,
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                  marginBottom: 14,
                }}
              >
                {result}
              </div>
              <button
                onClick={() => {
                  setStep("input");
                  setDesc("");
                  setResult("");
                }}
                style={{
                  width: "100%",
                  padding: 12,
                  background: C.surfaceHigh,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  color: C.mutedLight,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {l.auditAgain}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT SCREEN ──────────────────────────────────────────────
function ContactScreen({ l }) {
  const channels = [
    {
      icon: "💬",
      label: l.whatsappLbl,
      sub: l.whatsappSub,
      color: "#25D366",
      url: LINKS.whatsapp,
    },
    {
      icon: "✉️",
      label: l.emailLbl,
      sub: l.emailSub,
      color: "#EA4335",
      url: LINKS.email,
    },
    {
      icon: "🎨",
      label: l.behanceLbl,
      sub: l.behanceSub,
      color: "#1769FF",
      url: LINKS.behance,
    },
    {
      icon: "📘",
      label: l.facebookLbl,
      sub: l.facebookSub,
      color: "#1877F2",
      url: LINKS.facebook,
    },
    {
      icon: "📸",
      label: l.instagramLbl,
      sub: l.instagramSub,
      color: "#E1306C",
      url: LINKS.instagram,
    },
  ];
  return (
    <div style={{ height: "100%", overflowY: "auto", direction: l.dir }}>
      <div style={{ padding: "18px 18px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: C.muted,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {l.navContact}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.white }}>
              {l.contactTitle}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              {l.contactSub}
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg,#E8291A,#8B1A10)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            📲
          </div>
        </div>
        <div
          style={{
            background: "#110000",
            border: `1px solid ${C.red}25`,
            borderLeft: `3px solid ${C.red}`,
            borderRadius: 12,
            padding: 14,
            marginBottom: 20,
            fontSize: 12,
            color: "#9a7070",
            lineHeight: 1.7,
          }}
        >
          {l.contactDesc}
        </div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: 2,
            color: C.muted,
            textTransform: "uppercase",
            marginBottom: 12,
            fontWeight: 700,
          }}
        >
          {l.contactChannels}
        </div>
        {channels.map((ch) => (
          <a
            key={ch.label}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "13px 15px",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              marginBottom: 8,
              textDecoration: "none",
              transition: "all .2s",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: `${ch.color}18`,
                border: `1.5px solid ${ch.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {ch.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>
                {ch.label}
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                {ch.sub}
              </div>
            </div>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: `${ch.color}15`,
                border: `1px solid ${ch.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: ch.color,
              }}
            >
              ›
            </div>
          </a>
        ))}
        <div
          style={{
            marginTop: 6,
            padding: "12px 16px",
            background: "#0d0d0d",
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            fontSize: 11,
            color: C.muted,
            textAlign: "center",
          }}
        >
          {l.responseTime}
        </div>
      </div>
    </div>
  );
}

// ─── DESIGNER DASHBOARD ──────────────────────────────────────────
function DesignerDash({ pro, l, lang, setLang }) {
  const TIPS = lang === "ar" ? TIPS_AR : TIPS_EN;
  const CHECKLIST = lang === "ar" ? CHECKLIST_AR : CHECKLIST_EN;
  const [tab, setTab] = useState("home");
  const [ckd, setCkd] = useState({});
  const [tip, setTip] = useState(0);
  const [szF, setSzF] = useState("All");
  const [modal, setModal] = useState(null);
  const platforms = ["All", ...new Set(SIZES.map((s) => s.platform))];

  return (
    <div
      style={{
        height: "100%",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        direction: l.dir,
      }}
    >
      {modal === "pricing" && (
        <PricingModal onClose={() => setModal(null)} l={l} lang={lang} />
      )}
      {modal === "audit" && <AuditModal onClose={() => setModal(null)} l={l} />}

      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {/* HOME */}
        {tab === "home" && (
          <div style={{ padding: "18px 18px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.muted,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {l.designerMode}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: C.white,
                    letterSpacing: -0.8,
                  }}
                >
                  {l.dashboard}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <LangBtn lang={lang} setLang={setLang} />
                <div
                  style={{
                    width: 38,
                    height: 38,
                    background: C.red,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 900,
                    color: "#fff",
                  }}
                >
                  D
                </div>
              </div>
            </div>
            {/* plan */}
            <div
              style={{
                background: pro ? "#1a1000" : "#0d1a0d",
                border: `1px solid ${pro ? C.amber + "40" : "#1e3a1e"}`,
                borderRadius: 12,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 16 }}>{pro ? "👑" : "⚡"}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: pro ? C.amber : C.green,
                  }}
                >
                  {pro ? l.proPlan : l.freePlan}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: pro ? "#5a4a1e" : "#4a7a4a",
                    marginTop: 1,
                  }}
                >
                  {pro ? l.proDesc : l.freeDesc}
                </div>
              </div>
              <span
                style={{
                  fontSize: 9,
                  background: pro ? C.amber + "20" : C.green + "20",
                  color: pro ? C.amber : C.green,
                  padding: "3px 9px",
                  borderRadius: 7,
                  fontWeight: 700,
                }}
              >
                {pro ? "PRO" : "FREE"}
              </span>
            </div>
            {/* tip */}
            <SLbl>{l.tipOfDay}</SLbl>
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.red}`,
                borderRadius: 12,
                padding: 14,
                marginBottom: 16,
              }}
            >
              <div
                style={{ fontSize: 13, lineHeight: 1.65, color: C.mutedLight }}
              >
                {TIPS[tip]}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <div style={{ display: "flex", gap: 4 }}>
                  {TIPS.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setTip(i)}
                      style={{
                        width: i === tip ? 18 : 6,
                        height: 4,
                        background: i === tip ? C.red : "#2a2a2a",
                        borderRadius: 2,
                        transition: "all .25s",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setTip((t) => (t + 1) % TIPS.length)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${C.red}40`,
                    color: C.red,
                    fontSize: 10,
                    padding: "4px 10px",
                    borderRadius: 7,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {l.nextTip}
                </button>
              </div>
            </div>
            {/* tools */}
            <SLbl>{l.quickTools}</SLbl>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 9,
              }}
            >
              {[
                {
                  icon: "📐",
                  label: l.toolSizes,
                  go: () => setTab("sizes"),
                  free: true,
                },
                {
                  icon: "✅",
                  label: l.toolCheck,
                  go: () => setTab("check"),
                  free: true,
                },
                {
                  icon: "💰",
                  label: l.toolPricing,
                  go: () => setModal("pricing"),
                  free: true,
                },
                {
                  icon: "🤖",
                  label: l.toolAudit,
                  go: () => setModal("audit"),
                  free: false,
                },
              ].map((tool) => {
                const locked = !tool.free && !pro;
                return (
                  <div
                    key={tool.label}
                    onClick={() => !locked && tool.go()}
                    style={{
                      background: locked ? "#0d0d0d" : C.surface,
                      border: `1px solid ${locked ? "#1a1a1a" : C.border}`,
                      borderRadius: 14,
                      padding: "15px 13px",
                      cursor: locked ? "not-allowed" : "pointer",
                      opacity: locked ? 0.45 : 1,
                      position: "relative",
                      transition: "all .15s",
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 6 }}>
                      {tool.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: locked ? "#444" : C.white,
                      }}
                    >
                      {tool.label}
                    </div>
                    {locked && (
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          fontSize: 8,
                          background: C.red + "20",
                          color: C.red,
                          padding: "2px 5px",
                          borderRadius: 4,
                          fontWeight: 700,
                        }}
                      >
                        PRO
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SIZES */}
        {tab === "sizes" && (
          <div style={{ padding: "18px 18px 0" }}>
            <BkHdr
              title={l.sizesTitle}
              sub={`${SIZES.length} • 2026`}
              onBack={() => setTab("home")}
            />
            <div
              style={{
                display: "flex",
                gap: 6,
                overflowX: "auto",
                marginBottom: 14,
                paddingBottom: 4,
              }}
            >
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setSzF(p)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 8,
                    border: `1px solid ${szF === p ? C.red : "#222"}`,
                    background: szF === p ? C.red + "20" : "transparent",
                    color: szF === p ? C.red : C.muted,
                    fontSize: 11,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontWeight: szF === p ? 700 : 400,
                  }}
                >
                  {p === "All" ? l.allFilter : p}
                </button>
              ))}
            </div>
            {SIZES.filter((s) => szF === "All" || s.platform === szF).map(
              (s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "11px 13px",
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    marginBottom: 6,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 12, fontWeight: 600, color: C.white }}
                    >
                      {s.name}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>
                      {s.platform}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      color: C.red,
                      background: C.red + "15",
                      padding: "4px 9px",
                      borderRadius: 7,
                      fontWeight: 700,
                    }}
                  >
                    {s.w}×{s.h}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* CHECKLIST */}
        {tab === "check" && (
          <div style={{ padding: "18px 18px 0" }}>
            <BkHdr
              title={l.checkTitle}
              sub={l.checkProgress(
                Object.values(ckd).filter(Boolean).length,
                CHECKLIST.length
              )}
              onBack={() => setTab("home")}
            />
            <div
              style={{
                height: 4,
                background: "#1a1a1a",
                borderRadius: 2,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: C.green,
                  borderRadius: 2,
                  width: `${
                    (Object.values(ckd).filter(Boolean).length /
                      CHECKLIST.length) *
                    100
                  }%`,
                  transition: "width .3s",
                }}
              />
            </div>
            {CHECKLIST.map((item, i) => (
              <div
                key={i}
                onClick={() => setCkd((p) => ({ ...p, [i]: !p[i] }))}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 11,
                  padding: 13,
                  background: ckd[i] ? "#0d1a0d" : C.surface,
                  border: `1px solid ${ckd[i] ? "#1e3a1e" : C.border}`,
                  borderRadius: 11,
                  marginBottom: 7,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    border: `2px solid ${ckd[i] ? C.green : "#333"}`,
                    background: ckd[i] ? C.green : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {ckd[i] && "✓"}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: ckd[i] ? "#4a7a4a" : C.mutedLight,
                    textDecoration: ckd[i] ? "line-through" : "none",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CONTACT */}
        {tab === "contact" && <ContactScreen l={l} />}
      </div>

      {/* nav */}
      <div
        style={{
          display: "flex",
          background: "#0c0c0c",
          borderTop: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        {[
          { id: "home", icon: "⊞", lbl: l.navHome },
          { id: "sizes", icon: "📐", lbl: l.navSizes },
          { id: "check", icon: "✅", lbl: l.navCheck },
          { id: "contact", icon: "📲", lbl: l.navContact },
        ].map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            style={{
              flex: 1,
              padding: "9px 0 7px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 15 }}>{tb.icon}</span>
            <span
              style={{
                fontSize: 8,
                color: tab === tb.id ? C.red : "#3a3a3a",
                fontWeight: tab === tb.id ? 700 : 400,
              }}
            >
              {tb.lbl}
            </span>
            {tab === tb.id && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: 24,
                  height: 2,
                  background: C.red,
                  borderRadius: 1,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── CLIENT DASHBOARD ────────────────────────────────────────────
function ClientDash({ l, lang, setLang }) {
  const PACKAGES = lang === "ar" ? PACKAGES_AR : PACKAGES_EN;
  const LEARN = lang === "ar" ? LEARN_AR : LEARN_EN;
  const TRACK = lang === "ar" ? TRACK_AR : TRACK_EN;
  const [tab, setTab] = useState("home");
  const [selPkg, setSelPkg] = useState(null);
  const [trackOpen, setTrackOpen] = useState(-1);

  return (
    <div
      style={{
        height: "100%",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        direction: l.dir,
      }}
    >
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* HOME */}
        {tab === "home" && (
          <div style={{ padding: "18px 18px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.muted,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {l.clientMode}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: C.white,
                    letterSpacing: -0.8,
                  }}
                >
                  {l.clientHello}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <LangBtn lang={lang} setLang={setLang} />
                <div
                  style={{
                    width: 38,
                    height: 38,
                    background: C.blue,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 900,
                    color: "#fff",
                  }}
                >
                  C
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#0a0f1a",
                border: `1px solid ${C.blue}30`,
                borderLeft: `3px solid ${C.blue}`,
                borderRadius: 12,
                padding: 14,
                marginBottom: 18,
                fontSize: 12,
                color: "#7090aa",
                lineHeight: 1.65,
              }}
            >
              {l.clientIntro}
            </div>
            <SLbl>{l.startHere}</SLbl>
            {[
              {
                icon: "💰",
                lbl: l.pkgNavLabel,
                sub: l.pkgNavSub,
                tb: "pkgs",
                c: C.amber,
              },
              {
                icon: "📖",
                lbl: l.learnNavLabel,
                sub: l.learnNavSub,
                tb: "learn",
                c: C.blue,
              },
              {
                icon: "🗂️",
                lbl: l.trackNavLabel,
                sub: l.trackNavSub,
                tb: "track",
                c: C.green,
              },
              {
                icon: "📲",
                lbl: l.contactNavLabel,
                sub: l.contactNavSub,
                tb: "contact",
                c: C.red,
              },
            ].map((item) => (
              <div
                key={item.tb}
                onClick={() => setTab(item.tb)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: 14,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  cursor: "pointer",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: item.c + "18",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: C.white }}
                  >
                    {item.lbl}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                    {item.sub}
                  </div>
                </div>
                <span style={{ color: "#444", fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>
        )}

        {/* PACKAGES */}
        {tab === "pkgs" && (
          <div style={{ padding: "18px 18px 0" }}>
            <BkHdr
              title={l.pkgsTitle}
              sub={l.pkgsTap}
              onBack={() => setTab("home")}
            />
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelPkg(selPkg?.id === pkg.id ? null : pkg)}
                style={{
                  background:
                    selPkg?.id === pkg.id ? `${pkg.color}10` : C.surface,
                  border: `1.5px solid ${
                    selPkg?.id === pkg.id ? pkg.color : C.border
                  }`,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 10,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: selPkg?.id === pkg.id ? 12 : 0,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      background: `${pkg.color}20`,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {pkg.id === "bronze"
                      ? "🥉"
                      : pkg.id === "silver"
                      ? "🥈"
                      : "🥇"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: pkg.color,
                      }}
                    >
                      {pkg.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: pkg.color,
                        opacity: 0.7,
                        fontWeight: 600,
                      }}
                    >
                      {pkg.price}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      color: "#444",
                      transition: "transform .2s",
                      transform:
                        selPkg?.id === pkg.id ? "rotate(90deg)" : "none",
                    }}
                  >
                    ›
                  </div>
                </div>
                {selPkg?.id === pkg.id && (
                  <div
                    style={{
                      borderTop: `1px solid ${pkg.color}25`,
                      paddingTop: 12,
                    }}
                  >
                    {pkg.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 8,
                          marginBottom: 7,
                          fontSize: 12,
                          color: C.mutedLight,
                          alignItems: "flex-start",
                        }}
                      >
                        <span style={{ color: pkg.color, flexShrink: 0 }}>
                          ◆
                        </span>
                        {item}
                      </div>
                    ))}
                    <button
                      style={{
                        width: "100%",
                        marginTop: 10,
                        padding: 11,
                        background: pkg.color,
                        border: "none",
                        borderRadius: 10,
                        color: "#0a0a0a",
                        fontSize: 13,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      {l.orderBtn}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* LEARN */}
        {tab === "learn" && (
          <div style={{ padding: "18px 18px 0" }}>
            <BkHdr
              title={l.learnTitle}
              sub={l.learnSub}
              onBack={() => setTab("home")}
            />
            {LEARN.map((card, i) => (
              <div
                key={i}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>
                    {card.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.white,
                        marginBottom: 5,
                      }}
                    >
                      {card.t}
                    </div>
                    <div
                      style={{ fontSize: 12, color: C.muted, lineHeight: 1.65 }}
                    >
                      {card.b}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TRACK */}
        {tab === "track" && (
          <div style={{ padding: "18px 18px 0" }}>
            <BkHdr
              title={l.trackTitle}
              sub={l.trackSub}
              onBack={() => setTab("home")}
            />
            <div
              style={{
                background: "#0a0f1a",
                border: `1px solid ${C.blue}25`,
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 16,
                fontSize: 12,
                color: "#6080a0",
              }}
            >
              {l.trackHint}
            </div>
            {TRACK.map((s, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div
                  onClick={() => setTrackOpen(trackOpen === i ? -1 : i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 13,
                    background: trackOpen === i ? "#0a0f1a" : C.surface,
                    border: `1.5px solid ${
                      trackOpen === i ? C.blue : C.border
                    }`,
                    borderRadius: trackOpen === i ? "12px 12px 0 0" : 12,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background:
                        trackOpen === i ? C.blue + "25" : C.surfaceHigh,
                      border: `2px solid ${trackOpen === i ? C.blue : "#333"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.white,
                    }}
                  >
                    {i + 1}. {s.label}
                  </div>
                  <span style={{ color: "#444", fontSize: 14 }}>
                    {trackOpen === i ? "▾" : "▸"}
                  </span>
                </div>
                {trackOpen === i && (
                  <div
                    style={{
                      padding: "12px 14px",
                      background: "#08101a",
                      border: `1px solid ${C.blue}20`,
                      borderTop: "none",
                      borderRadius: "0 0 12px 12px",
                      fontSize: 12,
                      color: "#6080a0",
                      lineHeight: 1.65,
                    }}
                  >
                    {s.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CONTACT */}
        {tab === "contact" && <ContactScreen l={l} />}
      </div>

      {/* nav */}
      <div
        style={{
          display: "flex",
          background: "#0c0c0c",
          borderTop: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        {[
          { id: "home", icon: "🏠", lbl: l.navHome },
          { id: "pkgs", icon: "💰", lbl: l.navPkgs },
          { id: "learn", icon: "📖", lbl: l.navLearn },
          { id: "track", icon: "🗂️", lbl: l.navTrack },
          { id: "contact", icon: "📲", lbl: l.navContact },
        ].map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            style={{
              flex: 1,
              padding: "9px 0 7px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 14 }}>{tb.icon}</span>
            <span
              style={{
                fontSize: 8,
                color: tab === tb.id ? C.blue : "#3a3a3a",
                fontWeight: tab === tb.id ? 700 : 400,
              }}
            >
              {tb.lbl}
            </span>
            {tab === tb.id && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: 24,
                  height: 2,
                  background: C.blue,
                  borderRadius: 1,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>
      {children}
    </div>
  );
}
function SLbl({ children }) {
  return (
    <div
      style={{
        fontSize: 10,
        letterSpacing: 2,
        color: C.muted,
        textTransform: "uppercase",
        marginBottom: 10,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}
function BkHdr({ title, sub, onBack }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 18,
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: C.red,
          cursor: "pointer",
          fontSize: 22,
          padding: 0,
          lineHeight: 1,
        }}
      >
        ‹
      </button>
      <div>
        <div style={{ fontSize: 19, fontWeight: 800, color: C.white }}>
          {title}
        </div>
        {sub && (
          <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────
export default function App() {
  const [scr, setScr] = useState("splash");
  const [lang, setLang] = useState("ar");
  const l = L[lang];
  const tabs = [
    { id: "splash", lbl: "Splash" },
    { id: "mode", lbl: "Mode Select" },
    { id: "designer", lbl: "Designer Free" },
    { id: "designer-pro", lbl: "Designer Pro" },
    { id: "client", lbl: "Client" },
  ];
  return (
    <div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}*{-webkit-tap-highlight-color:transparent}::-webkit-scrollbar{width:0}`}</style>
      <div
        style={{
          position: "fixed",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999,
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 440,
        }}
      >
        {tabs.map((tb, i) => (
          <button
            key={tb.id}
            onClick={() => setScr(tb.id)}
            style={{
              padding: "4px 10px",
              background: scr === tb.id ? C.red : "#111",
              border: `1px solid ${scr === tb.id ? C.red : "#2a2a2a"}`,
              borderRadius: 20,
              fontSize: 10,
              color: scr === tb.id ? "#fff" : "#555",
              fontFamily: "monospace",
              cursor: "pointer",
            }}
          >
            0{i + 1} {tb.lbl}
          </button>
        ))}
      </div>
      <Phone>
        {scr === "splash" && <Splash onDone={() => setScr("mode")} l={l} />}
        {scr === "mode" && (
          <ModeSelect
            onSelect={(m) => setScr(m === "designer" ? "designer" : "client")}
            l={l}
            lang={lang}
            setLang={setLang}
          />
        )}
        {scr === "designer" && (
          <DesignerDash pro={false} l={l} lang={lang} setLang={setLang} />
        )}
        {scr === "designer-pro" && (
          <DesignerDash pro={true} l={l} lang={lang} setLang={setLang} />
        )}
        {scr === "client" && <ClientDash l={l} lang={lang} setLang={setLang} />}
      </Phone>
    </div>
  );
}
