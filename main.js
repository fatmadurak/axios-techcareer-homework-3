

const tBody=document.querySelector(".tBody");

const nameInput=document.querySelector("#name");
const unitPriceInput=document.querySelector("#unitPrice");
const stockInput=document.querySelector("#stock");




const url = "https://northwind.vercel.app/api/products";
let productData = []; 

// Ürünleri API'den çekme
const getProducts = () => {
  axios
    .get(url)
    .then((res) => {
      // Verileri productData dizisine atama
      productData = res.data;
      tableFill(productData)


    })
    .catch((error) => {
      console.error("Veri çekme sırasında bir hata oluştu: ", error);
    });
};

// getProducts fonksiyonunu çağırarak verileri çekme
getProducts();






//fillTable
const tableFill=(data)=>{
   
data.map((item)=>{
    
const tr =document.createElement("tr");

tr.innerHTML=`

      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.unitPrice}</td>
      <td>${item.unitsInStock}</td>
      <td>Delete</td>

`
tBody.appendChild(tr);

})




}





const addNewProduct=()=>{

    //Eklenecek ürün objesi
const newProduct={
    name: nameInput.value,
    unitPrice: unitPriceInput.value,
    stock: stockInput.value,

}


axios.post(url,newProduct)
.then(res=>{

     getProducts();


}) .catch((error) => {
    console.error("Veri çekme sırasında bir hata oluştu: ", error);
  });





}