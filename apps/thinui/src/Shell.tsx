import { useEffect, useState } from "react";
import { App } from "./App";
import { TeletextLab } from "./TeletextLab";

function pathFromHash(): string {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  return raw || "/";
}

export function Shell() {
  const [path, setPath] = useState(pathFromHash);

  useEffect(() => {
    const onHash = () => setPath(pathFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (path === "lab/teletext") {
    return <TeletextLab />;
  }

  return <App />;
}
