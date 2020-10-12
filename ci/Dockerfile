FROM node:12

# https://github.com/docker/cli/issues/2281#issuecomment-577745894
COPY --from=docker:19.03 /usr/local/bin/docker /usr/local/bin/

# Copied from https://github.com/hazelcast/DevOps/blob/master/dockerfiles/jdk-compatibility/docker-install.sh
RUN groupadd -r -g 1031 jenkins
RUN useradd -d /home/jenkins -ms /bin/bash -u 1030 -g 1031 jenkins

# Python 2.7 executable is required by node-sass
RUN apt-get update && apt-get install -y python build-essential

COPY --chown=jenkins:jenkins src/main/frontend/package.json /home/frontend-shared/package.json

USER jenkins
# Download and cache deps 
RUN cd /home/frontend-shared && npm i

USER root
RUN echo "Cleaning up..."  && \
    rm -rf /home/frontend-shared

USER jenkins