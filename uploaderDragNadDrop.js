const d = document,
  $main = d.querySelector("main"),
  $dronZone = d.querySelector(".drop-zone");

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

const progressUpload = (file) => {
  const $progress = d.createElement("progress"),
    $span = d.createElement("span");

  $progress.value = 0;
  $progress.max = 100;

  $main.insertAdjacentElement("beforeend", $progress);
  $main.insertAdjacentElement("beforeend", $span);

  const fileReaader = new FileReader();

  fileReaader.readAsDataURL(file);

  fileReaader.addEventListener("progress", (e) => {
    //console.log(e);
    let progress = parseInt((e.loaded * 100) / e.total);
    $progress.value = progress;
    $span.innerHTML = `<b>${file.name} - ${progress} %</b>`;
  });
  fileReaader.addEventListener("loadend", (e) => {
    uploader(file);
    setTimeout(() => {
      $main.removeChild($progress);
      $main.removeChild($span);
      
    }, 3000);
  });
};

$dronZone.addEventListener("dragover", (e) => {
  //console.log("finooooo");
  e.preventDefault();
  e.stopPropagation();
  e.target.classList.add("is-active");
});

$dronZone.addEventListener("dragleave", (e) => {
  e.target.classList.remove("is-active");
});
$dronZone.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const files = Array.from(e.dataTransfer.files);
  files.forEach((el) => progressUpload(el));
  e.target.classList.remove("is-active");
});
