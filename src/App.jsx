import ScrollytellingHome from "./components/homepage/ScrollytellingHome";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { usePageTransition } from "./usePageTransition";

const pages = {
  home: "Home",
  about: "About Us",
  contact: "Contact",
};

function getInitialPage() {
  if (typeof window === "undefined") return "home";
  const hashPage = window.location.hash.replace("#", "");
  return Object.hasOwn(pages, hashPage) ? hashPage : "home";
}

function SiteSwitcher({ activePage, onNavigate }) {
  return (
    <nav className="site-switcher" aria-label="Primary">
      {Object.entries(pages).map(([page, label]) => (
        <button
          aria-current={activePage === page ? "page" : undefined}
          className="site-switcher__button"
          key={page}
          onClick={() => onNavigate(page)}
          type="button"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const { activePage, isTransitioning, layers, navigate } = usePageTransition(
    getInitialPage(),
  );

  const renderPage = (page) => {
    if (page === "home") return <ScrollytellingHome />;
    if (page === "about") return <AboutPage />;
    return <ContactPage />;
  };

  return (
    <>
      <SiteSwitcher activePage={activePage} onNavigate={navigate} />
      <div
        className={`page-shell ${isTransitioning ? "page-shell--transitioning" : ""}`}
        data-testid="page-shell"
        data-transition-state={isTransitioning ? "transitioning" : "idle"}
      >
        {isTransitioning ? <div className="page-shell__scrim" aria-hidden="true" /> : null}
        {layers.map((layer) => (
          <div
            aria-hidden={layer.type === "exiting" ? "true" : undefined}
            className={`page-shell__layer page-shell__layer--${layer.type}`}
            data-page-id={layer.page}
            data-page-layer={layer.type}
            key={`${layer.type}-${layer.page}`}
          >
            {renderPage(layer.page)}
          </div>
        ))}
      </div>
    </>
  );
}
