#!/bin/bash
cd ~/jacobsalway.com

# decrypt environment key
source keyid.file
rm -f .env
aws kms decrypt --key-id $KEY --ciphertext-blog $(cat env.asc) --query Plaintext | tr -d '"' | base64 -d > .env

# source env variables
source .env

# pull static content
aws s3 cp -r s3://$STATIC_BUCKET static/

# move static content into public folder
mkdir -p public
cp -r static/* public