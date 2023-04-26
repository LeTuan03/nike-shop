import getUrlData from "../app/common/getUrlData.js";
const urlDANHSACHSANPHAM = "http://localhost:3000/DANHSACHSANPHAM";
function getInfoCusm() {
  const renderBills = document.querySelector("#render-bills");
  let info = JSON.parse(localStorage.getItem("infoUserAndPro"));
  info = info.map((item) => {
    const detailInfor = item.informationLine[0];
    console.log(item);
    const allInfo = item.infoUser[0];
    const userId = allInfo["user-id"];
    const fullName = allInfo["Full name"];
    const dateBought = allInfo["Date bought"];
    const totalPrice = allInfo.totalPrice;
    const itemNumber = detailInfor.length;
    let totlaQuanlity = 0;
    for (let i = 0; i < detailInfor.length; i++) {
      totlaQuanlity += detailInfor[i].soLuong;
    }
    return `
            <div class="row py-3 list-product-bought">
            <div class="col">
              <span class="id-user">${userId}</span>
              <div class="detail">
                <div class="dropdown">
                  <p
                    class="pt-1 dropdown-toggle text-primary"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Detail
                  </p>
                  <ul class="dropdown-menu">
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Quanlity</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody class="render-detail">
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </table>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col name-customer">${fullName}</div>
            <div class="col date-of-bought">${dateBought}</div>
            <div class="col item-quanlity">${itemNumber}</div>
            <div class="col total-item-quanlity">${totlaQuanlity}</div>
            <div class="col">$<span class="total-price">${totalPrice}</span></div>
            <div class="col return-product" title="Trả lại đơn hàng !!!"><button>&times;</button></div>
          </div>

    `;
  });
  renderBills.innerHTML = info.join("");

  returnProduct();
}
getInfoCusm();

const info = JSON.parse(localStorage.getItem("infoUserAndPro"));
const DANHSACHSANPHAM = JSON.parse(localStorage.getItem("DANHSACHSANPHAM"));
var objDetail = [];
for (let i = 0; i < info.length; i++) {
  renderDetail(info[i].informationLine[0], i);
}
function renderDetail(db, id) {
  var containDetail = [];
  for (let i = 0; i < db.length; i++) {
    for (let j = 0; j < DANHSACHSANPHAM.length; j++) {
      if (db[i].id == DANHSACHSANPHAM[j].id) {
        containDetail.push({
          name: DANHSACHSANPHAM[j].name,
          gia: DANHSACHSANPHAM[j].giaSp,
          soLuong: db[i].soLuong,
        });
      }
    }
  }
  //render data about detail products
  containDetail = containDetail.map((item, index) => {
    return ` <tr>
              <th scope="row">${index + 1}</th>
              <td>${item.name}</td>
              <td>${item.soLuong}</td>
              <td>$${item.gia}</td>
            </tr>`;
  });
  const renderDetail = document.querySelectorAll(".render-detail");
  renderDetail[id].innerHTML = containDetail.join("");
}

function returnProduct() {
  const info = JSON.parse(localStorage.getItem("infoUserAndPro"));
  const returnProductItem = document.querySelectorAll(".return-product");
  for (let i = 0; i < returnProductItem.length; i++) {
    returnProductItem[i].addEventListener("click", () => {
      onReturnData(info[i].informationLine[0]);
      info.splice(i, 1);
      localStorage.setItem("infoUserAndPro", JSON.stringify(info));
    });
  }
}
function onGetData() {
  const myUrlData = getUrlData(urlDANHSACHSANPHAM).then((data) => {
    localStorage.setItem("LISTITEM", data);
  });
}
onGetData();
///Trả lại số lượng sản phẩm đã mua trên server
function onReturnData(db) {
  const LISTITEM = JSON.parse(localStorage.getItem("LISTITEM"));
  const obj = [];
  for (let i = 0; i < db.length; i++) {
    for (let j = 0; j < LISTITEM.length; j++) {
      if (db[i].id == LISTITEM[j].id) {
        obj.push({
          id: db[i].id,
          quanlity: db[i].soLuong + LISTITEM[j].soLuong,
        });
      }
    }
  }
  console.log(obj);
  returnQuanlityBought(obj);
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
