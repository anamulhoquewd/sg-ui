import useCategory from "@/app/admin/categories/_hook/useCategory";
import Link from "next/link";

const CategoriesSection = () => {
  const { categories } = useCategory();
  return (
    <section className="container py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Featured Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="group relative overflow-hidden rounded-lg shadow-lg"
          >
            <Link href={`/products?category=${category.slug}`}>
              <div className="h-64 overflow-hidden">
                <img
                  src={category?.avatar}
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                  <span className="text-sm text-white/80 group-hover:underline">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export { CategoriesSection };
