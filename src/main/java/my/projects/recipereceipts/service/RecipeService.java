package my.projects.recipereceipts.service;

import my.projects.recipereceipts.model.Recipe;
import my.projects.recipereceipts.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public void addRecipe(Recipe recipe) {
        recipeRepository.insert(recipe);
    }

    public void updateRecipe(Recipe recipe) {
        Recipe savedRecipe = recipeRepository.findById(recipe.getId()).
                orElseThrow(() -> new RuntimeException(
                        String.format("Cannot find recipe by ID %s", recipe.getId())));

        savedRecipe.setName(recipe.getName());
        savedRecipe.setDescription(recipe.getDescription());
        savedRecipe.setPrepTimeInMinutes(recipe.getPrepTimeInMinutes());
        savedRecipe.setCookTimeInMinutes(recipe.getCookTimeInMinutes());
        savedRecipe.setIngredientList(recipe.getIngredientList());

        recipeRepository.save(savedRecipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeByName(String name) {
        return recipeRepository.findByName(name).
                orElseThrow(() -> new RuntimeException(
                        String.format("Cannot find recipe by name %s", name)));
    }

    public void deleteRecipe(String id) {
        recipeRepository.deleteById(id);
    }
}

