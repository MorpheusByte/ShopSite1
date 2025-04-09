/* -------------------------------------------------------------------------- */
/*                                CHECKOUT PAGE                               */
/* -------------------------------------------------------------------------- */
// 1-ürünlerin ekranda görüntülenmesi
// 2-toplam değerleri tablosunun doldurulması
// 3-silme işleme (remove)
// 4-ürün ekleme ve çıkarma
/* -------------------------------------------------------------------------- */

//!1- ürünlerin ekranda görüntülenmesi

let sepettekiler = [
    { name: "Vintage Backpack", price: 34.99, piece: 1, img: "./img/photo1.png" },
    { name: "Levi Shoes", price: 40.99, piece: 1, img: "./img/photo2.png" },
    { name: "Antique Clock", price: 69.99, piece: 1, img: "./img/photo3.jpg" },
  ];
  
  sepettekiler.forEach(({ name, price, piece, img }) => {
    // const{name,img,price}=ürün
  
    document.querySelector("#product-rowlari").innerHTML += `
  
      <div class="row ">
              <div class="col-md-5">
                <img
                  src=${img}
                  class="w-100 rounded-start"
                  alt="..."
                />
              </div>
  
              <div class="col-md-7">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
  
                  <div class="ürün-price">
                    <p class="text-warning h2">$<span class="indirim-price">${(
                      price * 0.7
                    ).toFixed(2)} </span>
                      <span class="h5 text-dark text-decoration-line-through">${price}</span>
                    </p>
                  </div>
  
                  <div
                    class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2">
  
                    <div class="adet-controller">
                      <button class="btn btn-secondary btn-sm minus">
                        <i class="fas fa-minus"></i>
                      </button>
                      <p class="d-inline mx-4" id="ürün-adet">${piece}</p>
                      <button class="btn btn-secondary btn-sm plus">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
  
                  <div class="ürün-removal mt-4">
                    <button class="btn btn-danger btn-sm w-100 remove-product">
                      <i class="fa-solid fa-trash-can me-2"></i>Remove
                    </button>
                  </div>
  
                  <div class="mt-2">
                  <p>Ürün Toplam:<span class="product-total">
                  ${(price * 0.7 * piece).toFixed(2)}
                  
                  </span></p>
                    
                  </div>
                </div>
              </div>
            </div> 
  
  
  `;
  });
  
  //! 2-toplam değerleri tablosunun doldurulması
  
  hesaplaCardTotal();
  removeButton();
  arttirAzalt();
  
  function hesaplaCardTotal() {
    const fiyatlar = Array.from(document.querySelectorAll(".product-total"));
  
    const toplamArray = fiyatlar.reduce(
      (toplam, ürünSpan) => toplam + Number(ürünSpan.textContent),
      0
    );
  
    document.querySelector(".productstoplam").textContent = toplamArray;
  
    document.querySelector(".vergi").textContent = toplamArray * 0.18;
  
    document.querySelector(".kargo").textContent = toplamArray > 0 ? 15 : 0;
  
    document.querySelector(".toplam").textContent =
      (toplamArray + toplamArray * 0.18 + (toplamArray > 0 ? 15 : 0)).toFixed(2);
  }
  
  //! 3- silme işlemi
  function removeButton() {
    document.querySelectorAll(".remove-product").forEach((btn) => {
      btn.onclick = () => {
        // sülalesini sil
        // btn.parentElement.parentElement.parentElement.parentElement.remove()
  
        btn.closest(".row").remove();
        hesaplaCardTotal();
      };
    });
  }
  
  //! 4- ürün adet azaltma-arttırma
  function arttirAzalt() {
    document.querySelectorAll(".adet-controller").forEach((kutu) => {
      const plus = kutu.lastElementChild;
      // const adet=plus.previousElementSibling
      const adet = kutu.children[1];
  
      const minus = kutu.firstElementChild;
  
      //*arttırma
      plus.onclick = () => {
        adet.textContent = Number(adet.textContent) + 1;
  
        plus.closest(".card-body").querySelector(".product-total").textContent =
          plus.closest(".card-body").querySelector(".indirim-price").textContent *
          adet.textContent;
  
          hesaplaCardTotal()
      };
  
  
      //*azaltma
  
  minus.onclick=()=>{
  
  adet.textContent-=1
  
  if(adet.textContent<1){
  alert("ürünü silmek istediğine eminmisin ?")
  
  minus.closest(".row").remove()
  hesaplaCardTotal()
  
  }else{
  
  minus.closest(".card-body").querySelector(".product-total").textContent =
    minus.closest(".card-body").querySelector(".indirim-price").textContent *
    adet.textContent;
  
  hesaplaCardTotal()
  
  }
  
  
  }
  
    });
  }