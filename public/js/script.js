const btn = document.getElementById("btn");
const second = document.getElementById("second");

let showCard = (event) => {
    btn.classList.toggle("is-rotate");
    second.classList.toggle("is-visible");
}

btn.addEventListener("click", showCard);
