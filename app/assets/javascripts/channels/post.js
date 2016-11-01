$(document).on('turbolinks:load', function () {
  connectToChannel()
})

var previous_room_id

function connectToChannel () {
  if (typeof current_room_id !== 'undefined' && typeof App.posts == 'undefined' ||
      typeof current_room_id !== 'undefined' && current_room_id !== previous_room_id){
    previous_room_id = current_room_id
    App.posts = App.cable.subscriptions.create({ channel: 'PostsChannel', room: current_room_id }, {
      received: function (data) {
        console.log('ActionCable posts data recieved on client:', data)
        var randomPicker = Math.floor(Math.floor(Math.random() * (cardColors.length)))
        $('#posts').removeClass('hidden')
        console.log(data.imageUrl)
        if(data.imageUrl == null ){
          $('#posts').append('<div class="card card-panel waves-effect '+cardColors[randomPicker]+'"> <p> <b>' + data.user + ': </b>' + data.message + '</p><hr id="timeBorder"> <p id="postTime">'+ data.created_at + '</p></div>')
        }else {
          $('#posts').append('<div class="card card-panel '+cardColors[randomPicker]+'"> <p> <b>' + data.user + ': </b>' + data.message + '</p> <%= image_tag('+data.image.url+', class: "uploadedImage") %><hr id="timeBorder"> <p id="postTime">'+ data.created_at + '</p></div>')
        }
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
      },
      connected: function () {
        // Called when the subscription is ready for use on the server
        console.log('connected')
      },

      disconnected: function () {
        // Called when the subscription has been terminated by the server
        console.log('disconnected')
      },
      rejected: function (data) {
        // Called when there's incoming data on the websocket for this channel
        console.log('rejected')
      }
    })
    console.log('ActionCable subscription to posts created on client')
  }
}
