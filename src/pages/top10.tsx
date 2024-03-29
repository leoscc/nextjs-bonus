import SEO from "@/components/SEO";
import { GetStaticProps } from "next";

interface IProduct {
  id: string;
  title: string;
}

interface ITop10Props {
  products: IProduct[];
}

export default function top10({ products }: ITop10Props) {
  return (
    <div>
      <SEO title="top10" />

      <h1>Top 10</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ITop10Props> = async (context) => {
  const response = await fetch("http://localhost:3333/products");
  const products = await response.json();

  return {
    props: {
      products,
    },
  };
};
