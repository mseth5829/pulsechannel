class Pulsechannel < ApplicationRecord
  has_many :posts, dependent: :delete
  has_many :users, through: :admrights
  has_many :admrights
  has_many :ratings
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
