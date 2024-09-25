const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const port = 8080;

// URL của MinIO Web
const minioWebUrl = 'http://minio:9000'; // sử dụng tên service trong docker-compose

// Proxy các yêu cầu đến MinIO và chỉnh sửa giao diện HTML
app.use('/', proxy(minioWebUrl, {
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        if (userReq.path.endsWith('.html')) {
            let html = proxyResData.toString('utf8');
            
            // Chèn mã JavaScript hiển thị alert
            html = html.replace('</body>', `
                <script>
                    const socket = new WebSocket('ws://localhost:3000');

                    socket.onmessage = function(event) {
                        const alertMessage = event.data;
                        alert(alertMessage);
                    };
                </script>
                </body>
            `);
            return html;
        }
        return proxyResData;
    }
}));

app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
