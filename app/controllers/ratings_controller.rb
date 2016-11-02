class RatingsController < ApplicationController
  def create
    @pulsechannel = Pulsechannel.find_by(slug: params[:slug])
    rating = Rating.new(rating_params)

    if rating.save
      redirect_to @pulsechannel
      head :ok
    end

  end

  def update
    @rating = Rating.find(params[:id])
    @rating.update(rating_params)
  end

  def rating_params
    params.require(:rating).permit(:rating, :pulsechannel_id, :user_id)
  end
end
