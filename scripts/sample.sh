#!/bin/bash
#sample scripting
#variable ="Hello"
#echo $variable
echo "what is your name?"
read name

if [ "$name" == "y" ]
then
    echo "How do you do, $name?"
    read remark
    echo "I am $remark too!"
else
    echo "bye!"
fi


