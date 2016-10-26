class Pulsechannel < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :users, through: :posts
  validates :event, presence: true, uniqueness: true, case_sensitive: false
  before_validation :sanitize, :slugify

  def to_param
    self.slug
  end

  def slugify
    self.slug = self.event.downcase.gsub(" ", "-")
  end

  def sanitize
    self.event = self.event.strip
  end
end
