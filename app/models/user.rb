class User < ApplicationRecord
  has_many :posts
  has_many :pulsechannels, through: :posts

  validates :username, presence: true, uniqueness: true
end
