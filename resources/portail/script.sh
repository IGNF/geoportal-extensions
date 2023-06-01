for file in $(ls -v *.png)
do 
  convert "$file" -resize 32x41! png32/"$file"
  echo "{" >> base64.txt
  echo -n "    src : \"data:image/png;base64,$(cat png32/"$file" | base64 | tr -d '\r\n')\"," >> base64.txt
  echo "" >> base64.txt
  echo "    anchor : [0.5, 1]" >> base64.txt
  echo "}," >> base64.txt
done
