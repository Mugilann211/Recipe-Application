import React from "react";

type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
};

type RecipeListProps = {
  recipes: Recipe[];
  onEdit: (recipe: Recipe) => void; // Edit handler
  onDelete: (recipeId: string) => void; // Delete handler
};

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onEdit, onDelete }) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>Ingredients: {recipe.ingredients.join(", ")}</p>
          <p>Steps: {recipe.steps.join(". ")}</p>
          <button onClick={() => onEdit(recipe)}>Edit</button>
          <button onClick={() => onDelete(recipe.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
