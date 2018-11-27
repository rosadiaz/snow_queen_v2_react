class Api::V1::QuotesController < ApplicationController
  def create
    quote = Quote.new quote_params
    quote.save
    render json:quote
  end

  private
  def quote_params
    params.require(:quote).permit(:address, :email)
  end 

end
