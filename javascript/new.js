$(document).ready(function() {
  //initialize all click handlers
   $('select').material_select();
   $('.add-author-btn').click(addAuthorToBook);
   $('.add-book-btn').click(addBook);
//$('form').submit(addBook)
   //fill in author dropdown
   getAuthors().then(appendAuthorstoSelect);

 });

function getAuthors(){
  const url = prepareRequest('authors');
  return callAPI(url);
}

function appendAuthorstoSelect(response){
  for (var i = 0; i < response.length; i++) {
    let html = `<option value=${response[i].id}>${response[i].first_name} ${response[i].last_name}</option>`;
    $('#main-sibling').after(html);
  }
  $('select').material_select();
}

function addAuthorToBook(){
  const author_name = $('select option:selected').text();
  const author_id = $('select option:selected').val();
  $('#author-list').append(`<option class="added-authors" value=${author_id}>${author_name}</option>`);
  $('select').material_select();
}

function addBook(){
  event.preventDefault();
  //generate API URL
  const url = prepareRequest('books/new');
  //create book object
  getBookValues(url);
}


function getBookValues(api_url) {
  const book = {};
  const authors = [];
  book.title = $('#title').val();
  book.genre = $('#genre').val();
  book.cover_image = $('#cover_image').val();
  book.description = $('#description').val();
  book.title = $('#title').val();
  //get all IDs for authors
  $('.added-authors').each(function(index){
    console.log('adding an author');
    authors.push($(this).val());
  });
  book.authors = authors;
  const validTitle = book.title.trim() != '';
  const validGenre = book.genre.trim() != '';
  const validCoverImage = book.cover_image.trim() !='' && book.cover_image.startsWith('http');
  const validDescription = book.description.trim() != '';

  let errors = '';

  if(!validTitle){
    errors += ' Title cannot be blank.';
  }

  if(!validGenre){
    errors += ' Genre cannot be blank.';
  }

  if(!validCoverImage){
    errors += ' Please enter valid URL.';
  }

  if(!validDescription){
    errors += ' Description cannot be blank.';
  }

  if(!errors){
      console.log(book);
      postAPI(api_url, book);
  } else {
    const errorMessage = $('#errorMessage');
    const errorMessageContainer = $('#errorMessageContainer');
    errorMessage.text(errors);
    errorMessageContainer.show();
  }
}
