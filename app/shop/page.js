import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop | Mikell Milton",
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm opacity-70">Loading shop…</div>}>
      <ShopClient />
    </Suspense>
  );
}
