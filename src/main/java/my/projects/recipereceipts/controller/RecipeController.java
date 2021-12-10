package my.projects.recipereceipts.controller;

import my.projects.recipereceipts.model.Recipe;
import my.projects.recipereceipts.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<?> addRecipe(@RequestBody Recipe recipe) {
        recipeService.addRecipe(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping
    public ResponseEntity<Object> updateRecipe(@RequestBody Recipe recipe) {
        recipeService.updateRecipe(recipe);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{name}")
    public ResponseEntity<Recipe> getRecipeByName(@PathVariable String name) {
        return ResponseEntity.ok(recipeService.getRecipeByName(name));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/view/{id}")
    public ResponseEntity<Object> getRecipeById(@PathVariable String id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable String id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
