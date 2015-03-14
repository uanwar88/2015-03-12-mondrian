get "/" do
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
