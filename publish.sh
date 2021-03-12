npm install
ng build
docker build -t=flamingo-tool .
docker stop flamingo-test-tool
docker rm flamingo-test-tool
docker run -dit -p 38888:80 --name=flamingo-test-tool flamingo-tool
