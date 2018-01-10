/*var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

var source = audioContext.createMediaElementSource(document.getElementById('sound'));
var analyser = audioContext.createAnalyser();
source.connect(analyser);

analyser.connect(audioContext.destination);

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById("oscilloscope");
var canvasCtx = canvas.getContext("2d");

// draw an oscilloscope of the current audio source

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

function draw() {
    analyser.fftSize = 256;
    var bufferLengthAlt = analyser.frequencyBinCount;
    console.log(bufferLengthAlt);
    var dataArrayAlt = new Uint8Array(bufferLengthAlt);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    var drawAlt = function() {
      requestAnimationFrame(drawAlt);

      analyser.getByteFrequencyData(dataArrayAlt);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
      var barHeight;
      var x = 0;

      for(var i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

        x += barWidth + 1;
      }
    };

    drawAlt();
};

draw();
*/

import UI from './ui.js';
import Player from './player.js';

var cfg = [
    {name: '50 cm', ctx: './50cm/'},
    {name: '100 cm', ctx: './100cm/'}
]

var AudioContext = window.AudioContext || window.webkitAudioContext;
window.audioContext = new AudioContext();

var player = new Player();
var menu = new UI.Menu(cfg, player);

document.getElementById('root').appendChild(menu.el);
document.getElementById('root').appendChild(player.el);
