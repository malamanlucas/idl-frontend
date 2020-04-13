git add . &&
git commit -m "$1" &&
git push &&
git checkout master &&
git pull origin staging &&
git push &&
git checkout staging;