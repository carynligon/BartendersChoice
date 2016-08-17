import Session from './models/session';
import Users from './collections/users';
import Cocktails from './collections/Cocktails';
import Assessment from './models/Assessment';
import Slides from './collections/Slides';

export default {
  session: new Session(),
  cocktails: new Cocktails(),
  assessment: new Assessment(),
  slides: new Slides(),
  users: new Users(),
  modalShowing: false
}
