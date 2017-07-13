$(document).ready(function(){
  let query = 'books';
  let url = prepareRequest(query);
  console.log(url);
  callAPI(url).then(appendMovies);
  $('.add-book').click(goToAddBook);
});



function appendMovies(books){
  console.log(books);
  console.log(books[1].cover_url);
  const source = $('#book-template').html();
  const template = Handlebars.compile(source);
  const html = template({books});
  $('.movie-list-container').append(html);
  $('.edit-book-btn').click(goToEditBook);
  $('.delete-book-btn').click(goToDeleteBook);
}

function goToAddBook(){
    window.location.href = './new.html';
}
