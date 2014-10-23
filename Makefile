install:
	bundle || gem install bundle
	compass || gem install compass
	bundle install
	pip install -r requirements.txt
