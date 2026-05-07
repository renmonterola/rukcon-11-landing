// RUKCON 11 — Top-level: Nav + Hero + Section 1
const { useState, useEffect, useRef } = React;

// ----------------- NAV -----------------
function Nav() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
  { id: "home", label: "Home" },
  { id: "pillars", label: "Pillars" },
  { id: "speakers", label: "Speakers" },
  { id: "tickets", label: "Tickets" },
  { id: "faq", label: "FAQ" }];


  useEffect(() => {
    const onScroll = () => {
      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(links[i].id);
          return;
        }
      }
      setActive("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on Escape and lock scroll while open
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={"nav-shell" + (menuOpen ? " menu-open" : "")}>
      <nav className="nav-pill">
        <img src="assets/logo-rukcon11-allin.png" alt="RUKCON 11 — All In" className="nav-logo" />
        <ul className="nav-links">
          {links.map((l) =>
          <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? "active" : ""}>{l.label}</a>
            </li>
          )}
        </ul>
        <div className="nav-icons">
          <button className="nav-icon-btn" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
          </button>
          <button className="nav-icon-btn" aria-label="Account">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>
          </button>
        </div>
        <a href="#tickets" className="nav-cta">Reserve Seat</a>
        <button
          className="nav-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-drawer"
          onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className="nav-drawer-backdrop" onClick={closeMenu} aria-hidden="true" />
      <div id="nav-drawer" className="nav-drawer" role="menu">
        <ul className="nav-drawer__links">
          {links.map((l) =>
          <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={active === l.id ? "active" : ""}
                onClick={closeMenu}>
                {l.label}
              </a>
            </li>
          )}
        </ul>
        <div className="nav-drawer__actions">
          <button className="nav-drawer__search" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
            <span>Search</span>
          </button>
          <a href="#tickets" className="nav-drawer__cta" onClick={closeMenu}>Reserve Seat</a>
        </div>
      </div>
    </div>);

}

// ----------------- COUNTDOWN -----------------
function useCountdown(targetIso) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetIso).getTime() - Date.now();
      if (diff <= 0) {setT({ d: 0, h: 0, m: 0, s: 0 });return;}
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff % 86400000 / 3600000);
      const m = Math.floor(diff % 3600000 / 60000);
      const s = Math.floor(diff % 60000 / 1000);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return t;
}

function CountdownBlock({ target }) {
  const t = useCountdown(target);
  const cells = [
  { num: t.d, lbl: "Days" },
  { num: t.h, lbl: "Hours" },
  { num: t.m, lbl: "Minutes" },
  { num: t.s, lbl: "Seconds" }];

  return (
    <div className="countdown">
      {cells.map((c, i) =>
      <div key={i} className="countdown__cell">
          <div className="countdown__num">{String(c.num).padStart(2, "0")}</div>
          <span className="countdown__lbl">{c.lbl}</span>
        </div>
      )}
    </div>);

}

// ----------------- HERO -----------------
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg" />
      <div className="hero__scrim" />
      <div className="hero__inner">
        <div className="hero__top reveal">
          <div className="hero__eyebrow">
            <span className="dot" />
            RUKCON 11 · Sept 16–18, 2026 · Dallas, TX
          </div>
          <h1 className="hero__h1">
            The weekend<br />
            <span className="light">Christian leaders go</span>
            {" "}
            <span className="hero__brushword">All&nbsp;In.</span>
            <br />
            <span className="light" style={{ fontSize: "0.55em", display: "inline-block", marginTop: "16px" }}>…and bring their people with them.</span>
          </h1>
          <p className="hero__sub">
            Three days. Keynotes on Faith, Family, Fitness, and Finance. The Freedom event for your wife running alongside. The brotherhood you've been trying to describe to your friends for months — now in a room they can walk into.
          </p>
          <div className="hero__ctas">
            <a href="#tickets" className="btn btn--gold btn--lg">
              Reserve Your Seat
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <div className="hero__secondary">
              <span className="hero__secondary-lbl">Bring</span>
              <a href="#freedom" className="hero__secondary-link">Your Wife</a>
              <span className="hero__secondary-sep">·</span>
              <a href="#freedom" className="hero__secondary-link">Your Teen</a>
              <span className="hero__secondary-sep">·</span>
              <a href="#freedom" className="hero__secondary-link">Your Friend</a>
            </div>
          </div>
        </div>
        <div className="hero__bottom reveal">
          <CountdownBlock target="2026-09-16T08:00:00-05:00" />
          <div className="proof-strip">
            <div className="proof-strip__item">
              <span className="proof-strip__num">10+</span>
              <span className="proof-strip__lbl">RUKCONs Run</span>
            </div>
            <div className="proof-strip__item">
              <span className="proof-strip__num">43+</span>
              <span className="proof-strip__lbl">States Represented</span>
            </div>
            <div className="proof-strip__item">
              <span className="proof-strip__num">#1</span>
              <span className="proof-strip__lbl">Largest Faith-Based Personal Development Organization in America</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 1: All In Again -----------------
function S1AllInAgain() {
  return (
    <section id="all-in-again" className="block s1">
      <div className="block__inner s1__grid">
        <div className="s1__copy reveal">
          <h2 className="block__h2">
            You went <span className="accent">All In</span> once.<br />
            <span className="light">It's time to go All In again.</span>
          </h2>
          <p className="block__lede">
            If you're a RUK man, you already know what All In feels like. You walked into the Refinery, the Awakening, the Crucible or Covenant — and you walked out different. Your wife noticed. Your team noticed. The guys in your life have been asking what changed ever since.
          </p>
          <p className="block__lede" style={{ marginTop: 16 }}>
            RUKCON 11 is where you do it again. Except this time, you don't go alone.
          </p>
          <div className="s1__quote-stack">
            <blockquote className="s1__quote">
              You bring the business partner you've been trying to get into the Refinery for eight months. You bring the brother-in-law who keeps asking what happened. You bring your wife into the Freedom event that runs alongside.
            </blockquote>
            <blockquote className="s1__quote">
              You stop being the only one in your circle who's done the work.
              <span>This is where seeing becomes believing.</span>
            </blockquote>
          </div>
        </div>
        <div className="s1__photo reveal">
          <img src="assets/s1-brotherhood.jpg" alt="Rise Up Kings brotherhood — hands raised in worship" />
          <div className="s1__caption">Three days. One decision. All In.</div>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 2: Who it's for / not for -----------------
function S2WhoFor() {
  const forList = [
  "You've been through the Refinery, Awakening, Covenant, or Revival, and you want to deepen what started",
  "You're a RUK man who wants to bring your wife into the weekend with you",
  "You're a RUQ woman who's ready for the next chapter of what Freedom opened up",
  "You've heard about Rise Up Kings from someone who changed, and you're ready to see it for yourself",
  "You're a Christian man or woman who wants a weekend that rebuilds Faith, Family, Fitness, and Finance at the same time"];

  const notList = [
  "You're looking for a conference to get hyped up at and forget by Wednesday",
  "You think your faith and your life should stay in separate rooms",
  "You're not willing to sit in a room with men and women who've done the work and will tell you the truth",
  "You've decided this is just how life is going to feel from here on out"];

  return (
    <section id="who-for" className="block s2">
      <div className="block__inner">
        <div className="s2__head reveal">
          <div className="eyebrow-rule">Who · It's For</div>
          <h2 className="block__h2">
            The men and women<br />
            this weekend is <span className="accent">for</span>.
          </h2>
          <p className="block__lede">
            Two lists. Read both. The clearer you are about which side of the room you're sitting on, the more this weekend will give you.
          </p>
        </div>
        <div className="s2__grid">
          <div className="s2-card s2-card--for reveal">
            <div className="s2-card__mark" aria-hidden="true">01</div>
            <h3 className="s2-card__title">This is for you if…</h3>
            <ul className="s2-list s2-list--for">
              {forList.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <div className="s2-card s2-card--not reveal">
            <div className="s2-card__mark" aria-hidden="true">02</div>
            <h3 className="s2-card__title">It's not for you if…</h3>
            <ul className="s2-list s2-list--not">
              {notList.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 3: Four Pillars -----------------
function S3Pillars() {
  const pillars = [
  {
    num: "01",
    title: "Faith",
    img: "assets/pillar-faith.jpeg",
    body: "This is a collective of successful men and women who want to keep God at the center of their lives. You'll grow closer in your relationship with God, get more disciplined in your walk, and sharpen spiritually with other Christians doing the same."
  },
  {
    num: "02",
    title: "Family",
    img: "assets/pillar-family.jpeg",
    body: "Improve the connection and intimacy in your marriage. Become the father or mother you were designed to be. Break down the walls that keep you from being truly present with the people in your house."
  },
  {
    num: "03",
    title: "Fitness",
    img: "assets/pillar-fitness.jpeg",
    body: "The path to success has cost too many men and women their health. RUKCON 11 is where that pattern gets broken. You'll be around people who push themselves physically, and you'll stop treating your body like it doesn't matter."
  },
  {
    num: "04",
    title: "Finances",
    img: "assets/pillar-finance.jpeg",
    body: "Big financial goals require real skill. You'll learn the mindsets the wealthy operate from, the most effective ways to scale a business, and where the market is actually heading… from Skylar Lewis and a roster of speakers who've done it."
  }];

  return (
    <section id="pillars" className="block s3">
      <div className="block__inner">
        <div className="s3__head reveal">
          <div className="eyebrow-rule">The Four Pillars</div>
          <h2 className="block__h2">
            Faith. Family.<br />
            Fitness. <span className="accent">Finance.</span>
          </h2>
          <p className="block__lede">
            Most faith-driven leaders optimise one pillar and let the other three burn. RUKCON 11 is three days of rebuilding all four at once, in a room of men and women doing the same.
          </p>
        </div>

        <div className="s3__grid">
          {pillars.map((p, i) =>
          <article key={p.num} className="pillar reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="pillar__media" aria-hidden="true">
                <img src={p.img} alt="" />
              </div>
              <div className="pillar__num">{p.num}</div>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__body">{p.body}</p>
            </article>
          )}
        </div>

        <div className="s3__rule reveal">
          <span>Four pillars. One weekend. No shortcuts.</span>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 4: Three Days -----------------
function S4ThreeDays() {
  const days = [
  {
    tag: "Day One",
    date: "Wednesday",
    flag: "Optional",
    headline: "The day the work starts for the people who want to go deeper.",
    lede: "Day One is optional, and it's built for the people who want to use the weekend to its full depth.",
    items: [
    {
      time: "7:00 AM",
      title: "RUK Fitness Standard",
      desc: "The morning assessment at North Dallas CrossFit. Transportation provided from the host hotel."
    },
    {
      time: "8:00 AM – 5:00 PM",
      title: <span style={{ color: '#f7009f' }}>Freedom</span>,
      desc: "The RUQ intro event for women. Your wife walks through her own version of the 4 Pillars work. (Registration separate.)"
    },
    {
      time: "1:00 PM – 6:00 PM",
      title: "Business Peer Forum",
      desc: "Exclusive to Refinery, Awakening Gold, Crucible Gold, and Revival Gold Mastermind members."
    }]

  },
  {
    tag: "Day Two",
    date: "Thursday",
    headline: "The main room opens.",
    items: [
    { time: "7:00 AM", title: "Registration", desc: "Coffee in the main hall." },
    {
      time: "8:00 AM – 5:00 PM",
      title: "RUKCON 11 General Session",
      desc: "Keynote speakers on Faith, Family, Fitness, and Finance. Deep-dive teaching on systemising a business. Deep-dive on intimacy and marriage."
    }]

  },
  {
    tag: "Day Three",
    date: "Friday",
    headline: "You leave different than you walked in.",
    items: [
    { time: "5:30 – 6:30 AM", title: "RUK Fitness Workout", desc: "" },
    { time: "7:30 AM", title: "Registration", desc: "Coffee in the main hall." },
    {
      time: "8:00 AM – 5:00 PM",
      title: "RUKCON 11 General Session",
      desc: "Continued deep-dive teaching. Networking. The integration of the weekend."
    },
    {
      time: "6:30 PM",
      title: "Gala Dinner",
      desc: "Cocktail attire. Rankings, recognitions, and celebration of the community. Included in your ticket."
    }]

  }];


  return (
    <section id="three-days" className="block s4">
      <div className="block__inner">
        <div className="s4__head reveal">
          <div className="eyebrow-rule">The Sequence</div>
          <h2 className="block__h2">
            What actually happens<br />
            across <span className="accent">three days</span>.
          </h2>
          <p className="block__lede">
            Most conferences hand you a vague schedule. RUKCON 11 is built as a sequence — every session, every experience, placed where it is for a reason.
          </p>
        </div>

        <div className="s4__days">
          {days.map((d, i) =>
          <article key={i} className="day reveal">
              <header className="day__header">
                <div className="day__tag">
                  <span className="day__name">{d.tag}</span>
                  <span className="day__date">{d.date}</span>
                  {d.flag && <span className="day__flag">{d.flag}</span>}
                </div>
                <h3 className="day__headline">{d.headline}</h3>
                {d.lede && <p className="day__lede">{d.lede}</p>}
              </header>

              <ol className="day__list">
                {d.items.map((it, j) =>
              <li key={j} className="day__item">
                    <div className="day__time">{it.time}</div>
                    <div className="day__body">
                      <div className="day__title">{it.title}</div>
                      {it.desc && <div className="day__desc">{it.desc}</div>}
                    </div>
                  </li>
              )}
              </ol>
            </article>
          )}
        </div>

        <div className="s4__fineprint reveal">
          <p>
            All times listed in Central Daylight Time.&nbsp;&nbsp;·&nbsp;&nbsp;
            Dress code for sessions: black shirt, black shorts, athletic shoes.&nbsp;&nbsp;·&nbsp;&nbsp;
            Breakfast not provided.
          </p>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 5: Freedom (women's track) -----------------
function S5Freedom() {
  return (
    <section id="freedom" className="block s5 s5--ruq">
      <div className="block__inner s5__grid">
        <div className="s5__copy reveal">
          <div className="eyebrow-rule">For Her · Freedom · Day One</div>

          <h2 className="block__h2">
            Your wife has her own <span className="accent">seat</span> this weekend.
          </h2>

          <p className="block__lede">
            The Freedom event runs parallel to RUKCON 11 on Day One. This is the RUQ intro event, designed by Jessica Lewis, founded for the women who are done watching their husbands change from the sidelines.
          </p>

          <ul className="s5__pillars">
            <li>
              <span className="s5__num">01</span>
              Freedom is where a woman grounds her identity in who God says she is.
            </li>
            <li>
              <span className="s5__num">02</span>
              Where she reconnects intimately with her husband.
            </li>
            <li>
              <span className="s5__num">03</span>
              Where she steps into the passion and peace she was designed for.
            </li>
          </ul>

          <div className="s5__doors">
            <div className="s5__door">
              <div className="s5__door-tag">For the wife whose husband went through RUK</div>
              <p><strong>This is your door in. The conversation he's been having for years finally has a seat with your name on it.</strong></p>
            </div>
            <div className="s5__door s5__door--teal">
              <div className="s5__door-tag">For the wife walking in with her husband</div>
              <p><strong>Day One is yours. Day Two and Three you sit side-by-side in the main room.</strong></p>
            </div>
          </div>

          <div className="s5__cta">
            <a href="https://go.riseupqueens.com/3dayevent" target="_blank" rel="noopener noreferrer" className="s5__btn">
              Learn More &amp; Register For Freedom <span aria-hidden="true">→</span>
            </a>
            <span className="s5__cta-note">Registration is separate from RUKCON 11.</span>
          </div>
        </div>

        <div className="s5__photo reveal">
          <img src="assets/jessica-lewis.png" alt="Jessica Lewis, Founder of RUQ" />
          <div className="s5__photo-overlay">
            <div className="s5__photo-meta">By Jessica Lewis<br />Founder, RUQ</div>
          </div>
        </div>
      </div>
    </section>);
}

// ----------------- SECTION 6: Speakers -----------------
function S6Speakers() {
  const past = [
  { name: "Coach Kav", img: "assets/coach-kav.jpeg" },
  { name: "Brant Hansen", img: "assets/speaker-brant-hansen.jpeg" },
  { name: "Nate Burkhalter", img: "assets/speaker-nate-burkhalter.jpeg" },
  { name: "Sean & Lanette Reed", img: "assets/speaker-sean-lanette-reed.jpeg" },
  { name: "Marty B", img: "assets/speaker-marty-b.jpeg" },
  { name: "Damon West", img: "assets/speaker-damon-west.jpeg" },
  { name: "Ruslan KD", img: "assets/speaker-ruslan-kd.jpeg" },
  { name: "Sean Lowe", img: "assets/speaker-sean-lowe.jpeg" }];


  return (
    <section id="speakers" className="block s6">
      <div className="block__inner">
        <div className="s6__head reveal">
          <div className="eyebrow-rule">Faculty · 2026</div>
          <h2 className="block__h2">
            Who you'll <span className="accent">hear from</span>.
          </h2>
          <p className="block__lede">
            The 2026 RUKCON 11 lineup is being finalized. The names below are speakers from past RUKCONs — the bar we hold the next room to.
          </p>
        </div>

        {/* TBD placeholder card */}
        <div className="s6__tbd reveal">
          <div className="s6__tbd-mark">
            <span>TBD</span>
          </div>
          <div className="s6__tbd-body">
            <div className="s6__tbd-tag">2026 Lineup</div>
            <h3 className="s6__tbd-title">Full lineup announced soon.</h3>
            <p className="s6__tbd-lede">
              We're locking the final faculty for RUKCON 11. Reserve your seat now — when the names drop, the price moves.
            </p>
          </div>
        </div>

        {/* Past speakers grid */}
        <div className="s6__past reveal">
          <div className="s6__past-label">
            <span className="s6__past-rule" />
            <span className="s6__past-text">Past RUKCON Featured Speakers</span>
            <span className="s6__past-rule" />
          </div>
          <ul className="s6__past-list">
            {past.map((p, i) =>
            <li key={i} className="s6__past-item">
                <div className="s6__past-portrait" aria-hidden="true">
                  {p.img
                    ? <img src={p.img} alt="" />
                    : <span>{p.name.split(/[\s&]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("")}</span>}
                </div>
                <div className="s6__past-name">{p.name}</div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 7: After You Head Home (Outcomes) -----------------
function S7Outcomes() {
  const outcomes = [
  {
    num: "01",
    title: "A Faith That's Alive Again",
    body: "Not a Sunday performance. A daily anchor that holds when life gets heavy."
  },
  {
    num: "02",
    title: "A Marriage Your Spouse Recognises",
    body: "The wall that's been in your house comes down. The version of you they married walks back through the door."
  },
  {
    num: "03",
    title: "A Business Built to Scale",
    body: "Direct teaching from Skylar Lewis, whose 2 Day CEO framework took Superior Restoration to $13M. Keys to scaling. Systems. Leadership. Team-building that actually works."
  },
  {
    num: "04",
    title: "A Body That Backs You Up",
    body: "The fitness sessions are optional, and they're the moment most attendees point to as the one they didn't know they needed."
  },
  {
    num: "05",
    title: "A Brotherhood & Sisterhood That Lasts",
    body: "The people in the room with you this weekend become the people in your corner for life. That's how RUK works. That's why it holds."
  }];


  return (
    <section id="outcomes" className="block s7">
      <div className="block__inner">
        <div className="s7__head reveal">
          <div className="eyebrow-rule">After the Weekend</div>
          <h2 className="block__h2">
            What happens<br />
            after you <span className="accent">head home</span>.
          </h2>
        </div>

        <ol className="s7__list">
          {outcomes.map((o, i) =>
          <li key={o.num} className="s7__item reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="s7__num">{o.num}</div>
              <div className="s7__body">
                <h3 className="s7__title">{o.title}</h3>
                <p className="s7__text">{o.body}</p>
              </div>
              <div className="s7__chev" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>);

}

// ----------------- SECTION 8: Testimonials -----------------
function S8Testimonials() {
  const featured = [
  {
    quote: "I went from $1M to $31M in sales over the last 3 years because of Rise Up Kings.",
    name: "Jared Hellum",
    role: "CEO, Constructable",
    initials: "JH",
    tag: "Refinery · Operator"
  },
  {
    quote: "I truly got my husband back.",
    name: "Jocelyn Monteverde",
    role: "with Matt Monteverde",
    initials: "JM",
    tag: "Freedom · Marriage"
  },
  {
    quote: "In the midst of chaos and a marriage on the rocks, my wife and I experienced a transformation that mended our bonds.",
    name: "BJ Tijerina",
    role: "with Christy Tijerina",
    initials: "BT",
    tag: "RUKCON · Marriage"
  },
  {
    quote: "Our 11-year marriage felt renewed.",
    name: "Allison Meskimen",
    role: "Flipur Remodels",
    initials: "AM",
    tag: "Freedom · Marriage"
  },
  {
    quote: "I've been missing a brotherhood of successful Christian men.",
    name: "Dr. Monty Montgomery",
    role: "North Texas Integrated Healthcare",
    initials: "MM",
    tag: "Awakening · Brotherhood"
  },
  {
    quote: "I came here to get close to God. My faith came alive.",
    name: "Ted Williams",
    role: "Rockport Oil & Gas",
    initials: "TW",
    tag: "Crucible · Faith"
  }];

  const others = [
  { name: "Matt Monteverde", context: "Refinery · Operator", initials: "MM" },
  { name: "Christy Tijerina", context: "Freedom Alumni", initials: "CT" },
  { name: "Thomas & Molly Rhodes", context: "RUKCON Alumni", initials: "TR" },
  { name: "Mondoe Davis", context: "Refinery · Operator", initials: "MD" }];


  return (
    <section id="testimonials" className="block s8">
      <div className="block__inner">
        <div className="s8__head reveal">
          <div className="eyebrow-rule">From the Room</div>
          <h2 className="block__h2">
            Don't take<br />
            <span className="light">our word</span> <span className="accent">for it.</span>
          </h2>
          <p className="block__lede">
            Real men, real wives, real businesses. Below are voices from past RUKCONs and the work that came before — Refinery, Awakening, Freedom, Crucible, Revival.
          </p>
        </div>

        {/* Featured quotes — large, side by side */}
        <div className="s8__featured">
          {featured.map((t, i) =>
          <figure key={i} className="t-card t-card--featured reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="t-card__mark" aria-hidden="true">"</div>
              <blockquote className="t-card__quote">{t.quote}</blockquote>
              <figcaption className="t-card__caption">
                <div className="t-card__avatar" aria-hidden="true">
                  <span>{t.initials}</span>
                </div>
                <div className="t-card__who">
                  <div className="t-card__name">{t.name}</div>
                  <div className="t-card__role">{t.role}</div>
                </div>
                <div className="t-card__tag">{t.tag}</div>
              </figcaption>
            </figure>
          )}
        </div>

        {/* Other voices grid */}
        <div className="s8__others reveal">
          <div className="s8__others-label">
            <span className="s8__others-rule" />
            <span className="s8__others-text">More voices from past RUKCONs</span>
            <span className="s8__others-rule" />
          </div>
          <ul className="s8__others-list">
            {others.map((o, i) =>
            <li key={i} className="t-tile">
                <div className="t-tile__media" aria-hidden="true">
                  <span className="t-tile__initials">{o.initials}</span>
                  <span className="t-tile__play" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </span>
                </div>
                <div className="t-tile__name">{o.name}</div>
                <div className="t-tile__context">{o.context}</div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 9: A Word From Skylar -----------------
function S9SkylarLetter() {
  return (
    <section id="from-skylar" className="block s9">
      <div className="block__inner s9__grid">
        {/* Left: portrait + signature */}
        <aside className="s9__portrait reveal">
          <div className="s9__photo">
            <img
              src="assets/skylar-lewis.jpg"
              alt="Skylar Lewis, founder of Rise Up Kings" />
            
            <div className="s9__photo-overlay">
              <div className="s9__photo-tag">Founder</div>
            </div>
          </div>
          <div className="s9__id">
            <div className="s9__id-name">Skylar Lewis</div>
            <div className="s9__id-role">Founder, Rise Up Kings</div>
          </div>
          <div className="s9__signature" aria-hidden="true">
            <svg viewBox="0 0 280 80" preserveAspectRatio="xMinYMid meet">
              <path
                d="M8 56 C 28 18, 52 18, 60 48 C 64 64, 78 60, 90 40 C 102 20, 118 22, 120 42 C 122 60, 138 58, 150 38 C 162 18, 178 24, 178 44 C 178 60, 196 60, 210 38 C 222 20, 240 24, 252 44 L 268 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
              
            </svg>
          </div>
        </aside>

        {/* Right: letter */}
        <div className="s9__letter reveal">
          <div className="eyebrow-rule">A Personal Note</div>
          <h2 className="block__h2">
            A word from me, <span className="accent">personally.</span>
          </h2>

          <div className="s9__body">
            <p className="s9__lede">
              My name is <strong>Skylar Lewis</strong>. I'm the founder of Rise Up Kings.
            </p>

            <p>I started this movement because I lived the version of success that wasn't working.</p>

            <p>
              I borrowed $1,000 to start my first business, grew Superior Restoration to $13 million, and sold the company to private equity. And along the way I almost lost my marriage, my health, and my faith to the grind of building it all.
            </p>

            <div className="s9__pull">
              <p><span className="s9__pull-mark">The Refinery</span> is where a man rebuilds.</p>
              <p><span className="s9__pull-mark">RUKCON</span> is where he deepens what he rebuilt, and where he brings the people he loves into the work he's been doing alone.</p>
            </div>

            <p>If you've been through the Refinery, you know what this weekend will do for you.</p>

            <p>
              If you haven't… if you're reading this as a friend, a spouse, a brother, a son… this is the room designed for you to walk into.
            </p>

            <ul className="s9__bring">
              <li>Bring your wife.</li>
              <li>Bring your friend.</li>
              <li>Bring your sons.</li>
              <li>Bring the version of yourself you've been quietly tired of.</li>
            </ul>

            <p className="s9__close"><em>We'll take it from there.</em></p>
          </div>

          <div className="s9__cta">
            <a href="#register" className="btn btn--gold btn--lg">Reserve Your Seat</a>
            <span className="s9__cta-note">— Skylar</span>
          </div>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 10: Tickets & Add-ons -----------------
function S10Tickets() {
  const tiers = [
  {
    label: "General",
    price: "[Price TBA]",
    tagline: "Three days. Main room. Full community.",
    benefits: [
    "Official RUKCON T-shirt",
    "Access to all Day 1 & Day 2 main stage sessions",
    "Entry into RUKGAMES experience",
    "Gala Dinner — shared experience with full community"],

    featured: false
  },
  {
    label: "Premium",
    price: "[Price TBA]",
    tagline: "Closer to the front. Smaller rooms. Deeper access.",
    benefits: [
    "Premium RUKCON polo — distinct, elevated branding",
    "Priority seating in the main room",
    "Expedited check-in experience",
    "Day 0 Private Session (6:00–7:00 PM) — featured speaker, intimate teaching for men & women",
    "Day 2 Private Lunch Session + Meet & Greet",
    "Enhanced RUKGAMES — premium-only competitive element, leadership roles, exclusive recognition",
    "Day 2 Premium Lounge before the Gala Dinner"],

    featured: true
  }];


  const addons = [
  {
    title: "Business Peer Forum",
    meta: "Day One · Refinery + Gold Mastermind only",
    tag: "Complimentary",
    body: "A complimentary component of the Refinery Mastermind program. Virtual boardroom-style peer group of 6–9 RUK graduates for deeper accountability and growth."
  },
  {
    title: "Coaching Client Dinner",
    meta: "Invitation only",
    tag: "Application required",
    body: "An exclusive dinner for prospective coaching clients. Request more info on the application form."
  },
  {
    title: "Gala Dinner Guest Ticket",
    meta: "Friday evening · Cocktail attire",
    tag: "Already included with RUKCON 11",
    body: "For guests who aren't attending RUKCON 11 but want to join for the Gala Dinner only. A night of honor, recognition, and connection."
  }];


  return (
    <section id="tickets" className="block s10">
      <div className="block__inner">
        <div className="s10__head reveal">
          <div className="eyebrow-rule">Tickets · Add-ons · Logistics</div>
          <h2 className="block__h2">
            Everything else<br />
            you need to <span className="accent">know.</span>
          </h2>
          <p className="block__lede">
            Two tiers, three add-on experiences. Pick the room you want to be in. The price moves as the lineup locks — reserving early is always cheaper.
          </p>
        </div>

        {/* Ticket tiers */}
        <div className="s10__tiers">
          {tiers.map((t, i) =>
          <article
            key={i}
            className={`tier reveal${t.featured ? " tier--featured" : ""}`}
            style={{ transitionDelay: `${i * 100}ms` }}>
            
              <header className="tier__header">
                <div className="tier__label">
                  <span className="tier__name">{t.label}</span>
                  {t.featured && <span className="tier__badge">Most Access</span>}
                </div>
                <div className="tier__price">{t.price}</div>
                <p className="tier__tagline">{t.tagline}</p>
              </header>
              <ul className="tier__list">
                {t.benefits.map((b, j) =>
              <li key={j} className="tier__item">
                    <span className="tier__check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
                      </svg>
                    </span>
                    <span>{b}</span>
                  </li>
              )}
              </ul>
              <a
              href="#register"
              className={`btn btn--lg ${t.featured ? "btn--gold" : "btn--ghost"}`}>
              
                {t.featured ? "Reserve Premium" : "Reserve General"}
              </a>
            </article>
          )}
        </div>

        {/* Add-ons row */}
        <div className="s10__addons reveal">
          <div className="s10__addons-label">
            <span className="s10__addons-rule" />
            <span className="s10__addons-text">Additional Experiences</span>
            <span className="s10__addons-rule" />
          </div>
          <div className="s10__addons-grid">
            {addons.map((a, i) =>
            <article key={i} className="addon">
                <div className="addon__top">
                  <h3 className="addon__title">{a.title}</h3>
                  <span className="addon__tag">{a.tag}</span>
                </div>
                <div className="addon__meta">{a.meta}</div>
                <p className="addon__body">{a.body}</p>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 11: Venue & Stay -----------------
function S11Venue() {
  const hotels = [
  {
    tag: "Host Hotel",
    name: "Hilton Dallas — Plano Granite Park",
    meta: "Next to The Boardwalk · Plano, TX",
    image: "assets/hotel-hilton-granite-park.avif",
    bullets: [
    "Outdoor patio with fire pit, pool, and upscale bar Prairie Fire",
    "Fitness center, restaurant, and Carso Market for ready-made meals",
    "Starbucks on-site"],

    cta: "Book Your Room",
    href: "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=DALPGHH&arrivalDate=2026-10-14&departureDate=2026-10-18&groupCode=RUK&room1NumAdults=1&cid=OM%2CWW%2CHILTONLINK%2CEN%2CDirectLink",
    featured: false
  },
  {
    tag: "Overflow Hotel",
    name: "Sandman Signature Plano — Frisco",
    meta: "Plano / Frisco corridor",
    image: "assets/hotel-sandman-signature.jpg",
    bullets: [
    "Two hospitality lounges, banquet and meeting facilities",
    "24/7 business center",
    "Indoor heated pool, hot tub, fitness center, and on-site dining"],

    cta: "Book Your Room",
    href: "https://reservations.sandmanhotels.com/113153?&groupID=4702770#/guestsandrooms",
    featured: false
  }];


  return (
    <section id="venue" className="block s11">
      <div className="block__inner">
        <div className="s11__head reveal">
          <div className="eyebrow-rule">Dallas · Plano</div>
          <h2 className="block__h2">
            Where you'll <span className="accent">stay.</span>
          </h2>
          <p className="block__lede">
            Two hotels, one short drive to the venue. Book early — host blocks fill before the lineup gets announced.
          </p>
        </div>

        <div className="s11__grid">
          {hotels.map((h, i) =>
          <article key={i} className={"hotel reveal " + (h.featured ? "hotel--featured" : "")}>
              <div className="hotel__media" aria-hidden="true" style={{ borderStyle: "none" }}>
                {h.image ?
              <img className="hotel__media-img" src={h.image} alt="" /> :
              <div className="hotel__media-pattern" />}
                <span className="hotel__tag">{h.tag}</span>
              </div>
              <div className="hotel__body">
                <h3 className="hotel__name">{h.name}</h3>
                <div className="hotel__meta">{h.meta}</div>
                <ul className="hotel__list">
                  {h.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <a href={h.href || "#book"} target={h.href ? "_blank" : undefined} rel={h.href ? "noopener noreferrer" : undefined} className="btn btn--gold">
                  {h.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 12: FAQ -----------------
function S12FAQ() {
  const faqs = [
  {
    q: "Do I have to be a Rise Up Kings graduate to attend?",
    a: "No. RUKCON 11 is designed to welcome both RUK graduates and first-time attendees. If you've never been to a RUK event, this is a strong entry point."
  },
  {
    q: "Is this only for men?",
    a: "No. RUKCON 11 is open to Christian men and women. The Freedom event for women runs alongside on RUKCON, starting the day before on Wednesday."
  },
  {
    q: "Do I have to be a Christian to attend?",
    a: "Rise Up Kings is a Christian-based organization. You're welcome to attend if you're open to the Christian faith."
  },
  {
    q: "Do I need to be a business owner?",
    a: "No. RUKCON 11 is built for Christian leaders — business owners, entrepreneurs, executives, and people serious about their faith, family, fitness, and finances."
  },
  {
    q: "Should I bring my spouse?",
    a: "Yes. Spouses are encouraged. They can choose to jump into the RUQ Freedom experience or join their husbands for the RUKCON 11 mainstage sessions."
  },
  {
    q: "Can children attend?",
    a: "18+ only."
  },
  {
    q: "What physical shape do I need to be in?",
    a: "We meet you where you are. The RUK Fitness components on Day One and Day Three are optional, and all levels are welcome."
  },
  {
    q: "What do I need to bring?",
    a: "Black shirt, black shorts, and athletic shoes for sessions are encouraged. Cocktail attire for the Gala Dinner on Friday evening."
  },
  {
    q: "What's included in the ticket?",
    a: "Access to all keynote speakers and general sessions. Networking with RUK alumni. RUK Games. The Gala Dinner on Friday evening. Optional add-on experiences are available separately."
  },
  {
    q: "Where is the event held?",
    a: "Dallas, Texas. The host hotel is the Hilton Dallas — Plano Granite Park. Full address and directions provided after registration."
  },
  {
    q: "What airports do I fly into?",
    a: "Dallas/Fort Worth International (DFW) or Dallas Love Field."
  },
  {
    q: "Is the hotel included?",
    a: "No. The hotel is booked separately. Discounted rates are provided at the host and overflow hotels."
  }];


  return (
    <section id="faq" className="block s12">
      <div className="block__inner s12__layout">
        <aside className="s12__side reveal">
          <div className="eyebrow-rule">Frequently Asked</div>
          <h2 className="block__h2">
            Answered<br />
            <span className="accent">directly.</span>
          </h2>
          <p className="block__lede">
            Twelve of the questions we get most. If yours isn't here, write to us — we read everything.
          </p>
          <a href="#contact" className="s12__contact">
            Ask a different question
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </aside>

        <ol className="s12__list">
          {faqs.map((f, i) => {
            return (
              <li
                key={i}
                className="faq is-open reveal"
                style={{ transitionDelay: `${i * 30}ms` }}>
                
                <div className="faq__btn" aria-expanded="true">
                  <span className="faq__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq__q">{f.q}</span>
                </div>
                <div className="faq__panel">
                  <div className="faq__a">{f.a}</div>
                </div>
              </li>);

          })}
        </ol>
      </div>
    </section>);

}

// ----------------- SECTION 13: More Ways To Be In The Room -----------------
function S13MoreWays() {
  const ways = [
  {
    num: "01",
    tag: "Sponsorship",
    title: "Become a Sponsor",
    body: "Align your brand with a movement of purpose-driven men and women. Gain exposure, network with leaders, and invest in lasting transformation.",
    cta: "Become a Sponsor",
    href: "https://reservations.sandmanhotels.com/113153?&groupID=4702770#/guestsandrooms"
  },
  {
    num: "02",
    tag: "Stage",
    title: "Become a Speaker",
    body: "Share your message with a room of high-performing, faith-driven attendees. Inspire transformation and build authority in the RUK community.",
    cta: "Become a Speaker",
    href: "mailto:carolyn@riseupkings.com?subject=RUKCON%2011%20%E2%80%94%20Speaker%20Pitch"
  },
  {
    num: "03",
    tag: "Service",
    title: "Become a Volunteer",
    body: "Serve alongside the RUK team. Grow in leadership. Help create the atmosphere that makes this weekend what it is.",
    cta: "Become a Volunteer",
    href: "mailto:carolyn@riseupkings.com?subject=RUKCON%2011%20%E2%80%94%20Volunteer%20Application"
  }];


  return (
    <section id="more-ways" className="block s13">
      <div className="block__inner">
        <div className="s13__head reveal">
          <div className="eyebrow-rule">Get Involved</div>
          <h2 className="block__h2">
            There are more ways<br />
            to be <span className="accent">in the room.</span>
          </h2>
          <p className="block__lede">
            Three doors that aren't a ticket. Each one puts you closer to the work — as a partner, a voice, or a steward of the weekend itself.
          </p>
        </div>

        <div className="s13__grid">
          {ways.map((w, i) =>
          <article key={w.num} className="way reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="way__head">
                <div className="way__num">{w.num}</div>
                <div className="way__tag">{w.tag}</div>
              </div>
              <h3 className="way__title">{w.title}</h3>
              <p className="way__body">{w.body}</p>
              <a href={w.href} className="way__cta">
                {w.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </article>
          )}
        </div>
      </div>
    </section>);

}

// ----------------- SECTION 14: Final CTA -----------------
function S14FinalCTA() {
  return (
    <section id="reserve" className="block s14">
      <div className="s14__bg" aria-hidden="true">
        <div className="s14__photo" />
        <div className="s14__scrim" />
      </div>

      <div className="block__inner s14__inner">
        <div className="s14__top reveal">
          <div className="eyebrow-rule">The Final Call</div>
        </div>

        <h2 className="s14__h reveal">
          Three days.<br />
          One decision.<br />
          <span className="brushword">All&nbsp;In.</span>
        </h2>

        <div className="s14__copy reveal">
          <p className="s14__lead">
            You've been doing this alone long enough.
          </p>

          <p>
            The next RUKCON happens whether you're in the room or not. The question is whether you're the man who shows up with the people he loves this time, or the man who watches another year go by wishing he had.
          </p>

          <p>
            Reserve your seat. Bring your wife. Bring your friend. Bring the version of yourself that's been quietly waiting for a room that actually fits.
          </p>
        </div>

        <div className="s14__cta reveal">
          <a href="#register" className="btn btn--gold btn--lg">
            Reserve Your Seat
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="s14__meta reveal">
          <div className="s14__meta-line">
            <span className="s14__meta-rule" />
            <span className="s14__meta-text">RUKCON 11 · Sept 16–18, 2026 · Dallas, TX</span>
            <span className="s14__meta-rule" />
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Nav, Hero, S1AllInAgain, S2WhoFor, S3Pillars, S4ThreeDays, S5Freedom, S6Speakers, S7Outcomes, S8Testimonials, S9SkylarLetter, S10Tickets, S11Venue, S12FAQ, S13MoreWays, S14FinalCTA, CountdownBlock });