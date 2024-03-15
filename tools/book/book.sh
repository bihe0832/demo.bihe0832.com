#!/bin/sh
# author zixie
cd ~/zixie/github/demo.bihe0832.com/tools/book/
for file in ~/zixie/github/demo.bihe0832.com/tools/book/source/*; do
  filename=$(basename "$file")
  base="${filename%.*}"
  ext="${filename##*.}"
  if [ ! -e "~/zixie/github/demo.bihe0832.com/tools/book/photos/${base}_optimized.${ext}" ]; then
    java -jar  ~/zixie/lib/tinyjpg.jar $file
  fi
done
cd ~/zixie/github/demo.bihe0832.com/tools/book/source/
ls | grep "_photo_optimized.jpg" | xargs -I {} mv {} /Volumes/Document/Documents/github/demo.bihe0832.com/tools/book/photos/
