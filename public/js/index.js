document.body.onload = function () {
    const coverImg = ws = new WebSocket(document.location.href.replace('http', 'ws'));

    ws.onopen = function (event) {
        console.log(event);
    };

    ws.onmessage = function (event) {
        console.log(event);
        var message = {
            type: 'new-cover-art',
            data: {
                url: "/img/mbid-bd7cbfa5-96ee-49a6-99b5-083441180bf3-14793561957.jpg"
            }
        };
    };
};

let ws;
