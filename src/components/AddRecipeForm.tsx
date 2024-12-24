import React, { useState } from "react";
import { database } from "../firebase/firebaseConfig";
import { ref, push } from "firebase/database";

const AddRecipeForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !ingredients || !steps) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const recipesRef = ref(database, "recipes"); // Reference to 'recipes' node
      await push(recipesRef, {
        title,
        ingredients: ingredients.split(",").map((item) => item.trim()),
        steps: steps.split(".").map((item) => item.trim()),
      });
      console.log("Recipe added successfully!");
      setTitle(""); // Reset form fields
      setIngredients("");
      setSteps("");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Recipe</h3>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <textarea
        placeholder="Steps (period-separated)"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
