class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!

  def about
    @pulsechannel = Pulsechannel.new
    @pulsechannels = Pulsechannel.all
    gon.posts= Post.all
  end

end
