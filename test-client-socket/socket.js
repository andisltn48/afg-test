const socket = io("http://127.0.0.1:8000")
var jumlah = document.getElementById("jumlah");
var maxPrice = document.getElementById("max-price");
var minPrice = document.getElementById("min-price");

function productListSocket() {
    
    socket.emit('product_list')

    socket.once('product_list', ({ data }) => {
        console.log(data);
        jumlah.innerHTML=data.productList.length;
        maxPrice.innerHTML="Nama produk: " + data.maxPrice[0]["title"] + " ||| Harga: " + data.maxPrice[0]["price"]
        minPrice.innerHTML="Nama produk: " + data.minPrice[0]["title"] + " ||| Harga: " + data.minPrice[0]["price"]
    })

    // socket.disconnect();
    setTimeout(productListSocket, 5);
}

productListSocket();