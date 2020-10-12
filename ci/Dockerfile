FROM node:12

# Copied from https://github.com/hazelcast/DevOps/blob/master/dockerfiles/jdk-compatibility/docker-install.sh
RUN groupadd -r -g 1031 jenkins
RUN groupadd -r -g 989 docker
RUN useradd -d /home/jenkins -ms /bin/bash -u 1030 -g 1031 -G docker jenkins

# Python 2.7 executable is required by node-sass
RUN apt-get update && apt-get install -y python \
        build-essential \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg2 \
        software-properties-common && \
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
    add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
    $(lsb_release -cs) \
    stable" && \
    apt-get update && \
    apt-get -y install docker-ce

COPY --chown=jenkins:jenkins package.json /home/frontend-shared/package.json

USER jenkins
# Download and cache deps 
RUN cd /home/frontend-shared && npm i --ignore-scripts

USER root
RUN echo "Cleaning up..."  && \
    rm -rf /home/frontend-shared

USER jenkins