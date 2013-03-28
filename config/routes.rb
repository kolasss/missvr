Missvr::Application.routes.draw do
  resources :cities


  resources :participants


  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users
end