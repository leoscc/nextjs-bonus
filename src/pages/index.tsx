import SEO from "@/components/SEO";
import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";
// import SEO from "@/components/SEO";

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  return (
    <div>
      <SEO title="DevCommerce, the best e-commerce" shouldExcludeTitleSuffix />

      <Title>Hello Next</Title>

      <ul>
        {recommendedProducts.map((recommendedProduct) => (
          <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch("http://localhost:3333/recommended");
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
