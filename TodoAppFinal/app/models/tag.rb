class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :todos, through: :taggings
end
