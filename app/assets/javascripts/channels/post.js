$(document).on('turbolinks:load', function () {
  connectToChat()
})

function connectToChat () {
  if (typeof current_room_id !== 'undefined') {
    App.posts = App.cable.subscriptions.create({ channel: 'PostsChannel', room: current_room_id }, {
      received: function (data) {
        console.log('ActionCable posts data recieved on client:', data)

        $('#posts').removeClass('hidden')

        $('#posts').append('<div class="card"> <p> <b>' + data.user + ': </b>' + data.message + '</p> </div>')
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
