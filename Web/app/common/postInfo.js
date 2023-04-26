export default function postInfo(info, url) {
  const xhr = new XMLHttpRequest();
  const data = JSON.stringify(info);
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(data)
}
