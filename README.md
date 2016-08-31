#### elevator pitch:
  - My app is a mixology search-based application where you can learn to make particular cocktails or be recommended one based on the outputted data of a Traitify personality assessment.

#### MVP
  - The minimum viable product of this project will include a list of all the drinks. You can click on a drink and view the recipe. It will also include a personality assessment that returns a cocktail based on the score of your assessment.
    - List of all drinks
    - View individual drink and recipe
    - Get a drink recommendation based on the outcome of Traitify's personality assessment.


#### basic features:
  - Search Feature: This feature will begin by the user narrowing their search down to a specific spirit. Then, they will be able to filter results by tasting notes, skill level, ingredients, etc. Results will be able to be browsed as soon as they specify spirit, unless they select a 'view all' option
  - Bartender's Choice Feature: This feature will prompt the user to take a 2-3 minute Traitify assessment to determine their core personality traits. Based on the outcome of the assessment, they will randomly be given a cocktail that matched their data (based on tagged traits given to each cocktail).
  - User Profiles:
    - Save for later: Only users who have made an account will be able to save cocktails that they'd eventually like to make, this list will be available on their profile dashboard
    - Favorites: Cocktails users have tried and would like to save
    - Custom recipes: Users with accounts will be able to create custom cocktails and have them added to the collection. The option to create a custom cocktail will be available on their profile as well as on the home search page only if they are logged in.



#### API's:
  - Kinvey
    - Endpoints
      - users
      - cocktails
      - drinkIngredients (join table)
      - ingredients
      - Favorites (join table)
      - SavedForLater (join table)


  - [CocktailDB](http://www.cocktaildb.com/) - cocktail database
  - [Traitify](https://www.traitify.com/) - personality API


#### Routes
```
Confirm over 21: /confirm
Home/Search: /
Recipe: /recipe/:cocktails
Bartender's Choice: /surprise
  Test Results: /surprise/results
Profile: /profile/:user
Login: /login
Signup: /signup
Appendix: /appendix
Sorted Appendix: /appendix/:type
NotFound: /oops
```
