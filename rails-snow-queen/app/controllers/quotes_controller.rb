class QuotesController < ApplicationController
  def new
    @quote = Quote.new
  end

  def create
    @quote = Quote.new quote_params
    if @quote.save
      redirect_to new_quote_path
    else
      render :new
    end
  end

  private
  def quote_params
    params.require(:quote).permit(:email, :first_name, :last_name, :address, :area, :total, :comments)  
  end
  
end
