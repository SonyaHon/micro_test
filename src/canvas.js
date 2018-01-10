function Canvas(samplename, audioCtx) {
    this.audioContext = audioCtx;
    this.el = document.createElement('div');
    this.el.className = 'canvas-wapper';
    this.header = document.createElement('div');
    this.header.className = 'canvas-header';
    this.header.innerText = samplename;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'canvas-cvs';
    this.el.appendChild(this.header);
    this.el.appendChild(this.canvas);


    setTimeout(function () {
        console.log('Canvas loaded');
        this.canvas.setAttribute('height', this.canvas.clientHeight);
        this.canvas.setAttribute('width', this.canvas.clientWidth);
    }.bind(this), 10);

}

Canvas.prototype.change = function(sample) {
    if(sample) {
        this.analyser && this.analyser.disconnect();
        this.source && this.source.disconnect();
        if (sample.micro_name) {
            this.header.innerText = sample.micro_name;
        }
        this.sample = sample;
        this.source = sample.nnode;
        this.analyser = this.audioContext.createAnalyser();
        this.source.connect(this.analyser);

        this.analyser.fftSize = 2048;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyser.getByteTimeDomainData(this.dataArray);

        this.canvasCtx = this.canvas.getContext('2d');
        this.HEIGHT = this.canvas.height;
        this.WIDTH = this.canvas.width;

        this.sample.audioNode.currentTime = 0;
    }
    else {
        // TODO: change to real micro
        this.analyser && this.analyser.disconnect();
        this.source && this.source.disconnect();
        navigator.getUserMedia({audio: true}, function (stream) {
            this.source = window.audioContext.createMediaStreamSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            this.source.connect(this.analyser);
            this.analyser.connect(window.audioContext.destination);
            this.header.innerText = 'microphone';

            this.canvasCtx = this.canvas.getContext('2d');
            this.HEIGHT = this.canvas.height;
            this.WIDTH = this.canvas.width;

            this.proccess();
        }.bind(this), function (evt) {
            console.log(evt);
        });
    }
};

Canvas.prototype.proccess = function() {
    this.HEIGHT = this.canvas.height;
    this.WIDTH = this.canvas.width;

    this.analyser.fftSize = 256;
    let bufferLengthAlt = this.analyser.frequencyBinCount;
    let dataArrayAlt = new Uint8Array(bufferLengthAlt);

    this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);



    let self = this;
    this.sample && this.sample.audioNode.play();
    let drawAlt = function() {
        requestAnimationFrame(drawAlt);

        self.analyser.getByteFrequencyData(dataArrayAlt);

        self.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        self.canvasCtx.fillRect(0, 0, self.WIDTH, self.HEIGHT);

        var barWidth = ((self.WIDTH - bufferLengthAlt) / (bufferLengthAlt));
        var barHeight;
        var x = 0;


        for(var i = 0; i < bufferLengthAlt; i++) {
            barHeight = dataArrayAlt[i];
            self.canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            self.canvasCtx.fillRect(x, self.HEIGHT-barHeight/2, barWidth, barHeight/2);
            x += barWidth + 1;
        }
    };
    drawAlt();
};

Canvas.prototype.pause = function () {
    this.sample && this.sample.audioNode.pause();
};

Canvas.prototype.stop = function () {
    if(this.sample) {
        this.sample.audioNode.pause();
        this.sample.audioNode.currentTime = 0;
    }
};

Canvas.prototype.getAudio = function () {
    return this.sample.audioNode;
};

Canvas.prototype.getValues = function () {
    let bufferLengthAlt = this.analyser.frequencyBinCount;
    let buffer = new Uint8Array(bufferLengthAlt);
    this.analyser.getByteFrequencyData(buffer);
    return buffer;
};

Canvas.prototype.connectToOutput = function () {
  this.analyser.connect(window.audioContext.destination);
};

export default Canvas;