"use server";

import MyCarCard from "./components/my-car-card";
// import FutureModificationsCard from "./components/future-modifications-card";
import ProductLinksCard from "./components/product-links-card";
import FutureModificationsPage from "./components/future-modifications";

export default async function MyCarPage() {
  return (
    <div className="container mx-auto">
      <section className="flex flex-col md:flex-row w-full my-8 gap-8">
        <MyCarCard />
        <ProductLinksCard />
      </section>
      <FutureModificationsPage />
      {/* <FutureModificationsCard /> */}
    </div>
  );
}
