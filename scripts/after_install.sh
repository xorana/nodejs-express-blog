#!/bin/bash
cd ~/jacobsalway.com

# decrypt environment key
source keyid
rm -f .env
aws kms decrypt --key-id $KEY --ciphertext-blob $(cat env.asc) --query Plaintext | tr -d '"' | base64 -d > .env

# source env variables
source .env

# copy env to dist
cp .env dist/.env

# pull static content
rm -f static
aws s3 sync s3://$STATIC_BUCKET static/

# move static content into public folder
rm -f public/
mkdir -p public/
cp -r static/* public/