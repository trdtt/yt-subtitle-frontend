# yt-subtitles-frontend
This is the frontend repository for the [yt-subtitle-downloader](https://gogs.lremane.xyz/lremane/yt-subtitle-downloader)
project. yt-subtitle-downloader is a tool to scrape, download and translate subtitles from YouTube videos. This repository contains 
the code for a simple web application, which is primarily used for testing or demonstration purposes.
<br>
<br>
An running example can be found [here](https://yt-subtitles.lremane.xyz/).


## Getting Started
### Requirements
In order to run this application, you will need to have the following installed on your machine:

- [Docker Compose](https://docs.docker.com/compose/)
 
### Installation
1. Clone the repository:
```
git clone https://gogs.lremane.xyz/lremane/yt-subtitles-frontend.git
```
2. Navigate to the project directory and Initialize the submodule
```
cd yt-subtitles-frontend && git submodule update --init
```
3. Start the service
```
docker compose up
```
The service is now reachable under port `8000`.
