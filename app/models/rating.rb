class Rating < ApplicationRecord
  belongs_to :pulsechannel
  belongs_to :user
end
