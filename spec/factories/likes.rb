# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :like do
    likes 1
    reposts 1
    participant nil
  end
end
