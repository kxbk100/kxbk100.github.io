#!/bin/bash
cd /Users/ftx/item/txfeng/source/_posts/
python3 csdn2md.py --username kxbk100 --total-pages 10 --cookie-file cookies.txt --stop 10
rm -rf /Users/ftx/item/txfeng/source/images
imgloc -c

hexo clean
hexo g
hexo d

cd /Users/ftx/item/txfeng/
git add .
git commit -m "local files back"
git push