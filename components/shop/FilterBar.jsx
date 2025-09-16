"use client";

import { Check, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function FilterBar({
  formats = [],
  format,
  setFormat,
  q,
  setQ,
  sort,
  setSort,
  resultCount = 0,
}) {
  const searchInputRef = useRef(null);

  const filtersApplied =
    (format && format !== "all") ||
    (q && q.trim() !== "") ||
    (sort && sort !== "featured");

  const resetFilters = () => {
    setFormat("all");
    setQ("");
    setSort("featured");
    searchInputRef.current?.blur();
  };

  return (
    <div className="bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px] mb-16">
      <div className="relative rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl px-4 py-3">
        {filtersApplied ? (
          <div className="absolute -top-2.5 right-5 rounded-full bg-black backdrop-blur px-3 py-1 leading-none text-[11px] font-semibold text-secondary-100 shadow">
            {resultCount} result{resultCount === 1 ? "" : "s"}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 scrollbar-none">
            {filtersApplied ? (
              <button
                onClick={resetFilters}
                aria-label="Clear filters"
                title="Clear filters"
                className="inline-grid place-items-center size-9 rounded-xl bg-primary/15 text-primary hover:bg-primary/20 transition"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="inline-grid place-items-center size-9 rounded-xl bg-primary/15 text-primary shrink-0">
                <Filter className="w-4 h-4" />
              </span>
            )}

            <div className="flex flex-wrap gap-2">
              {formats.map((f) => {
                const active = format === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => {
                      if (f.key === "all") {
                        resetFilters();
                      } else {
                        setFormat(active ? "all" : f.key);
                      }
                    }}
                    aria-pressed={active}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-primary/25 ${
                      active
                        ? "bg-primary text-secondary-950 shadow"
                        : "bg-white/80 text-secondary-900 border border-white/50 shadow-inner hover:bg-white"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-500" />
              <input
                ref={searchInputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title or author"
                className="w-[220px] md:w-[260px] rounded-xl border border-white/50 bg-white/85 pl-9 pr-9 py-2.5 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/25"
              />
              {q ? (
                <button
                  onClick={() => {
                    setQ("");
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/5 text-secondary-500"
                  aria-label="Clear search"
                  title="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <SortDropdown sort={sort} setSort={setSort} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SortDropdown({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const listRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const options = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price low to high" },
    { value: "price-desc", label: "Price high to low" },
  ];

  const curIndex = Math.max(
    0,
    options.findIndex((o) => o.value === sort)
  );
  const current = options[curIndex] ?? options[0];

  useEffect(() => {
    const onDoc = (e) => {
      if (
        !btnRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const openMenu = () => {
    setActiveIdx(curIndex);
    setOpen(true);
    requestAnimationFrame(() => listRef.current?.focus());
  };

  const closeMenu = () => {
    setOpen(false);
    btnRef.current?.focus();
  };

  const choose = (idx) => {
    const opt = options[idx];
    if (!opt) return;
    setSort(opt.value);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(activeIdx);
    }
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : openMenu())}
        className="inline-flex items-center gap-2 w-[220px] md:w-[240px] justify-between rounded-xl border border-white/50 bg-white/85 pl-9 pr-3 py-2.5 text-sm text-secondary-900 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/25"
      >
        <span className="pointer-events-none absolute left-3">
          <SlidersHorizontal className="h-4 w-4 text-secondary-500" />
        </span>
        <span className="truncate">{current.label}</span>
        <span className="text-secondary-500 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open ? (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`sort-opt-${activeIdx}`}
          onKeyDown={onKeyDown}
          className="absolute right-0 z-20 mt-2 min-w-[220px] w-[220px] md:w-[240px] overflow-hidden rounded-xl border border-white/60 bg-white/95 backdrop-blur shadow-xl ring-1 ring-black/5"
        >
          {options.map((opt, i) => {
            const selected = opt.value === sort;
            const active = i === activeIdx;
            return (
              <li key={opt.value} role="option" aria-selected={selected}>
                <button
                  id={`sort-opt-${i}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => choose(i)}
                  className={`w-full text-left px-3.5 py-2.5 text-sm flex items-center gap-2 btn
                    ${active ? "bg-primary/10" : ""}
                    ${
                      selected
                        ? "font-semibold text-secondary-900"
                        : "text-secondary-800"
                    }`}
                >
                  <span className="inline-flex size-5 items-center justify-center rounded-md">
                    {selected ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : null}
                  </span>
                  <span className="truncate">{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
