get "/" do
  @results = Mondrian.select("id, title")
  slim :main
end

post "/save_mondrian" do
  title = params['title']
  colors = params['colors']
  mondrian = Mondrian.where(title: title)
  if mondrian.empty?
    Mondrian.create(title: title, colors: colors)
    "Saved successfully!"
  else
    "This mondrian already exists!"
  end
end

get "/load_mondrian/:id" do
  Mondrian.where(id: params[:id])[0].attributes.to_json
end
