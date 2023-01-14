---
title: "Deployment scenarios on google cloud"
date: "2023-01-06"
tags:
    - Python
    - Google
---

In this article I am going to go through different deployments scenarios on Google Cloud:

1. Deploy your own Docker image for your Vertex.ai pipelines
2. Deploy your own private python library from Bitbucket

For the first scenario we will first quickly describe the Vertex AI pipeline service. Next we will demonstrate how to use some simple commands to build and push your custom docker images to be ready to use by your own Vertex.ai pipeline components. For the last scenario, will we will first describe how to use and configure Bitbucket pipelines to achive our goals. Then we'll dive into the specifities of the subject. If you want to implement these, the article assumes you already have a google cloud account with the required rights and permissions.

## Vertex.ai

[Vertex.ai](https://cloud.google.com/vertex-ai?hl=us) is a Google Cloud service that enables the user to build, deploy, and scale data pipelines and machine learning models. It includes some services to track and manage model artifacts, performances and metrics.
Google provide a [Python SDK](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk) that permits the user to interact directly with the different services.

Vertex AI pipeline is a service that allows you to orchestrate different step of a data pipeline. Each step of the pipeline is an autonomous piece of code that will be executed in its own container. Each of these steps can accept inputs and generate outputs for downstream steps. Altogether the steps define a workflow that can be represented as an acyclic graph.

<p><img src="Vertexai.png" class="article-img" title="Vertexai" alt="Vertexai"></p>

*Figure 1* : Example of a vertex ai pipeline

## Choose your container image for your Vertex component

For the implementation of the components and the compilation of the pipeline, I am using the Kubeflow SDK. A typical components can be implemented as followed.

```python
from kfp.v2.dsl import (
    Dataset,
    Input,
)

@component(
    packages_to_install=["put", "here", "librairies", "to", "install"],
    base_image="the docker image to use",
    output_component_file="predict.yaml",
)
def predict(data: Input[Dataset]):
    # ---- imports
    # Import your modules

    # ---- Helpers
    # Implemenent helpers functions

    # ---- variable
    # add any local variable

    # ---- Component execution
    # Implement the logic of your component
```

I will describe in a different article the nults and bolts of components and pipelines in Kubeflow and give you some tricks about it.
Here we are going to focus on the `base_image`. By default you can use some already available container. If you want to use python `3.9` as your environment, you just need to specify it in the `@component()` decorator.

```python{8}
from kfp.v2.dsl import (
    Dataset,
    Input,
)

@component(
    packages_to_install=["put", "here", "librairies", "to", "install"],
    base_image="python:3.9",
    output_component_file="predict.yaml",
)
def predict(data: Input[Dataset]):
    # ---- imports
    # Import your modules

    # ---- Helpers
    # Implemenent helpers functions

    # ---- variable
    # add any local variable

    # ---- Component execution
    # Implement the logic of your component
```

Similarly, any library you want to install without specifying its version can be added there:

```python{7}
from kfp.v2.dsl import (
    Dataset,
    Input,
)

@component(
    packages_to_install=["pandas", "numpy", "matplotlib"],
    base_image="python:3.9",
    output_component_file="predict.yaml",
)
def predict(data: Input[Dataset]):
    # ---- imports
    # Import your modules

    # ---- Helpers
    # Implemenent helpers functions

    # ---- variable
    # add any local variable

    # ---- Component execution
    # Implement the logic of your component
```

Now you may face a scenario where you need to bring your own environment. For that, you will need to use your own container image. For the desmontration, let's imagine that I want to use python `3.10` and XGBoost `v1.3.3` for my predictions. To make this environment ready to use for my component I need to:

1. Define the docker file
2. Build and push the container on Google Cloud
3. Point to this container uusing the `base_image` parameter present in `@component`

A typical `Dockerfile` would look like the following

```Dockerfile
FROM python:3.10.7-slim-buster

# Remove any third-party apt sources to avoid issues with expiring keys.
RUN rm -f /etc/apt/sources.list.d/*.list

# Install dependencies for python build
RUN    apt-get update \
    && apt-get install --no-install-recommends -qqy \
        gcc \
        gfortran \
        curl \
        ca-certificates \
        sudo \
        openssh-client \
        git \
        bzip2 \
        libx11-6 \
    && apt-get clean
RUN python3 -m pip install --upgrade pip \
    && pip install xgboost==1.3.3 \
```

Now we can first build the image and tag it with the following command.

```bash
docker build . --file ai_vertex/Dockerfile --tag vertex
```

> **_Note:_** if you are a Mac M1/M2 user. you should use the following build command `docker buildx build . --file train/Dockerfile --platform linux/amd64 --tag train`

Next we need to use a specific tag that will be the path where the image will be located on Google Cloud. Our images are stored in [Google Clound Container Registry](https://cloud.google.com/container-registry). So we run:

```bash
docker tag vertex "eu.gcr.io/<YOUR_PORJECT>/<PARENT...>/<IMAGE_NAME_TAG>"
```

> **_Note:_**  We are located in Europe. So the adress name starts with `eu`. Use the right naming convention according to your location.

We need to enable Docker to authenticate to Container Registry.  For that execute the following command:

```bash
gcloud auth configure-docker
```

> **_Note:_**  This command creates the Docker `credHelper` entry to your Docker's configuration file, or creates the file if it doesn't exist. It can be achieved in any environment where the Google Cloud CLI and Docker are installed.

Finally we can push our image to our registry.

```bash
docker push "eu.gcr.io/<YOUR_PORJECT>/<PARENT...>/<IMAGE_NAME_TAG>"
```

Now in our component we can point to the right image:

```python{8}
from kfp.v2.dsl import (
    Dataset,
    Input,
)

@component(
    packages_to_install=["pandas", "numpy", "matplotlib"],
    base_image="eu.gcr.io/<YOUR_PORJECT>/<PARENT...>/<IMAGE_NAME_TAG>",
    output_component_file="predict.yaml",
)
def predict(data: Input[Dataset]):
    # ---- imports
    # Import your modules

    # ---- Helpers
    # Implemenent helpers functions

    # ---- variable
    # add any local variable

    # ---- Component execution
    # Implement the logic of your component
```

Because I do not manage tons of custom docker images and because we do not update these environments that often, you can manage the updates manually. My advice is to encapsulate all the command into a `Makefile` to sequentially execute all steps described above.
With this in mind you can now use any custom docker images and bring any environments you want to use for Vertex components.

## Bitbucket Pipelines

Bitbucket Pipelines is an integrated Continuous Integration and Development service, built into Bitbucket. It is very similar to what proposes Github with Github actions. It allows users to automatically build, test and even deploy your code based on a `yaml` configuration file in your repository. Briefly, Bitbucket pipelines spins up container based on your configuration and execute the command you want. It is particularly interesting to use Bitbucket pipelines to test your code after each push.

In our context (deployment of containers and code on google cloud), a typical bibucket-pipelines.yml` file looks like this:

```yaml{2,8,12}
---
image: google/cloud-sdk

pipelines:
  default:
    - step:
        name: Build, authenticate and test
        script:
          - Command_1
          - Command_2
          - Command_3
        services:
          - docker
```

With this configuration files you can specify:

- The docker image you want to use.
- The commands you want to run.
- The services that need to be activated.

Let's postulate that we have some code that we want to push to our remote repository. This code contains unit and integrations test that require the use of some google cloud services. The `Dockerfile` can be implemented as followed:

```Dockerfile
FROM python:3.10.7-slim-buster as base-env

WORKDIR /opt/app
COPY . .

# Install dependencies for python build
RUN    apt-get update \
    && apt-get install --no-install-recommends -qqy \
        gcc \
        gfortran \
    && apt-get clean \
    # && rm -rf /var/lib/apt/lists/* \
RUN pip install --upgrade pip

RUN python3 -m pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements-dev.txt

RUN coverage run --source . -m pytest && coverage report --skip-empty  --omit "tests/*"  -m
```

Next we can specify the command to build our testing image in our `bibucket-pipelines.yaml` file.

```yaml{9}
---
image: google/cloud-sdk

pipelines:
  default:
    - step:
        name: Build, authenticate and test
        script:
          - docker build . -f YOUR_DOCKERFILE
        services:
          - docker
```

If push your code now, it is very likely that the bitbucket pipeline would crash with some google cloud authentication error. How can we pass credentials? You first need to create a service account for bitbucket. Give it the needed rights and permissions. Next create your keyfile. It is a json file that contains all required authentication details

```json
{
  "type": "service_account",
  "project_id": "project_name",
  "private_key_id": "blablablablabla",
  "private_key": "-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n",
  "client_email": "email_of_the_user_or_service_account",
  "client_id": "id_id_id_client",
  "auth_uri": "google oauth2/auth link",
  "token_uri": "your_token",
  "auth_provider_x509_cert_url": "link to certificate",
  "client_x509_cert_url": "the certificate from the service account"
}
```

Keep this file on your computer and do not version it. To pass the credential to your pipeline you'ill need to create or ask your admin to create a [repository variable](Repository settings > Pipelines > Repository variables). Name this variable, for example `GCP_AUTH_BASE64` and paste the encoded content of your keyfile as value. Keep it secured and encrypted on Bitbucket side. Once this is done, you can use the repostiory variable.

> > **_Note:_**  Be careful when you copy/paste the file content. It may contain spaces that bitbucket cannot handle. A tip for that is to set `--wraps=0` when you use the `base64` command. This will output one line of data without any unexpected` space.

```yaml{9}
---
image: google/cloud-sdk

pipelines:
  default:
    - step:
        name: Build, authenticate and test
        script:
          - docker build . -f YOUR_DOCKERFILE --build-arg GCP_AUTH="${GCP_AUTH_BASE64}"
        services:
          - docker
```

We build an argument with Docker that is going to pass the value hold by the repository variable `GCP_AUTH_BASE64`. To work we need to modify our `Dockerfile`.

```Dockerfile{15,16,17}
FROM python:3.10.7-slim-buster as base-env

WORKDIR /opt/app
COPY . .

# Install dependencies for python build
RUN    apt-get update \
    && apt-get install --no-install-recommends -qqy \
        gcc \
        gfortran \
    && apt-get clean \
    # && rm -rf /var/lib/apt/lists/* \
RUN pip install --upgrade pip

ARG GCP_AUTH
RUN echo "${GCP_AUTH}" | base64 -d >> /tmp/key-file.json
ARG export GOOGLE_APPLICATION_CREDENTIALS="/tmp/key-file.json"

RUN python3 -m pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements-dev.txt

RUN coverage run --source . -m pytest && coverage report --skip-empty  --omit "tests/*"  -m
```

Notice how we deal with the argument `GCP_AUTH`. Its value is decoded and save into a temporary file. We assign its path to the `GOOGLE_APPLICATION_CREDENTIALS` environment variable. Now each time you code need to reach some google cloud services, it will find the necessary credentials to accomplish its task.

This part is extremely important if you want to streamline and automate your deployment / interaction with google cloud services

## Deploy your own python library on Google Artifact
