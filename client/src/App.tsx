import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Heart,
  Info,
  Mail,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Vote,
} from "lucide-react";
import { useLocation } from "wouter";
import Playground from "./pages/Playground";

type Step = "intro" | "register" | "vote" | "complete";
type CandidateId = "lula" | "flavio";

type Candidate = {
  id: CandidateId;
  name: string;
  shortName: string;
  role: string;
  image: string;
  accent: string;
  alt: string;
};

const candidates: Candidate[] = [
  {
    id: "lula",
    name: "Luiz Inácio Lula da Silva",
    shortName: "Lula",
    role: "Presidente da República",
    image: "/assets/candidates/lula.jpg",
    accent: "candidate-card--green",
    alt: "Foto oficial de Luiz Inácio Lula da Silva",
  },
  {
    id: "flavio",
    name: "Flávio Bolsonaro",
    shortName: "Flávio Bolsonaro",
    role: "Senador pelo Rio de Janeiro",
    image: "/assets/candidates/flavio-bolsonaro.jpg",
    accent: "candidate-card--gold",
    alt: "Foto oficial de Flávio Bolsonaro",
  },
];

const demoVoteKey = "segunda-eleicao-demo-vote";

function hasDemoVote() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(demoVoteKey) === "registered";
}

function CandidateCard({
  candidate,
  selected,
  reactionOn,
  onSelect,
  onReact,
}: {
  candidate: Candidate;
  selected: boolean;
  reactionOn: boolean;
  onSelect: () => void;
  onReact: () => void;
}) {
  return (
    <article className={`candidate-card ${candidate.accent} ${selected ? "is-selected" : ""}`}>
      <div className="candidate-card__topline">
        <span className="candidate-card__eyebrow">Opção {candidate.id === "lula" ? "01" : "02"}</span>
        {selected && (
          <span className="selected-badge">
            <Check size={13} strokeWidth={3} /> Selecionado
          </span>
        )}
      </div>

      <div className="portrait-wrap">
        <button
          className={`portrait-button ${reactionOn ? "is-reacting" : ""}`}
          type="button"
          onClick={onReact}
          aria-label={`Ativar efeito visual na foto de ${candidate.shortName}`}
        >
          <img src={candidate.image} alt={candidate.alt} className="candidate-portrait" />
          <span className="portrait-overlay" aria-hidden="true">
            <Sparkles size={18} />
            <span>{reactionOn ? "Brilho ativado" : "Toque na foto"}</span>
          </span>
        </button>
        <span className="portrait-sticker" aria-hidden="true">
          <Heart size={12} fill="currentColor" />
        </span>
      </div>

      <div className="candidate-card__body">
        <p className="candidate-card__role">{candidate.role}</p>
        <h3>{candidate.name}</h3>
        <button type="button" className="choose-button" onClick={onSelect} aria-pressed={selected}>
          {selected ? "Escolhido para votar" : `Escolher ${candidate.shortName}`}
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

function Progress({ step }: { step: Step }) {
  const current = step === "register" ? 1 : step === "vote" ? 2 : step === "complete" ? 3 : 0;
  if (current === 0) return null;

  return (
    <div className="progress" aria-label={`Etapa ${Math.min(current, 2)} de 2`}>
      <div className="progress__labels">
        <span>Participação</span>
        <span>{current === 3 ? "Concluído" : `Etapa ${current} de 2`}</span>
      </div>
      <div className="progress__track">
        <span style={{ width: `${current === 1 ? 50 : 100}%` }} />
      </div>
    </div>
  );
}

function App() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<Step>(() => (hasDemoVote() ? "complete" : "intro"));
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [consent, setConsent] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateId | null>(null);
  const [reactions, setReactions] = useState<Record<CandidateId, boolean>>({ lula: false, flavio: false });
  const [formError, setFormError] = useState("");

  const submitRegistration = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) {
      setFormError("Confirme o uso dos dados para continuar.");
      return;
    }
    setFormError("");
    setStep("vote");
  };

  const submitVote = () => {
    if (!selectedCandidate) {
      setFormError("Escolha uma opção antes de confirmar seu voto.");
      return;
    }
    setFormError("");
    window.localStorage.setItem(demoVoteKey, "registered");
    setStep("complete");
  };

  const resetDemo = () => {
    window.localStorage.removeItem(demoVoteKey);
    setSelectedCandidate(null);
    setEmail("");
    setBirthDate("");
    setConsent(false);
    setFormError("");
    setStep("intro");
  };

  const toggleReaction = (candidateId: CandidateId) => {
    setReactions((previous) => ({ ...previous, [candidateId]: !previous[candidateId] }));
  };

  if (window.location.pathname === "/brincar") {
    return <Playground onBack={() => setLocation("/")} />;
  }

  return (
    <main className="site-shell">
      <div className="page-frame">
        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="Segundo Eleição no Brasil — início">
            <span className="brand__mark">SEB</span>
            <span className="brand__name">
              Segundo Eleição
              <small>no Brasil</small>
            </span>
          </a>
          <span className="header-tag">Enquete independente</span>
        </header>

        <section className="hero" id="inicio">
          <div className="hero__kicker">
            <span className="kicker-dot" />
            <span>Opinião popular · protótipo 2026</span>
          </div>
          <h1>Se a escolha fosse hoje, <em>qual seria a sua?</em></h1>
          <p className="hero__lead">
            Uma enquete digital, simples e respeitosa para registrar uma preferência entre dois nomes.
            Participe uma vez e veja sua escolha confirmada.
          </p>

          {step === "intro" && (
            <button className="primary-button primary-button--hero" type="button" onClick={() => setStep("register")}>
              Quero participar
              <ArrowRight size={18} />
            </button>
          )}

          <div className="trust-row">
            <span><ShieldCheck size={15} /> 1 voto por cadastro</span>
            <span><Info size={15} /> Sem resultado oficial</span>
            <span><Heart size={15} /> Debate com respeito</span>
          </div>
        </section>

        <button className="playground-entry" type="button" onClick={() => setLocation("/brincar")}>
          <span className="playground-entry__icon"><Sparkles size={18} /></span>
          <span><strong>Quer brincar com as fotos?</strong><small>Abra o estúdio de molduras e efeitos saudáveis</small></span>
          <ArrowRight size={18} />
        </button>

        <div className="content-divider"><span>Como funciona</span></div>

        <section className="how-it-works" aria-label="Como funciona a participação">
          <div className="how-it-works__item">
            <span className="step-number">01</span>
            <div><strong>Cadastre-se</strong><p>E-mail e data de nascimento.</p></div>
          </div>
          <div className="how-it-works__item">
            <span className="step-number">02</span>
            <div><strong>Escolha</strong><p>Selecione um dos dois nomes.</p></div>
          </div>
          <div className="how-it-works__item">
            <span className="step-number">03</span>
            <div><strong>Confirme</strong><p>Uma participação por pessoa.</p></div>
          </div>
        </section>

        <Progress step={step} />

        {step === "register" && (
          <section className="flow-panel flow-panel--register" aria-labelledby="register-title">
            <div className="section-heading">
              <span className="section-label">Antes de votar</span>
              <h2 id="register-title">Quem está participando?</h2>
              <p>Precisamos de dois dados básicos para evitar participações duplicadas nesta enquete.</p>
            </div>
            <form className="registration-form" onSubmit={submitRegistration}>
              <label>
                <span>E-mail</span>
                <div className="input-wrap"><Mail size={18} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" required /></div>
              </label>
              <label>
                <span>Data de nascimento</span>
                <div className="input-wrap"><CalendarDays size={18} /><input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} required /></div>
              </label>
              <label className="consent-line">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                <span>Concordo com o uso desses dados somente para controle de participação nesta enquete demonstrativa.</span>
              </label>
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <button className="primary-button" type="submit">Continuar para a escolha <ArrowRight size={17} /></button>
            </form>
            <p className="microcopy"><ShieldCheck size={14} /> No protótipo, nada é enviado para um servidor.</p>
          </section>
        )}

        {step === "vote" && (
          <section className="flow-panel flow-panel--vote" aria-labelledby="vote-title">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-label">Sua vez</span>
                <h2 id="vote-title">Qual é a sua escolha?</h2>
                <p>Toque na foto para um efeito visual leve ou escolha diretamente o seu nome.</p>
              </div>
              <span className="choice-counter">1 escolha</span>
            </div>
            <div className="candidate-grid">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  selected={selectedCandidate === candidate.id}
                  reactionOn={reactions[candidate.id]}
                  onSelect={() => setSelectedCandidate(candidate.id)}
                  onReact={() => toggleReaction(candidate.id)}
                />
              ))}
            </div>
            {formError && <p className="form-error" role="alert">{formError}</p>}
            <button className="primary-button primary-button--wide" type="button" onClick={submitVote}>
              Confirmar meu voto <Check size={18} />
            </button>
            <p className="microcopy"><CircleHelp size={14} /> Sua escolha não será exibida publicamente neste protótipo.</p>
          </section>
        )}

        {step === "complete" && (
          <section className="flow-panel confirmation-panel" aria-labelledby="confirmation-title">
            <div className="confirmation-icon"><Check size={28} strokeWidth={3} /></div>
            <span className="section-label">Participação concluída</span>
            <h2 id="confirmation-title">Sua opinião foi registrada.</h2>
            <p>
              Obrigado por participar. Esta é uma confirmação de interface; a apuração pública e a conexão segura com o banco entram na próxima etapa do projeto.
            </p>
            <div className="confirmation-note"><Info size={17} /><span>Enquete recreativa e independente. Não representa eleição, pesquisa oficial ou resultado eleitoral.</span></div>
            <button className="secondary-button" type="button" onClick={resetDemo}><RotateCcw size={16} /> Reiniciar demonstração</button>
          </section>
        )}

        <section className="disclaimer" aria-label="Aviso de transparência">
          <Info size={17} />
          <p><strong>Transparência:</strong> este projeto é uma enquete independente, sem vínculo com a Justiça Eleitoral e sem pretensão de medir o resultado de uma eleição oficial.</p>
        </section>

        <footer className="site-footer">
          <div><span className="footer-logo">SEB</span><span>Opinião com clareza.</span></div>
          <details>
            <summary>Privacidade e créditos <ChevronDown size={15} /></summary>
            <p>O protótipo solicita e-mail e data de nascimento apenas para demonstrar o controle de participação. As fotos foram obtidas do Wikimedia Commons: “Foto oficial do Presidente da República Luiz Inácio Lula da Silva (cropped) (2)” e “Foto oficial do senador Flávio Bolsonaro (v. AgSen)”.</p>
          </details>
        </footer>
      </div>
    </main>
  );
}

export default App;
