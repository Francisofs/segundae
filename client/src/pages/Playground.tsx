import { useState } from "react";
import { ArrowLeft, Check, Heart, PartyPopper, ShieldCheck, Sparkles, Sun } from "lucide-react";

type CandidateId = "lula" | "flavio";
type FrameStyle = "editorial" | "solar" | "confetti";

type PlaygroundState = {
  frame: FrameStyle;
  shine: boolean;
  heart: boolean;
  confetti: boolean;
};

const candidates = [
  {
    id: "lula" as CandidateId,
    name: "Lula",
    fullName: "Luiz Inácio Lula da Silva",
    image: "/assets/candidates/lula.jpg",
    alt: "Foto oficial de Luiz Inácio Lula da Silva",
    tone: "green",
  },
  {
    id: "flavio" as CandidateId,
    name: "Flávio Bolsonaro",
    fullName: "Flávio Bolsonaro",
    image: "/assets/candidates/flavio-bolsonaro.jpg",
    alt: "Foto oficial de Flávio Bolsonaro",
    tone: "gold",
  },
];

const initialState: Record<CandidateId, PlaygroundState> = {
  lula: { frame: "editorial", shine: false, heart: false, confetti: false },
  flavio: { frame: "editorial", shine: false, heart: false, confetti: false },
};

const frameLabels: Record<FrameStyle, string> = {
  editorial: "Editorial",
  solar: "Solar",
  confetti: "Confete",
};

export default function Playground({ onBack }: { onBack: () => void }) {
  const [effects, setEffects] = useState(initialState);

  const updateCandidate = (id: CandidateId, update: Partial<PlaygroundState>) => {
    setEffects((current) => ({ ...current, [id]: { ...current[id], ...update } }));
  };

  const applyToBoth = (update: Partial<PlaygroundState>) => {
    setEffects({
      lula: { ...effects.lula, ...update },
      flavio: { ...effects.flavio, ...update },
    });
  };

  return (
    <main className="site-shell playground-page">
      <div className="page-frame">
        <header className="site-header">
          <button className="back-button" type="button" onClick={onBack}>
            <ArrowLeft size={17} /> Voltar para a enquete
          </button>
          <span className="header-tag">Estúdio respeitoso</span>
        </header>

        <section className="playground-intro">
          <span className="section-label">Página 02 · espaço criativo</span>
          <h1>Brinque com as <em>duas fotos.</em></h1>
          <p>
            Escolha molduras e efeitos leves para montar uma composição divertida. As mesmas opções estão disponíveis para os dois nomes — a ideia é brincar com o visual, não com a pessoa.
          </p>
          <div className="playground-rule"><ShieldCheck size={16} /> Sem caricaturas, ataques ou mensagens atribuídas aos candidatos.</div>
        </section>

        <section className="playground-stage" aria-label="Estúdio de fotos dos candidatos">
          <div className="playground-stage__head">
            <div>
              <span className="section-label">Seu painel</span>
              <h2>Escolha o clima</h2>
            </div>
            <button className="apply-both-button" type="button" onClick={() => applyToBoth({ frame: "confetti", confetti: true, shine: true })}>
              <PartyPopper size={15} /> Igual para os dois
            </button>
          </div>

          <div className="playground-grid">
            {candidates.map((candidate) => {
              const candidateEffects = effects[candidate.id];
              return (
                <article className={`play-card play-card--${candidate.tone}`} key={candidate.id}>
                  <div className="play-card__label"><span>{candidate.name}</span><small>composição {candidate.id === "lula" ? "01" : "02"}</small></div>
                  <div className={`play-photo play-photo--${candidateEffects.frame} ${candidateEffects.shine ? "has-shine" : ""} ${candidateEffects.confetti ? "has-confetti" : ""}`}>
                    <img src={candidate.image} alt={candidate.alt} />
                    {candidateEffects.confetti && <span className="confetti confetti--one" aria-hidden="true" />}
                    {candidateEffects.confetti && <span className="confetti confetti--two" aria-hidden="true" />}
                    {candidateEffects.heart && <span className="floating-heart" aria-hidden="true"><Heart size={22} fill="currentColor" /></span>}
                    {candidateEffects.shine && <span className="shine-sticker" aria-hidden="true"><Sparkles size={19} /></span>}
                  </div>
                  <p className="play-card__name">{candidate.fullName}</p>
                  <div className="frame-pills" aria-label={`Molduras para ${candidate.name}`}>
                    {(Object.keys(frameLabels) as FrameStyle[]).map((frame) => (
                      <button key={frame} type="button" className={candidateEffects.frame === frame ? "is-active" : ""} onClick={() => updateCandidate(candidate.id, { frame })}>
                        {frameLabels[frame]}
                      </button>
                    ))}
                  </div>
                  <div className="effect-actions">
                    <button type="button" className={candidateEffects.shine ? "is-active" : ""} onClick={() => updateCandidate(candidate.id, { shine: !candidateEffects.shine })}>
                      <Sun size={15} /> Brilho
                    </button>
                    <button type="button" className={candidateEffects.heart ? "is-active" : ""} onClick={() => updateCandidate(candidate.id, { heart: !candidateEffects.heart })}>
                      <Heart size={15} /> Coração
                    </button>
                    <button type="button" className={candidateEffects.confetti ? "is-active" : ""} onClick={() => updateCandidate(candidate.id, { confetti: !candidateEffects.confetti })}>
                      <PartyPopper size={15} /> Confete
                    </button>
                  </div>
                  <div className="play-card__status"><Check size={14} /> Interações equivalentes</div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="playground-footer-note">
          <Sparkles size={18} />
          <div><strong>Uma brincadeira, duas molduras.</strong><p>Os efeitos são apenas decorativos e não representam a opinião dos candidatos.</p></div>
        </section>

        <footer className="site-footer">
          <div><span className="footer-logo">SEB</span><span>Opinião com clareza.</span></div>
          <button className="back-button back-button--footer" type="button" onClick={onBack}><ArrowLeft size={15} /> Voltar</button>
        </footer>
      </div>
    </main>
  );
}
