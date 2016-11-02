$(document).on('turbolinks:load', function () {
  console.log("turbolinks loaded on pulsechannel page")

  refresh = App.posts
  colorCards()
  submitNewPost()
  scrolltobottom()
  showEditForm()
  showAdmForm()
  generateSearch()

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

// $(document).ready(function() {
//   $('#imagePosted').click(function (event) {
//     console.log("Keydown to submit post via click: ")
//     console.log(App.posts)
//     event.preventDefault()
//   })
// })


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
    console.log("WOkring butot")
    if(loco == "hidden"){
      $('#pulsechannel-edit').slideDown( "slow");
      $('#current-channel').slideUp();
      $('#adm-edit').slideUp( "slow");

      loco= "not hidden"
    }else {
      $('#pulsechannel-edit').slideUp( "slow");
      $('#current-channel').slideDown( "slow");
      loco= "hidden"
    }
  })
}

var adm = "hidden"
function showAdmForm(){
  $('#editadm').click(function(){
    if(adm == "hidden"){
      $('#adm-edit').slideDown( "slow");
      $('#current-channel').slideUp();
      $('#pulsechannel-edit').slideUp( "slow");

      adm= "not hidden"
    }else {
      $('#adm-edit').slideUp( "slow");
      $('#current-channel').slideDown( "slow");
      adm= "hidden"
    }
  })
}

//Generate search for all users
function generateSearch() {
  $(".searchUsers").select2();
}

//Make post request for new adm users
$(document).ready(function() {
  $("#add_adm").click(function(){
    var newAdm = $('.searchUsers').val()
    $.ajax({
     type: "POST",
     url: "/admrights",
     data: {newAdm: newAdm, current_slug: gon.current_slug},
     error: function(e) {
        console.log(e);
      }
    })
    $("#addingAdm").append("<p>"+newAdm+"</p>")
 })
})
