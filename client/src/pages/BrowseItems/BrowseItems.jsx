import AllItems from "../../components/BrowseItems/AllItems";

const BrowseItems = () => {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Campus Lost & Found
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Browse Items
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore recently reported lost and found items
              across the campus. If you recognize an item,
              open its details to learn how you can claim it.
            </p>
          </div>

        </div>
      </section>

      {/* All Items */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AllItems />
      </section>

    </main>
  );
};

export default BrowseItems;