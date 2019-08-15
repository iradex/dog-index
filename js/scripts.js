var dogIndex = (function () {
	var dogRepository = (function () {

		var repository = [];
		var apiUrl = 'https://dog.ceo/api/breeds/list/all';

		function loadList() {
			return $.ajax(apiUrl, {
				dataType: 'json'
			}).then(function (json) {
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
			var list = $('.list-group');
			var button = $('<button>' + dog + '</button>');
			button.addClass("btn btn-lg list-group-item list-group-item-action").attr("data-toggle", "modal").attr("data-target", "#dog-modal").attr("type", "button");
			list.append(button);
			$(button).on("click", function () {
				$(".modal-title").empty();
				$(".modal-body").empty();
				dogRepository.loadDetails(dog);
			});
		}

		function loadDetails(item) {
			var url = 'https://dog.ceo/api/breed/' + item + '/images/random';
			return $.ajax(url, {
				dataType: 'json'
			}).then(function (details) {
				imageUrl = details.message;
				$(".modal-title").text(item);
				$(".modal-body").append('<img src="' + imageUrl + '" class ="dog-pic">');
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

	dogRepository.loadList().then(function () {
		dogRepository.getAll().forEach(dogRepository.addListItem);
	});

})();

