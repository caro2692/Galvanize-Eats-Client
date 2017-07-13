function prepareRequest(query){
  let connection = (window.location.hostname == "localhost") ? `http://localhost:3000/api/v1/`: `https://afternoon-lowlands-59233.herokuapp.com/api/v1/`;
  return connection + query;
}

function callAPI(url){
  return $.get(url);
}

function postAPI(url, body){
  $.post(url,body,function(response){
    console.log(response);
  }).then(result=>{
    //redirect to page
    console.log(result);
  });
}

function deleteAPI(URL){
  console.log('about to delete');
  $.ajax({
    url: URL,
    type: 'DELETE',
    success: function(result) {
      window.location.reload(true);
    }
  });
}

function goToEditBook(){
  const book_id = $(this).parent().data('id');
  window.location.href = `./edit.html?id=${book_id}`;
}

function goToDeleteBook(){
  const book_id = $(this).parent().data('id');
  const query = `books/${book_id}`;
  const url = prepareRequest(query);
  //delete from API and refresh page
  deleteAPI(url);
}


function handleQueryString(queryString){
  let output = parseQueryString(queryString);
  return output.id;
}

//parse query strings to create objects of key value pairs
function parseQueryString(queryString){
  let output = {};
  queryString = queryString.substring(1);
  let split = queryString.split('&');
  let split2 = [];
  for (var i = 0; i < split.length; i++) {
    split2.push(split[i].split('='));
    output[split2[i][0]] = split2[i][1];
  }
  return output;
}
