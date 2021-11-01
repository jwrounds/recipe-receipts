package my.projects.recipereceipts.repository;

import my.projects.recipereceipts.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
    @Query("{'name' : ?0}")
    Optional<Recipe> findByName(String name);
}
