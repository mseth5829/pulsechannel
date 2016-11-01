class User < ApplicationRecord
  has_many :posts
  has_many :pulsechannels, through: :admrights
  has_many :admrights

  validates :username, presence: true, uniqueness: true
end
