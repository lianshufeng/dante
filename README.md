# dante

## build
#### docker build -t dante  ./ 

## remote
#### docker run --name dante -d -p 1080:1080 -e DANTE_User="proxy" -e DANTE_Pass="proxy" docker.io/lianshufeng/dante

## local
#### docker run --name dante -d -p 8822:22 -p 1080:1080 -e DANTE_User="proxy" -e DANTE_Pass="proxy" --restart always  dante
#### docker run -d -p 1080:1080 dante

