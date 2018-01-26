#!/bin/sh

#install nodejs
yum install epel-release -y
yum install nodejs -y
yum install npm -y

#run boot.js
cd nodejs
npm install
npm start