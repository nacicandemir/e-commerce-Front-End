import Heading from "../general/Heading";
import ProductCard from "./ProductCards";
import getProducts from "@/app/actions/getProducts";

const Products = async() => {
  const products = await getProducts({ category: null, search: null });
  return (
    <div>
      <Heading className="pt-25" text="Tüm Ürünler" />
      <div className="flex items-center flex-wrap gap-3 md:gap-10 px-3 md:px-10 mb-4">
        {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </div>
  );
};

export default Products;