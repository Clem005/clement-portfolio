import type { View } from '../lib/view';
import ViewToggle from './ViewToggle';

interface AudienceQuestionProps {
  view: View;
  /** True once the visitor has picked a view (so a button can show as selected). */
  chosen: boolean;
  /** True when a choice was already known at load: render the slim strip instead. */
  collapsed: boolean;
  onChoose: (view: View) => void;
}

const choices: { value: View; label: string }[] = [
  { value: 'business', label: "I'm looking for services" },
  { value: 'cv', label: "I'm hiring" },
];

export default function AudienceQuestion({ view, chosen, collapsed, onChoose }: AudienceQuestionProps) {
  if (collapsed) {
    return (
      <section
        aria-label="Choose a view"
        className="w-full bg-black border-b border-white/5 flex justify-center items-center gap-4 px-4 py-3"
      >
        <span className="text-xs tracking-widest uppercase text-white/40">Viewing</span>
        <ViewToggle view={view} onChange={onChoose} />
      </section>
    );
  }

  return (
    <section
      aria-labelledby="audience-question"
      className="w-full min-h-[33vh] bg-black flex flex-col justify-center items-center gap-8 px-4 py-12 text-center"
    >
      <h2 id="audience-question" className="text-3xl md:text-4xl font-serif text-white tracking-wide">
        What brings you here?
      </h2>

      <div role="group" aria-labelledby="audience-question" className="flex flex-col sm:flex-row gap-4">
        {choices.map((choice) => {
          const selected = chosen && view === choice.value;
          return (
            <button
              key={choice.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChoose(choice.value)}
              className={`px-6 py-3 text-xs font-semibold tracking-widest uppercase border transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                selected
                  ? 'bg-white text-black border-white'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-black'
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
