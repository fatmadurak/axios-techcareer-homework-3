const tBody = document.querySelector(".tBody");
const nameInput = document.querySelector("#name");
const nameFilter = document.querySelector("#nameFilter");
const unitPriceInput = document.querySelector("#unitPrice");
const stockInput = document.querySelector("#stock");
const selectPrice=document.querySelector("#unitPriceFilter");


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

      //selectPrice
      const unitPrice = productData.map((item) => item.unitPrice);
      selectPrice.innerHTML = unitPrice.map((item) => `
        <option value="${item}">${item}</option>
      `).join('');
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
      <td><button class="btnDelete" data-id="${item.id}" onclick="deleteProduct(${item.id})">Delete</button></td>
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
      getProducts(); // Ürünleri güncelleme
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
      getProducts(); // Ürünleri güncelleme
    })
    .catch((error) => {
      console.error("Ürün silinirken hata oluştu:", error);
    });
};



//name filter

nameFilter.addEventListener("input",function(){


const search=nameFilter.value.toLowerCase();

const filteredData=productData.filter((item)=>item.name.toLowerCase().includes(search))



tableFill(filteredData)


})


selectPrice.addEventListener("change", function () {
  const selectedPrice = selectPrice.value;
  const filteredData = productData.filter((item) => item.unitPrice <= selectedPrice);

  tableFill(filteredData);
});



