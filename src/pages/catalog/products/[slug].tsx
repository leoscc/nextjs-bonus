import { useRouter } from "next/router";

const Products: React.FC = () => {
  const router = useRouter();

  return <h1>{router.query.slug}</h1>;
};

export default Products;
