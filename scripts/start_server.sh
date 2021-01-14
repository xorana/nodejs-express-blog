#!/bin/bash
cd ~
pm2 startOrReload npm --name "jacobsalway.com" -- run serve