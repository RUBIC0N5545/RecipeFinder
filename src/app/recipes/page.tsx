import Link from "next/link";
import { Suspense } from "react";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

type RecipesQueryType = {
  searchParams: {
    query: string;
    cuisine: string;
    prepTime: string;
  };
};

type Recipe = {
  id: number;
  image: string;
  imageType: string;
  title: string;
};

async function fetchRecipes(api: string) {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function RecipesPageContent({ searchParams }: RecipesQueryType) {
  const { query, cuisine, prepTime } = searchParams;

  const api = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisine}&maxReadyTime=${prepTime}&apiKey=${apiKey}`;
  const recipes = await fetchRecipes(api);

  return (
    <div>
      <h1 className="text-center text-6xl mt-3">{cuisine} Recipes under {prepTime} minutes</h1>
      {query && <h2 className="text-3xl">Query: {query}</h2>}

      <div className="mb-8"></div>
      <ul className="flex flex-wrap gap-6 justify-center">
        {recipes.map((recipe: Recipe) => (
          <Link
            href={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="flex flex-col w-64 bg-white rounded-lg overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold text-gray-800 p-4 truncate">
              {recipe.title}
            </h2>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default function RecipesPage({ searchParams }: RecipesQueryType) {
  return (
    <Suspense fallback={<div>Loading recipes...</div>}>
      <RecipesPageContent searchParams={searchParams} />
    </Suspense>
  );
}
