---
title: "Vertex.ai and Kubeflow SDK"
date: "2023-01-06"
tags:
    - Python
    - Google
---

[Vertex.ai](https://cloud.google.com/vertex-ai?hl=us) is a Google Cloud service that enables the user to build, deploy, and scale data pipelines and machine learning models. It includes some services to track and manage model artifacts, performances and metrics.
Google provide a [Python SDK](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk) that permits the user to interact directly with the different services.

Vertex AI pipeline is a service that allows you to orchestrate different steps of a data pipeline. Each step of the pipeline is an autonomous piece of code that will be executed in its own container. Each of these steps can accept inputs and generate outputs for downstream steps. Altogether the steps define a workflow that can be represented as an directed acyclic graph (DAG) (Figure 1). Here I am going to gather some personal notes and feedbacks related to my own experience with this cloud service and try to provide some personal advises.

<p><img src="Vertexai.png" class="article-img" title="Vertexai" alt="Vertexai"></p>

*Figure 1* : Example of a vertex ai pipeline

## Anatomy of a component

The core unit of computation is called a component. A component is an independent piece of code that will be uploaded and containarized in the Vertex platform to be executed. With Vertex, you can use the [Kubeflow pipelines sdk](https://www.kubeflow.org/docs/components/pipelines/v2/) to implement your code. A typical components can be implemented as followed.

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
def component_one(processed_data: Output[Dataset]):
    # ---- imports
    # Import your modules

    # ---- Helpers
    # Implemenent helpers functions

    # ---- variable
    # add any local variable

    # ---- Component execution
    # Implement the logic of your component
```

As you can see, a component is simply a function encapsulated in a `@component` decorator. The decorator is using three arguments here:

- `packages_to_install`: a `list` containing the name of the libraries you wish to install and that will be use in you component.
- `base_image`: a docker image with the basic environment you wish to execute your code on.
- `output_component_file`: path where you want the library to generate a `yaml` template of your component that will be interpreted by vertex to execute your task. An example is showed in the supplemental data of this article.

## The art of writing component

Being an independent piece of code comes an important trade-off. **Everything extra code you need, has to be implemented in the component function**. Your `import` statements must be declared here and any helper functions should be implemented as inner functions if you wish to use them. Any code outside the component will be simply ignored.

At the beginning my components were just huge chunks of code and this was bad. Indeed, inner functions cannot be unit tested which make the maintenance of such code very difficult. To avoid that and after having implemented working components, I refactored the code such that all helpers functions were packaged in our internal library deployed in our private repository. As such these functions can be all unit tested and we can use them by pointing the `base_image` to a docker image that contains our library. Doing this dramatically reduced the size of our components and make them easy to read and maintain.

Organising your code may helped to. Here the repository structure:

```bash
.
├── ai_vertex
│   ├── components
│   ├── __init__.py
│   ├── pipelines.py
│   ├── image1.Dockerfile
│   ├── image2.Dockerfile
│   ├── templates
│   └── cli.py

```

Components are stored in a `components` folder and are grouped by task (etl, ml or viz). The `pipelines.py` is where the DAGs are defined. The teplates is where the tempaltes will be generated and loaded from by the library to deploy and execute your components. I like to encaspulated my users logic into command line applications (CLI). I use [Typer](https://typer.tiangolo.com/), a library that capitalises on [click](https://click.palletsprojects.com/en/8.1.x/) but brings the programming philosophy and simplicity of [FastAPI](https://fastapi.tiangolo.com/). I like to use CLI, because it make the developer experience easier and allow me to encapsulated complex tasks into simple-to-use command lines. In my case, the cli contains all the command needed to deploy the pipelines for model training, model evaluation and metrics reports.

## Making components communicate

Let's update our previous code.

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
def component_one(raw_data: str, processed_data: Output[Dataset]):
    # ---- imports
    # Import your modules

    # No helpers because we refactored :-)

    # ---- Component execution
    # Implement the logic of your component

def component_two(processed_data: Input[Dataset], metrics: Output[Dataset]):
    # ---- imports
    # Import your modules

    # No helpers because we refactored :-)

    # ---- Component execution
    # Implement the logic of your component
```

Let's understand how a component can generate outputs / artifacts and how these can be digested in downstream steps. Let's imagine the `component_one` to be a classical processing function that takes raw data, processes it and returns an output ready to be processed by the step. The `raw_data` argument is a string that is a path pointing to the source data, a `csv` file seated in our bucket for example. In Vertex you have two choices:

- You can use the classical python [library](https://cloud.google.com/python/docs/reference/storage/latest) to interact with this file on Cloud storage
- You can leverage the power of Cloud storage FUSE. Briefly, FUSE is an abstraction layer on top of Cloud storage that makes python beleive, it is a simple filesystem. As such you can use classic python code to make I/O operations, and this is super convenient. Let's say you need to save a dataframe as a `csv` file. Lets see the difference between the two:

```python
import pandas

from google.cloud.storage import Client, Bucket

# WITH THE LIBRARY
gcs_client = Client()
bucket: Bucket = gcs_client.bucket(bucket_name)
blob = bucket.get_blob(blob_name)
# Read data
my_dataframe = pd.read_csv(
    io.StringIO(blob.download_as_bytes().decode(encoding)),
)
# save the dataframe as csv
bucket.blob("path_destination").upload_from_string(
    my_dataframe.to_csv(), content_type="text/csv"
)

# WITH FUSE
my_dataframe = pd.read_csv("path_to_data")
my_dataframe.to_csv("path_destination")
```

From a developer persepctive using FUSE is really neat. Notice, that I use `"path_destination"` which is a string for the output. But in our `component_one` function, the `processed_data` is of type `Output[Dataset]`.

## Supplemental data

```yaml
# PIPELINE DEFINITION
# Name: name_of_pipeline
# Inputs:
#    my_input: str
# Outputs:
#    my_output: system.Dataset
components:
  comp-name_of_pipeline:
    executorLabel: name_of_pipeline
    inputDefinitions:
      parameters:
        my_input:
          parameterType: STRING
    outputDefinitions:
      artifacts:
        my_outputs:
          artifactType:
            schemaTitle: system.Dataset
            schemaVersion: 0.0.1
deploymentSpec:
  executors:
    exec-name_of_pipeline:
      container:
        args:
        - --executor_input
        - '{{$}}'
        - --function_to_execute
        - name_of_pipeline
        command:
        - sh
        - -c
        - "\nif ! [ -x \"$(command -v pip)\" ]; then\n    python3 -m ensurepip ||\
          \ python3 -m ensurepip --user || apt-get install python3-pip\nfi\n\nPIP_DISABLE_PIP_VERSION_CHECK=1\
          \ python3 -m pip install --quiet     --no-warn-script-location 'pandas'\
          \ 'kfp==2.0.1' && \"$0\" \"$@\"\n"
        - sh
        - -ec
        - 'program_path=$(mktemp -d)

          printf "%s" "$0" > "$program_path/ephemeral_component.py"

          python3 -m kfp.components.executor_main --component_module_path "$program_path/ephemeral_component.py" "$@"
          '
        - "components code is here"
        image: eu.gcr.io/sensav2/suntraining/sunpy
pipelineInfo:
  name: name_of_pipeline
root:
  dag:
    outputs:
      artifacts:
        my_outputs:
          artifactSelectors:
          - outputArtifactKey: name_of_pipeline
            producerSubtask: name_of_pipeline
    tasks:
      name_of_pipeline:
        cachingOptions:
          enableCache: true
        componentRef:
          name: comp-name_of_pipeline
        inputs:
          parameters:
            my_input:
              componentInputParameter: my_input
        taskInfo:
          name: name_of_pipeline
  inputDefinitions:
    parameters:
      my_input:
        parameterType: STRING
  outputDefinitions:
    artifacts:
      my_outputs:
        artifactType:
          schemaTitle: system.Dataset
          schemaVersion: 0.0.1
schemaVersion: 2.1.0
sdkVersion: kfp-2.0.1
```