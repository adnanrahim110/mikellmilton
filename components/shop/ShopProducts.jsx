"use client";

import FilterBar from "@/components/shop/FilterBar";
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { BOOKS } from "@/constants";
import { addToCart } from "@/lib/cartSlice";
import { toast } from "@/utils/toast";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
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
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);

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
  const uniqueFromItems = useMemo(
    () =>
      Array.from(new Set(items.map((p) => canonType(p.type)).filter(Boolean))),
    [items]
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

    const search = q.trim().toLowerCase(); // use live query for UI
    const byQuery = search
      ? byFormat.filter((p) =>
          [p.title, p.author, canonType(p.type)]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(search)
        )
      : byFormat;

    let out = byQuery;
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [items, format, q, sort]);

  const cartIdSet = useMemo(
    () => new Set(cartItems?.map((i) => i.id) ?? []),
    [cartItems]
  );
  const getId = (p) =>
    p.id ?? `${slugify(p.title)}-${slugify(canonType(p.type))}`;

  const handleAdd = (p) => {
    const id = getId(p);
    if (cartIdSet.has(id)) return;
    dispatch(
      addToCart({
        id,
        title: p.title,
        price: Number(p.price || 0),
        image: p.img,
        quantity: 1,
        mode: p.mode,
      })
    );
    toast.success(`Added "${p.title}" to cart`);
  };

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.06 } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: 16,
      scale: 0.98,
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
    },
  };

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
          </div>
        </div>

        <FilterBar
          formats={formats}
          format={format}
          setFormat={setFormat}
          q={q}
          setQ={setQ}
          sort={sort}
          setSort={setSort}
          resultCount={filtered.length}
        />

        <motion.div
          layout
          initial={false}
          animate="animate"
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => {
              const id = getId(p);
              const isInCart = cartIdSet.has(id);
              return (
                <motion.div
                  layout
                  key={id}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ layout: { duration: 0.3 } }}
                  className="relative overflow-hidden rounded-2xl border border-white/45 bg-white/80 backdrop-blur-md ring-1 ring-black/5 shadow-2xl"
                  style={{ willChange: "transform" }}
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
                    <Button
                      tone={isInCart ? "cart" : "dark"}
                      disabled={isInCart}
                      onClick={() => handleAdd(p)}
                      className="w-full rounded-xl mt-1"
                    >
                      {isInCart ? "Added" : "Add to cart"}
                      <ShoppingCart className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                </motion.div>
              );
            })}
          </AnimatePresence>
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
