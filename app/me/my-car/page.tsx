"use server";

import MyCarCard from "./components/my-car-card";
import FutureModificationsCard from "./components/future-modifications-card";
import ProductLinksCard from "./components/product-links-card";

export default async function MyCarPage() {
  return (
    <div className="container mx-auto">
      <MyCarCard />
      <section className="flex flex-col md:flex-row w-full mt-8 gap-8">
        <FutureModificationsCard />
        <ProductLinksCard />
      </section>
    </div>
  );
}
