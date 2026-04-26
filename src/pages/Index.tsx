import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SEND_EMAIL_URL = "https://functions.poehali.dev/4ee121d4-196e-417b-9649-d11038e0448c";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d2134a9f-99c7-4d73-9478-04ddbbfbc3cc/bucket/dee89187-1552-4324-b8f1-19469e622f8c.png";

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

const SERVICES = [
  {
    icon: "🎁",
    title: "Бесплатный расклад",
    desc: "Один вопрос — одна карта. Краткий ответ прямо сейчас. Без регистрации, анонимно.",
    oldPrice: null,
    price: "Бесплатно",
    highlight: false,
    free: true,
  },
  {
    icon: "🎴",
    title: "Да/Нет",
    desc: "Один чёткий ответ на ваш вопрос — без лишних слов. Быстро, точно, анонимно.",
    oldPrice: "500 ₽",
    price: "199 ₽",
    highlight: true,
  },
  {
    icon: "💞",
    title: "Чувства партнёра",
    desc: "Что он думает, чувствует и какие намерения скрывает. Полная картина отношений.",
    oldPrice: "990 ₽",
    price: "790 ₽",
    highlight: false,
  },
  {
    icon: "✦",
    title: "Кельтский крест",
    desc: "Классический расклад из 10 карт — глубокий анализ ситуации, прошлое, настоящее и будущее.",
    oldPrice: null,
    price: "1 590 ₽",
    highlight: false,
  },
  {
    icon: "◈",
    title: "Расклад на год",
    desc: "Полная карта вашего года — события, возможности и испытания по каждому месяцу.",
    oldPrice: null,
    price: "2 390 ₽",
    highlight: false,
  },
  {
    icon: "👑",
    title: "VIP-диагностика",
    desc: "Расширенная консультация: таро + нумерология + астрология. Полный разбор жизненной ситуации.",
    oldPrice: "7 500 ₽",
    price: "6 990 ₽",
    highlight: false,
  },
  {
    icon: "📜",
    title: "PDF-сертификат",
    desc: "Именной сертификат на расклад — красиво оформленный документ, который можно подарить.",
    oldPrice: null,
    price: "199 ₽",
    highlight: false,
  },
];

const REVIEWS = [
  {
    label: "Клиент из Москвы",
    text: "Расклад на год оказался удивительно точным. Мастер увидела ситуацию на работе, о которой я не говорила — это поразило меня. Обязательно вернусь.",
    stars: 5,
  },
  {
    label: "Клиентка из Санкт-Петербурга",
    text: "Обратилась в сложный период в отношениях. Расклад дал мне ясность и спокойствие. Спасибо за чуткость и профессионализм.",
    stars: 5,
  },
  {
    label: "Клиентка из Екатеринбурга",
    text: "Была скептиком, теперь — нет. Прошло три месяца, и половина предсказанного уже сбылась. Очень благодарна за работу.",
    stars: 5,
  },
  {
    label: "Клиентка из Казани",
    text: "Астрологическая карта перевернула моё понимание себя. Впервые всё встало на свои места. Рекомендую всем, кто ищет ответы.",
    stars: 5,
  },
  {
    label: "Клиент из Новосибирска",
    text: "Долго сомневался, стоит ли обращаться. В итоге — ни капли сожаления. Расклад на ситуацию с бизнесом дал чёткий взгляд со стороны. Решение принял уверенно.",
    stars: 5,
  },
  {
    label: "Клиентка из Краснодара",
    text: "Очень тонко и без лишних слов. Ощущение, что меня видят насквозь — в хорошем смысле. Расклад на отношения всё расставил по местам.",
    stars: 5,
  },
  {
    label: "Клиент из Тюмени",
    text: "Пришёл с запросом по карьере. Получил не просто ответы, а целое понимание ситуации. Через месяц всё сложилось именно так, как было описано.",
    stars: 5,
  },
  {
    label: "Клиентка из Уфы",
    text: "Программа судьбы — это отдельное открытие. Никогда не думала, что нумерология может быть настолько точной. Очень благодарна за работу.",
    stars: 5,
  },
  {
    label: "Клиентка из Ростова-на-Дону",
    text: "Просто спасибо. Расклад «Да/Нет» дал мне тот самый толчок, которого не хватало. Кратко, чётко, без воды — именно то, что нужно.",
    stars: 5,
  },
  {
    label: "Клиент из Самары",
    text: "Заказал VIP-диагностику перед важным решением. Разбор был настолько глубоким, что я несколько раз перечитывал. Всё сошлось.",
    stars: 5,
  },
  {
    label: "Клиентка из Воронежа",
    text: "Чувства партнёра — самый точный расклад, что я встречала. Описание было как будто она знала его лично. Поразительно.",
    stars: 5,
  },
  {
    label: "Клиент из Перми",
    text: "Кельтский крест — это мощно. Давно интересовался таро, но впервые увидел такой детальный и осознанный подход. Буду возвращаться.",
    stars: 5,
  },
  {
    label: "Клиентка из Омска",
    text: "Обратилась по поводу переезда — стоит ли рисковать. Расклад показал всё по шагам. Решилась. Ни разу не пожалела.",
    stars: 5,
  },
];

function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {STARS.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.5,
            background: star.id % 3 === 0 ? "#663399" : "#FFCC33",
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-DEFAULT opacity-40" />
      <span className="text-gold-DEFAULT text-xl">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-DEFAULT opacity-40" />
    </div>
  );
}

const TAROT_API = "https://functions.poehali.dev/c5886d42-66ab-42ba-ae7e-3c931659899b";

function FreeReadingModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"question" | "flipping" | "result" | "error">("question");
  const [question, setQuestion] = useState("");
  const [card, setCard] = useState<{ name: string; symbol: string; energy: string; meaning: string } | null>(null);

  const draw = async () => {
    if (!question.trim()) return;
    setPhase("flipping");
    try {
      const res = await fetch(TAROT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      const parsed = typeof data === "string" ? JSON.parse(data) : data;
      setCard(parsed.card);
      setPhase("result");
    } catch {
      setPhase("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative max-w-lg w-full animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="bg-mystic-deep border border-gold-DEFAULT/50 p-8"
          style={{ boxShadow: "0 0 80px rgba(102,51,153,0.5)" }}
        >
          <div className="text-center mb-6">
            <p className="font-montserrat text-gold-DEFAULT/60 text-xs tracking-[0.4em] uppercase mb-2">KeyArcana</p>
            <h2 className="font-cormorant text-3xl text-white font-light">Бесплатный расклад</h2>
          </div>

          {phase === "question" && (
            <div className="space-y-5">
              <p className="font-cormorant text-lg text-white/60 italic text-center">
                Задайте один вопрос — и карта откроет ответ
              </p>
              <textarea
                autoFocus
                rows={3}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Ваш вопрос..."
                className="w-full bg-mystic-mid/60 border border-gold-DEFAULT/30 px-5 py-3 font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-DEFAULT/60 transition-colors resize-none"
              />
              <button
                onClick={draw}
                disabled={!question.trim()}
                className="w-full py-4 font-montserrat text-xs tracking-widest uppercase font-medium disabled:opacity-40 transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #FFE066, #FFCC33)", color: "#0d0515" }}
              >
                Вытянуть карту
              </button>
            </div>
          )}

          {phase === "flipping" && (
            <div className="flex flex-col items-center py-8 gap-6">
              <div
                className="w-28 h-44 border-2 border-gold-DEFAULT/60 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #2a1850, #663399)",
                  boxShadow: "0 0 40px rgba(102,51,153,0.6)",
                }}
              >
                <span className="text-gold-DEFAULT text-4xl animate-pulse">✦</span>
              </div>
              <p className="font-cormorant text-xl text-gold-DEFAULT/70 italic animate-pulse">Карта открывается...</p>
            </div>
          )}

          {phase === "error" && (
            <div className="text-center py-8 space-y-4">
              <p className="font-cormorant text-xl text-white/60 italic">Звёзды не ответили...</p>
              <p className="font-montserrat text-sm text-white/40">Попробуйте ещё раз или задайте другой вопрос.</p>
              <button
                onClick={() => setPhase("question")}
                className="px-8 py-3 font-montserrat text-xs tracking-widest uppercase border border-gold-DEFAULT/30 text-gold-light hover:bg-gold-DEFAULT/10 transition-all"
              >
                Попробовать снова
              </button>
            </div>
          )}

          {phase === "result" && card && (
            <div className="space-y-6">
              <p className="font-cormorant text-white/50 italic text-center text-sm">«{question}»</p>
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-28 h-44 border-2 border-gold-DEFAULT flex flex-col items-center justify-center gap-2 animate-scale-in"
                  style={{
                    background: "linear-gradient(160deg, #2a1850 0%, #663399 50%, #1e1238 100%)",
                    boxShadow: "0 0 50px rgba(255,204,51,0.25), 0 0 20px rgba(102,51,153,0.5)",
                  }}
                >
                  <span className="font-cormorant text-gold-DEFAULT text-xs tracking-widest">{card.symbol}</span>
                  <span className="text-gold-DEFAULT text-2xl">✦</span>
                  <span className="font-cormorant text-white text-sm text-center px-2">{card.name}</span>
                </div>
                <p className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-widest">{card.energy}</p>
              </div>
              <div className="border border-gold-DEFAULT/20 p-5" style={{ background: "rgba(102,51,153,0.1)" }}>
                <p className="font-cormorant text-lg text-white/85 italic leading-relaxed text-center">
                  {card.meaning}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 font-montserrat text-xs tracking-widest uppercase border border-gold-DEFAULT/30 text-gold-light hover:bg-gold-DEFAULT/10 transition-all"
              >
                Хочу подробнее — записаться к мастеру
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-mystic-mid border border-gold-DEFAULT/40 flex items-center justify-center text-gold-light hover:text-gold-DEFAULT transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
}

function CertificateModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-mystic-dark/90 backdrop-blur-sm" />
      <div
        className="relative max-w-2xl w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative bg-mystic-deep border border-gold-DEFAULT/60 p-1 rounded-sm"
          style={{ boxShadow: "0 0 60px rgba(102,51,153,0.4), 0 0 120px rgba(255,204,51,0.1)" }}
        >
          <div className="border border-gold-DEFAULT/30 p-8 rounded-sm">
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold-DEFAULT/60" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold-DEFAULT/60" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold-DEFAULT/60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold-DEFAULT/60" />

            <div className="text-center mb-6">
              <div className="text-gold-DEFAULT text-4xl mb-3">✦ ✦ ✦</div>
              <p className="font-montserrat text-gold-light/60 text-xs tracking-[0.4em] uppercase mb-2">Международная Академия Таро</p>
              <h2 className="font-cormorant text-4xl text-gold-DEFAULT font-light mb-1">Сертификат</h2>
              <p className="font-cormorant italic text-gold-light/80 text-lg">о профессиональной квалификации</p>
            </div>

            <GoldDivider />

            <div className="text-center space-y-4">
              <p className="font-montserrat text-white/60 text-sm tracking-widest uppercase">Настоящим удостоверяется, что</p>
              <p className="font-cormorant text-5xl text-gold-DEFAULT font-light italic">Елена Светлова</p>
              <p className="font-montserrat text-white/70 text-sm leading-relaxed max-w-md mx-auto">
                прошла полный курс обучения по специальности «Профессиональный таролог»
                и соответствует высшим стандартам практики
              </p>
            </div>

            <GoldDivider />

            <div className="flex justify-between items-end mt-4">
              <div className="text-center">
                <div className="w-32 h-px bg-gold-DEFAULT/50 mb-2" />
                <p className="font-montserrat text-white/50 text-xs">Дата выдачи</p>
                <p className="font-cormorant text-gold-light text-lg">15 марта 2019</p>
              </div>
              <div className="text-4xl opacity-30">⟡</div>
              <div className="text-center">
                <div className="w-32 h-px bg-gold-DEFAULT/50 mb-2" />
                <p className="font-montserrat text-white/50 text-xs">Регистрационный №</p>
                <p className="font-cormorant text-gold-light text-lg">TAR-2019-0847</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-mystic-mid border border-gold-DEFAULT/40 flex items-center justify-center text-gold-light hover:text-gold-DEFAULT transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
}

const Index = () => {
  const [showCert, setShowCert] = useState(false);
  const [showFreeReading, setShowFreeReading] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ name: "", contact: "", message: "Бесплатный расклад" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            setActiveNav(entry.target.id);
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      setSent(true);
    } catch {
      setError("Не удалось отправить. Напишите напрямую в Telegram.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-montserrat overflow-x-hidden" style={{ background: "#0d0515" }}>
      <StarField />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(13,5,21,0.97) 0%, transparent 100%)" }}>
        <div className="font-cormorant text-gold-DEFAULT text-2xl tracking-widest cursor-pointer" onClick={() => scrollTo("hero")}>
          ✦ KeyArcana
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: "hero", label: "Главная" },
            { id: "services", label: "Услуги" },
            { id: "reviews", label: "Отзывы" },
            { id: "contacts", label: "Контакты" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`font-montserrat text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeNav === id ? "text-gold-DEFAULT" : "text-white/50 hover:text-white/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("contacts")}
          className="text-xs tracking-widest uppercase border border-gold-DEFAULT/50 text-gold-light px-4 py-2 hover:bg-gold-DEFAULT/10 transition-all duration-300"
        >
          Записаться
        </button>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={setRef("hero")}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Фоновая картинка */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(13,5,21,0.6) 0%, rgba(13,5,21,0.2) 40%, rgba(13,5,21,0.5) 70%, rgba(13,5,21,1) 100%)"
          }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-[0.5em] uppercase mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            Профессиональное таро
          </p>
          <h1
            className="font-cormorant text-6xl md:text-8xl font-light leading-none mb-6 animate-fade-in"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            Путь к{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(90deg, #f0d080, #c9a84c, #f0d080)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
              }}
            >
              истине
            </span>
          </h1>
          <p
            className="font-cormorant text-xl md:text-2xl text-white/60 italic mb-12 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            Откройте завесу тайны и найдите ответы на вопросы,<br />которые давно не дают покоя
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            <button
              onClick={() => scrollTo("contacts")}
              className="px-10 py-4 font-montserrat text-xs tracking-[0.3em] uppercase text-mystic-dark font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FFE066, #FFCC33)",
                boxShadow: "0 0 30px rgba(255,204,51,0.4)",
              }}
            >
              Записаться на сеанс
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="px-10 py-4 font-montserrat text-xs tracking-[0.3em] uppercase text-gold-light border border-gold-DEFAULT/40 hover:bg-gold-DEFAULT/10 transition-all duration-300"
            >
              Услуги и цены
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-DEFAULT/40 animate-float"
          style={{ animationDuration: "3s" }}
        >
          <Icon name="ChevronDown" size={28} />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-7xl animate-spin-slow" style={{ color: "rgba(102,51,153,0.18)" }}>✦</div>
          <div className="absolute bottom-32 right-16 text-5xl animate-spin-slow" style={{ animationDirection: "reverse", color: "rgba(255,204,51,0.1)" }}>◈</div>
          <div className="absolute top-1/3 right-8 text-3xl animate-float" style={{ color: "rgba(102,51,153,0.12)" }}>⟡</div>
          <div className="absolute bottom-20 left-20 text-2xl animate-float" style={{ animationDelay: "2s", color: "rgba(255,204,51,0.08)" }}>✧</div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={setRef("services")} className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-800 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-[0.4em] uppercase mb-4">Что я предлагаю</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light">Услуги и расклады</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`group relative border p-8 transition-all duration-500 cursor-pointer ${
                  service.highlight
                    ? "border-gold-DEFAULT/60"
                    : "border-gold-DEFAULT/20 hover:border-gold-DEFAULT/50"
                } ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: service.highlight
                    ? "linear-gradient(135deg, rgba(102,51,153,0.35), rgba(22,11,36,0.95))"
                    : "linear-gradient(135deg, rgba(34,16,56,0.8), rgba(22,11,36,0.9))",
                  boxShadow: service.highlight ? "0 0 40px rgba(102,51,153,0.3)" : undefined,
                }}
              >
                {service.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 font-montserrat text-[10px] tracking-widest uppercase text-mystic-dark font-semibold"
                    style={{ background: "linear-gradient(90deg, #FFCC33, #FFE066)" }}>
                    Популярно
                  </div>
                )}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,204,51,0.06) 0%, transparent 70%)" }}
                />
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-cormorant text-2xl font-light text-white mb-3">{service.title}</h3>
                <p className="font-montserrat text-white/50 text-sm leading-relaxed mb-6">{service.desc}</p>
                <div style={{ borderTop: "1px solid rgba(255,204,51,0.2)", paddingTop: "1rem" }} className="flex items-baseline gap-3 flex-wrap">
                  {service.oldPrice && (
                    <span className="font-montserrat text-sm text-white/30 line-through">{service.oldPrice}</span>
                  )}
                  <span
                    className="font-cormorant text-2xl font-semibold"
                    style={{ color: service.highlight ? "#FFCC33" : "#FFE066" }}
                  >
                    {service.price}
                  </span>
                </div>
                {"free" in service && service.free ? (
                  <button
                    onClick={() => setShowFreeReading(true)}
                    className="mt-4 w-full py-2 font-montserrat text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #FFE066, #FFCC33)", color: "#0d0515" }}
                  >
                    Вытянуть карту →
                  </button>
                ) : (
                  <button
                    onClick={() => { setForm(f => ({ ...f, message: `Хочу заказать: ${service.title}` })); scrollTo("contacts"); }}
                    className="mt-4 w-full py-2 font-montserrat text-xs tracking-widest uppercase border border-gold-DEFAULT/30 text-gold-light hover:bg-gold-DEFAULT/10 transition-all duration-300"
                  >
                    Заказать
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="reviews"
        ref={setRef("reviews")}
        className="py-14 px-6"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(17,14,30,0.6), transparent)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-800 ${visible.reviews ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-[0.4em] uppercase mb-4">Голоса клиентов</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-4">Отзывы и результаты</h2>
            <div className="inline-flex items-center gap-2 border border-gold-DEFAULT/30 bg-mystic-mid/40 px-5 py-2 rounded-sm">
              <Icon name="Lock" size={13} className="text-gold-DEFAULT" />
              <p className="font-montserrat text-xs text-white/60 tracking-widest">Все отзывы публикуются анонимно — имена не раскрываются</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className={`border border-gold-DEFAULT/20 p-8 transition-all duration-700 ${
                  visible.reviews ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${i * 120}ms`,
                  background: "rgba(17,14,30,0.7)",
                }}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <span key={j} className="text-gold-DEFAULT text-sm">★</span>
                  ))}
                </div>
                <p className="font-cormorant text-xl text-white/80 italic leading-relaxed mb-6">
                  «{review.text}»
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-gold-DEFAULT/40" />
                  <div>
                    <p className="font-montserrat text-sm text-gold-light font-medium">{review.label}</p>
                    <p className="font-montserrat text-xs text-white/40 flex items-center gap-1">
                      <Icon name="Lock" size={10} /> анонимно
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" ref={setRef("contacts")} className="py-14 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className={`transition-all duration-800 ${visible.contacts ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-[0.4em] uppercase mb-4">Начните путь</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-6">Связаться со мной</h2>
            <p className="font-cormorant italic text-white/50 text-xl mb-8">
              Напишите — и мы найдём время для вашей консультации
            </p>

            {sent ? (
              <div className="border border-gold-DEFAULT/40 p-10 mb-12 text-center" style={{ background: "rgba(102,51,153,0.15)" }}>
                <div className="text-4xl mb-4">✦</div>
                <p className="font-cormorant text-2xl text-gold-DEFAULT mb-2">Сообщение отправлено!</p>
                <p className="font-montserrat text-white/50 text-sm">Я свяжусь с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mb-12">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-mystic-mid/60 border border-gold-DEFAULT/30 px-6 py-4 font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-DEFAULT/60 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Телефон или Telegram"
                  required
                  value={form.contact}
                  onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                  className="w-full bg-mystic-mid/60 border border-gold-DEFAULT/30 px-6 py-4 font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-DEFAULT/60 transition-colors"
                />
                <textarea
                  rows={4}
                  placeholder="Ваш вопрос или пожелание..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-mystic-mid/60 border border-gold-DEFAULT/30 px-6 py-4 font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-DEFAULT/60 transition-colors resize-none"
                />
                {error && <p className="font-montserrat text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-5 font-montserrat text-xs tracking-[0.3em] uppercase text-mystic-dark font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #FFE066, #FFCC33)",
                    boxShadow: "0 0 40px rgba(255,204,51,0.3)",
                  }}
                >
                  {sending ? "Отправляю..." : "Отправить сообщение"}
                </button>
              </form>
            )}

            <GoldDivider />

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {[
                { icon: "Send", label: "Telegram", value: "@keyarcana", href: "https://t.me/keyarcana" },
                { icon: "Users", label: "ВКонтакте", value: "KeyArcana", href: "https://vk.com/club237877156" },
              ].map((contact) => (
                <a key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-left group cursor-pointer">
                  <div className="w-10 h-10 border border-gold-DEFAULT/30 flex items-center justify-center group-hover:border-gold-DEFAULT/60 transition-colors">
                    <Icon name={contact.icon} size={16} className="text-gold-DEFAULT" />
                  </div>
                  <div>
                    <p className="font-montserrat text-xs text-white/40">{contact.label}</p>
                    <p className="font-montserrat text-sm text-gold-light group-hover:text-gold-DEFAULT transition-colors">{contact.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-gold-DEFAULT/10 text-center">
        <p className="font-cormorant text-gold-DEFAULT/40 text-lg mb-2">✦ KeyArcana ✦</p>
        <p className="font-montserrat text-white/20 text-xs">© 2024 KeyArcana. Все права защищены.</p>
      </footer>

      {showCert && <CertificateModal onClose={() => setShowCert(false)} />}
      {showFreeReading && <FreeReadingModal onClose={() => setShowFreeReading(false)} />}
    </div>
  );
};

export default Index;