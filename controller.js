app.controller('crudController', function ($scope, crudService) {
    
    $scope.IsNewRecord = 0; //1 for the flag for the new record
 
    loadRecords(); 
 
    //Function to load all Book records
    function loadRecords() {
        var promiseGet = crudService.getBooks(); //Method Call from the service
 
        promiseGet.then(function (pl) { $scope.Books = pl.data },
              function (errorPl) {
                  $log.error('failure loading Books', errorPl);
              });
    }
     
    //The Save scope method use to define the Book object.
    //In this method if IsNewRecord is zero then Update Book else 
    //Create the Book information to the server
    $scope.save = function () {
        var Book = {
            name: $scope.name,
            isbn: $scope.isbn,
            author: $scope.author,
            pages: $scope.pages
        };
        //If the flag is 1 the it is new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = crudService.post(Book);
            promisePost.then(function (pl) {
                $scope.isbn = pl.data.isbn;
                loadRecords();
                $scope.IsNewRecord = 0;
                $scope.Message = "Added Successfuly";
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = crudService.put($scope.isbn,Book);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }            
    };
 
    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = crudService.delete($scope.isbn);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.name = "";
            $scope.isbn = "";
            $scope.author = "";
            $scope.pages = 0;
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }
 
    //Method to Get Single Book based on isbn no
    $scope.getBook = function () {
        var promiseGetSingle = crudService.get($scope.isbn);
 
        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.name = res.name;
            $scope.isbn = res.isbn;
            $scope.author = res.author;
            $scope.pages = res.pages;
             
            alert($scope.name+" "+$scope.isbn);
            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                       console.log('failure loading Book', errorPl);
                  });
    }
    //Clear the Scope models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.name = "";
        $scope.isbn = "";
        $scope.author = "";
        $scope.pages = 0;
    }
});