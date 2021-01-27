#!/bin/bash
cd ~/jacobsalway.com
pm2 describe jacobsalway.com > /dev/null
RUNNING=$?
if [ "${RUNNING}" -eq 0 ]; then
    pm2 restart jacobsalway.com
else
    pm2 start npm --name "jacobsalway.com" -- run serve
fi
