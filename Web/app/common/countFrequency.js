export default function countFrequency(arr) {
  //khoi tao mot object
  let frequency = {};
  //lap qua cac gia tri trong mang xem xuat hien bao nhieu lan
  for (let i = 0; i < arr.length; i++) {
    //bien value chua gia chi cua phan tu thu i trong mang duoc truyen vao
    let value = arr[i];
    //kiem tra xem neu trong mang cos 2 gia tri cung nhau thi cong so luong len 1
    frequency[value] = frequency[value] ? frequency[value] + 1 : 1;
  }
  //tao mot arr chua cac gia tri da duoc lap qua co so luong da duoc cap nhat
  let result = [];
  for (let key in frequency) {
    result.push({
      id: key,
      soLuong: frequency[key],
    });
  }
  return result;
}
