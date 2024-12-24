import React, { useState } from "react";
import { ref, update } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

type EditRecipeFormProps = {
  recipeId: string; // Use `recipeId` instead of `recipe`
  onUpdate: (updatedRecipe: any) => void;
  onCancel: () => void;
};

const EditRecipeForm: React.FC<EditRecipeFormProps> = ({ recipeId, onUpdate, onCancel }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const recipeRef = ref(database, `recipes/${recipeId}`);
    const updatedRecipe = {
      title,
      ingredients,
      steps,
    };
    await update(recipeRef, updatedRecipe);
    onUpdate(updatedRecipe); // Call the onUpdate prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ingredients:</label>
        <input
          type="text"
          value={ingredients.join(", ")}
          onChange={(e) => setIngredients(e.target.value.split(", "))}
          required
        />
      </div>
      <div>
        <label>Steps:</label>
        <textarea
          value={steps.join(". ")}
          onChange={(e) => setSteps(e.target.value.split(". "))}
          required
        />
      </div>
      <button type="submit">Update Recipe</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;
