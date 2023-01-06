---
title: "Modern Python part 4: facing reality"
summary: "Insights about managing python projects after 2 years of work"
date: "2023-01-03"
tags:
    - Python
---

In three previous articles, I presented one possible flow to work with Python projects. After two years of professional experience I'd like to elaborate on some points.

## Managing python environments

My advise for juniors would be to build projects using different tools: `pip`, `poetry`, `conda` or others. Diversify your technical toolset. I focused on `poetry` for my article series but be aware that your company might not use the last fancy open source tools to manage your python environments and packages. Right now at my company, I am using `miniconda` for managing python environments and `pip` + `requirements-*.txt` files for package management. Note the wildcard `*`. We use different suffixes to specify the type of coding environments the packages are needed for.

* Our `requirements.txt` file catalogs libraries strictly required to use your package / code.
* Our `requirements-dev.txt` file catalogs libraries required for your developer environment for testing testing or linting your code.
* Our `requirements-ci.txt` file catalogs libraries required to inject when building some of of docker images for continuous integration.

## Testing your code will save you a lot of time

We all heard this sentence one time in our engineer life: "testing your code is critical". But between the theory and the reality, there is a huge gap. I have seen codebases with almost zero test in very different environments (banking, academia, startups). I also faced the situation where I was kindly advised not to spend to much time writing tests as this may alter my velocity on tightly budgeted projects. This is really a pity. Now, I am working on codebases highly covered by both unit and integration tests. Having experienced both situations, I can guarantee you that testing your code WILL SAVE YOU a lot of time. This is a long-term investment that your future self or colleague will bless. With tests you can easily spend time refactoring your code, add new features without any fear and this is priceless.

Along the way I learnt new testing pattern with `pytest`. On my previous articles I focused on `fixtures` to reuse pieces of data or code. But since, I learnt to parametrize my testing functions with `pytest.mark.parametrize` and also "monkey patch" some piece of code with the `monkeypatch` pytest fixture. Drill these if you can.

## `pre-commit` is the king

I am using `pre-commit` for all our company projects. Clearly having it installed is a must. With a proper list of `pre-commit` tasks you will always ship good quality code when pushing your commits. Be aware that the `pre-commit` you install may depend on your company / team guidelines in term of code quality. A typical `.pre-commit-config.yaml` file looks like this:

```yaml
---
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.3.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: check-case-conflict
      - id: check-builtin-literals
      - id: check-docstring-first
      - id: check-merge-conflict
      - id: debug-statements
      - id: requirements-txt-fixer
      - id: detect-private-key
      - id: pretty-format-json
        args: ["--autofix", "--indent", "4", "--no-sort-keys"]

  - repo: https://github.com/adrienverge/yamllint.git
    rev: v1.28.0
    hooks:
      - id: yamllint

  - repo: https://github.com/asottile/pyupgrade
    rev: v2.38.0
    hooks:
      - id: pyupgrade
        args: ["--py3-plus", "--py39-plus"]

  - repo: https://github.com/psf/black
    rev: 22.8.0
    hooks:
      - id: black

  - repo: https://github.com/PyCQA/isort
    rev: 5.10.1
    hooks:
      - id: isort
        args: ["--profile", "black"]

  - repo: https://github.com/pycqa/flake8
    rev: 5.0.4
    hooks:
      - id: flake8
        args: ["--max-line-length", "88", "--ignore", "E203,W50,E501"]
        additional_dependencies: [flake8-bugbear]

  - repo: https://github.com/PyCQA/bandit
    rev: 1.7.4
    hooks:
      - id: bandit
        # .bandit config is not read when used by
        # pre-commit (ie with explicit file in input)
        # https://github.com/PyCQA/bandit/issues/332
        args: ["--skip", "B101"]

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v0.971
    hooks:
      - id: mypy
        types: [python]
        args: ["--ignore-missing-imports"]
        additional_dependencies:
          [pydantic, types-pytz, types-requests, types-protobuf]
```

All of the above-mentionned checks will be run each before each commit. If your code does not comply to the rules enforced by any of them, your code will not be commited to your repository.

## Really learn `GIT`

This one is pretty trivial. But I really advise you to learn git and understand how it works under the hood. Do not embrace its complexity but rather focus on the mechanism. Once you realized that what `git` does is mainly writing hashed content with pointers on your computer, you may apprehend it differently, without fear and hesitation. Watch this [video](https://www.youtube.com/watch?v=lG90LZotrpo). It gave me a lot of these `AHAAAAA` moments and made me feel smarter. Knowing how to rebase, rolling back to specific `reflogs` will save you at your job and most importantly, your colleagues will trust you and give you more responsibility not fearing you may break / re-write history.

## Makefile for automation

There are a lot of redundant tasks that I am doing on a daily basis:

* testing your code
* running your code against your linters / formaters
* building container images
* deploying resources on cloud using the provider CLI

I tend to automate all of them using `Makefile` rules. It works and save me a lot of time.

## Conclusion

My main objective here was to give some kind of feedback based on my own experience as a python engineer. Cultures are different across company and there is no absolute workflow to learn. Nevertheless, there are some foundations that need to be here if you want your life as a developer to be productive. Testing your code is a game changer for me. During interview ask recruiters questions about their software engineering culture. This is super important especially if you want to work on high quality coding environment.
