rm -rf docs-dist &&
npx dumi build &&
cd docs-dist &&
git init &&
git add . &&
git commit -m 'page' &&
git remote add origin git@github.com:Gy-coder/banana-ui-website.git &&
git push -f origin master &&
cd ..

