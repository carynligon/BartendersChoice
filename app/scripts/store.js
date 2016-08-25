import Session from './models/session';
import Users from './collections/users';
import Cocktails from './collections/Cocktails';
import Assessment from './models/Assessment';
import Slides from './collections/Slides';
import SearchResults from './collections/SearchResults';
import CustomCocktails from './collections/CustomCocktails';
import SavedForLaterCollection from './collections/SavedForLaterCollection';
import Favorites from './collections/Favorites';
import AllIngredients from './collections/AllIngredients';

export default {
  session: new Session(),
  cocktails: new Cocktails(),
  assessment: new Assessment(),
  slides: new Slides(),
  users: new Users(),
  modalShowing: false,
  searchResults: new SearchResults(),
  customCocktails: new CustomCocktails(),
  savedForLaterCollection: new SavedForLaterCollection(),
  favorites: new Favorites(),
  allIngredients: new AllIngredients(),
  showModal: false
}
