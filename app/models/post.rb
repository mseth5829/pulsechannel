class Post < ApplicationRecord
  belongs_to :user
  belongs_to :pulsechannel

  mount_uploader :image, ImageUploader

end
