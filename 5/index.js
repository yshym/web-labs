import { fetchAvatars } from "./http.js";

const avatarsDiv = document.getElementById("avatars");

function addAvatarsRow(links, container) {
    let avatarsRowDiv = document.createElement("div");
    avatarsRowDiv.classList.add("avatars__row");

    links.forEach((link) => {
        let avatarImg = document.createElement("img");
        avatarImg.src = link;

        avatarsRowDiv.appendChild(avatarImg);
    });

    container.appendChild(avatarsRowDiv);
    container.appendChild(document.createElement("br"));
}

function addAvatars(links, container) {
    while (links.length >= 5) {
        addAvatarsRow(links.splice(0, 5), container);
    }
    addAvatarsRow(links, container);
}

let loadingH1 = document.createElement("h1");
loadingH1.appendChild(document.createTextNode("Loading..."));
loadingH1.classList.add("loading");

fetchAvatars(50).then((avatars) => {
    addAvatars(
        avatars.map((avatar) => avatar.large),
        avatarsDiv
    );
});

function getDocHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
}

console.log(`Doc height: ${getDocHeight()}`);
console.log(`Inner height: ${window.innerHeight}`);

window.onscroll = function () {
    if (window.innerHeight + window.pageYOffset >= getDocHeight()) {
        fetchAvatars(
            25,
            () => document.body.appendChild(loadingH1),
            () => document.body.removeChild(loadingH1)
        ).then((avatars) => {
            addAvatars(
                avatars.map((avatar) => avatar.large),
                avatarsDiv
            );
        });
    }
};
