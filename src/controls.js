let play = '<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="play_button" class="controls_button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 41.999 41.999" style="enable-background:new 0 0 41.999 41.999;" xml:space="preserve"><path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
let pause = '<?xml version="1.0" encoding="iso-8859-1"?>\n' +
    '<svg version="1.1" id="pause_button" class="controls_button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
    '\t viewBox="0 0 232.679 232.679" style="enable-background:new 0 0 232.679 232.679;" xml:space="preserve">\n' +
    '<g id="Pause">\n' +
    '\t<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M80.543,0H35.797c-9.885,0-17.898,8.014-17.898,17.898v196.883\n' +
    '\t\tc0,9.885,8.013,17.898,17.898,17.898h44.746c9.885,0,17.898-8.013,17.898-17.898V17.898C98.44,8.014,90.427,0,80.543,0z M196.882,0\n' +
    '\t\th-44.746c-9.886,0-17.899,8.014-17.899,17.898v196.883c0,9.885,8.013,17.898,17.899,17.898h44.746\n' +
    '\t\tc9.885,0,17.898-8.013,17.898-17.898V17.898C214.781,8.014,206.767,0,196.882,0z"/>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '</svg>\n';
let stop = '<?xml version="1.0" encoding="iso-8859-1"?>\n' +
    '<svg version="1.1" id="stop_button" class="controls_button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
    '\t viewBox="0 0 232.679 232.679" style="enable-background:new 0 0 232.679 232.679;" xml:space="preserve">\n' +
    '<g id="Stop">\n' +
    '\t<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M214.781,0H17.898C8.013,0,0,8.014,0,17.898v196.883\n' +
    '\t\tc0,9.885,8.013,17.898,17.898,17.898h196.883c9.886,0,17.898-8.013,17.898-17.898V17.898C232.679,8.014,224.666,0,214.781,0z"/>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '<g>\n' +
    '</g>\n' +
    '</svg>\n';

import Timeline from './timeline';
import ErrorC from './errorc';

function Controls(canvs) {
    this.canvs  = canvs;
    this.el = document.createElement('div');
    this.el.className = 'controls';

    this.el.playOrPauseOrLoad_button = document.createElement('span');
    this.el.playOrPauseOrLoad_button.className = 'ppl_button inset_button button_disabled';
    this.el.volume_slider = document.createElement('span');
    this.el.volume_slider.className = 'controls_volume_slider';

    this.error = new ErrorC();
    this.el.appendChild(this.error.el);

    this.play = document.createElement('span');
    this.play.innerHTML = play;
    this.el.appendChild(this.play);

    this.pause = document.createElement('span');
    this.pause.innerHTML = pause;
    this.el.appendChild(this.pause);

    this.stop = document.createElement('span');
    this.stop.innerHTML = stop;
    this.el.appendChild(this.stop);

    this.timeline = new Timeline('');
    this.el.appendChild(this.timeline.el);


    this.play.addEventListener('click', function () {
        if(!this.disabled) {
            this.canvs.forEach(function (elem) {
                elem.proccess();
            });
        }
    }.bind(this));

    this.pause.addEventListener('click', function () {
        if(!this.disabled) {
            this.canvs.forEach(function (elem) {
                elem.pause();
            })
        }
    }.bind(this));

    this.stop.addEventListener('click', function () {
        if(!this.disabled) {
            this.canvs.forEach(function (elem) {
                elem.stop();
            }.bind(this));
            this.ov_err = 0;
            this.ov_err_c = 1;
            this.ov_err_full = 0;
            setTimeout(function () {
                this.error.changeErr('0.00');
                this.error.changeOverall('0.00');
            }.bind(this), 10)
        }
    }.bind(this));

    this.disabled = false;
}

Controls.prototype.disable = function() {
    console.log('xui');
    if(!this.disabled) {

        this.el.classList.add('disabled');
        this.disabled = true;
    }
};

Controls.prototype.enable = function() {
    if(this.disabled) {
        this.el.classList.remove('disabled');
        this.disabled = false;
    }
};

Controls.prototype.change = function(sample) {
    this.stop.click();

    this.timeline.setFulltime(sample.audioNode.duration);
    this.clb = function (evt) {
        this.timeline.changeTime(evt.target.currentTime);
        this.countError();
        sample.audioNode.addEventListener('abort', function () {
            sample.audioNode.removeEventListener('timeupdate', this.clb);
        }.bind(this));
    }.bind(this);

    sample.audioNode.addEventListener('timeupdate', this.clb);
    this.ov_err = 0;
    this.ov_err_c = 1;
    this.ov_err_full = 0;

    this.canvs[1].connectToOutput();
};

Controls.prototype.countError = function () {
    let err = 0;

    let original = this.canvs[0].getValues();
    let sample = this.canvs[1].getValues();

    for(let i = 0; i < original.length; i++) {
        let a = original[i] - sample[i];
        err += a*a;
    }
    err = Math.sqrt(err);

    this.error.changeErr(err.toFixed(2));

    this.ov_err_full += err;
    this.ov_err = this.ov_err_full / this.ov_err_c;
    this.error.changeOverall(this.ov_err.toFixed(2));
    this.ov_err_c += 1;
};



export default Controls;