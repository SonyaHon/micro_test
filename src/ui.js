import './index.css'

import MICRO_NAMES from './names.js';

function ListOption(opt, proxy, ctx) {
    this.proxy = proxy;
    this.ctx = ctx;
    this.el = document.createElement('div');
    this.el.className = 'list-option';
    this.el.innerHTML = '&#149;&emsp;' + opt.src.split('/')[opt.src.split('/').length - 1].split('.')[0];
    this.audioNode = opt;
    this.micro_name = opt.src.split('/')[opt.src.split('/').length - 1].split('.')[0];
    this.nnode = window.audioContext.createMediaElementSource(this.audioNode);
    this.el.addEventListener('click', function() {
        this.ctx.changeChoosed(this);
        this.proxy.changeSample(this);
    }.bind(this));
}

function CTX(url, proxy) {
    this.el = document.createElement('div');
    this.proxy = proxy;
    if(url) {
        this.el.className = 'ctx_list_wrapper';
        this.opts = [];
        MICRO_NAMES.forEach(function(name) {
            var elem = document.createElement('audio');
            elem.setAttribute('src',  url + name + '.wav');
            elem.addEventListener('canplay', function() {
                this.addNew(elem);
            }.bind(this));
        }.bind(this));
    }
    else {
        this.el.className = 'ctx_micro_wrapper';
        this.el.innerHTML = '<?xml version="1.0" ?>'+
        '<svg height="1792" class="ctx_micro" viewBox="0 0 1792 1792" width="1792" xmlns="http://www.w3.org/2000/svg">'+
        '<path d="M1472 704v128q0 221-147.5 384.5t-364.5 187.5v132h256q26 0 45 19t19 45-19 45-45 19h-640q-26 0-45-19t-19-45 19-45 45-19h256v-132q-217-24-364.5-187.5t-147.5-384.5v-128q0-26 19-45t45-19 45 19 19 45v128q0 185 131.5 316.5t316.5 131.5 316.5-131.5 131.5-316.5v-128q0-26 19-45t45-19 45 19 19 45zm-256-384v512q0 132-94 226t-226 94-226-94-94-226v-512q0-132 94-226t226-94 226 94 94 226z"/>'+
        '</svg>'
        this.proxy.changeToMicro();
    }
}


CTX.prototype.addNew = function(opt) {
    let tb = new ListOption(opt, this.proxy, this);
    this.opts.push(tb);
    this.el.appendChild(tb.el);
}


CTX.prototype.changeChoosed = function(opt) {
    this.opts.forEach(function (elem) {
        elem.el.classList.remove('list_choosed');
    }.bind(this));
    opt.el.classList.add('list_choosed');
}   

function Tab(cfg, parent, width) {
    this.el = document.createElement('div');
    this.el.innerText = cfg.name;
    this.el.className = 'tab';
    this.ctx = cfg.ctx;
    this.el.style.width = 100 / width + '%';
    this.el.addEventListener('click', function() {
        parent.choosed(this);
    }.bind(this));
}

function Menu(cfg, player) {
    this.el = document.createElement('div');
    this.el.className = "menu";

    this.player = player;

    this.tabs = document.createElement('div');
    this.tabs.className = 'tabs';
    this.el.appendChild(this.tabs);
    
    this.ctx = document.createElement('div');
    this.ctx.className = 'ctx';
    this.el.appendChild(this.ctx);

    this.cats = [];

    this.spawnTabs(cfg);

    let tb = new Tab({name: 'from micro', ctx: null}, this, this.cats.length + 1);
    this.cats.push(tb);
    this.tabs.appendChild(tb.el);
    this.choosed(this.cats[0]);
}

Menu.prototype.spawnTabs = function(cfg) {
    cfg.forEach(function(tab) {
        let tb = new Tab(tab, this, cfg.length + 1);
        this.cats.push(tb);
        this.tabs.appendChild(tb.el);
    }.bind(this));
}

Menu.prototype.choosed = function(tab) {
    this.cats.forEach(function(cat) {
        cat.el.classList.remove('choosed');
    }.bind(this))
    tab.el.classList.add('choosed');

    this.ctx.innerHTML = '';
    this.ctx.appendChild((new CTX(tab.ctx, this)).el);
}

Menu.prototype.changeSample = function(audioNode) {
    this.player.changeToSample(audioNode);
}

Menu.prototype.changeToMicro = function() {
    this.player.changeToSample(null);
}

export default {Menu};