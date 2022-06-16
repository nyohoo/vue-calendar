Rails.application.routes.draw do
  get '/events', to: 'events#index'
  get '/events/:id', to: 'events#show'
  post '/events', to: 'events#create'
  put '/events/:id', to: 'events#update'
  delete '/events/:id', to: 'events#destroy'
end
