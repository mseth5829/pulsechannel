class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!

  def about
    @pulsechannels = Pulsechannel.all
    if current_user
      @privateChannels = @pulsechannels.where(channeltype: "private")
      gon.privateChannelsAll = []
      @privateChannels.each do |privateChannel|
        if Admright.where(pulsechannel_id: privateChannel.id, user_id: @current_user.id).present?
          puts "privateChannel_id"
          gon.privateChannelsAll.push(privateChannel)
        end
      end
    end

    @pulsechannel = Pulsechannel.new
    @admright = Admright.new
    gon.posts= Post.all
    @channels = @pulsechannels.where(channeltype: "public")
    @currentTime = Time.now.strftime("%Y/%m/%d %H:%M")
  end

end
