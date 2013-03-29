Missvr::Application.routes.draw do
  resources :cities
  resources :participants

  root :to => "home#index"
  devise_for :users
  resources :users

  match "/top", to: "participants#index_top"
end