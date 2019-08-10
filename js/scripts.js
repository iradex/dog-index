var dogIndex = (function () { var dogRepository = (function () {

   var repository = [];
    var apiUrl =  'https://dog.ceo/api/breeds/list/all';
    
    function loadList() {
      return $.ajax(apiUrl, {dataType: 'json'}).then(function (json) {
       repository = Object.keys(json.message);
       return repository;
      }).catch(function (e) {
        console.error(e);
      })
    }

        function getAll() {
          return repository;
        }

        function addListItem(dog) {
            var list = $('.pokemon-list');
            var listItem = $('<li></li>');
            var button = $('<button>' + dog + '</button>');
            button.addClass("btn");
            listItem.append(button);
            list.append(listItem);
           button.on('click', function(){
                showDetails(dog);
            });
        }

        function loadDetails(item) {
          var url = 'https://dog.ceo/api/breed/' + item + '/images/random';
          return $.ajax(url, {dataType: 'json'}).then(function (details) {
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
        var $modalContainer = $('#modal-container');
        
        $modalContainer.empty();
        
        var modal = $('<div></div>').addClass("modal");
        
        var $closeButton = $('<button>Close</button>').addClass('modal-close').on('click', removeModal);
        
        var $title = $('<h1>' + title + '</h1>');

        var $picture = $('<img>').attr('src', imageLink).addClass('dog-pic');
    
        modal.append($closeButton);
        modal.append($title);
        modal.append($picture);
        $modalContainer.append(modal);
        $modalContainer.addClass('is-visible');
    
        function removeModal() {
          $('#modal-container').removeClass('is-visible');
        }
      
        $(window).on('keydown', (e) => {
          var $modalContainer = $('#modal-container');
          if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
            removeModal();  
          }
        });
      
        $modalContainer.on('click', (e) => {
          var target = e.target;
          if (target === $modalContainer) {
            removeModal();
          }
        });
      } }) ();
    
      
    
    
    
    
    
    
    
    
    