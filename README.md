Change azure subscription in src/config.json

To start, either run npm start from educator folder or build and run the docker image.

To run with docker:
- docker build --no-cache --progress=plain -t frontend .
- docker run --rm -it  -p 3000:3000/tcp frontend:latest 