Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "welcome#about"

  get '/signup', to: "registrations#new"
  post '/signup', to: "registrations#create"

  get 'login', to: "sessions#new"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  get 'users/:id', to: "users#show", as: "profile"

  resources :pulsechannels, param: :slug
  resources :posts

  # we need to mount action cable
  mount ActionCable.server => '/cable'
  # ie. it will now listen on ws://localhost:3000/cable
end
