import Line from '../models/Line';

export default interface ICreateLineDTO {
  line: Omit<Line, 'id'>;
}
