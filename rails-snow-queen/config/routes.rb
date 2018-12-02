Rails.application.routes.draw do
  resources :quotes, only: [:new, :create] 
  get('/', { to: 'quotes#new'})
end
