#### elevator pitch:
  - My app will be a mixology search-based application where users can learn to make particular cocktails or be recommended one based on the outputted data of a Traitify personality assessment.

#### MVP
  - The minimum viable product of this project will include a list of all the drinks. You can click on a drink and view the recipe. It will also include a personality assessment that returns a cocktail based on the score of your assessment.
    - List of all drinks
    - View individual drink and recipe
    - Get a drink recommendation based on the outcome of Traitify's personality assessment.


#### basic features:
  - Search Feature: This feature will begin by the user narrowing their search down to a specific spirit. Then, they will be able to filter results by tasting notes, skill level, ingredients, etc. Results will be able to be browsed as soon as they specify spirit, unless they select a 'view all' option
  - Bartender's(psychologist's?) Choice Feature: This feature will prompt the user to take a 2-3 minute Traitify assessment to determine their core personality traits. Based on the outcome of the assessment, they will randomly be given a cocktail that matched their data (based on tagged traits given to each cocktail).
  - Cocktail of the week: This will just be a randomly chosen cocktail that will change every 7th day of the month.
  - User Profiles:
    - Made log: Each user will have a "made log" where they can keep track of cocktail recipes they've tried and include notes (and maybe images)
    - Save for later: Only users who have made an account will be able to save cocktails that they'd eventually like to make, this list will be available on their profile dashboard
    - Custom creations: Users with accounts will be able to create custom cocktails and have them added to the collection. The option to create a custom cocktail will be available on their profile as well as on the home search page only if they are logged in.
  - Appendix: Much like a "docs" section. The appendix will breakdown terminology used in recipes to make them very easy for anyone to make - recipes will have links to parts of this appendix when necessary.


#### API's:
  - Kinvey
    - Endpoints
      - users
      - cocktails


  - Traitify - proving ability in main.js file of this repo



#### data modeling:
- Cocktail Collection:
  ```javascript
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/cocktails`,
  model: Cocktail
  ```

- Cocktail Model
  ```javascript
  urlRoot:`https://baas.kinvey.com/appdata/${settings.appKey}/cocktails`,
  name: 'Negroni',
  skill_level: 2,
  ingredients: [
    {
      ingredient: 'Campari',
      quantity: '1 oz',
      type: 'apéritif'
    },
    {
      ingredient: 'Gin',
      quantity: '1 oz',
      type: liquor
    },
    {
      ingredient: 'Orange Peel',
      quantity: '1',
      type: garnish
    }
  ],
  traits: {
      Adventurous: 3,
      Charismatic: 3,
      Mellow: 2,
      Rational: 3,
      Reliable: 4,
      Social: 2,
      Thoughtful: 4
  },
  howTo: {
      step1: `Combine gin, Campari, and Sweet Vermouth in an ice-filled Old Fashioned glass`,
      step2: `Stir gently`,
      step3: `Garnish with orange peel`
  }
  ```

- Ingredients Collection
    - Rather than the above model, I would use join tables in Kinvey and assign ingredients to the necessary cocktails. Each ingredient would have many relations. I am hoping to structure the data like this but for my mind's sake, I wrote out how I'd like the final data to look in a cocktail. But for this, each ingredient would like one of the objects in the ingredients array along with a belongsTo key, which is an array of cocktail id's.


  - Search Result Collection
  ```javascript
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/search`,
  model: SearchMod
  ```

  - Search Result Model
  ```javascript
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/search`,
  idAttribute: 'id'
  ```

  - Assessment Model
  ```javascript
  urlRoot: `https://api.traitify.com/v1/assessments`,
  assessmentId: 'acff3436-2801-4b13-90b3-25eeeceffba9',
  deck_id: 'core',
  created_at: 234435646445
  ```

  - Question Collection
  ```javascript
  url: `https://api.traitify.com/v1/assessments/${assessment_id}/slides`,
  model: QuestionMod
  ```
  - Question Model
  ```javascript
  urlRoot: `https://api.traitify.com/v1/assessments/${assessment_id}`,
  id: '7c3f284b-a4f3-408c-83b6-e6ba5f8f9d88',
  completed_at: 324234324,
  personality_blend: [
    {
      personality_trait: 'adventurous',
      score: 56
    },
    {
      personality_trait: 'charismatic',
      score: 77
    },
    {
      personality_trait: 'mellow',
      score: 43
    },
    {
      personality_trait: 'rational',
      score: 88
    },
    {
      personality_trait: 'reliable',
      score: 96
    },
    {
      personality_trait: 'social',
      score: 36
    },
    {
      personality_trait: 'thoughtful',
      score: 31
    },
  ]
  ```

  - Appendix Collection
  ```javascript
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/appendix`,
  model: AppendixMod
  ```

  - Appendix Item Model
  ```javascript
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/appendix`,
  term: 'Apéritif',
  explanation: 'An apéritif is an alcoholic beverage usually served before a meal to stimulate the appetite. It is usually dry rather than sweet.',
  type: 'term'
  ```

  - Session Model
  ```javascript
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  defaults: {
    username: '',
  }
  traits: {
    Adventurous: 1,
    Charismatic: 3,
    Mellow: 5,
    Rational: 3,
    Reliable: 1,
    Social: 3,
    Thoughtful: 4
  }
  ```

  - User Collection
  ```javascript
  url: `https://baas.kinvey.com/user/${settings.appKey}`,
  model: UserMod
  ```
  - User Model
  ```javascript
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}`,
  defaults: {
    username: '',
    authtoken: ''
  }
  ```

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
