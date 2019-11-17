class Keyboard {
  constructor() {
    // keyboard handler

    this.keys = {};
    this._events();
  }

  _events() {
    // hook events

    this.onKeyDown = (e) => {
      // key press

      switch (e.keyCode) {
        case 38: case 87:
          this.keys.up = true;
          break;
        case 37: case 65:
          this.keys.left = true;
          break;
        case 40: case 83:
          this.keys.down = true;
          break;
        case 39: case 68:
          this.keys.right = true;
          break;
        case 32:
          this.keys.jump = true;
          break;
        case 88:
          this.keys.x = true;
        default:
          break;
      }
    };
    this.onKeyUp = (e) => {
      // key release

      switch (e.keyCode) {
        case 38: case 87:
          this.keys.up = false;
          break;
        case 37: case 65:
          this.keys.left = false;
          break;
        case 40: case 83:
          this.keys.down = false;
          break;
        case 39: case 68:
          this.keys.right = false;
          break;
        default:
          break;
      }
    }
    this.pressKey = (key) => {
      // simulate key press

      this.keys[key] = true;
    };
    this.releaseKey = (key) => {
      // simulate key release

      this.keys[key] = false;
    };
  }
}

export { Keyboard };
