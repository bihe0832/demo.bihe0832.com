#!/bin/sh
# author zixie
for file in source/*; do
  filename=$(basename "$file")
  base="${filename%.*}"
  ext="${filename##*.}"
  if [ ! -e "photos/${base}_optimized.${ext}" ]; then
    echo $file
    java -jar  ~/zixie/lib/tinyjpg.jar $file
  fi
done
cd source
ls | grep "_photo_optimized.jpg" | xargs -I {} mv {} ./../photos/
