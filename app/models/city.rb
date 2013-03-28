class City
  include Mongoid::Document
  field :name, type: String, :default => "undefined"
  field :vk_name, type: String

  validates :name, presence: true
  validates :vk_name, presence: true, uniqueness: true

  has_many :participants
  index({ vk_name: 1 }, { unique: true })

  attr_accessible :name, :vk_name
end
