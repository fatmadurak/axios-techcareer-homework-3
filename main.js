const tBody = document.querySelector(".tBody");
const nameInput = document.querySelector("#nameFilter");
const unitPriceInput = document.querySelector("#unitPrice");
const stockInput = document.querySelector("#stock");



//APİ URL
const url = `https://northwind.vercel.app/api/products`;
let productData = [];




// Ürünleri API'den çekme
const getProducts = () => {
  axios
    .get(url)
    .then((res) => {
      productData = res.data;
      tableFill(productData);
    })
    .catch((error) => {
      console.error("Veri çekme sırasında bir hata oluştu: ", error);
    });
};




// sayfa yüklendiğinde verileri al
getProducts();






// Tabloyu doldur
const tableFill = (data) => {
  tBody.innerHTML = ""; // Tabloyu temizle

  data.forEach((item) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.unitPrice}</td>
      <td>${item.unitsInStock}</td>
      <td><button class="btnDelete" data-id="${item.id}" onclick="deleteProduct(${item.id})">Sil</button></td>
    `;

    tBody.appendChild(tr);
  });
};






// Yeni ürün eklemek
const addNewProduct = () => {
  const newProduct = {
    name: nameInput.value,
    unitPrice: unitPriceInput.value,
    stock: stockInput.value,
  };

  axios
    .post(url, newProduct)
    .then((res) => {
      console.log(res.data);
      getProducts(); // Ürünleri güncelle
      nameInput.value = "";
      unitPriceInput.value = "";
      stockInput.value = "";
    })
    .catch((error) => {
      console.error("Ürün eklenirken hata oluştu: ", error);
    });
};



// Sİlme func
const deleteProduct = (id) => {
  axios
    .delete(`${url}/${id}`)
    .then((res) => {
      console.log(res.data);
      getProducts(); // Ürünleri güncelle
    })
    .catch((error) => {
      console.error("Ürün silinirken hata oluştu:", error);
    });
};



//name filter

nameInput.addEventListener("input",function(){


const search=nameInput.value.toLowerCase();

const filteredData=productData.filter((item)=>item.name.toLowerCase().includes(search))



tableFill(filteredData)


})




