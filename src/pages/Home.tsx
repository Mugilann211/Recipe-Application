import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import AddRecipeForm from "../components/AddRecipeForm";
import RecipeList from "../components/RecipeList";
import EditRecipeForm from "../components/EditRecipeForm";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const recipesRef = ref(database, "recipes");

    // Listen for changes in the "recipes" node
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      const formattedRecipes = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setRecipes(formattedRecipes);
      setFilteredRecipes(formattedRecipes);
    });
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

  const handleEdit = (recipe: any) => {
    setEditMode(true);
    setCurrentRecipeId(recipe.id);
  };

  const handleUpdateRecipe = () => {
    setEditMode(false);
    setCurrentRecipeId(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentRecipeId(null);
  };

  const handleDelete = async (recipeId: string) => {
    const recipeRef = ref(database, `recipes/${recipeId}`);
    await remove(recipeRef);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <AddRecipeForm />
      {editMode && currentRecipeId ? (
        <EditRecipeForm
          recipeId={currentRecipeId}
          onUpdate={handleUpdateRecipe}
          onCancel={handleCancelEdit}
        />
      ) : (
        <RecipeList
          recipes={filteredRecipes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;
