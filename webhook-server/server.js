const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = 3001;

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
});

// Hàm gửi cảnh báo khi phát hiện file trùng
function sendAlert(objectKey) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`File trùng tên: ${objectKey}`);
        }
    });
}

// Xử lý webhook từ MinIO
app.use(express.json());

app.post('/webhook', (req, res) => {
    const notification = req.body;
    const objectKey = notification.Records[0].s3.object.key;

    // Gửi cảnh báo qua WebSocket
    sendAlert(objectKey);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Webhook server is listening on port ${port}`);
});
