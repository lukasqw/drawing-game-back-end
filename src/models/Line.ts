class Line {
  id: string;
  id_room: string;
  color: string;
  size: number;
  nextPos: {
    x: number;
    y: number;
  };
  lastPos: {
    x: number;
    y: number;
  };
}

export default Line;
