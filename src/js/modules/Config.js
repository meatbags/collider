const Config = {
  system: {
    cacheSize: 10
  },
  quadrants: {
    size: {
      x: 50,
      y: 10,
      z: 50,
    }
  },
  plane: {
    dotBuffer: 0.001 // account for dot product precision limitations
  }
};

export default Config;
