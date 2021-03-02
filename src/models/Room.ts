import User from './User';
import Line from './Line';
import Message from './Message';

class Room {
  id: string;
  name: string;
  type: string;
  qty_user: number;
  max_users: number;
  lines: Line[];
  messages: Message[];
  game: boolean;
  game_word: string;
}

export default Room;
