$(document).on('turbolinks:load', function () {
  console.log("turbolinks loaded on pulsechannel page")

  refresh = App.posts
  colorCards()
  submitNewPost()
  scrolltobottom()
  showEditForm()

  var grid = new Minigrid({
    container: '.cards',
    item: '.card',
    gutter: 6
  });
  grid.mount()
  function update() {
    grid.mount();
  }
  window.addEventListener('resize', update);
})


function submitNewPost () {
  $('#trythis').keydown(function (event) {
    if (event.keyCode == 13) {
      console.log("Keydown to submit post, posts: "+App.posts)
      // can send post to actioncable, as well as triggering from the model creation
      $('[data-send="post"]').click()
      $('[data-textarea="post"]').val(' ')
      return false
    }
  })
}


//Randomize card colors
function colorCards(){
  var cards = document.getElementsByClassName('card-panel')
  for(i=0;i<cards.length;i++){
    var randomPicker = Math.floor(Math.floor(Math.random() * (cardColors.length)))
    cards[i].className += " " +cardColors[randomPicker]
  }
}

//Scroll to page bottom to add posts
function scrolltobottom(){
  $('#linktobottom').click(function () {
    console.log("MEANT TO SCROLL")
      $('html, body').animate({
          scrollTop: $(document).height()
      }, 'slow');
      return false;
  });
}

var loco = "hidden"
function showEditForm(){
  $('#editchannel').click(function(){
    if(loco == "hidden"){
      $('#add-location-dropdown').slideDown( "slow");
      loco= "not hidden"
    }else {
      $('#add-location-dropdown').slideUp( "slow");
      loco= "hidden"
    }
  })
}
