var theURLInput = document.querySelector('#photoURL');
var theImgPreview = document.querySelector('.auto-update');

theURLInput.addEventListener('input', updatePic);

function updatePic(event) {
  theImgPreview.setAttribute('src', theURLInput.value);
}
