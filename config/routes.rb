Missvr::Application.routes.draw do
  # resources :likes
  resources :cities
  resources :participants do
  	resources :likes
  end

  root :to => "home#index"
  devise_for :users
  resources :users

  # match "/top", to: "participants#index_top"
end