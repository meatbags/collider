const Config = {
  system: {},
  quadrants: {
    size: {
      x: 100,
      y: 100,
      z: 100
    }
  },
  plane: {
    dotBuffer: 0.001,
    collisionThreshold: 0.5
  },
  sandbox: {
    physics: {
      gravity: 20,
      maxVelocity: 50,
      floor: -1,
      snapUp: 1,
      snapDown: 0.5,
      minSlope: Math.PI / 4,
    },
    player: {
      height: 2,
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: {
        pitch: 0,
        yaw: Math.PI,
        roll: 0,
        maxPitch: Math.PI * 0.25,
        minPitch: Math.PI * -0.25
      },
      speed: {
        normal: 8,
        slowed: 4,
        rotation: Math.PI * 0.75,
        jump: 12,
        fallTimerThreshold: 0.2,
      },
    },
    camera: {
      fov: 60,
      aspect: 1,
      near: 0.1,
      far: 10000,
    },
    adjust: {
      verySlow: 0.01,
      slow: 0.025,
      normal: 0.05,
      fast: 0.09,
      rapid: 0.12,
      veryFast: 0.2,
    }
  }
};

export default Config;
