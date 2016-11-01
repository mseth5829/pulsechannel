class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!

  def about
    @pulsechannel = Pulsechannel.new
    @admright = Admright.new
    @pulsechannels = Pulsechannel.all
    gon.posts= Post.all
    gon.channels = @pulsechannels
  end

end
