function Canvas(samplename) {
    this.el = document.createElement('div');
    this.el.className = 'canvas-wapper';
    this.header = document.createElement('div');
    this.header.className = 'canvas-header';
    this.header.innerText = samplename;
    this.el.appendChild(this.header);
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'canvas-cvs';
    this.el.appendChild(this.canvas);
}

Canvas.prototype.change = function(sample) {

}

export default Canvas;