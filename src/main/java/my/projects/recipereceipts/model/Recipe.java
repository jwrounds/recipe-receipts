package my.projects.recipereceipts.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@Document("recipes")
public class Recipe {

    @Id
    private String id;

    @Indexed(unique = true)
    private String name;

    private String description;

    @Field(name = "prepTime")
    private double prepTimeInMinutes;

    @Field(name = "cookTime")
    private double cookTimeInMinutes;

    private ArrayList<String> ingredientList;

    public Recipe(String name, String description, double prepTimeInMinutes, double cookTimeInMinutes, ArrayList<String> ingredientList) {
        this.name = name;
        this.description = description;
        this.prepTimeInMinutes = prepTimeInMinutes;
        this.cookTimeInMinutes = cookTimeInMinutes;
        this.ingredientList = ingredientList;
    }

    public Recipe(String name, String description, double prepTimeInMinutes, double cookTimeInMinutes) {
        this.name = name;
        this.description = description;
        this.prepTimeInMinutes = prepTimeInMinutes;
        this.cookTimeInMinutes = cookTimeInMinutes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrepTimeInMinutes() {
        return prepTimeInMinutes;
    }

    public void setPrepTimeInMinutes(double prepTimeInMinutes) {
        this.prepTimeInMinutes = prepTimeInMinutes;
    }

    public double getCookTimeInMinutes() {
        return cookTimeInMinutes;
    }

    public void setCookTimeInMinutes(double cookTimeInMinutes) {
        this.cookTimeInMinutes = cookTimeInMinutes;
    }

    public ArrayList<String> getIngredientList() {
        return ingredientList;
    }

    public void setIngredientList(ArrayList<String> ingredientList) {
        this.ingredientList = ingredientList;
    }
}
