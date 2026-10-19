"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = {
  method: Method;
  path: string;
  summary: string;
  request?: string;
  status: string;
  response: string;
};

const book = `{
  "Id": 1,
  "Title": "The Double Helix",
  "Author": "James D. Watson",
  "Genre": "Science",
  "Status": "To Read",
  "Rating": null,
  "Notes": "",
  "CoverUrl": "",
  "AddedAt": "2026-06-01T10:42:00.000Z"
}`;

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/health",
    summary: "Pings Azure SQL with SELECT 1; returns 503 if the database is unreachable.",
    status: "200 OK",
    response: `{
  "status": "healthy",
  "db": "connected",
  "storage": "connected"
}`,
  },
  {
    method: "GET",
    path: "/api/books?status=To%20Read",
    summary: "Lists books, newest first, with an optional status filter bound as a parameter.",
    status: "200 OK",
    response: `[\n  ${book.replace(/\n/g, "\n  ")}\n]`,
  },
  {
    method: "GET",
    path: "/api/books/:id",
    summary: "Fetches one book by its integer id, or a 404 when it doesn't exist.",
    status: "200 OK",
    response: book,
  },
  {
    method: "POST",
    path: "/api/books",
    summary: "Creates a book. Title and author are required; genre defaults to Fiction.",
    request: `{
  "title": "The Double Helix",
  "author": "James D. Watson",
  "genre": "Science"
}`,
    status: "201 Created",
    response: book,
  },
  {
    method: "PUT",
    path: "/api/books/:id",
    summary: "Replaces a book's fields and returns the saved row via OUTPUT INSERTED.*.",
    request: `{
  "title": "The Double Helix",
  "author": "James D. Watson",
  "genre": "Science",
  "status": "Reading",
  "rating": 5,
  "notes": "Chapter 7 — Rosalind Franklin's Photo 51"
}`,
    status: "200 OK",
    response: book
      .replace('"To Read"', '"Reading"')
      .replace('"Rating": null', '"Rating": 5')
      .replace('"Notes": ""', `"Notes": "Chapter 7 — Rosalind Franklin's Photo 51"`),
  },
  {
    method: "POST",
    path: "/api/books/:id/cover",
    summary: "Accepts a multipart image, stores it in the Blob Storage ‘covers’ container and saves its URL.",
    request: "multipart/form-data; file=cover.jpg",
    status: "201 Created",
    response: `{
  "message": "Cover uploaded",
  "coverUrl": "https://<account>.blob.core.windows.net/covers/book-1.jpg"
}`,
  },
  {
    method: "DELETE",
    path: "/api/books/:id",
    summary: "Removes a book.",
    status: "204 No Content",
    response: "",
  },
];

const methodColor: Record<Method, string> = {
  GET: "text-cyan border-cyan/30 bg-cyan/10",
  POST: "text-gfp border-gfp/30 bg-gfp/10",
  PUT: "text-amber border-amber/30 bg-amber/10",
  DELETE: "text-cherry border-cherry/30 bg-cherry/10",
};

/** Colours a JSON string with spans: keys, strings, numbers, null. */
function highlight(json: string) {
  const parts: { text: string; className?: string }[] = [];
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(-?\d+(?:\.\d+)?)\b|\b(null|true|false)\b/g;
  let last = 0;
  for (const match of json.matchAll(re)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: json.slice(last, index) });
    if (match[1]) {
      parts.push({ text: match[1], className: match[2] ? "text-dapi" : "text-gfp" });
      if (match[2]) parts.push({ text: match[2], className: "text-mute" });
    } else if (match[3]) parts.push({ text: match[3], className: "text-amber" });
    else if (match[4]) parts.push({ text: match[4], className: "text-cherry" });
    last = index + match[0].length;
  }
  if (last < json.length) parts.push({ text: json.slice(last) });
  return parts;
}

export function ApiExplorer() {
  const [selected, setSelected] = useState(0);
  const [typed, setTyped] = useState(endpoints[0].response.length);
  const raf = useRef(0);
  const endpoint = endpoints[selected];

  /** `start` is the click's timeStamp — the same clock requestAnimationFrame reports. */
  const choose = (index: number, start: number) => {
    setSelected(index);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const full = endpoints[index].response.length;
    cancelAnimationFrame(raf.current);
    if (reduced) {
      setTyped(full);
      return;
    }
    setTyped(0);
    const tick = (now: number) => {
      const chars = Math.min(full, Math.floor(((now - start) / 600) * full));
      setTyped(chars);
      if (chars < full) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const shown = endpoint.response.slice(0, typed);

  return (
    <div className="grid overflow-hidden rounded-3xl border border-line bg-ink-900 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <ul className="divide-y divide-line border-b border-line lg:border-b-0 lg:border-r" aria-label="Endpoints">
        {endpoints.map((e, i) => (
          <li key={`${e.method}-${e.path}`}>
            <button
              type="button"
              aria-pressed={selected === i}
              onClick={(event) => choose(i, event.timeStamp)}
              className={cn(
                "flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors duration-300",
                selected === i ? "bg-ink-800" : "hover:bg-ink-850",
              )}
            >
              <span className={cn("w-16 shrink-0 rounded-md border px-1.5 py-0.5 text-center font-mono text-[10px] font-medium", methodColor[e.method])}>
                {e.method}
              </span>
              <span className={cn("truncate font-mono text-[13px]", selected === i ? "text-bone" : "text-bone-dim")}>{e.path}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex min-h-[26rem] flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
          <span className="truncate font-mono text-[12px] text-bone-dim">
            <span className={cn("mr-2", methodColor[endpoint.method].split(" ")[0])}>{endpoint.method}</span>
            {endpoint.path}
          </span>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[11px]",
              endpoint.status.startsWith("2") ? "bg-gfp/15 text-gfp" : "bg-cherry/15 text-cherry",
            )}
          >
            {endpoint.status}
          </span>
        </div>
        <p className="border-b border-line px-5 py-3 text-[13px] text-mute">{endpoint.summary}</p>
        {endpoint.request ? (
          <div className="border-b border-line px-5 py-3">
            <p className="type-label text-[9px] text-mute">Request body</p>
            <pre className="mt-2 overflow-x-auto font-mono text-[12px] leading-relaxed">
              {highlight(endpoint.request).map((p, i) => (
                <span key={i} className={p.className}>
                  {p.text}
                </span>
              ))}
            </pre>
          </div>
        ) : null}
        <div className="flex-1 px-5 py-4">
          <p className="type-label text-[9px] text-mute">Response</p>
          <pre className="mt-2 overflow-x-auto font-mono text-[12px] leading-relaxed" aria-live="polite">
            {endpoint.response === "" ? (
              <span className="text-mute">(empty body)</span>
            ) : (
              highlight(shown).map((p, i) => (
                <span key={i} className={p.className}>
                  {p.text}
                </span>
              ))
            )}
            <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-gfp" aria-hidden="true" />
          </pre>
        </div>
      </div>
    </div>
  );
}
