import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

interface ICategory {
  id: string;
  title: string;
}

interface ICategoryProps {
  categories: ICategory[];
}

export default function Category({ categories }: ICategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>carregando...</p>;
  }

  return (
    <div>
      <h1>Category</h1>
      <p>{router.query.slug}</p>

      <hr />
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  const paths = categories.map((category) => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ICategoryProps> = async (
  context
) => {
  const { slug } = context.params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${slug}`
  );
  const categories = await response.json();

  const oneMinute = 60;

  return {
    props: {
      categories,
    },
    revalidate: oneMinute,
  };
};
