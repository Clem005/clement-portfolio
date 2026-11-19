import type { View } from '../lib/view';

interface ViewToggleProps {
  view: View;
  onChange: (view: View) => void;
  className?: string;
}

const options: { value: View; label: string; ariaLabel: string }[] = [
  { value: 'business', label: 'Services', ariaLabel: 'Show the services view' },
  { value: 'cv', label: 'CV', ariaLabel: 'Show the CV view' },
];

/** Compact two-way switch, used in the collapsed question strip and the menu. */
export default function ViewToggle({ view, onChange, className = '' }: ViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="Site view"
      className={`flex items-center gap-1 text-xs tracking-widest uppercase ${className}`}
    >
      {options.map((option, idx) => (
        <span key={option.value} className="flex items-center gap-1">
          {idx > 0 && <span aria-hidden="true" className="text-white/20">/</span>}
          <button
            type="button"
            aria-label={option.ariaLabel}
            aria-pressed={view === option.value}
            onClick={() => onChange(option.value)}
            // px-2 / py-3.5 give a comfortable touch target; the smaller gaps keep the spacing as before
            className={`px-2 py-3.5 uppercase tracking-widest transition-colors duration-300 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              view === option.value
                ? 'text-white underline underline-offset-8 decoration-white/60'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
