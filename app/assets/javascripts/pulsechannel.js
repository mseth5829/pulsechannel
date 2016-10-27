
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

var cardColors =
[
  "rgb(105, 170, 182)",
  "rgb(209, 55, 102)",
  "rgb(99, 82, 171)",
  "rgb(234, 212, 70)",
  "rgb(59, 131, 149)",
  "rgb(216, 89, 133)",
  "rgb(10, 104, 194)",
  "rgb(92, 204, 101)",
  "rgb(123, 10, 194)",
  "rgb(216, 89, 133)",
  "rgb(194, 152, 167)",
  "rgb(96, 97, 194)",
  "rgb(50, 35, 174)",
  "rgb(242, 254, 164)",
  "rgb(50, 35, 174)",
  "rgb(237, 115, 161)",
  "rgb(176, 244, 152)"
]

function colorCards(){
  var cards = document.getElementsByClassName('card')
  for(i=0;i<cards.length;i++){
    var randomPicker = Math.floor(Math.floor(Math.random() * (cardColors.length)))
    cards[i].style.backgroundColor = cardColors[randomPicker]
  }
}
