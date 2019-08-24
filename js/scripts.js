var pokemonRepository = (function() {
  /*Pokedex object array placed inside iife*/
  'use strict';
  var repository = [];

  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function addListItem(pokemon) {
    var pokelist = $(
      '.list-group'
    ); /* JQuery List Item & Button Tags Together with CSS-Class Styles Created */
    var listitem = $('<li class="list-group-item"></li>');
    $(pokelist).append(listitem);
    var btn = $(
      '<button class="btn btn-dark" data-toggle="modal" data-target="#PokeModal"></button>'
    );
    $(btn).text(pokemon.name);
    $(listitem).append(btn);
    btn.on('click', function() {
      /*JQuery Click Button Event Listener Used To Display showDetails Function Properties */
      showDetails(pokemon);
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }
  function add(name) {
    /*Add Additional Pokemon Attributes To Object Array*/
    repository.push(name);
  }

  function catchAll() {
    /* Function Used To Return Pokedex Object Array*/
    return repository;
  }

  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json' })
      .then(function(item) {
        /* Replaced Fectch With Ajax*/

        $.each(item.results, function(index, item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(error) {
        /*Load Functions Set In Order To Retrieve Data From Pokemon API*/
        document.write(error);
      });
  }
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
      .then(function(details) {
        /* Replaced Fectch With Ajax*/
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = Object.keys(details.types);
      })
      .catch(function(error) {
        document.write(error);
      });
  }
  /*Model Definition With Jquery Start*/
  function showModal(item) {
    $('#pokeName').text(item.name);
    $('#pokeImg').attr('src', item.imageUrl);
    $('#pokeHeight').text('Height: ' + item.height);
    $('#pokeWeight').text('Weight: ' + item.weight);
  }
  /*Model Definition With Jquery End*/
  return {
    /*Return All Previous Function In Order To Be Available Outside Of IIFE */
    add: add,
    catchAll: catchAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  'use strict';
  pokemonRepository.catchAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
