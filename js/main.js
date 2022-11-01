var theURLInput = document.querySelector('#photoURL');
var theImgPreview = document.querySelector('.auto-update');
var theForm = document.querySelector('.form');

theURLInput.addEventListener('input', updatePic);

function updatePic(event) {
  theImgPreview.setAttribute('src', theURLInput.value);
}

theForm.addEventListener('submit', subForm);

function subForm(event) {
  event.preventDefault();
  var formField = {};
  formField.title = theForm.elements.title.value;
  formField.photoURL = theForm.elements.URL.value;
  formField.notes = theForm.elements.notes.value;
  formField.entryId = data.nextEntryId++;
  data.entries.unshift(formField);
  theForm.reset();
  theImgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
}
