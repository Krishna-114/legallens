import { useRef, useState } from "react";
import "./App.css";

/* ---------- UI text (en / hi / gu) ---------- */
const UI = {
  en: {
    tagline: "Understand any legal document in plain language",
    sub: "Upload rent agreements, scholarship forms or notices. Get a summary, key dates and answers in your language.",
    drop: "Drag & drop your PDF here", or: "or", browse: "Browse files",
    analyze: "Explain my document", analyzing: "Reading your document…",
    badPdf: "Please choose a PDF file (max 10 MB).",
    how: "How it works",
    steps: [
      { t: "Upload", d: "Upload a PDF or a clear scan." },
      { t: "AI reads", d: "Text, clauses and dates are extracted." },
      { t: "Ask in your language", d: "Get answers with page citations." },
    ],
    tabs: { summary: "Summary", dates: "Key dates", duties: "Duties & risks", ask: "Ask" },
    level: { high: "Check carefully", mid: "Note", info: "Info" },
    askPh: "Ask about this document…", send: "Send", suggest: "Try asking",
    notFound: "I couldn't find this in your document, so I won't guess.",
    newDoc: "Upload another", docType: "Rental agreement",
    disclaimer: "This is an explanation, not legal advice. For important decisions, consult a lawyer.",
  },
  hi: {
    tagline: "किसी भी कानूनी दस्तावेज़ को आसान भाषा में समझें",
    sub: "किराया समझौते, छात्रवृत्ति फ़ॉर्म और नोटिस अपलोड करें। सारांश, मुख्य तारीखें और जवाब पाएं।",
    drop: "अपनी PDF यहाँ खींचकर छोड़ें", or: "या", browse: "फ़ाइल चुनें",
    analyze: "मेरा दस्तावेज़ समझाएं", analyzing: "आपका दस्तावेज़ पढ़ा जा रहा है…",
    badPdf: "कृपया केवल PDF फ़ाइल चुनें (अधिकतम 10 MB)।",
    how: "यह कैसे काम करता है",
    steps: [
      { t: "अपलोड करें", d: "PDF या साफ़ स्कैन अपलोड करें।" },
      { t: "AI पढ़ता है", d: "टेक्स्ट, धाराएँ और तारीखें निकाली जाती हैं।" },
      { t: "अपनी भाषा में पूछें", d: "पेज संदर्भ के साथ जवाब पाएं।" },
    ],
    tabs: { summary: "सारांश", dates: "मुख्य तारीखें", duties: "ज़िम्मेदारियाँ और जोखिम", ask: "सवाल पूछें" },
    level: { high: "ध्यान से देखें", mid: "ध्यान दें", info: "जानकारी" },
    askPh: "इस दस्तावेज़ के बारे में पूछें…", send: "भेजें", suggest: "ये पूछ कर देखें",
    notFound: "यह जानकारी आपके दस्तावेज़ में नहीं मिली, इसलिए मैं अंदाज़ा नहीं लगाऊँगा।",
    newDoc: "दूसरा दस्तावेज़ अपलोड करें", docType: "किराया समझौता",
    disclaimer: "यह केवल व्याख्या है, कानूनी सलाह नहीं। ज़रूरी फ़ैसलों के लिए वकील से सलाह लें।",
  },
  gu: {
    tagline: "કોઈપણ કાનૂની દસ્તાવેજ સરળ ભાષામાં સમજો",
    sub: "ભાડા કરાર, શિષ્યવૃત્તિ ફોર્મ અને નોટિસ અપલોડ કરો. સારાંશ, મુખ્ય તારીખો અને જવાબો મેળવો.",
    drop: "તમારી PDF અહીં ખેંચીને મૂકો", or: "અથવા", browse: "ફાઇલ પસંદ કરો",
    analyze: "મારો દસ્તાવેજ સમજાવો", analyzing: "તમારો દસ્તાવેજ વાંચી રહ્યા છીએ…",
    badPdf: "કૃપા કરીને માત્ર PDF ફાઇલ પસંદ કરો (વધુમાં વધુ 10 MB).",
    how: "આ કેવી રીતે કામ કરે છે",
    steps: [
      { t: "અપલોડ કરો", d: "PDF અથવા સ્પષ્ટ સ્કેન અપલોડ કરો." },
      { t: "AI વાંચે છે", d: "ટેક્સ્ટ, કલમો અને તારીખો કાઢવામાં આવે છે." },
      { t: "તમારી ભાષામાં પૂછો", d: "પેજ સંદર્ભ સાથે જવાબ મેળવો." },
    ],
    tabs: { summary: "સારાંશ", dates: "મુખ્ય તારીખો", duties: "જવાબદારીઓ અને જોખમ", ask: "પ્રશ્ન પૂછો" },
    level: { high: "ધ્યાનથી તપાસો", mid: "નોંધ", info: "માહિતી" },
    askPh: "આ દસ્તાવેજ વિશે પૂછો…", send: "મોકલો", suggest: "આ પૂછી જુઓ",
    notFound: "આ માહિતી તમારા દસ્તાવેજમાં મળી નથી, તેથી હું અનુમાન નહીં લગાવું.",
    newDoc: "બીજો દસ્તાવેજ અપલોડ કરો", docType: "ભાડા કરાર",
    disclaimer: "આ માત્ર સમજૂતી છે, કાનૂની સલાહ નથી. મહત્વના નિર્ણયો માટે વકીલની સલાહ લો.",
  },
};

/* ---------- Demo analysis result (replace with API response) ---------- */
const DEMO = {
  summary: {
    en: "This is an 11-month rent agreement. Monthly rent is ₹12,000 and the security deposit is ₹36,000. The tenant must pay rent by the 5th of every month.",
    hi: "यह 11 महीने का किराया समझौता है। मासिक किराया ₹12,000 और सुरक्षा जमा ₹36,000 है। किराएदार को हर महीने की 5 तारीख तक किराया देना होगा।",
    gu: "આ 11 મહિનાનો ભાડા કરાર છે. માસિક ભાડું ₹12,000 અને સિક્યોરિટી ડિપોઝિટ ₹36,000 છે. ભાડુઆતે દર મહિનાની 5 તારીખ સુધીમાં ભાડું ચૂકવવું પડશે.",
  },
  dates: [
    { d: "01 Nov 2026", page: 1, l: { en: "Agreement starts", hi: "समझौता शुरू", gu: "કરાર શરૂ" } },
    { d: "5th of every month", page: 2, l: { en: "Rent due", hi: "किराया देय", gu: "ભાડું ચૂકવવાની તારીખ" } },
    { d: "31 Aug 2027", page: 4, l: { en: "Last day to give notice (renew or vacate)", hi: "नोटिस देने की अंतिम तारीख (नवीनीकरण या खाली करना)", gu: "નોટિસ આપવાની છેલ્લી તારીખ (રિન્યુ અથવા ખાલી કરવું)" } },
    { d: "30 Sep 2027", page: 1, l: { en: "Agreement ends", hi: "समझौता समाप्त", gu: "કરાર પૂર્ણ" } },
  ],
  duties: [
    { lv: "high", cite: "Page 2 · Clause 4", t: { en: "Late fee of ₹100 per day after the 5th.", hi: "5 तारीख के बाद प्रतिदिन ₹100 विलंब शुल्क।", gu: "5 તારીખ પછી દરરોજ ₹100 લેટ ફી." } },
    { lv: "mid", cite: "Page 3 · Clause 9", t: { en: "Deposit is refunded within 30 days of vacating.", hi: "खाली करने के 30 दिनों के भीतर जमा राशि लौटाई जाएगी।", gu: "ખાલી કર્યાના 30 દિવસમાં ડિપોઝિટ પરત મળશે." } },
    { lv: "info", cite: "Page 3 · Clause 6", t: { en: "Tenant pays electricity and water bills.", hi: "बिजली और पानी का बिल किराएदार देगा।", gu: "વીજળી અને પાણીનું બિલ ભાડુઆત ભરશે." } },
  ],
};

const QA = [
  {
    k: ["rent", "किराया", "ભાડું"],
    q: { en: "When is the rent due?", hi: "किराया कब देना है?", gu: "ભાડું ક્યારે ચૂકવવાનું છે?" },
    a: { en: "Rent is due by the 5th of every month.", hi: "किराया हर महीने की 5 तारीख तक देना है।", gu: "ભાડું દર મહિનાની 5 તારીખ સુધીમાં ચૂકવવાનું છે." },
    cite: "Page 2 · Clause 4",
  },
  {
    k: ["deposit", "जमा", "ડિપોઝિટ"],
    q: { en: "When will I get my deposit back?", hi: "मुझे जमा राशि कब वापस मिलेगी?", gu: "મને ડિપોઝિટ ક્યારે પરત મળશે?" },
    a: { en: "Within 30 days after you vacate the property.", hi: "संपत्ति खाली करने के 30 दिनों के भीतर।", gu: "મિલકત ખાલી કર્યા પછી 30 દિવસમાં." },
    cite: "Page 3 · Clause 9",
  },
];

/* ---------- Components ---------- */
function Navbar({ lang, setLang }) {
  return (
    <header className="nav">
      <div className="logo"><span className="logo-mark">⚖</span> LegalLens</div>
      <div className="seg" role="group" aria-label="Language">
        {[["en", "EN"], ["hi", "हिं"], ["gu", "ગુ"]].map(([c, label]) => (
          <button key={c} className={lang === c ? "on" : ""} onClick={() => setLang(c)}>{label}</button>
        ))}
      </div>
    </header>
  );
}

function Upload({ t, onAnalyze, loading }) {
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");
  const [drag, setDrag] = useState(false);
  const input = useRef(null);

  const pick = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf" || f.size > 10 * 1024 * 1024) { setErr(t.badPdf); setFile(null); return; }
    setErr(""); setFile(f);
  };

  return (
    <div className="upload-card">
      <div
        className={"drop" + (drag ? " drag" : "")}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
        </svg>
        <p className="drop-title">{file ? file.name : t.drop}</p>
        {!file && <p className="muted">{t.or}</p>}
        <button className="btn ghost" onClick={() => input.current.click()}>{t.browse}</button>
        <input ref={input} type="file" accept="application/pdf" hidden onChange={(e) => pick(e.target.files[0])} />
      </div>
      {err && <p className="error">{err}</p>}
      <button className="btn primary wide" disabled={!file || loading} onClick={() => onAnalyze(file)}>
        {loading ? t.analyzing : t.analyze}
      </button>
    </div>
  );
}

function Chat({ t, lang }) {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");

  const ask = (q) => {
    const s = q.trim();
    if (!s) return;
    const hit = QA.find((x) => x.k.some((k) => s.toLowerCase().includes(k.toLowerCase())));
    // TODO: replace with POST /api/documents/:id/ask { question, lang }
    const reply = hit ? { text: hit.a[lang], cite: hit.cite } : { text: t.notFound };
    setMsgs((m) => [...m, { me: true, text: s }, { me: false, ...reply }]);
    setText("");
  };

  return (
    <div className="chat">
      <div className="chat-log">
        {msgs.length === 0 && (
          <div className="suggest">
            <p className="muted">{t.suggest}</p>
            {QA.map((x) => <button key={x.cite} className="chip" onClick={() => ask(x.q[lang])}>{x.q[lang]}</button>)}
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={"bubble " + (m.me ? "me" : "bot")}>
            {m.text}
            {m.cite && <span className="cite">{m.cite}</span>}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={text} placeholder={t.askPh} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask(text)} />
        <button className="btn primary" onClick={() => ask(text)}>{t.send}</button>
      </div>
    </div>
  );
}

function Results({ t, lang, fileName, onReset }) {
  const [tab, setTab] = useState("summary");
  return (
    <section className="results">
      <div className="results-head">
        <div>
          <h2>{fileName}</h2>
          <span className="tag">{t.docType}</span> <span className="tag demo">Demo</span>
        </div>
        <button className="btn ghost" onClick={onReset}>{t.newDoc}</button>
      </div>

      <div className="tabs">
        {Object.entries(t.tabs).map(([k, label]) => (
          <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>

      <div className="panel">
        {tab === "summary" && <p className="summary">{DEMO.summary[lang]}</p>}
        {tab === "dates" && (
          <ul className="list">
            {DEMO.dates.map((x, i) => (
              <li key={i} className="row">
                <strong className="date">{x.d}</strong>
                <span>{x.l[lang]}</span>
                <span className="cite">Page {x.page}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === "duties" && (
          <ul className="list">
            {DEMO.duties.map((x, i) => (
              <li key={i} className="row">
                <span className={"level " + x.lv}>{t.level[x.lv]}</span>
                <span>{x.t[lang]}</span>
                <span className="cite">{x.cite}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === "ask" && <Chat t={t} lang={lang} />}
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [stage, setStage] = useState("home"); // home | loading | result
  const [fileName, setFileName] = useState("");
  const t = UI[lang];

  const analyze = (file) => {
    setFileName(file.name);
    setStage("loading");
    // TODO: replace with POST /api/documents (multipart), then poll GET /api/documents/:id
    setTimeout(() => setStage("result"), 1800);
  };

  return (
    <div className={"app lang-" + lang}>
      <Navbar lang={lang} setLang={setLang} />
      <main>
        {stage !== "result" ? (
          <>
            <section className="hero">
              <h1>{t.tagline}</h1>
              <p className="sub">{t.sub}</p>
              <Upload t={t} onAnalyze={analyze} loading={stage === "loading"} />
            </section>
            <section className="how">
              <h3>{t.how}</h3>
              <div className="steps">
                {t.steps.map((s, i) => (
                  <div key={i} className="step">
                    <span className="num">{i + 1}</span>
                    <h4>{s.t}</h4>
                    <p className="muted">{s.d}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <Results t={t} lang={lang} fileName={fileName} onReset={() => setStage("home")} />
        )}
      </main>
      <footer className="foot">{t.disclaimer}</footer>
    </div>
  );
}
