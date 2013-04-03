class Like
  include Mongoid::Document
  field :likes, type: Integer, :default => 0
  field :reposts, type: Integer, :default => 0
  include Mongoid::Timestamps::Created

  validates :likes, presence: true, :numericality => { :only_integer => true, :greater_than_or_equal_to => 0 }
  validates :reposts, presence: true, :numericality => { :only_integer => true, :greater_than_or_equal_to => 0 }
  
  embedded_in :participant

  attr_accessible :likes, :reposts

  default_scope order_by(:created_at => :desc)
end
