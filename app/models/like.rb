class Like
  include Mongoid::Document
  field :likes, type: Integer, :default => 0
  field :reposts, type: Integer, :default => 0
  include Mongoid::Timestamps::Created

  validates :likes, presence: true
  validates :reposts, presence: true
  
  embedded_in :participant

  attr_accessible :likes, :reposts
end
