const d = document,
  $main = d.querySelector("main"),
  $files = d.getElementById("files");

const uploader = (file) => {
  // console.log(file);
  const xhr = new XMLHttpRequest();
  const formData = new FormData();

  formData.append("file", file);
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      //console.log(xhr.responseText);
      let json = JSON.parse(xhr.responseText);
      console.log(json);
    } else {
      let message = xhr.statusText || "Ocurrió un error";
      console.log(`Error: ${xhr.status}: ${message}`);
    }
  });
  xhr.open("POST", "assets/uploader.php");
  xhr.setRequestHeader("enc-type", "multipart/from-data");
  xhr.send(formData);
};

d.addEventListener("change", (e) => {
  if (e.target === $files) {
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    files.forEach((el) => {
      uploader(el);
    });
  }
});
