import './timeline.css';

function map_value(input, input_start, input_end, out_start, out_end) {
    return (out_start + ((out_end - out_start) / (input_end - input_start)) * (input - input_start));
}

function Timeline(fulltime) {
    this.el = document.createElement('span');
    this.el.classList.add('timeline');

    this.bg = document.createElement('span');
    this.bg.classList.add('background');
    this.el.appendChild(this.bg);

    this.timeline = document.createElement('span');
    this.timeline.classList.add('time');
    this.el.appendChild(this.timeline);

    this.digits = document.createElement('span');
    this.digits.classList.add('digits');
    this.digits.innerText = fulltime;
    this.fulltime = fulltime;
    this.el.appendChild(this.digits);
}

Timeline.prototype.changeTime = function (newtime) {
    let val = map_value(newtime, 0, this.fulltime, 0, this.bg.clientWidth);
    this.timeline.style.width = val + 'px';
};

Timeline.prototype.setFulltime = function(time) {
    this.fulltime = time;
    let text = '';
    let mins = Math.floor(this.fulltime / 60);
    text += mins <= 9 ? "0"+mins+':' : mins + ':';
    let secs = Math.floor(this.fulltime - mins * 60);
    text += secs <= 9 ? "0"+secs : secs;
    this.digits.innerText = text;
};

export default Timeline;