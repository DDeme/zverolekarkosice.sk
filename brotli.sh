#!/bin/bash
# Compress files with brotli with given extensions



#find all files with extension in directory
declare FILES=($(find . -name '*.css' -o -name '*.html' -o -name '*.js'))

# OUTPUT="$(find . -name '*.css' -o -name '*.html' -o -name '*.js')"
# echo "${RESULT[1]}"

for i in "${FILES[@]}"
do
	echo $i

    if [ -f $i.br ] ; then
        echo 'Removing old files'
        rm $i.br
    fi

    if [ -f $i.gz ] ; then
        echo 'Removing old files'
        rm $i.gz
    fi

    echo 'Compressing'
    time bro --quality 11 --input $i  --output $i.br --verbose
    gzip  -k $i --verbose

done
