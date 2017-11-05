const Config = {
  system: {},
  quadrants: {
    size: {
      x: 50,
      y: 50,
      z: 50,
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
        yaw: Math.PI * 0.29,
        roll: 0,
        maxPitch: Math.PI * 0.25,
        minPitch: Math.PI * -0.25
      },
      speed: {
        normal: 9,
        slowed: 5,
        rotation: Math.PI * 0.75,
        jump: 12,
        fallTimerThreshold: 0.1,
      },
      climb: {
        up: 1,
        down: 0.5,
        minPlaneYAngle: 0.55,
      }
    },
    camera: {
      fov: 58,
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
