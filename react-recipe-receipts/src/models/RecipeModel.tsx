class Recipe  {
  [index: string]: number | string | string[];
  id!: string;
  name: string;
  description: string;
  instructions: string;
  prepTimeInMinutes: number;
  cookTimeInMinutes: number;
  ingredientList: string[];

  constructor(name = '', description = '', instructions = '', prepTimeInMinutes = 0, cookTimeInMinutes = 0, ingredientsList = []) {
    this.name = name;
    this.description = description;
    this.instructions = instructions;
    this.prepTimeInMinutes = prepTimeInMinutes;
    this.cookTimeInMinutes = cookTimeInMinutes;
    this.ingredientList = ingredientsList;
  }
}

export { Recipe as RecipeModel };