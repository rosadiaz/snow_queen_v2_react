class QuoteMailer < ApplicationMailer
  def new_quote(quote)
    @quote = quote
    
    mail(
      to: @quote.email,
      from: "SnowQueen@winterhelpers.com",
      cc: "SnowQueen@winterhelpers.com",
      subject: "Service request ##{@quote.id}"
    )
  end

end
