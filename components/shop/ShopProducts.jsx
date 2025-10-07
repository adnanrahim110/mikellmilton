"use client";

import { fetchDopeBooksFromDB } from "@/components/checkout/helpers";
import FilterBar from "@/components/shop/FilterBar";
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { addToCart } from "@/lib/cartSlice";
import { toast } from "@/utils/toast";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressiveImage from "../ui/ProgressiveImage";
import Skeleton from "../ui/Skeleton";

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

const ShopProducts = ({ eyebrow = "Catalog", title = "All products" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);

  const seededFormat = (params.get("format") || "all").trim() || "all";
  const [format, setFormat] = useState(seededFormat);
  const [q, setQ] = useState(params.get("q") || "");
  const [sort, setSort] = useState(params.get("sort") || "featured");

  const [itemsState, setItemsState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const next = new URLSearchParams();
    if (format && format !== "all") next.set("format", slugify(format));
    if (q.trim()) next.set("q", q.trim());
    if (sort && sort !== "featured") next.set("sort", sort);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [format, q, sort, pathname, router]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await fetchDopeBooksFromDB();
        if (alive) setItemsState(rows);
      } catch {
        if (alive) setItemsState([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const preferredOrder = ["Paperback", "Hardcover", "eBook", "Audiobook"];
  const uniqueFromItems = useMemo(
    () =>
      Array.from(
        new Set(
          itemsState.map((p) => String(p.type || "").trim()).filter(Boolean)
        )
      ),
    [itemsState]
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
        ? itemsState
        : itemsState.filter((p) => String(p.type || "").trim() === format);

    const search = q.trim().toLowerCase();
    const byQuery = search
      ? byFormat.filter((p) =>
          [p.title, p.author, p.type]
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
  }, [itemsState, format, q, sort]);

  const cartIdSet = useMemo(
    () => new Set(cartItems?.map((i) => i.id) ?? []),
    [cartItems]
  );
  const getId = (p) =>
    p.id || p.sku || `${slugify(p.title)}-${slugify(p.type)}`;

  const handleAdd = (p) => {
    const id = getId(p);
    if (cartIdSet.has(id)) return;
    dispatch(
      addToCart({
        id,
        sku: p.sku || id,
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 "
        >
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <motion.div
                key={`s-${i}`}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ layout: { duration: 0.3 } }}
              >
                <Skeleton className="w-full aspect-[415/613]" />
              </motion.div>
            ))
          ) : (
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
                      <ProgressiveImage
                        width={415}
                        height={613}
                        priority
                        src={p.img}
                        alt={p.title}
                        className="aspect-square object-contain"
                      />
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
                          {p.type}
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
          )}
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
