# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :participant do
    vk_id 1
    likes 1
    reposts 1
    image_src "MyString"
    city nil
    text "MyString"
  end
end
