let play = '<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="play_button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 41.999 41.999" style="enable-background:new 0 0 41.999 41.999;" xml:space="preserve"><path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'


function Controls() {
    this.el = document.createElement('div');
    this.el.className = 'controls';

    this.el.playOrPauseOrLoad_button = document.createElement('span');
    this.el.playOrPauseOrLoad_button.className = 'ppl_button inset_button button_disabled';
    this.el.volume_slider = document.createElement('span');
    this.el.volume_slider.className = 'controls_volume_slider';

    this.play = document.createElement('span');
    this.play.innerHTML = play;
    this.el.appendChild(this.play);

}

Controls.prototype.change = function(sample) {

}

export default Controls;