function httpGet(url, onprogress, onload) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
                onload && onload();
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        if (onprogress) {
            xhr.onprogress = onprogress;
        }

        xhr.send();
    });
}

export function fetchAvatars(n, onprogress, onload) {
    return httpGet(
        `https://randomuser.me/api/?results=${n}`,
        onprogress,
        onload
    ).then((response) => {
        let users = JSON.parse(response).results;

        return users.map((user) => user.picture);
    });
}
