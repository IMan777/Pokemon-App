var pokemonRepository = (function () { /*Pokedex Object Array Placed Inside IIFE*/
 "use strict";
var repository = [ ];

 var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
 function addListItem(pokemon){
        var pokelist = $('.pokemon-list');  /* JQuery List Item & Button Tags Together with CSS-Class Styles Created */
        var listitem = $('<li>');
        $(pokelist).append(listitem);
        var btn = $('<button>');
        $(listitem).append(btn);
        $(btn).text(pokemon.name);
        $(btn).addClass('poke-btn');
        $(listitem).addClass('pokeitem');
        btn.on('click', function(event) { /*JQuery Click Button Event Listener Used To Display showDetails Function Properties */
        showDetails(pokemon);
    });
  }

 function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
    showModal(item);
    });
  }
function add(name) { /*Add Additional Pokemon Attributes To Object Array*/
      repository.push(name);

  }

  function catchAll() { /* Function Used To Return Pokedex Object Array*/
      return repository;
  }

  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function (item) { /* Replaced Fectch With Ajax*/

    $.each(item.results, function(index, item){
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) { /*Load Functions Set In Order To Retrieve Data From Pokemon API*/
      console.error(error);
    });
  }
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url).then(function (details) { /* Replaced Fectch With Ajax*/
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = Object.keys(details.types);
    }).catch(function (error) {
          console.error(error);
    });
  }
/*Model Definition With Jquery Start*/
function showModal(item){

    var modalContainer = $('#modal-container');
      $(modalContainer).text('');
      $(modalContainer).addClass('is-visible');

    var pokemodal = $('<div>');
      $(pokemodal).addClass('modal');
      $(modalContainer).append(pokemodal);

    var $closeModalBtn = $('<button class="modal-close">Close</button>');
      $(pokemodal).append($closeModalBtn);
      $closeModalBtn.click(hideModal);


    var modalTitle = $('<h1>');
      $(modalTitle).text(item.name);
      $(modalTitle).addClass('modal-title');
      $(pokemodal).append(modalTitle);

    var modalImg = $('<img>');
      $(modalImg).addClass('poke-img');
      $(modalImg).attr('src',item.imageUrl);
      $(pokemodal).append(modalImg);

    var pokeHeight = $('<p>');
      $(pokeHeight).text('Height: ' + item.height);
      $(pokeHeight).addClass('modal-para');
      $(pokemodal).append(pokeHeight);

    var pokeWeight = $('<p>');
      $(pokeWeight).text('Weight: ' + item.weight);
      $(pokeWeight).addClass('modal-para');
      $(pokemodal).append(pokeWeight);
  }

function hideModal() {
    var modalContainer = $('#modal-container');
    $(modalContainer).removeClass('is-visible');
  }

$(window).keydown(function(event) {
    var modalContainer =$('#modal-container');
    if (
      event.key === 'Escape' &&
      $(modalContainer).containsClass('is-visible')
    ) {
      hideModal();
    }
  });

  var modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', function(event) {
    var target = event.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
/*Model Definition With Jquery End*/
return {  /*Return All Previous Function In Order To Be Available Outside Of IIFE */
      add: add,
      catchAll: catchAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
      hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function() {
  "use strict";
  pokemonRepository.catchAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
