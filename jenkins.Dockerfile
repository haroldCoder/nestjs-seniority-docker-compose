FROM jenkins/jenkins:lts

USER root

# Install Docker CLI
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-24.0.7.tgz \
    && tar xzvf docker-24.0.7.tgz \
    && mv docker/docker /usr/local/bin \
    && rm -r docker docker-24.0.7.tgz

# Fix Git ownership issue when running as root
RUN git config --global --add safe.directory '*'

# Disable the setup wizard
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

USER jenkins

# Install necessary plugins for Pipeline and Docker
RUN jenkins-plugin-cli --plugins "workflow-aggregator git docker-workflow docker-plugin blueocean"
