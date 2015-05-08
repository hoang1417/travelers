class FaradayBuilder
  def self.travel_api_authorize(path, name)
    connection = Faraday.new(path) do |builder|
      builder.response :oj
      builder.adapter Faraday.default_adapter
      builder.params['name'] = name
    end

    connection
  end

  def self.travel_api_client(path, token)
    # token = "dHVhbkBmbGV4cG9ydC5jb206amF2YTRldmE"
    # path = "https://young-beyond-8772.herokuapp.com/travelers"

    connection = Faraday.new(path) do |builder|
      builder.response :oj
      builder.adapter Faraday.default_adapter
      builder.authorization :Token, :token => token
    end

    connection
  end
end