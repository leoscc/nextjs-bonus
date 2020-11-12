import Link from "next/link";
import { GetServerSideProps } from "next";
import PrismicDOM from "prismic-dom";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";

import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import { Title } from "@/styles/pages/Home";

interface IHomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  return (
    <div>
      <SEO title="DevCommerce, the best e-commerce" shouldExcludeTitleSuffix />

      <Title>Hello Next</Title>

      <ul>
        {recommendedProducts.map((recommendedProduct) => (
          <li key={recommendedProduct.id}>
            <Link href={`/catalog/products/${recommendedProduct.uid}`}>
              <a>{PrismicDOM.RichText.asText(recommendedProduct.data.title)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
