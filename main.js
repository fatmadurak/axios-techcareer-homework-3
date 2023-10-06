const url = "https://northwind.vercel.app/api/products";
let productData = [];

// Ürünleri API'den çekme
const getProducts = () => {
  axios
    .get(url)
    .then((res) => {
      // Verileri productData dizisine atama
      productData = res.data;
      console.log(productData); 
    })
    .catch((error) => {
      console.error("Veri çekme sırasında bir hata oluştu: ", error);
    });
};

// getProducts fonksiyonunu çağırarak verileri çekme
getProducts();