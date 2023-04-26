import getUrlData from "./common/getUrlData.js";
import countFrequency from "./common/countFrequency.js";
import postInfo from "./common/postInfo.js";

const contentBody = document.querySelector("#content-body");
const cartNumber = document.querySelector("#cart-number");
//////
const urlDANHSACHSANPHAM = "http://localhost:3000/DANHSACHSANPHAM";
const urlSANPHAMTRONGGIOHANG = "http://localhost:3000/SANPHAMTRONGGIOHANG/1";
//Lấy thông tin tổng hợp tất cả các sản phẩm sẵn có
const myUrlData = getUrlData(urlDANHSACHSANPHAM).then((data) =>
  renderApiProduct(JSON.parse(data))
);
//render dữ liệu sau khi có được ra màn hình
function renderApiProduct(data) {
  data = data.map((item) => {
    return `<div class="item">
      <img src=${item.urlImg} alt="" />
      <button id=${item.id} class="add btn btn-light"><i class="fa-solid fa-cart-plus fs-5"></i></button>
      <div class="desp">
        <h5 class="name text-center mt-2">${item.name}</h5>
        <div class="detail-product d-flex justify-content-evenly">
          <div>
            $
            <span class="price">${item.giaSp}</span>
          </div>
          <div>
            Quanlity:
            <span class="number-item-had">${item.soLuong}</span>
          </div>
        </div>
      </div>
    </div>`;
  });
  contentBody.innerHTML = data.join("");
}
//them san pham dua tren id
var arrIdSp = [];
const listSP = [];
myUrlData.then(() => {
  const add = document.querySelectorAll(".add");
  for (let i = 0; i < add.length; i++) {
    add[i].addEventListener("click", () => {
      addSp(add[i].id);
    });
  }
});
function addSp(id) {
  ///Kiểm trea xem số lượng có vượt qua số lượng sản phẩm sẵn có không
  let count = 0
  const numberItemHad = document.querySelectorAll(".number-item-had")
  for(let i=0;i<listSP.length;i++){
    if(listSP[i]==id) {
      count++;
    }
  }
  if(count >= numberItemHad[id-1].innerHTML){
    return;
  }
  listSP.push(id);
  arrIdSp = countFrequency(listSP);
  localStorage.setItem("preProductProduct", JSON.stringify(listSP));
  localStorage.setItem("arrSp", JSON.stringify(arrIdSp));
  setCountItem(arrIdSp.length);
}
function setCountItem(count) {
  cartNumber.setAttribute("data-count", count);
}
const localProductPre = localStorage.getItem("preProductProduct");
if (localProductPre !== null) {
  localStorage.setItem("pre", localProductPre);
  for (let i = 0; i < JSON.parse(localProductPre).length; i++) {
    listSP.push(JSON.parse(localProductPre)[i]);
  }
}
if (localStorage.getItem("preProductProduct")) {
  const cartNumber = document.querySelector("#cart-number");
  const dataCount = JSON.parse(localStorage.getItem("arrSp"));
  cartNumber.setAttribute("data-count", dataCount.length);
}