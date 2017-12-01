const Logger = function() {
  this.cvs = document.createElement('canvas');
  this.ctx = this.cvs.getContext('2d');
  this.disabled = false;
  this.init();
}

Logger.prototype = {
  init: function() {
    document.body.append(this.cvs);
    this.setStyle();
  },

  setStyle: function() {
    this.cvs.style.position = 'fixed';
    this.cvs.width = window.innerWidth;
    this.cvs.style.pointerEvents = 'none';
    this.cvs.height = 400;
    this.cvs.style.zIndex = 10;
    this.cvs.style.top = 0;
    this.cvs.style.left = 0;
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
  },

  format: function(value) {
    return Math.floor(value * 10) / 10;
  },

  formatVector: function(vec) {
    return this.format(vec.x) + ', ' + this.format(vec.y) + ', ' + this.format(vec.z);
  },

  disable: function() {
    this.disabled = true;
  },

  print: function() {
    if (!this.disabled) {
      this.clear();

      for (let i=0; i<arguments.length; i+=1) {
        this.ctx.fillText(arguments[i], 20, 20 + i * 20);
      }
    }
  }
};

export default Logger;
