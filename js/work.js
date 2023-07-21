let cards = document.querySelectorAll("#container form");
let container = document.getElementById("container");
let allBut = document.getElementById("all-but");
let siteBut = document.getElementById("site-but");
let graphBut = document.getElementById("graph-but");
let UxUiBut = document.getElementById("ux-ui-but");
let logoBut = document.getElementById("logo-but");
let otherBut = document.getElementById("other-but");
let allSelectBut = document.querySelectorAll("#all-select-but button");
allBut.onclick = function() {
    for (let but of allSelectBut) {
        but.classList.remove('select-but-active');
    }
    allBut.classList.toggle('select-but-active');
    for (let len of cards) {
        len.classList.remove('hide-card');
    }
}
siteBut.onclick = function() {
    for (let but of allSelectBut) {
        but.classList.remove('select-but-active');
    }
    siteBut.classList.toggle('select-but-active');
    for (let len of cards) {
        if (len.id != "site") {
            len.classList.add('hide-card');
        } else {
            len.classList.remove('hide-card');
        }
    }
}
graphBut.onclick = function() {
    for (let but of allSelectBut) {
        but.classList.remove('select-but-active');
    }
    graphBut.classList.toggle('select-but-active');
    for (let len of cards) {
        if (len.id != "graph") {
            len.classList.add('hide-card');
        } else {
            len.classList.remove('hide-card');
        }
    }
}
UxUiBut.onclick = function() {
    for (let but of allSelectBut) {
        but.classList.remove('select-but-active');
    }
    UxUiBut.classList.toggle('select-but-active');
    for (let len of cards) {
        if (len.id != "ux-ui") {
            len.classList.add('hide-card');
        } else {
            len.classList.remove('hide-card');
        }
    }
}
logoBut.onclick = function() {
    for (let but of allSelectBut) {
        but.classList.remove('select-but-active');
    }
    logoBut.classList.toggle('select-but-active');
    for (let len of cards) {
        if (len.id != "logo") {
            len.classList.add('hide-card');
        } else {
            len.classList.remove('hide-card');
        }
    }
}
otherBut.onclick = function() {
    for (let but of allSelectBut) {
        but.classList.remove('select-but-active');
    }
    otherBut.classList.toggle('select-but-active');
    for (let len of cards) {
        if (len.id != "other") {
            len.classList.add('hide-card');
        } else {
            len.classList.remove('hide-card');
        }
    }
}
document.getElementById("all-cards").innerText = cards.length;
document.getElementById("site-sum").innerText = document.querySelectorAll("#container #site").length; 
document.getElementById("graph-sum").innerText = document.querySelectorAll("#container #graph").length; 
document.getElementById("ux-ui-sum").innerText = document.querySelectorAll("#container #ux-ui").length; 
document.getElementById("logo-sum").innerText = document.querySelectorAll("#container #logo").length; 
document.getElementById("other-sum").innerText = document.querySelectorAll("#container #other").length; 