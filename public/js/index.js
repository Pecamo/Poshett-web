document.body.onload = function () {
    const coverImg = document.querySelector('.cover-img');
    ws = new WebSocket(document.location.href.replace('http', 'ws'));

    ws.onopen = function (event) {
        console.log(event);
    };

    ws.onmessage = function (event) {
        console.log(event);
    };
};

let ws;
