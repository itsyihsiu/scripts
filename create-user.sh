#!/usr/bin/env bash

nnn='ssh-rsa AWvHKqa0X9kPmcBrNTO8DQd+pqMJcoib6Eq4vfiznnN0ipkHN548qvBsCp2V';

i=1;
j=$#;
while [ $i -le $j ]
do
    i=$((i + 1));

    useradd -m -s /bin/bash $1;
    cd /home/$1;
    mkdir .ssh;
    chown $1:$1 .ssh;
    touch .ssh/authorized_keys;
    echo $nnn > .ssh/authorized_keys;
    chown $1:$1 .ssh/authorized_keys;
    echo 'export PATH=$PATH:/home/'$1'/.local/bin' >> .bashrc

    echo "User name - $i: $1 created.";

    shift 1;
done
