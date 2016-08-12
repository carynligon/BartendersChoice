import Session from './models/session';
import Cocktails from './collections/Cocktails';

export default {
  session: new Session(),
  cocktails: new Cocktails()
}
