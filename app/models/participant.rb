# encoding: utf-8
class Participant
  include Mongoid::Document
  field :vk_id, type: Integer
  field :image_src, type: String, :default => ""
  field :text, type: String, :default => ""
  field :enabled, type: Boolean, default: true

  validates :vk_id, uniqueness: true, presence: true
  validates :image_src, presence: true

  belongs_to :city
  embeds_many :likes

  index({ :vk_id => 1 }, { :unique => true, background: true })

  attr_accessible :vk_id, :image_src, :text, :enabled

  # scope :topreposts, order_by(:likes.reposts => :desc)
  # scope :by_likes_size, order_by('likes_count DESC')

  def self.update_from_vk
  	require 'open-uri'

  	# offset = 0
  	count = 100

    last = false
    i = 0

    while !last
      offset = i*count
      # open url with exceptions
      failed = true                                                    

      begin                                                            
        json = open("https://api.vk.com/method/wall.get?owner_id=-50665538&offset=#{offset}&count=#{count}")
        failed = false                                                 
      rescue OpenURI::HTTPError => e                                   
        error_message = e.message                                      
        response_message = "Response Code = #{e.io.status[0]}"         
      rescue SocketError => e                                          
        error_message = e.message                                      
        response_message = "Host unreachable"                          
      rescue => e                                                      
        error_message = e.message                                      
        response_message = "Unknown error"                             
      end                                                              

      if failed                                                        
        json = {}
        last = true
      end

      info = Oj.load(json)["response"]

      # myarr = []

      (1..count).each do |i|
        vk_id = info[i]["id"]

        if vk_id
          text = info[i]["text"]
          text = text[/<br>.+?<br>/].gsub("<br>", "").strip if text[/<br>.+?<br>/]

          likes = info[i]["likes"]["count"]
          reposts = info[i]["reposts"]["count"]

          image_src = []
          attach = info[i]["attachments"]
          attach.each do |att|
            if att["type"] == "photo"
              image_src << att["photo"]["src_big"]
            end
          end

          #city
          if city_name = text[/я из \S+[\,\.]/]
            city_name[0..4] = ""
            city_name[-1] = ""
          else
            city_name = "неизвестно "
          end

          my_city = City.where(vk_name: city_name).first
          my_city = City.create(vk_name: city_name, name: city_name[0...-1]) if !my_city

          part = Participant.where(vk_id: vk_id).first
          if !part
            part = Participant.new(vk_id: vk_id, text: text, image_src: image_src)
            part.city = my_city
            part.save
          end
          
          # p vk_id
          # p text
          # p likes
          # p reposts
          # p image_src
          # p city_name
          # p part.city

          new_likes = part.likes.create(likes: likes, reposts: reposts)

          if vk_id <= 7
            last = true 
            break
          end
        end

        # arr = []
        # arr << vk_id
        # arr << text
        # arr << likes
        # arr << reposts
        # arr << image_src
        # arr << city_name
        # # arr << attach
        # myarr << arr
      end

      i += 1
    end

    # p myarr
    # p info

  end

end
