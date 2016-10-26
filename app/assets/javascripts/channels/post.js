$(document).on('turbolinks:load', function () {
  connectToChat()
})

var cardColors =
[
  "rgb(105, 170, 182)",
  "rgb(209, 55, 102)",
  "rgb(99, 82, 171)",
  "rgb(234, 212, 70)",
  "rgb(59, 131, 149)",
  "rgb(216, 89, 133)"
]

function connectToChat () {
  if (typeof current_room_id !== 'undefined') {
    App.posts = App.cable.subscriptions.create({ channel: 'PostsChannel', room: current_room_id }, {
      received: function (data) {
        console.log('ActionCable posts data recieved on client:', data)
        var randomPicker = Math.floor(Math.floor(Math.random() * (cardColors.length)))
        $('#posts').removeClass('hidden')
        console.log("POST JS IS THE CULPRIT")
        $('#posts').append('<div class="card" style="background-color:'+cardColors[randomPicker]+'"> <p> <b>' + data.user + ': </b>' + data.message + '</p> </div>')
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
    console.log('ActionCable subcription to posts created on client')
  }
}
