export default function ProgressRail({ activeIndex, progress, scenes }) {
  return (
    <aside className="progress-rail" aria-label="Supply chain stages">
      <div className="progress-rail__track">
        <span
          className="progress-rail__fill"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>
      <ol className="progress-rail__list">
        {scenes.map((scene, index) => (
          <li
            className="progress-rail__item"
            data-active={index === activeIndex}
            key={scene.id}
          >
            <span className="progress-rail__dot" />
            <span className="progress-rail__label">{scene.label}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
