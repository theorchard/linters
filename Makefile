install:
	hash bundle 2>/dev/null  || gem install bundle
	hash compass 2>/dev/null || gem install compass
	bundle install
	pip install -r requirements.txt || echo "[linter] Cannot run pip install."
