#!/bin/sh
# author zixie

for file in source/*; do
  filename=$(basename "$file")
  base="${filename%.*}"
  ext="${filename##*.}"
  if [ ! -e "photos/${filename}" ]; then
    echo $file
    sips -s format jpeg -s formatOptions 80 --resampleHeight 360 $file --out photos/$filename
  fi
done

# for photosFile in thumb/*; do
#   filename=$(basename "$photosFile")
#   base="${filename%.*}"
#   ext="${filename##*.}"
#   if [ ! -e "photos/${base}_optimized.${ext}" ]; then
#     echo $file
#     java -jar  ~/zixie/lib/tinyjpg.jar $photosFile
#   fi
# done

# cd thumb
# ls | grep "_photo_optimized.jpg" | xargs -I {} mv {} ./../photos/
