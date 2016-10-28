$(document).on('turbolinks:load', function () {
  console.log("Turbolinks load on keydown pg: "+App.posts)
  refresh = App.posts
  colorCards()
  submitNewPost()

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
      App.posts.send({ user: current_username, post: $('[data-textarea="post"]').val() })
      $('[data-send="post"]').click()
      $('[data-textarea="post"]').val(' ')
      return false
    }
  })
}


//Randomize card colors
function colorCards(){
  var cards = document.getElementsByClassName('card')
  for(i=0;i<cards.length;i++){
    var randomPicker = Math.floor(Math.floor(Math.random() * (cardColors.length)))
    cards[i].style.backgroundColor = cardColors[randomPicker]
  }
}
