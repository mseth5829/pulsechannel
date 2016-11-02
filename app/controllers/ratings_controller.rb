class RatingsController < ApplicationController
  def create
    rating = Rating.new(rating_params)

    if rating.save
      head :ok
    end

  end

  def update
  end

  def rating_params
    params.require(:rating).permit(:rating, :pulsechannel_id, :user_id)
  end
end
