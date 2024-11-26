#!/usr/bin/env bash

REPOSITORY=/home/ec2-user
cd $REPOSITORY

echo "> 배포 완료"
echo "> nginx 재실행"
sudo systemctl restart nginx

#deploy test
