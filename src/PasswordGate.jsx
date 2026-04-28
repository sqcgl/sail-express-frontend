import { useMemo, useState } from "react";

const ACCESS_STORAGE_KEY = "sail-express-access";

function fingerprintPassword(password) {
  let hash = 0x811c9dc5;

  for (const character of password) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function hasStoredAccess(accessMarker) {
  if (typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(ACCESS_STORAGE_KEY) === accessMarker;
  } catch {
    return false;
  }
}

function storeAccess(accessMarker) {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(ACCESS_STORAGE_KEY, accessMarker);
  } catch {
    // If storage is unavailable, still unlock for the current render.
  }
}

export default function PasswordGate({ children, password }) {
  const configuredPassword = String(password ?? "").trim();
  const requiresPassword = configuredPassword.length > 0;
  const accessMarker = useMemo(
    () => fingerprintPassword(configuredPassword),
    [configuredPassword],
  );
  const [entry, setEntry] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    () => !requiresPassword || hasStoredAccess(accessMarker),
  );

  if (!requiresPassword || isUnlocked) {
    return children;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (entry === configuredPassword) {
      storeAccess(accessMarker);
      setError("");
      setIsUnlocked(true);
      return;
    }

    setEntry("");
    setError("Incorrect password.");
  };

  return (
    <main className="password-gate" aria-labelledby="password-gate-title">
      <section className="password-gate__panel">
        <img className="password-gate__logo" src="/logo.png" alt="Sail Express" />
        <p className="password-gate__eyebrow">Private preview</p>
        <h1 id="password-gate-title">Private access</h1>
        <form className="password-gate__form" onSubmit={handleSubmit}>
          <input
            aria-hidden="true"
            autoComplete="username"
            className="password-gate__username"
            hidden
            readOnly
            tabIndex={-1}
            type="text"
            value="sail-express-preview"
          />
          <label htmlFor="site-password">Password</label>
          <div className="password-gate__row">
            <input
              autoComplete="current-password"
              autoFocus
              id="site-password"
              onChange={(event) => {
                setEntry(event.target.value);
                setError("");
              }}
              type="password"
              value={entry}
            />
            <button type="submit">Enter</button>
          </div>
          {error ? (
            <p className="password-gate__error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
