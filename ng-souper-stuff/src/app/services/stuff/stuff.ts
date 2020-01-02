import {StuffImg} from '../images/stuff-img';
import {History} from '../history/history';

export class Stuff {
  id?: string;
  active: boolean;
  name: string;
  note: string;
  rating: number;
  count: number;
  price?: string;
  lastUpdated: any; // Firebase Timestamp
  tags: any; // Firebase Map
  publicStation?: string;
  street?: string;
  images?: StuffImg[];
  history?: History[];
}
