var dogRepository = (function () {

   var repository = [];
    var apiUrl =  'https://dog.ceo/api/breeds/list/all';
    
      
        function loadList() {
          return fetch(apiUrl).then(function (response) {
            return response.json(); // the response by "fetch" is not the actual data we are looking for - instead, it is an object that holds the .json() method. We need to parse the object with it to get the data. This returns another promise.
          }).then(function (json) {
           repository = Object.keys(json.message);
           console.log(repository);
           return repository;
          }).catch(function (e) {
            console.error(e);
          })
        }
        
        /*function add(item) {
            if (typeof item ==='object') {
          repository.push(item);
            } else {
                console.log("Only objects allowed!");
            }
        }*/
    
        function getAll() {
          return repository;

        }
    
        
        function addListItem(dog) {
            var $list = document.querySelector('.pokemon-list');
            var listItem = document.createElement('li');
            var button = document.createElement('button');
            button.innerText=dog;
            button.classList.add("btn");
            listItem.appendChild(button);
            $list.appendChild(listItem);
           button.addEventListener('click', function(){
                showDetails(dog);
            });
        }
    
       function loadDetails(item) {
            var url = 'https://dog.ceo/api/breed/' + item + '/images/random';
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (details) {
              imageUrl = details.message;
            }).catch(function (e) {
              console.error(e);
            });
        }
    
        return {
            getAll: getAll,
            loadList: loadList,
            loadDetails: loadDetails,
            addListItem: addListItem
        };    
    
    })();

    dogRepository.getAll();

    
    
    dogRepository.loadList().then(function() {
        dogRepository.getAll().forEach(dogRepository.addListItem);
      });
    
      function showDetails(item) {
        dogRepository.loadDetails(item).then(function () {
          showModal(item, imageUrl)  
        });
      }
    
    
      function showModal(title, imageLink) {
        var $modalContainer = document.querySelector('#modal-container');
        
        $modalContainer.innerHTML="";
        
        var modal = document.createElement('div');
        modal.classList.add("modal");
        
        var $closeButton = document.createElement('button');
        $closeButton.classList.add('modal-close');
        $closeButton.innerText = "Close";
        $closeButton.addEventListener("click", removeModal)
        
        var $title = document.createElement("h1");
        $title.innerText = title;

        var $picture = document.createElement("img")
        $picture.src=imageLink;
        $picture.classList.add("poke-pic")
    
        modal.appendChild($closeButton);
        modal.appendChild($title);
        modal.appendChild($picture);
        $modalContainer.appendChild(modal);
        $modalContainer.classList.add("is-visible");
    
        function removeModal() {
          var modalContainer = document.querySelector("#modal-container");
          modalContainer.classList.remove("is-visible");
        }
      
        window.addEventListener('keydown', (e) => {
          var $modalContainer = document.querySelector('#modal-container');
          if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
            removeModal();  
          }
        });
      
        $modalContainer.addEventListener('click', (e) => {
          var target = e.target;
          if (target === $modalContainer) {
            removeModal();
          }
        });
        
      } 
    
      
    
    
    
    
    
    
    
    
    