import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import StickyBuyBar from "@/components/StickyBuyBar";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  return product
    ? { title: `${product.name} | Origin Pure`, description: product.tagline }
    : { title: "Product | Origin Pure" };
}

export default function ProductRoute({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) notFound();

  return (
    <>
      <ProductPage product={product} />
      <StickyBuyBar />
    </>
  );
}
