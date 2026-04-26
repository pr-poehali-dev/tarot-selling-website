import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const MASTER_IMAGE = "https://cdn.poehali.dev/projects/d2134a9f-99c7-4d73-9478-04ddbbfbc3cc/files/dfd86eb3-1064-4f59-b220-ea619dc847a5.jpg";

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

const SERVICES = [
  { icon: "✦", title: "Расклад на год", desc: "Полная карта вашего года — события, возможности и испытания по каждому месяцу", price: "от 3 500 ₽" },
  { icon: "◈", title: "Расклад на отношения", desc: "Глубинный анализ пары, совместимость, скрытые динамики и перспективы", price: "от 2 500 ₽" },
  { icon: "⟡", title: "Расклад на ситуацию", desc: "Ответ на конкретный вопрос — работа, деньги, решения, выборы пути", price: "от 1 500 ₽" },
  { icon: "◉", title: "Астрологическая карта", desc: "Натальная карта с интерпретацией и прогнозом на текущий период", price: "от 5 000 ₽" },
  { icon: "✧", title: "Программа судьбы", desc: "Нумерологический анализ личности, миссии, кармических задач", price: "от 4 000 ₽" },
  { icon: "⬡", title: "Коучинг-сессия", desc: "Разбор жизненной ситуации с инструментами таро и психологии", price: "от 3 000 ₽" },
  { icon: "🎴", title: "Бесплатный расклад", desc: "Один вопрос — одна карта. Краткий ответ на то, что волнует прямо сейчас. Без регистрации, анонимно.", price: "Бесплатно" },
  { icon: "🌙", title: "Расклад на месяц", desc: "Энергетический прогноз на ближайшие 30 дней — события, настроение, ключевые моменты", price: "от 1 200 ₽" },
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
];

function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {STARS.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-gold-light"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.6,
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
          style={{ boxShadow: "0 0 60px rgba(201,168,76,0.3), 0 0 120px rgba(201,168,76,0.1)" }}
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
  const [activeNav, setActiveNav] = useState("hero");
  const [visible, setVisible] = useState<Record<string, boolean>>({});
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

  return (
    <div className="min-h-screen bg-mystic-dark text-white font-montserrat overflow-x-hidden">
      <StarField />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(10,6,18,0.95) 0%, transparent 100%)" }}>
        <div className="font-cormorant text-gold-DEFAULT text-2xl tracking-widest cursor-pointer" onClick={() => scrollTo("hero")}>
          ✦ KeyArcana
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: "hero", label: "Главная" },
            { id: "about", label: "О мастере" },
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
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(90,50,150,0.25) 0%, rgba(10,6,18,0) 70%)",
        }}
      >
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
                background: "linear-gradient(135deg, #f0d080, #c9a84c)",
                boxShadow: "0 0 30px rgba(201,168,76,0.4)",
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
          <div className="absolute top-20 left-10 text-6xl text-gold-DEFAULT/5 animate-spin-slow">✦</div>
          <div className="absolute bottom-32 right-16 text-4xl text-gold-DEFAULT/8 animate-spin-slow" style={{ animationDirection: "reverse" }}>◈</div>
          <div className="absolute top-1/3 right-8 text-2xl text-gold-DEFAULT/6 animate-float">⟡</div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={setRef("about")}
        className="relative py-28 px-6"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(17,14,30,0.8), transparent)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visible.about ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            >
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-sm opacity-40"
                  style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.3), transparent)" }}
                />
                <img
                  src={MASTER_IMAGE}
                  alt="Мастер таро"
                  className="relative w-full aspect-[3/4] object-cover rounded-sm"
                  style={{ boxShadow: "0 0 60px rgba(201,168,76,0.2)" }}
                />
                <div
                  className="absolute bottom-6 right-6 bg-mystic-deep/90 border border-gold-DEFAULT/40 px-5 py-3 cursor-pointer hover:bg-gold-DEFAULT/10 transition-all"
                  onClick={() => setShowCert(true)}
                >
                  <p className="font-montserrat text-xs text-gold-DEFAULT/70 tracking-widest uppercase mb-1">Сертификат</p>
                  <p className="font-cormorant text-gold-light text-lg">Посмотреть →</p>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ${visible.about ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            >
              <p className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-[0.4em] uppercase mb-4">О мастере</p>
              <h2 className="font-cormorant text-5xl font-light text-white mb-2">Елена</h2>
              <p className="font-cormorant italic text-gold-DEFAULT text-2xl mb-6">Светлова</p>

              <div className="space-y-5 text-white/65 leading-relaxed font-cormorant text-xl">
                <p>
                  Более <span className="text-gold-light font-medium">12 лет</span> я практикую таро и астрологию,
                  помогая людям найти ясность в самые сложные моменты жизни.
                </p>
                <p>
                  Мой путь начался с личного поиска ответов. Сегодня я сертифицированный мастер таро,
                  нумеролог и астролог с международным дипломом.
                </p>
                <p>
                  За годы практики я провела более <span className="text-gold-light font-medium">2 000 консультаций</span> для
                  клиентов из 15 стран мира.
                </p>
              </div>

              <GoldDivider />

              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: "12+", label: "лет практики" },
                  { num: "2000+", label: "консультаций" },
                  { num: "15", label: "стран мира" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-cormorant text-3xl text-gold-DEFAULT font-light">{stat.num}</p>
                    <p className="font-montserrat text-white/40 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={setRef("services")} className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-800 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-[0.4em] uppercase mb-4">Что я предлагаю</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light">Услуги и расклады</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`group relative border border-gold-DEFAULT/20 p-8 hover:border-gold-DEFAULT/50 transition-all duration-500 cursor-pointer ${
                  visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: "linear-gradient(135deg, rgba(26,21,48,0.8), rgba(17,14,30,0.9))",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
                />
                <div className="text-3xl text-gold-DEFAULT mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-cormorant text-2xl font-light text-white mb-3">{service.title}</h3>
                <p className="font-montserrat text-white/50 text-sm leading-relaxed mb-6">{service.desc}</p>
                <p
                  className="font-cormorant text-xl text-gold-DEFAULT"
                  style={{ borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: "1rem" }}
                >
                  {service.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="reviews"
        ref={setRef("reviews")}
        className="py-28 px-6"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(17,14,30,0.6), transparent)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-800 ${visible.reviews ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-[0.4em] uppercase mb-4">Голоса клиентов</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-6">Отзывы и результаты</h2>
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
      <section id="contacts" ref={setRef("contacts")} className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className={`transition-all duration-800 ${visible.contacts ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-montserrat text-gold-DEFAULT/70 text-xs tracking-[0.4em] uppercase mb-4">Начните путь</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-6">Связаться со мной</h2>
            <p className="font-cormorant italic text-white/50 text-xl mb-12">
              Напишите — и мы найдём время для вашей консультации
            </p>

            <div className="space-y-4 mb-12">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full bg-mystic-mid/60 border border-gold-DEFAULT/30 px-6 py-4 font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-DEFAULT/60 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон или Telegram"
                className="w-full bg-mystic-mid/60 border border-gold-DEFAULT/30 px-6 py-4 font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-DEFAULT/60 transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Ваш вопрос или пожелание..."
                className="w-full bg-mystic-mid/60 border border-gold-DEFAULT/30 px-6 py-4 font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-DEFAULT/60 transition-colors resize-none"
              />
              <button
                className="w-full py-5 font-montserrat text-xs tracking-[0.3em] uppercase text-mystic-dark font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #f0d080, #c9a84c)",
                  boxShadow: "0 0 40px rgba(201,168,76,0.3)",
                }}
              >
                Отправить сообщение
              </button>
            </div>

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
    </div>
  );
};

export default Index;