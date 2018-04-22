# dante

#os
centos7

#install docker
yum install docker -y

#build (centos 7.4 and dante-1.4.2)
docker build -t dante  ./ 

#run
docker run -d -p 8822:22 -p 1080:1080  dante 

#ssh username/password
ip:8822 root/root

#socks5 proxy username/password
proxy/proxy