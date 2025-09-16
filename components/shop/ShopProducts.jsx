"use client";

import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { BOOKS } from "@/constants";
import {
  Filter,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

/* helpers */
function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
function canonType(raw) {
  const x = slugify(raw);
  if (x === "ebook" || x === "ebooks" || x === "digital" || x === "kindle")
    return "eBook";
  if (x === "audiobook" || x === "audiobooks" || x === "audio")
    return "Audiobook";
  if (x === "paperback" || x === "softcover" || x === "softback")
    return "Paperback";
  if (
    x === "hardcover" ||
    x === "hardback" ||
    x === "casewrap" ||
    x === "casebound"
  )
    return "Hardcover";
  return String(raw || "").trim();
}
function useDebouncedValue(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

const ShopProducts = ({
  eyebrow = "Catalog",
  title = "All products",
  items = BOOKS || [],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const seededFormat = canonType(params.get("format") || "all") || "all";
  const [format, setFormat] = useState(seededFormat);
  const [q, setQ] = useState(params.get("q") || "");
  const [sort, setSort] = useState(params.get("sort") || "featured");
  const dq = useDebouncedValue(q, 300);

  useEffect(() => {
    const next = new URLSearchParams();
    if (format && format !== "all") next.set("format", slugify(format));
    if (dq.trim()) next.set("q", dq.trim());
    if (sort && sort !== "featured") next.set("sort", sort);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [format, dq, sort, pathname, router]);

  const preferredOrder = ["Paperback", "Hardcover", "eBook", "Audiobook"];
  const uniqueFromItems = Array.from(
    new Set(items.map((p) => canonType(p.type)).filter(Boolean))
  );
  const ordered = [
    ...preferredOrder.filter((t) => uniqueFromItems.includes(t)),
    ...uniqueFromItems.filter((t) => !preferredOrder.includes(t)),
  ];
  const formats = [{ key: "all", label: "All" }].concat(
    ordered.map((t) => ({ key: t, label: t }))
  );

  const filtered = useMemo(() => {
    const byFormat =
      format === "all"
        ? items
        : items.filter((p) => canonType(p.type) === format);
    const byQuery = dq.trim()
      ? byFormat.filter((p) =>
          [p.title, p.author, canonType(p.type)]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(dq.trim().toLowerCase())
        )
      : byFormat;
    let out = byQuery;
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [items, format, dq, sort]);

  const searchInputRef = useRef(null);

  return (
    <section id="products" className="relative py-[90px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>

      <div className="container">
        <div className="mb-8 space-y-3">
          <Subtitle tone="dark">{eyebrow}</Subtitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <Title className="text-[clamp(28px,5.2vw,44px)]">{title}</Title>
            <div className="text-sm text-secondary-600">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px] mb-16">
          <div className="rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl px-4 py-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="inline-grid place-items-center size-9 rounded-xl bg-primary/15 text-primary shrink-0">
                  <Filter className="w-4 h-4" />
                </span>
                <div className="flex flex-wrap gap-2">
                  {formats.map((f) => {
                    const active = format === f.key;
                    return (
                      <button
                        key={f.key}
                        onClick={() => {
                          if (f.key === "all") {
                            setFormat("all");
                            setQ("");
                            setSort("featured");
                            searchInputRef.current?.blur();
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

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <SlidersHorizontal className="h-4 w-4 text-secondary-500" />
                  </span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none w-[200px] rounded-xl border border-white/50 bg-white/85 pl-9 pr-8 py-2.5 text-sm text-secondary-900 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/25"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price low to high</option>
                    <option value="price-desc">Price high to low</option>
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary-500 text-xs">
                    ▼
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p, i) => (
            <motion.div
              key={`${p.title}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="relative overflow-hidden rounded-2xl border border-white/45 bg-white/80 backdrop-blur-md ring-1 ring-black/5 shadow-2xl"
            >
              <div className="w-full overflow-hidden">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-bold text-secondary-900 line-clamp-1">
                    {p.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2">
                    <strong className="text-neutral-500">Price:</strong>
                    <span className="text-primary font-bold">
                      ${Number(p.price || 0).toFixed(2)}
                    </span>
                  </div>
                  <span className="inline-flex items-center justify-center rounded-md bg-primary/15 text-primary px-2.5 py-1 text-xs font-semibold">
                    {canonType(p.type)}
                  </span>
                  {p.badge ? (
                    <span className="inline-flex items-center justify-center rounded-md bg-black/5 text-secondary-700 px-2.5 py-1 text-xs">
                      {p.badge}
                    </span>
                  ) : null}
                </div>
                <Button href="/" tone="dark" className="w-full rounded-xl mt-1">
                  Add to cart
                  <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-secondary-600">
            Nothing matches your filters. Try different settings.
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopProducts;
