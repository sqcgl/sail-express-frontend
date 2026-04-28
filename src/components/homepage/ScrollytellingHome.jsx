import { supplyChainScenes } from "../../data/supplyChainScenes";
import { featuredProducts } from "../../data/products";
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
        <h2>From weekly list to refrigerated route, one wholesale workflow.</h2>
      </div>
      <p>
        Restaurants send the full list, Sail Express confirms availability and
        substitutions, assembles the order in Queens, then delivers the mix by
        refrigerated route.
      </p>
      <a href="mailto:info@sail-express.com">Plan your order</a>
    </section>
  );
}

function FeaturedProducts() {
  return (
    <section className="featured-products" aria-label="Featured wholesale products">
      <div className="featured-products__intro">
        <p className="summary-band__eyebrow">Featured Products</p>
        <h2>Add the staples your next order needs.</h2>
        <a href="#products">View catalog</a>
      </div>
      <div className="featured-products__grid">
        {featuredProducts.map((product) => (
          <article className="featured-product" key={product.id}>
            <img src={product.image} alt="" />
            <div>
              <p>{product.subcategory}</p>
              <h3>{product.name}</h3>
              <span>{product.pack}</span>
            </div>
          </article>
        ))}
      </div>
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
      <FeaturedProducts />
    </main>
  );
}
