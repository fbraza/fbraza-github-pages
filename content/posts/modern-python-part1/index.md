---
title: "Modern Python part 1: start a project with pyenv & poetry"
summary: "Start a python project"
date: "2021-06-09"
tags:
    - Python
    - Github
    - DevOps
---

When learning a programming language, the focus is essentially on understanding the syntax, the code style, and the underlying concepts. With time, you become sufficiently comfortable with the language and you start writing programs solving new exciting problems.

However, when you need to move towards this step, there is an aspect that one might have underestimated which is how to build the right environment. An environment that enforces good software engineering practices, improves productivity and facilitates collaboration. Packaging and tooling with Python is often described as cumbersome and challenging. In this regard, several open-source projects emerged in the last years and aim at facilitating the management of Python packages along your working projects. We are going to see here how to use two of them: [Pyenv](https://github.com/pyenv/pyenv), to manage and install different Python versions, and [Poetry](https://python-poetry.org/), to manage your packages and virtual environments. Combined or used individually, they help you to establish a productive environment.

## Pre-requisites

### `pyenv` installation

To install `pyenv` you require some OS-specific dependencies. These are needed as `pyenv` installs Python by building from source. For **Ubuntu/Debian** be sure to have the following packages installed:

```bash
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev \
libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python-openssl
```

To know the required dependencies on your OS go read this [documentation](https://github.com/pyenv/pyenv/wiki#suggested-build-environment). Once the dependencies are installed you can now install `pyenv`. For this, I recommend using [pyenv-installer](https://github.com/pyenv/pyenv-installer) that automates the process.

```bash
curl https://pyenv.run | bash
```

From there on, you can install on your system any versions of Python you wish. You can use the following command to all versions and flavors of Python available:

```bash
pyenv install --list
```

In our case we are going to install the classical CPython in versions `3.7.10` , `3.8.7` , `3.9.2`:

```bash
pyenv install 3.7.10
Downloading Python-3.7.10.tar.xz...
-> https://www.python.org/ftp/python/3.7.10/Python-3.7.10.tar.xz
Installing Python-3.7.10...
Installed Python-3.7.10 to /home/fbraza/.pyenv/versions/3.7.10
```

Once the versions are installed you can see them by running:

```bash
pyenv versions
* system
  3.7.10
  3.8.7
  3.9.2
```

You can see that `pyenv` identified recently installed Python versions and also the one installed by default on your system. The `*` before `system` means that the global version used now is the system version. `pyenv` permits to manage Python versions at different levels: globally and locally. Let's say we are going to set version `3.7.10` as our global version.

```bash
pyenv global 3.7.10
```

Let's list our version again:

```bash
pyenv versions
  system
* 3.7.10 (set by /home/<username>/.pyenv/version)
  3.8.7
  3.9.2
```

You can see that `pyenv` sets `3.7.10` as our global Python version. This will not alter the operations that require the use of the system version. The path you can read between parenthesis corresponds to the path that points to the required Python version. How does this work? Briefly, `pyenv` captures Python commands using executables injected into your `PATH`. Then it determines which Python version you need to use, and passes the commands to the correct Python installation. Feel free to read the complete [documentation](https://github.com/pyenv/pyenv) to better understand the functionalities and possibilities offered by `pyenv`.

> Note: Don't be confused by the semantic here. Change the global version will not affect your system version. The system version corresponds to the version used by your OS to accomplish specific tasks or run background processes that depend on this specific Python version. Do not switch the system version to another one or you may face several issues with your OS! This version is usually updated along with your OS. The global version is just the version that `pyenv` will use to execute your Python commands / programs globally.

### `poetry` installation

Poetry allows you to efficiently manage dependencies and packages in Python. It has a similar role as `setup.py` or [pipenv](https://pypi.org/project/pipenv/), but offers more flexibility and functionalities. You can declare the libraries your project depends on in a `pyproject.toml` file. `poetry` will then install or update them on demand. Additionally this tools allows you to encapsulate your working project into isolated environments. Finally, you can use `poetry` to directly publish your package on [Pypi](https://pypi.org/).

As a last pre-requisite we are going to install `poetry` by running the following command:

```bash
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

## Project creation

We are going to see how to create a project and isolate it inside a Python environment using `pyenv` and `poetry`.

### Setting the Python version with `Pyenv`

Let's first create a directory named `my_awesome_project` and move inside:

```bash
mkdir my_awesome_project && cd $_
```

Once inside, set the local Python version we are going to use (we are going to use Python 3.8.7). This will prompt `poetry` to use the local version of Python defined by `pyenv`:

```bash
pyenv local 3.8.7
```

This creates a `.python-version` file inside our project. This file will be read by `pyenv` and prompts it to set the defined local Python version. Consequently every directory or file created down this point will depend on the local Python version and not the global one.

### Create your project with `poetry`

Poetry proposes a robust CLI allowing you to create, configure and update your Python project and dependencies. To create your Python project use the following command:

```bash
poetry new <project_name>
```

This command generates a default project scaffold. The content of our new project is the following:

```bash
.
├── <project_name>
│   └── __init__.py
├── pyproject.toml
├── README.rst
└── tests
    ├── __init__.py
    └── test_summarize_dataframe.py
```

Notice the `pyproject.toml`. This is where we define everything from our project's metadata, dependencies, scripts, and more. If you're familiar with Node.js, consider the `pyproject.toml` as an equivalent of the Node.js `package.json`.

```ini
[tool.poetry]
name = "your_project_name"
version = "0.1.0"
description = ""
authors = ["<username> <email address>"]

[tool.poetry.dependencies]
python = "^3.8"

[tool.poetry.dev-dependencies]
pytest = "^5.2"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

We can see several entries in our default `pyproject.toml` file.

- **`[tool.poetry]`**: This section contains metadata about our package. You can put there the package name, a short description, author's details, the version of your project, and so on. All details here are optional but will be required if you decided to publish the package on [Pypi](https://pypi.org/).
- **`[tool.poetry.dependencies]`**: This section contains all required dependencies for our package. You can specify specific version numbers for these packages (`packageX = "1.0.0"`) or use symbols. The version of Python we want the project to use is defined here as well. In our case `python = "^3.8"` specifies the **minimum** version required to run our app. Here this is Python 3.8 and this has been based on the version of our local version defined with `pyenv`.
- **`[tool.poetry.dev-dependencies]`**: This section contains all developer dependencies which are packages needed to work and iterate on this project. Nevertheless, these dependencies are not required to run the app and will not be downloaded when building the package.
- **`[build-system]`**: Do not touch this section unless you updated the version of `poetry`.

> Note: you can see the full list of available entries for the `pyproject.toml` file [here](https://python-poetry.org/docs/pyproject/)

### Install and activate the virtual environment

Here you have two approaches: whether you know in advance all dependencies you need and you can directly alter the `.toml` file accordingly or you decide to add later on when needed. In our example, we are going to add progressively our dependencies while writing code. Consequently, we just need to initialize the project and create the virtual environment. To do this run the command:

```bash
poetry install
Creating virtualenv summarize-dataframe-SO-g_7pj-py3.8 in ~/.cache/pypoetry/virtualenvs
Updating dependencies
Resolving dependencies... (6.4s)

Writing lock file

Package operations: 8 installs, 0 updates, 0 removals

  • Installing pyparsing (2.4.7)
  • Installing attrs (20.3.0)
  • Installing more-itertools (8.7.0)
  • Installing packaging (20.9)
  • Installing pluggy (0.13.1)
  • Installing py (1.10.0)
  • Installing wcwidth (0.2.5)
  • Installing pytest (5.4.3)

Installing the current project: summarize_dataframe (0.1.0)
```

Firstly the virtual environment is created and stored outside of the project. A bit similar to what we have when using [`conda`](https://docs.conda.io/en/latest/). Indeed, Instead of creating a folder containing your dependency libraries (as [`virtualenv`](https://pypi.org/project/virtualenv/) does), `poetry` creates an environment on a global system path (`.cache/` by default). This separation of concerns allows keeping your project away from dependency source code.

> Note: You can create your virtual environment inside your project or in any other directories. For that you need to edit the configuration of poetry. Follow this [documentation](https://python-poetry.org/docs/configuration/) for more details.

Secondly, `poetry` is going to read the `pyproject.toml` and install all dependencies specified in this file. If not defined, poetry will download the last version of the packages. At the end of the operation, a `poetry.lock` file is created. It contains all packages and their exact versions. Keep in mind that if a `poetry.lock` file is already present, the version numbers defined in it take precedence over what is defined in the `pyproject.toml`. Finally, you should commit the `poetry.lock` file to your project repository so that all collaborators working on the project use the same versions of dependencies.

Now let's activate the environment we just created with the following command:

```bash
peotry shell
Spawning shell within ~/.cache/pypoetry/virtualenvs/summarize-dataframe-SO-g_7pj-py3.8
. ~/.cache/pypoetry/virtualenvs/summarize-dataframe-SO-g_7pj-py3.8/bin/activate
```

The command creates a child process that inherits from the parent Shell but will not alter its environment. It encapsulates and restrict any modifications you will perform to your project environment.

### Create our `git` repository

For our last step here we are going to create a git repository, add `README.md` and `.gitignore` files and push everything to our [remote repository](https://github.com/fbraza/summarize_dataframe).

```bash
git init
git remote add origin https://github.com/fbraza/summarize_dataframe.git
echo ".*\n!.gitignore" > .gitignore
echo "# Summarize dataframe" > README.md
git add .
git commit -m "build: first commit. Environment built"
git push -u origin master
```

## Conclusion

Herein we have seen how to install and manage different versions of Python on our machine using `pyenv`. We demonstrated how to leverage `pyenv local` to set a specific Python version in your project and then create a virtual environment using `poetry`. The use of `poetry` really smoothens the process of creation by proposing a simple and widely project scaffold. In addition, it includes the minimum build system requirements as defined by [PEP 518](https://www.python.org/dev/peps/pep-0518/).

In our next article, we are going to dive more into our project. We will write some code  with their respective unit tests and see how we can use `poetry` to add the expected dependencies and run the tests. Finally, we are going to go a bit further and install all necessary dependencies with `poetry` to help us enforcing good practices with our `git` commits when using a Python project.

## Cheat sheet

### `pyenv`

* Get all available and installable versions of Python

  ```bash
    pyenv install --list
  ```

* Set the global Python version

  ```bash
   pyenv global <version_id>
  ```

* Set a local Python version

  ```bash
    pyenv local <version_id>
  ```

### `poetry`

* Create a project

  ```bash
    poetry new <project_name>
  ```

* Install core dependencies and create environment

  ```bash
    poetry install
  ```

* Activate environment

  ```bash
    poetry shell
  ```

## Acknowledgments

This article was first published in Adaltas [blog](https://www.adaltas.com/en/articles/) and kindly reviewed by the CEO David Worms and one consultant Barthelemy NGOM.
