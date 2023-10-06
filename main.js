
const tBody=document.querySelector(".tBody");



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







const tableFill=(data)=>{
   
data.map((item)=>{
    
const tr =document.createElement("tr");

tr.innerHTML=`

      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.unitPrice}</td>
      <td>${item.unitsInStock}</td>

`
tBody.appendChild(tr);

})




}