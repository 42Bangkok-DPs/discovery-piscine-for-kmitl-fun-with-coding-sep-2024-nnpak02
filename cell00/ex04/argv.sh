if [ $# == 0 ]
then
    echo "No arguments supplied"
else
    for i in $@
    do
        echo "$i"
    done
fi