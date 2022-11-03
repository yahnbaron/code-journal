var theURLInput = document.querySelector('#photoURL');
var theImgPreview = document.querySelector('.auto-update');
var theForm = document.querySelector('.form');
var theEntryNav = document.querySelector('.entries-nav');
var theNewEntry = document.querySelector('.new-entry');
var theFeedPage = document.querySelector('.feed-page');
var theEntryForm = document.querySelector('.form-page');
var theEntryOrEditText = document.querySelector('.entry-edit-text');
var theDeleteButton = document.querySelector('.delete-entry');
var theDeleteDiv = document.querySelector('.delete-conf-div');
var theCloak = document.querySelector('.cloak-show');

theURLInput.addEventListener('input', updatePic);

function updatePic(event) {
  theImgPreview.setAttribute('src', theURLInput.value);
}

theForm.addEventListener('submit', subForm);

function subForm(event) {
  event.preventDefault();
  if (data.editing === null) {
    var formField = {};
    formField.title = theForm.elements.title.value;
    formField.photoURL = theForm.elements.URL.value;
    formField.notes = theForm.elements.notes.value;
    formField.entryId = data.nextEntryId++;
    data.entries.unshift(formField);
    theList.prepend(renderEntry(formField));
  } else {
    for (var x = 0; x < data.entries.length; x++) {
      if (data.entries[x].entryId === parseInt(data.editing)) {
        data.entries[x].title = theForm.elements.title.value;
        data.entries[x].photoURL = theForm.elements.URL.value;
        data.entries[x].notes = theForm.elements.notes.value;
        var freshlyEditedElement = renderEntry(data.entries[x]);
        var oldElement = document.querySelector('[data-entry-id="' + data.entries[x].entryId + '"]');
        oldElement.replaceWith(freshlyEditedElement);
        data.editing = null;
      }
    }
  }
  theForm.reset();
  theImgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  theFeedPage.className = 'feed-page';
  theEntryForm.className = 'form-page hidden';
  data.view = 'entries';
}

function renderEntry(entry) {
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
  theListItem.setAttribute('data-entry-id', entry.entryId);
  theListItem.setAttribute('id', entry.entryId);

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
  theOtherDivHalf.setAttribute('class', 'column-half relative');

  var theTitle = document.createElement('h3');
  theTitle.textContent = entry.title;

  var theNotes = document.createElement('p');
  theNotes.textContent = entry.notes;

  var theIcon = document.createElement('i');
  theIcon.setAttribute('class', 'fa-solid fa-pen absolute');

  theDivRow.append(theOtherDivHalf);
  theOtherDivHalf.append(theTitle, theNotes, theIcon);

  return theListItem;
}

var theList = document.querySelector('.list-parent');

document.addEventListener('DOMContentLoaded', addThem);

function addThem(event) {
  for (var i = 0; i < data.entries.length; i++) {
    theList.append(renderEntry(data.entries[i]));
  }
  if (data.view === 'entry-form') {
    theFeedPage.className = 'feed-page hidden';
    theEntryForm.className = 'form-page';
  } else if (data.view === 'entries') {
    theFeedPage.className = 'feed-page';
    theEntryForm.className = 'form-page hidden';
  }
}

theEntryNav.addEventListener('click', entriesNav);

function entriesNav(event) {
  theFeedPage.className = 'feed-page';
  theEntryForm.className = 'form-page hidden';
  data.view = 'entries';
}

theNewEntry.addEventListener('click', newEntry);

function newEntry(event) {
  theDeleteButton.className = 'delete-entry hide-delete';
  theFeedPage.className = 'feed-page hidden';
  theEntryForm.className = 'form-page';
  data.view = 'entry-form';
  theForm.elements.title.value = '';
  theForm.elements.URL.value = '';
  theForm.elements.notes.value = '';
  theImgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  theEntryOrEditText.textContent = 'New Entry';
}

theList.addEventListener('click', clickinTheList);

function clickinTheList(event) {
  if (event.target.nodeName === 'I') {
    theDeleteButton.className = 'delete-entry';
    data.view = 'entry-form';
    var theClickedLi = event.target.closest('li');
    data.editing = theClickedLi.id;
    theFeedPage.className = 'feed-page hidden';
    theEntryForm.className = 'form-page';

    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(data.editing)) {
        theForm.elements.title.value = data.entries[i].title;
        theForm.elements.URL.value = data.entries[i].photoURL;
        theForm.elements.notes.value = data.entries[i].notes;
        theImgPreview.setAttribute('src', data.entries[i].photoURL);
        theEntryOrEditText.textContent = 'Edit Entry';
      }
    }
  }
}

theDeleteButton.addEventListener('click', clickDelete);

function clickDelete(event) {
  event.preventDefault();
  theDeleteDiv.className = 'delete-conf-div';
  theCloak.className = 'cloak-show';
}
