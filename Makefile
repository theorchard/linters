install:
	bundle || gem install bundle
	compass || gem install compass
	bundle install
	(pip3 && pip3 install -r requirements.txt || \
	  pip && pip install -r requirements.txt)
