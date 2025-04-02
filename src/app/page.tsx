"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const options = [
  { value: "", label: "Choose the cuisine", disabled: true },
  { value: "French", label: "French" },
  { value: "Indian", label: "Indian" },
  { value: "Spanish", label: "Spanish" },
  { value: "Italian", label: "Italian" },
];

const inputClassname = "bg-gray-50 text-black h-12 block rounded-lg p-4 w-full";

export default function Home() {
  const [prepTime, setPrepTime] = useState<number>();
  const [cuisineOptions, setCuisineOptions] = useState<string>("");
  const [recipeQuery, setRecipeQuery] = useState<string>("");
  const router = useRouter();

  const optionChoosed = !!prepTime || !!cuisineOptions || !!recipeQuery;

  const handlePrepTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    if (/^\d*$/.test(value) && Number(value) >= 0) {
      if (value.startsWith('0')) {
        setPrepTime(Number(value.slice(1)));
      } else {
        setPrepTime(+value);
      }
    }
  };

  const submitFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/recipes?query=${recipeQuery}&cuisine=${cuisineOptions}&prepTime=${prepTime}`);
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form 
        className="w-84 h-104 flex bg-gray-800 rounded-2xl flex flex-col p-3 justify-around items-center"
        onSubmit={submitFunc}
      >
        <h1 className="text-xl font-bold">Find recipe</h1>
        <div className="w-full flex flex-col justify-around gap-4">
          <input
            type="number"
            name="number"
            id="number"
            placeholder="Max preparation time"
            value={prepTime}
            min={1}
            className={inputClassname}
            onChange={handlePrepTime}
          />
          <select 
            id="cuisine" 
            name="cuisine"
            defaultValue='' 
            className={inputClassname}
            onChange={(e) => setCuisineOptions(e.target.value)}
          >
            {options.map(option => (
              <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
          </select>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Recipe query"
            value={recipeQuery}
            className={inputClassname}
            onChange={(e) => setRecipeQuery(e.target.value)}
          />
        </div>
        <button 
          type="submit"
          value="next" 
          className="h-4 bg-blue-700 cursor-pointer rounded-lg h-10 w-full disabled:opacity-60 disabled:cursor-not-allowed font-bold" 
          disabled={!optionChoosed}
        >
          Next
        </button>
      </form>
    </div>
  );
}
