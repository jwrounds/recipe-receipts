package my.projects.recipereceipts;


import my.projects.recipereceipts.model.Recipe;
import my.projects.recipereceipts.repository.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;


@Configuration
public class DataPreload {
    private static final Logger log = LoggerFactory.getLogger(DataPreload.class);

    public DataPreload() { }

    @Bean
    CommandLineRunner initDatabase(RecipeRepository recipeRepository) {
        return args -> {

            if (recipeRepository.findAll().isEmpty()) {

                // Sample recipe one
                ArrayList<String> macAndCheeseIngredients = new ArrayList<>();
                macAndCheeseIngredients.add("Gouda");
                macAndCheeseIngredients.add("Cheddar");
                macAndCheeseIngredients.add("Macaroni");
                macAndCheeseIngredients.add("Cream");
                Recipe macAndCheese = new Recipe("Mac and Cheese", "Creamy and rich macaroni and cheese the whole family will love!", 30, 45, macAndCheeseIngredients);

                log.info("Preloading... " + recipeRepository.insert(macAndCheese));

                // Sample recipe two
                ArrayList<String> smokedPorkIngredients = new ArrayList<>();
                smokedPorkIngredients.add("Pork shoulder");
                smokedPorkIngredients.add("Pork rub");
                smokedPorkIngredients.add("Salt");
                Recipe smokedPork = new Recipe("Smoked Pork", "Tender, falls-off-the-bone smoked pork shoulder!", 25, 300, smokedPorkIngredients);

                log.info("Preloading... " + recipeRepository.insert(smokedPork));

                // Sample recipe three
                ArrayList<String> streetTacosIngredients = new ArrayList<>();
                streetTacosIngredients.add("Chicken breast");
                streetTacosIngredients.add("Corn or flour tortillas");
                streetTacosIngredients.add("Spices");
                streetTacosIngredients.add("Onion");
                streetTacosIngredients.add("Cilantro");
                streetTacosIngredients.add("Fresh limes");
                Recipe streetTacos = new Recipe("Shredded Chicken Street Tacos", "Street tacos loaded with perfectly seasoned shredded chicken, diced onions, and topped with cilantro and lime juice.", 30, 55);

                log.info("Preloading... " + recipeRepository.insert(streetTacos));
            }
        };
    }
}
