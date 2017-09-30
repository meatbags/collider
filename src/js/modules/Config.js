const Config = {
  system: {
    collisionCacheSize: 10
  },
  quadrants: {
    size: {
      x: 100,
      y: 100,
      z: 100,
    }
  },
  plane: {
    dotBuffer: 0.0001 // account for dot product precision limitations
  }
};

export default Config;
