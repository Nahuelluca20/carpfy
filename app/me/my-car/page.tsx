"use server";

import MyCarCard from "./components/my-car-card";
import ProductLinksCard from "./components/product-links-card";
import FutureModifications from "./components/future-modifications";
import ProductsLinks from "./components/products-links";

export default async function MyCarPage() {
  return (
    <div className="container mx-auto">
      <section className="flex flex-col md:flex-row w-full my-8 gap-8">
        <MyCarCard />
        <ProductsLinks />
      </section>
      <FutureModifications />
    </div>
  );
}
