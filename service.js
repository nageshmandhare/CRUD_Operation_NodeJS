
/// <reference path="./app.js" />

app.service('crudService',function($http)
{
  // Create a New Record
  this.post = function(Book){
      
      var request = $http({
          method:'post',
          url:'http://localhost:3300/book',
          data:Book
      });
      return request;
  }  
  
    //Get Single Record
    this.get = function (isbn) {
       return $http.get("http://localhost:3300/book/" + isbn);
    }
    
    //Get All Books
    this.getBooks = function () {
        return $http.get("http://localhost:3300/books"); 
    }
    
      //Update the Record
    this.put = function (isbn,Book) {
        var request = $http({
            method: "put",
            url: "http://localhost:3300/book/" + isbn,
            data: Book
        });
        return request;
    }
    
     
    //Delete the Record
    this.delete = function (isbn) {
        var request = $http({
            method: "delete",
            url: "http://localhost:3300/book/" + isbn
        });
        return request;
    }
});