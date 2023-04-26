export default function getUrlData(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}
