#!/usr/bin/env bash


i=1;
j=$#;
while [ $i -le $j ]
do
    i=$((i + 1));


    sudo userdel $1;
    sudo rm -rf /home/$1;

    echo "User name - $i: $1 deleted.";

    shift 1;
done
