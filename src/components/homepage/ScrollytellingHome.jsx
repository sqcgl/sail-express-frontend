import { supplyChainScenes } from "../../data/supplyChainScenes";
import ProgressRail from "./ProgressRail";
import SceneLayer from "./SceneLayer";
import { useScrollProgress } from "./useScrollProgress";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function TopNavigation() {
  return (
    <header className="site-header" aria-label="Sail Express">
      <a className="site-header__brand" href="#top" aria-label="Sail Express home">
        <img src="/logo.png" alt="" />
        <span>Sail Express</span>
      </a>
      <a className="site-header__cta" href="mailto:info@sail-express.com">
        Start an order
      </a>
    </header>
  );
}

function SceneCopy({ activeScene, sceneProgress }) {
  return (
    <div className="scene-copy" key={activeScene.id}>
      <p className="scene-copy__eyebrow">{activeScene.eyebrow}</p>
      <h1>{activeScene.headline}</h1>
      <p className="scene-copy__body">{activeScene.copy}</p>
      <p className="scene-copy__proof">
        <span />
        {activeScene.proof}
      </p>
      <div
        className="scene-copy__breath"
        style={{ transform: `scaleX(${0.18 + sceneProgress * 0.82})` }}
      />
    </div>
  );
}

function JourneySummary() {
  return (
    <section className="summary-band" aria-label="Sail Express promise">
      <div>
        <p className="summary-band__eyebrow">Sail Express Wholesale</p>
        <h2>Seafood, ingredients, and restaurant supplies in one route.</h2>
      </div>
      <p>
        From New York receiving to refrigerated delivery, we help Japanese
        restaurants restock seafood alongside sauces, dry goods, packaging, and
        daily service supplies.
      </p>
      <a href="mailto:info@sail-express.com">Plan your order</a>
    </section>
  );
}

export default function ScrollytellingHome() {
  const { activeIndex, containerRef, progress, scenePosition, sceneProgress } =
    useScrollProgress(supplyChainScenes.length);
  const activeScene = supplyChainScenes[activeIndex];
  const cameraPull = clamp(progress * 1.1);

  return (
    <main
      id="top"
      aria-label="Sail Express restaurant wholesale story"
      className="min-h-screen bg-sail-ink text-white"
    >
      <TopNavigation />

      <div
        className="story-scroll"
        ref={containerRef}
        style={{ height: `${supplyChainScenes.length * 118}vh` }}
      >
        <div className="story-sticky">
          <div
            className="story-camera"
            style={{
              transform: `translate3d(0, ${cameraPull * -3}vh, 0) scale(${1 + cameraPull * 0.035})`,
            }}
          >
            {supplyChainScenes.map((scene, index) => (
              <SceneLayer
                key={scene.id}
                offset={scenePosition - index}
                scene={scene}
              />
            ))}
            <div className="story-vignette" />
          </div>

          <SceneCopy activeScene={activeScene} sceneProgress={sceneProgress} />
          <ProgressRail
            activeIndex={activeIndex}
            progress={progress}
            scenes={supplyChainScenes}
          />
        </div>
      </div>

      <JourneySummary />
    </main>
  );
}
