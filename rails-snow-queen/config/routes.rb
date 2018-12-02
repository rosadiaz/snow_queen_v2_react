Rails.application.routes.draw do
  resources :quotes, only: [:new] 
end
