import './player.css';

import Canvas from './canvas.js';
import Controls from './controls.js';


function Player() {
    this.el = document.createElement('div');
    this.el.className = 'player';
    this.original_sample = new Canvas('Original sample');
    this.current_sample = new Canvas('Please choose something from the left menu');
    this.controls = new Controls();
    this.el.appendChild(this.original_sample.el);
    this.el.appendChild(this.controls.el);
    this.el.appendChild(this.current_sample.el);
}

Player.prototype.changeToSample = function(sample) {
    this.current_sample.change(sample);
    this.controls.change(sample);
}

export default Player;