class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!

  def about
    gon.posts= Post.all
  end

end
