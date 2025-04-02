import React, { Suspense } from 'react'

type SearchParams = {
  params: {
    id: string;
  }
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

async function fetchRecipe(api: string) {
  try {
    const res = await fetch(api, { cache: 'no-store' });
    const data = await res.json();
    console.log('data', data)
    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

type IngredientType = {
  original: string
}

async function RecipeContent({ params }: SearchParams) {
  const { id } = params;

  const api = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  console.log(api)
  const recipe = await fetchRecipe(api);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col justify-around gap-6">
      <h1 className="text-3xl font-bold text-gray-900 ">{recipe.title}</h1>
      
      <div className="flex justify-center ">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="">
        <h2 className="text-xl font-semibold text-gray-700">Price per Serving:</h2>
        <p className="text-lg text-gray-600">${recipe.pricePerServing.toFixed(2)}</p>
      </div>

      <div className="">
        <h2 className="text-xl font-semibold text-gray-700">Ingredients:</h2>
        <ul className="list-disc pl-6 space-y-2">
          {recipe.extendedIngredients.map((ingredient: IngredientType, index: number) => (
            <li key={index} className="text-gray-600">{ingredient.original}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 ">Instructions:</h2>
        <p className="text-gray-600 leading-relaxed">{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default async function RecipePage({ params }: SearchParams) {
  return (
    <Suspense fallback={<div>Loading recipe...</div>}>
      <RecipeContent params={params}/>
    </Suspense>
  );
}