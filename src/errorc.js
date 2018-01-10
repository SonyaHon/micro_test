import './errorc.css';

function ErrorC() {
    this.el = document.createElement('span');
    this.el.classList.add('error');

    this.wrap1 = document.createElement('span');
    this.wrap1.classList.add('err-wrapper');

    this.head = document.createElement('span');
    this.head.classList.add('error-title');
    this.head.innerText = "Average diff.: ";
    this.wrap1.appendChild(this.head);

    this.err = document.createElement('span');
    this.err.classList.add('error-err');
    this.wrap1.appendChild(this.err);


    this.wrap2 = document.createElement('div');
    this.wrap2.classList.add('err-wrapper');

    this.head2 = document.createElement('span');
    this.head2.innerText = 'Overall diff.: ';
    this.head2.classList.add('error-title');
    this.err2 = document.createElement('span');
    this.wrap2.appendChild(this.head2);
    this.wrap2.appendChild(this.err2);

    this.el.appendChild(this.wrap1);
    this.el.appendChild(this.wrap2);
}

ErrorC.prototype.changeErr = function (err) {
    this.err.innerText = err;
};

ErrorC.prototype.changeOverall = function (err) {
  this.err2.innerText = err;
};

export default ErrorC;