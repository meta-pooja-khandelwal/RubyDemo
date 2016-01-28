class Todo < ActiveRecord::Base
    has_many :comments,dependent: :destroy
    has_many :taggings
    has_many :tags, through: :taggings



def all_tags=(names)
  puts "add"
  self.tags = names.split(",").map do |name|
      Tag.where(name: name.strip).first_or_create!
  end
end

def all_tags
  puts "read"
  self.tags.map(&:name).join(", ")
end

# virtual attribute
def all_tags
  #return true/false
end


end
