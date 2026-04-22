export default function SceneLayer({ offset, scene }) {
  const opacity = Math.max(0, 1 - Math.abs(offset) * 1.15);
  const blur = Math.min(Math.abs(offset) * 7, 7);
  const scale = 1.04 + Math.max(0, 0.04 - Math.abs(offset) * 0.018);
  const photoScale = 1.08 + Math.abs(offset) * 0.035;

  return (
    <section
      className={`scene-layer bg-gradient-to-br ${scene.tone}`}
      aria-hidden={opacity < 0.2}
      data-scene={scene.id}
      style={{
        filter: `blur(${blur}px)`,
        opacity,
        transform: `scale(${scale}) translate3d(${offset * -2}vw, ${offset * 1.4}vh, 0)`,
      }}
    >
      {scene.photo ? (
        <div
          className="scene-photo-wrap"
          style={{
            transform: `translate3d(${offset * -3.6}vw, ${offset * 1.8}vh, 0) scale(${photoScale})`,
          }}
        >
          <img
            alt=""
            className="scene-photo"
            data-testid="scene-photo"
            src={scene.photo}
            style={{ objectPosition: scene.photoPosition }}
          />
        </div>
      ) : null}
      <div className="scene-photo-grade" style={{ background: scene.grade }} />
    </section>
  );
}
