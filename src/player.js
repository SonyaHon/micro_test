import './player.css';

import Canvas from './canvas.js';
import Controls from './controls.js';


function Player() {
    this.el = document.createElement('div');
    this.el.className = 'player';
    this.original_sample = new Canvas('Original sample', window.audioContext);
    this.current_sample = new Canvas('Please choose something from the left menu',  window.audioContext);
    this.controls = new Controls([this.original_sample, this.current_sample]);
    this.el.appendChild(this.original_sample.el);
    this.el.appendChild(this.controls.el);
    this.el.appendChild(this.current_sample.el);

    let original = {
        audioNode: document.createElement('audio'),
    };
    original.audioNode.setAttribute('src', './sample.wav');
    original.nnode = window.audioContext.createMediaElementSource(original.audioNode);
    this.original_sample.change(original);
}

Player.prototype.changeToSample = function(sample) {
    if(sample) {
        this.current_sample.change(sample);
        this.controls.change(sample);
        this.controls.enable();
    }
    else {
        this.current_sample.change(null);
        this.controls.disable();
    }

};

export default Player;