
const interval = 4000;

const images = Array.from(document.querySelectorAll(".tile img"), img => img.src);
const layers = document.querySelectorAll(".backgroundCycle div");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let index = 0;
let front = 0;

function show(layer, src) {
    layer.style.backgroundImage = `url("${src}")`;
    layer.classList.add("show");
}


function showNext() {
    index = (index + 1) % images.length;
    const next = images[index];
    // Load the first image so the fade never reveals a blank layer
    const preload = new Image();
    preload.onload = () => {
        layers[front].classList.remove("show");
        front = 1 - front;
        show(layers[front], next)
    };
    preload.src = next;
}

if (images.length > 0 ){ 
    show(layers[front], images[index]);
    if (!reducedMotion) setInterval(showNext, interval)
}