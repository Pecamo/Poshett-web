document.body.onload = function () {
    const coverImg = document.querySelector('.cover-img');
    ws = new WebSocket(document.location.href.replace('http', 'ws'));

    ws.onopen = function (event) {
        wsSend(ws, { type: 'get-music' });
    };

    ws.onmessage = function (event) {
        let packet;

        try {
            packet = JSON.parse(event.data);
        } catch (err) {
            console.log(event);
            console.error(err);
        }

        switch (packet.type) {
            case 'new-music':
                coverImg.src = packet.data.imgUrl;
                break;
            default:
                console.warn("Unknown packet:", packet);
                break;
        }
    };

    function wsSend(ws, msg, cb) {
        ws.send(JSON.stringify(msg), (err) => cb(err));
    }
};
