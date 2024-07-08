

/*
   ! Author: Dalia Fouad 
   * Description: CRUD opreation javascript code
   * Functions: 13 function
   & 1-addProduct
   * 2-
   * 3-
   * 4-
   * 5-
   * 6-
   * 7-
   * 8-
   * 9-
   * 10-
   * 11-
   * 12-
   * 13-
   * 
*/

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDesc = document.getElementById("productDesc");
var productCategory = document.getElementById("productCategory");
var productImage = document.getElementById("productImage")
var addBtn = document.getElementById("add");
var updateBtn = document.getElementById("update");
var productList = [];
var storageKey = "productList";
var current;
var idValue = 0;

var flag="l";

console.log("productImage" + productImage.stringify);
var regex = {
   productName: { key: /^[A-z][a-z0-9]{5,8}$/, stat: false },
   productPrice: { key: /^([1-9][0-9]|100)$/, stat: false },
   productDesc: { key: /.{10}/, stat: false },
   productCategory: { key: /(tv|Mobile|Labtops|Screens|Others)/i, stat: false },
   productImage: { key: /./, stat: true }
}

// * display stored inputs if existed
// console.log("lenth  ******  = " + localStorage.getItem(storageKey).length);

if (localStorage.getItem(storageKey) != null && localStorage.getItem(storageKey) != "[]") {
   productList = JSON.parse(localStorage.getItem(storageKey));
   displayProduct(productList);
   var maxValue = Math.max.apply(null, productList.map(function (o) { return o.id; }));
   idValue = maxValue + 1;
   console.log("id == ****** ");
}





function restRegexStatus() {
   for (let i = 0; i < Object.keys(regex).length; i++) {
      Object.values(regex)[i].stat = true
   }
}

function addValidMark() {
   productName.classList.add("is-valid");;
   productPrice.classList.add("is-valid");;
   productDesc.classList.add("is-valid");;
   productCategory.classList.add("is-valid");
   productImage.classList.add("is-valid");
}

function removeValidMark() {
   productName.classList.remove("is-valid");;
   productPrice.classList.remove("is-valid");;
   productDesc.classList.remove("is-valid");;
   productCategory.classList.remove("is-valid");
   productImage.classList.remove("is-valid");
}

function validateInput(element) {


   if (regex[element.id].key.test(element.value) == true) {


      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.classList.add("d-none");
      regex[element.id].stat = true;


   }
   else if (element.value == "") {
      element.nextElementSibling.classList.add("d-none");
      element.classList.remove("is-invalid");
   }
   else {

      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      element.nextElementSibling.classList.remove("d-none");
      regex[element.id].stat = false;
   }


}


function validation() {
   var Status = true;
   for (let i = 0; i < Object.keys(regex).length; i++) {
      if (Object.values(regex)[i].stat != true) {
         Status = false;
         break;
      }
   }
   return Status;
}

function addProduct(element) {
   var product = {
      id: idValue,
      name: productName.value,
      price: productPrice.value,
      desc: productDesc.value,
      category: productCategory.value,
      img: `./images/${productImage.files[0]?.name}`
   }
   console.log("productImage" + productImage.files[0]);
   console.log(productImage.value);
   if (validation()) {
      productList.push(product);
      idValue++;
      updateLocalStorage(storageKey, productList);
      displayProduct(productList);
      updateForm();
      removeValidMark();
      element.nextElementSibling.classList.add("d-none");

   }
   else {
      element.nextElementSibling.classList.remove("d-none");
   }


}

function displayProduct(list) {

   myData = ``;
   for (var i = 0; i < list.length; i++) {
      myData += `<div class="col-md-4 text-white">
                    <div class="item border border-3 border-success-subtle rounded-3 overflow-hidden">
                        <img src="${list[i].img}" alt="product image" class="w-100 mb-3">
                        <div class="p-3">
                            <h2 class="fs-4">Title : ${list[i].newName ? list[i].newName : list[i].name}</h2>
                            <p>Desc : ${list[i].desc}</p>
                            <h3 class="fs-5">Price : ${list[i].price}</h3>
                            <h3 class="fs-5">Category : ${list[i].category}</h3>
                            <button class="btn btn-outline-warning w-100 my-2 text-white" onclick="previewData(${i})"> Update </button>
                            <button class="btn btn-outline-danger w-100 my-2 text-white" onclick="deleteProduct(${list[i].id})"> Delete </button>
                        </div>
                    </div>
                </div>`

      console.log("idloop == " + list[i].id);

   }
   document.getElementById("myData").innerHTML = myData;

}

function previewData(index) {
   current = index;
   updateForm(productList[index]);
   restRegexStatus();
   addValidMark();
   addBtn.classList.add("d-none");
   updateBtn.classList.remove("d-none");
}

function updateProduct(element) {
   if (validation()) {
      productList[current].name = productName.value;
      productList[current].price = productPrice.value;
      productList[current].desc = productDesc.value;
      productList[current].category = productCategory.value;

      if(document.getElementById("search").value != "")
         {
            document.getElementById("search").value = "";
            for (let i = 0; i < productList.length; i++) {
               productList[i].newName= productList[i].name;
            }
           
         }

      updateLocalStorage(storageKey, productList);
      displayProduct(productList);
      updateForm();
      removeValidMark();
      addBtn.classList.remove("d-none");
      updateBtn.classList.add("d-none");
      element.nextElementSibling.classList.add("d-none");

   }
   else {
      element.nextElementSibling.classList.remove("d-none");
   }




}

function deleteProduct(index, fun) {

   var productIndex;
   for (var i = 0; i < productList.length; i++) {
      if (productList[i].id == index) {
         productIndex = i;
         break;
      }
   }
  
   productList.splice(productIndex, 1);

      // updateLocalStorage(storageKey,productList);
      if(document.getElementById("search").value != "")
         {
            document.getElementById("search").value = "";
            for (let i = 0; i < productList.length; i++) {
               productList[i].newName= productList[i].name;
            }
           
         }

   displayProduct(productList);
   updateLocalStorage(storageKey, productList);
  
     
  



}

function updateLocalStorage(key, list) {
   localStorage.setItem(key, JSON.stringify(list));
}

function updateForm(productInfo) {

   productName.value = productInfo ? productInfo.name : null;
   productPrice.value = productInfo ? productInfo.price : null;
   productDesc.value = productInfo ? productInfo.desc : null;
   productCategory.value = productInfo ? productInfo.category : null;
   productImage.value = productInfo ? null : null;

   // console.log("productImage.src ="+ productImage.files[0]?.name);
   // console.log("productInfo="+ productInfo);
   // console.log("productInfo.img ="+ productInfo.img.substring(9,productInfo.img.length));
   // console.log("productImage.files[0]?.name ="+ productImage.files[0]?.name);

}


function searchProduct(searchValue) {
  
   // var product;
   var searchList = [];
   // var originalName;
   // var originalsearchval;

   if (searchValue == " ") {

      displayProduct(productList);
      return;
   }

   for (i = 0; i < productList.length; i++) {
      var product = productList[i];

      if (product.name.toLowerCase().includes(searchValue.toLowerCase())) {
         // originalName=product.name;
         var x = product.name.toLowerCase().indexOf(searchValue.toLowerCase());
         var y = searchValue.length;
         var redVal = product.name.slice(x, (x + y));
         product.newName = product.name.replace(redVal, `<span class="text-danger">${redVal}</span>`);
         searchList.push(product);
      }
   }
   displayProduct(searchList);

}



