//Для обработки запросов

const http = require("http");
const fs = require("fs");
 
const price =[500, 800, 200, 340, 150];
// данные, с которыми работает клиент
const orders = [
    { id:1, product_1: "1000", product_2: 800, product_3: 400, product_4: 340, product_5: 450 , sum: "2990"}
]
// обрабатываем полученные от клиента данные
function getReqData(req) {
    return new Promise(async (resolve, reject) => {
        try {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = JSON.parse(Buffer.concat(buffers).toString());
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

 
http.createServer(async (request, response) => {

     // получение всех заказов
     if (request.url === "/api/orders" && request.method === "GET") {
        response.end(JSON.stringify(orders));
    }
    // получение одного заказа по id
     else if (request.url.match(/\/api\/orders\/([0-9]+)/) && request.method === "GET") {
        // получаем id из адреса url
        const id = request.url.split("/")[3];
        // получаем заказ по id
        const order = orders.find((u) => u.id === parseInt(id));
        // если заказ найден, отправляем его
        if(order) 
            response.end(JSON.stringify(order));
        // если не найден, отправляем статусный код и сообщение об ошибке
        else{
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Пользователь не найден" }));
        }
    }
    // удаление заказа по id  
    else if (request.url.match(/\/api\/orders\/([0-9]+)/) && request.method === "DELETE") {
        // получаем id из адреса url
        const id = request.url.split("/")[3];
        // получаем индекс пользователя по id
        const orderIndex = orders.findIndex((u) => u.id === parseInt(id));
        // если заказ найден, удаляем его из массива и отправляем клиенту
        if(orderIndex > -1) {
            const order = orders.splice(orderIndex, 1)[0];
            response.end(JSON.stringify(order));
        }
        // если не найден, отправляем статусный код и сообщение об ошибке
        else{
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Пользователь не найден" }));
        }
    }
    // добавление заказа
    else if (request.url === "/api/orders" && request.method === "POST") {
        try{
            // получаем данные заказа
            const orderData = await getReqData(request);
            sum1 = (orderData.product_1/100)*price[0];
            sum2 = (orderData.product_2/100)*price[1];
            sum3 = (orderData.product_3/100)*price[2];
            sum4 = (orderData.product_4/100)*price[3];
            sum5 = (orderData.product_5/100)*price[4];
            sum = sum1 + sum2 + sum3 + sum4 + sum5;
            // создаем новый заказ
            const order = {product_1: sum1, product_2: sum2,
            product_3: sum3, product_4: sum4, product_5: sum5, sum: sum};
            // находим максимальный id
            const id = Math.max.apply(Math,orders.map(function(u){return u.id;}))
            // увеличиваем его на единицу
            order.id = id + 1;
            // добавляем заказ в массив
            orders.push(order);
            response.end(JSON.stringify(order));
        }
        catch(error){
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Некорректный запрос" }));
        }
    }
    else if (request.url === "/" || request.url === "/index.html") {
        fs.readFile("index.html", (error, data) => response.end(data));
    }
    else if (request.url == "/img/1.jpg") {
     var img = fs.readFileSync('./img/1.jpg');
     response.writeHead(200, {'Content-Type': 'image/jpg' });
     response.end(img, 'binary');
    }
    else if (request.url == "/img/2.jpg") {
     var img = fs.readFileSync('./img/2.jpg');
     response.writeHead(200, {'Content-Type': 'image/jpg' });
     response.end(img, 'binary');
    }
    else if (request.url == "/img/3.jpg") {
     var img = fs.readFileSync('./img/3.jpg');
     response.writeHead(200, {'Content-Type': 'image/jpg' });
     response.end(img, 'binary');
    }
    else if (request.url == "/img/4.jpg") {
     var img = fs.readFileSync('./img/4.jpg');
     response.writeHead(200, {'Content-Type': 'image/jpg' });
     response.end(img, 'binary');
    }
    else if (request.url == "/img/5.jpg") {
     var img = fs.readFileSync('./img/5.jpg');
     response.writeHead(200, {'Content-Type': 'image/jpg' });
     response.end(img, 'binary');
    }
    else{
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Ресурс не найден" }));
    }

}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));




















  


    