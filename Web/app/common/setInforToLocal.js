export default function setInfoToLocal(db,urlPost) {
  const xhr = new XMLHttpRequest();
  const url = urlPost;
  const data = JSON.stringify({
    content: db,
  });
  xhr.open("PATCH", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(data);
}
