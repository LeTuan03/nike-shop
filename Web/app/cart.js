import getUrlData from "./common/getUrlData.js";
import countFrequency from "../app/common/countFrequency.js";
import createRandomId from "./common/randomId.js";
import purchaseDate from "./common/getDate.js";
import postInfo from "./common/postInfo.js";

const urlDANHSACHSANPHAM = "http://localhost:3000/DANHSACHSANPHAM";
const urlTHONGTIN = "http://localhost:3000/THONGTIN";

const renderItemAdd = document.querySelector("#render-item-add");
const btnBuy = document.querySelector("#btn-buy");
const modalForm = document.querySelector("#modal-box");
const closeForm = document.querySelectorAll(".close-form");
//Hiển thị và ẩn form
btnBuy.addEventListener("click", () => {
  modalForm.classList.add("show");
});
for (let i = 0; i < closeForm.length; i++) {
  closeForm[i].addEventListener("click", () => {
    modalForm.classList.remove("show");
  });
}

const arrSp = JSON.parse(localStorage.getItem("arrSp"));
const myUrlData = getUrlData(urlDANHSACHSANPHAM).then((data) => {
  const getData = [];
  const dataList = JSON.parse(data);
  localStorage.setItem("DANHSACHSANPHAM", JSON.stringify(dataList));
  for (let i = 0; i < arrSp.length; i++) {
    for (let j = 0; j < dataList.length; j++) {
      if (arrSp[i].id == dataList[j].id) {
        dataList[j].itemInCart = arrSp[i].soLuong;
        getData.push(dataList[j]);
        getData[i].idPr = j + 1;
      }
    }
  }
  renderUiDataAdd(getData);
});

function renderUiDataAdd(data) {
  data = data.map((item) => {
    const totalSub = item.giaSp * item.itemInCart;
    return ` <div class="row title items mb-3">
              <div class="d-flex col-lg-5 col-md-5 col-ms-12 fw-bold">
                  <img src=${item.urlImg} alt="">
                  <div class="d-flex flex-column justify-content-evenly">
                      <h4 class="name-pro">${item.name}</h4>
                      <p>Quanlity: <span class="limit-pro">${item.soLuong}</span></p>
                  </div>
              </div>
              <div class="col-lg-2 col-md-2 col-ms-12  d-flex justify-content-center align-items-center">
                  <button class="btn-action onDecrease">-</button><span class="mx-3 item-quanlity">${item.itemInCart}</span><button class="btn-action onIncrease">+</button>
              </div>
              <div class="col-lg-2 col-md-2 col-ms-12 d-flex justify-content-center align-items-center">
                  $<span class="subTotal">${item.giaSp}</span>
              </div>
              <div class="col-lg-2 col-md-2 col-ms-12 d-flex justify-content-center align-items-center">
                  $<span class="total">${totalSub}</span>
              </div>
              <div class="col-lg-1 col-md-1 col-ms-12 d-flex justify-content-center align-items-center">
                  <button title=${item.idPr} class="rounded text-danger fw-bold removeProduct">&times;</button>
              </div>
            </div>`;
  });
  renderItemAdd.innerHTML = data.join("");
  indeCreaseProduct();
  totalPrice();
}
var localPreProduct = JSON.parse(localStorage.getItem("preProductProduct"));

//function increase and decrease quanlity of product
function indeCreaseProduct() {
  const onDecrease = document.querySelectorAll(".onDecrease");
  const onIncrease = document.querySelectorAll(".onIncrease");
  const itemQuanlity = document.querySelectorAll(".item-quanlity");
  const limitPro = document.querySelectorAll(".limit-pro");
  const removeProduct = document.querySelectorAll(".removeProduct");
  for (let k = 0; k < onDecrease.length; k++) {
    ///decrease product
    onDecrease[k].addEventListener("click", () => {
      if (JSON.parse(itemQuanlity[k].innerHTML) === 1) {
        return;
      }
      itemQuanlity[k].innerHTML = JSON.parse(itemQuanlity[k].innerHTML) - 1;
      for (let i = 0; i <= localPreProduct.length + 1; i++) {
        if (removeProduct[k].title == localPreProduct[i]) {
          localPreProduct.splice(i, 1);
          console.log(localPreProduct);
          localStorage.setItem(
            "preProductProduct",
            JSON.stringify(localPreProduct)
          );
          updatePrice(k);
          totalPrice();
          return;
        }
      }
    });
    ///increase product
    onIncrease[k].addEventListener("click", () => {
      if (
        JSON.parse(itemQuanlity[k].innerHTML) ===
        JSON.parse(limitPro[k].innerHTML)
      ) {
        return;
      }
      itemQuanlity[k].innerHTML = JSON.parse(itemQuanlity[k].innerHTML) + 1;
      localPreProduct.push(removeProduct[k].title);
      countFrequency(localPreProduct);
      localStorage.setItem(
        "arrSp",
        JSON.stringify(countFrequency(localPreProduct))
      );
      localStorage.setItem(
        "preProductProduct",
        JSON.stringify(localPreProduct)
      );
      updatePrice(k);
      totalPrice();
    });
  }
  deleteProductCart();
}
function updatePrice(id) {
  const itemQuanlity = document.querySelectorAll(".item-quanlity");
  const subTotal = document.querySelectorAll(".subTotal");
  const total = document.querySelectorAll(".total");
  total[id].innerHTML = itemQuanlity[id].innerHTML * subTotal[id].innerHTML;
}

//function conculation price
function totalPrice() {
  const totalPrice = document.querySelector("#totalPrice");
  const total = document.querySelectorAll(".total");
  var sum = 0;
  for (let i = 0; i < total.length; i++) {
    sum += JSON.parse(total[i].innerHTML);
  }
  totalPrice.innerHTML = sum;
}
var listArrSp = JSON.parse(localStorage.getItem("arrSp"));
var preProductProduct = JSON.parse(localStorage.getItem("preProductProduct"));

///button delete product in cart

function deleteProductCart() {
  const removeProduct = document.querySelectorAll(".removeProduct");
  for (let i = 0; i < removeProduct.length; i++) {
    removeProduct[i].addEventListener("click", () => {
      removeProduct[i].parentElement.parentElement.remove();
      listArrSp.splice(i, 1);
      preProductProduct = preProductProduct.filter(
        (item) => item != removeProduct[i].title
      );
      localStorage.setItem(
        "preProductProduct",
        JSON.stringify(preProductProduct)
      );
      localStorage.setItem("arrSp", JSON.stringify(listArrSp));
      totalPrice();
    });
  }
}
///////////////////
const getAddress = document.querySelectorAll(".get-address");
for (let i = 0; i < getAddress.length; i++) {
  getAddress[i].setAttribute("required", "");
  getAddress[i].setAttribute("type", "text");
  getAddress[i].setAttribute("class", "form-control get-address");
  getAddress[i].setAttribute("aria-describedby", "inputGroupPrepend");
}

(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  const btnSubmit = document.querySelector("#btn-submit");
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    btnSubmit.addEventListener(
      "click",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity()) {
          getInforCustomer();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function getInforCustomer() {
  const DANHSACHSANPHAM = JSON.parse(localStorage.getItem("DANHSACHSANPHAM"));
  const infoProductOrder = JSON.parse(localStorage.getItem("arrSp"));
  const firstName = document.querySelector("#first-name");
  const lastName = document.querySelector("#last-name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const getAddress = document.querySelectorAll(".get-address");
  const homeNumber = document.querySelector("#home-number");
  const message = document.querySelector("#message");
  const totalPrice = document.querySelector("#totalPrice");
  const infoUserAndPro = [
    {
      informationLine: [infoProductOrder],
      infoUser: [
        {
          "user-id": createRandomId("user-"),
          "Date bought": purchaseDate,
          "Full name": firstName.value + " " + lastName.value,
          Adress:
            getAddress[0].value +
            "-" +
            getAddress[1].value +
            "-" +
            getAddress[2].value,
          totalPrice: totalPrice.innerHTML,
        },
      ],
    },
  ];
  if (localStorage.getItem("infoUserAndPro")) {
    var preInfo = JSON.parse(localStorage.getItem("infoUserAndPro"));
    preInfo.push(...infoUserAndPro);
    localStorage.setItem("infoUserAndPro", JSON.stringify(preInfo));
    postInfo(preInfo, urlTHONGTIN);
  } else {
    localStorage.setItem("infoUserAndPro", JSON.stringify(infoUserAndPro));
  }
  localStorage.setItem("pre", JSON.stringify([]));
  localStorage.setItem("arrSp", JSON.stringify([]));
  localStorage.setItem("preProductProduct", JSON.stringify([]));
  localStorage.setItem("LISTPRODUCTBOUGHT", JSON.stringify(infoProductOrder));
  const quanlityUpdata = [];
  for (let i = 0; i < infoProductOrder.length; i++) {
    for (let j = 0; j < DANHSACHSANPHAM.length; j++) {
      if (infoProductOrder[i].id == DANHSACHSANPHAM[j].id) {
        quanlityUpdata.push({
          id: infoProductOrder[i].id,
          quanlity: DANHSACHSANPHAM[j].soLuong - infoProductOrder[i].soLuong,
        });
        returnQuanlityBought(quanlityUpdata);
      }
    }
  }
  localStorage.setItem(
    "RETURNQUANLITYAFFTERBOUGHT",
    JSON.stringify(quanlityUpdata)
  );
}

function returnQuanlityBought(arr) {
  for (let i = 0; i < arr.length; i++) {
    // Id của sản phẩm muốn mua
    const quantity = arr[i].quanlity; // Số lượng sản phẩm mua
    fetch(`http://localhost:3000/DANHSACHSANPHAM/${arr[i].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        soLuong: quantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating product quantity.");
        }
        // Cập nhật số lượng sản phẩm trên client-side
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

if (localStorage.getItem("preProductProduct")) {
  const cartNumber = document.querySelector("#cart-number");
  const dataCount = JSON.parse(localStorage.getItem("arrSp"));
  cartNumber.setAttribute("data-count", dataCount.length);
}
const dataCount = JSON.parse(localStorage.getItem("arrSp"));
const emtyCart = document.querySelector("#emty-cart");
const contentBody = document.querySelector("#content-body");
if (dataCount.length === 0) {
  emtyCart.classList.add("show-cart");
  contentBody.classList.add("hide");
}
