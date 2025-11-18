FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean

ARG DOCKER_GID=986\

RUN groupadd -g ${DOCKER_GID} docker || true
RUN usermod -aG docker jenkins

USER jenkins
