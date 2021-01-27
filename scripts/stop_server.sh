#!/bin/bash
cd ~/jacobsalway.com
pm2 describe jacobsalway.com > /dev/null
RUNNING=$?
if [ "${RUNNING}" -eq 0 ]; then
    pm2 delete jacobsalway.com
fi