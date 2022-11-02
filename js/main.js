var theURLInput = document.querySelector('#photoURL');
var theImgPreview = document.querySelector('.auto-update');
var theForm = document.querySelector('.form');
var theEntryNav = document.querySelector('.entries-nav');
var theNewEntry = document.querySelector('.new-entry');
var theFeedPage = document.querySelector('.feed-page');
var theEntryForm = document.querySelector('.form-page');

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

function renderTodo(entry) {
  /**
   * <li class="column-full">
            <div class="row">
              <div class="column-half">
                <img src="" title="ada lovelace">
              </div>
              <div class="column-half">
                <h2>Ada Lovelace</h2>
                <p>ada ada ada</p>
              </div>
            </div>
          </li>
  */

  var theListItem = document.createElement('li');
  theListItem.setAttribute('class', 'column-full');

  var theDivRow = document.createElement('div');
  theDivRow.setAttribute('class', 'row');

  var theDivHalfCol = document.createElement('div');
  theDivHalfCol.setAttribute('class', 'column-half');

  var thePic = document.createElement('img');
  thePic.setAttribute('src', entry.photoURL);

  theListItem.append(theDivRow);
  theDivRow.append(theDivHalfCol);
  theDivHalfCol.append(thePic);

  var theOtherDivHalf = document.createElement('div');
  theOtherDivHalf.setAttribute('class', 'column-half');

  var theTitle = document.createElement('h3');
  theTitle.textContent = entry.title;

  var theNotes = document.createElement('p');
  theNotes.textContent = entry.notes;

  theDivRow.append(theOtherDivHalf);
  theOtherDivHalf.append(theTitle, theNotes);

  return theListItem;
}

var theList = document.querySelector('.list-parent');

document.addEventListener('DOMContentLoaded', addThem);

function addThem(event) {
  for (var i = 0; i < data.entries.length; i++) {
    theList.append(renderTodo(data.entries[i]));
  }
}

theEntryNav.addEventListener('click', entriesNav);

function entriesNav(event) {
  theFeedPage.className = 'feed-page';
  theEntryForm.className = 'form-page hidden';
}

theNewEntry.addEventListener('click', newEntry);

function newEntry(event) {
  theFeedPage.className = 'feed-page hidden';
  theEntryForm.className = 'form-page';
}
