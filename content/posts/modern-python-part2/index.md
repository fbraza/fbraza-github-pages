---
title: "Modern Python part 2: write unit tests & enforce Git commit conventions"
summary: "Unit testing and pre-commit in Python"
date: "2021-06-24"
tags:
    - Python
    - Github
    - Dev
---

Good software engineering practices always bring a lot of long-term benefits. For example, writing unit tests permits you to maintain large codebases and ensures that a specific piece of your code behaves as expected. Writing consistent Git commits also enhance the collaboration between the project stakeholders. Well-crafted Git commit messages open the door to automatic versioning and generated change log files. Consequently, a lot of attempts are currently ongoing and applied to normalize the messages written in our Git commits.

In the first part of this serie, we setup, our project by installing different Python versions with `pyenv`, setting a local version of Python with `pyenv`, encapsulating it into a virtual environment with `poetry`. Here we show more precisely how to unit test your Python application and how to enforce and validate your Git commit messages. The source code associated with this article is published on [GitHub](https://github.com/adaltas/summarize_dataframe).

## Testing our code

The project is a simple python function that summarizes data present in a [pandas DataFrame](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html). The function outputs the number of rows and columns and the frequency of each data types present in the pandas DataFrame:

```bash
---- Data Summary ------
                       Values
Number of rows          230
Number of columns         9
float64                   3
int64                     4
object                    2
```

Go to your project root directory and activate your virtual environment:

```bash
poetry shell
```

We add a couple of dependencies using poetry:

```bash
poetry add -D pynvim numpy pandas

Using version ^0.4.3 for pynvim
Using version ^1.20.2 for numpy
Using version ^1.2.3 for pandas

Updating dependencies
Resolving dependencies... (1.4s)

Writing lock file

Package operations: 8 installs, 0 updates, 0 removals

  • Installing six (1.15.0)
  • Installing greenlet (1.0.0)
  • Installing msgpack (1.0.2)
  • Installing numpy (1.20.2)
  • Installing python-dateutil (2.8.1)
  • Installing pytz (2021.1)
  • Installing pandas (1.2.3)
  • Installing pynvim (0.4.3)
```

The `-D` flag indicates that the dependency only apply to development environments.

> Note: I personally use NeoVim for coding that is why I need the `pynvim`  package to support NeoVim python plugins.

Based on the expected output defined above, our program is made of three steps:

1. Getting the shape of the pandas DataFrame.
2. Getting the pandas `dtypes` frequency.
3. Concatenating the two results into a unified DataFrame that we will use to output the final result.

Once the final DataFrame is obtained we output the result as depicted above. In this regard our code scaffold could look as the following:

```python
import pandas as pd


def data_summary(df: pd.DataFrame) -> None:
    """
    Function defined to return a DataFrame containing details
    about the number of rows and columns and the column dtype
    frequency of the passed pandas DataFrame
    """
    def _shape(df: pd.DataFrame) -> None:
        """
        Function defined to return a dataframe with details about
        the number of row and columns
        """
        return None

    def _dtypes_freq(df: pd.DataFrame) -> None:
        """
        Function defined to return a dataframe with details about
        the pandas dtypes frequency
        """
        return None



def display_summary(df: pd.DataFrame) -> None:
    """
    Function define to print out the result of the data summary
    """
    result_df = True
    message = '---- Data summary ----'
    print(message, result_df, sep='\n')
```

Let's now start writing our unit tests. We are going to use the `unittest` tool available with the Python standard library. You may remember in the previous article that [pytest](https://docs.pytest.org/en/stable/contents.html) was defined as a developer dependency for testing. It is not an issue with `pytest` because it natively runs tests written with the `unittest` library.

Unit tests are single methods that `unittest` expects you to write inside Python classes. Choose a descriptive name for your test classes and methods. The name of your test methods should start with `test_`.  Additionally, `unittest` uses a series of special assertion methods inherited from the `unittest.TestCase` class. In practice, a test should precisely cover one feature, be autonomous without requiring external cues, and should recreate the conditions of their success.

To recreate the necessary environment, setup code must be written. If this code happens to be redundant, implements a `setUp()` method, that will be executed before every single test. This is pretty convenient to re-use and re-organize your code. Depending on your use case you may have to perform systematic operations after the tests ran. For that, you may use the `tearDown()` method.

First you can read below the unit test we implemented for the `data_summary()` function:

```python
import unittest
import pandas as pd
from summarize_dataframe.summarize_df import data_summary


class TestDataSummary(unittest.TestCase):
    def setUp(self):
        # initialize dataframe to test
        df_data = [[1, 'a'], [2, 'b'], [3, 'c']]
        df_cols = ['numbers', 'letters']
        self.df = pd.DataFrame(data=df_data, columns=df_cols)
        # initialize expected dataframe
        exp_col = ['Values']
        exp_idx = ['Number of rows', 'Number of columns', 'int64', 'object']
        exp_data = [[3], [2], [1], [1]]
        self.exp_df = pd.DataFrame(data=exp_data, columns=exp_col, index=exp_idx)

    def test_data_summary(self):
        expected_df = self.exp_df
        result_df = data_summary(self.df)
        self.assertTrue(expected_df.equals(result_df))

if __name__ == '__main__':
    unittest.main()
```

The `setUp()` method initializes two distinct pandas DataFrame. `self.exp_df` is the resulting DataFrame we expect to get after calling the `data_summary()` function and `self.df` is the one used to test our functions. At the moment, tests are expected to fail. The logic has not been implemented. To test with `poetry` use the command:

```bash
poetry run pytest -v
============================================== test session starts ==============================
platform linux -- Python 3.8.7, pytest-5.4.3, py-1.10.0, pluggy-0.13.1 -- /home/fbraza/.cache/pypoetry/virtualenvs/summarize-dataframe-SO-g_7pj-py3.8/bin/python
cachedir: .pytest_cache
rootdir: /home/fbraza/Documents/python_project/summarize_dataframe
collected 1 item
tests/test_summarize_dataframe.py::TestDataSummary::test_data_summary FAILED [100%]
=============================================== FAILURES =========================================
___________________________________TestDataSummary.test_data_summary _____________________________

self = <tests.test_summarize_dataframe.TestDataSummary testMethod=test_data_summary>

    def test_data_summary(self):
        expected_df = self.exp_df
        result_df = data_summary(self.df)
>       self.assertTrue(expected_df.equals(result_df))
E       AssertionError: False is not true

tests/test_summarize_dataframe.py:26: AssertionError
============================================== short test summary info =============================
FAILED tests/test_summarize_dataframe.py::TestDataSummary::test_data_summary - AssertionError: False is not true
============================================== 1 failed in 0.32s ===================================
```

Using the `-v` flag returns a more verbose output for your test results. You can see that your tests are labeled according to the classes and functions names you gave (i.e., `<test_module.py>::<class>::<test_method>`).

The code is updated to conform with the unit tests:

```python
import pandas as pd


def data_summary(df: pd.DataFrame) -> pd.DataFrame:
    """
    Function defined to output details about the number
    of rows and columns and the column dtype frequency of
    the passed pandas DataFrame
    """
    def _shape(df: pd.DataFrame) -> pd.DataFrame:
        """
        Function defined to return a dataframe with details about
        the number of row and columns
        """
        row, col = df.shape
        return pd.DataFrame(data=[[row], [col]], columns=['Values'], index=['Number of rows', 'Number of columns'])

    def _dtypes_freq(df: pd.DataFrame) -> pd.DataFrame:
        """
        Function defined to return a dataframe with details about
        the pandas dtypes frequency
        """
        counter, types = {}, df.dtypes
        for dtype in types:
            tmp = str(dtype)
            if tmp in counter.keys():
                counter[tmp] += 1
            else:
                counter[tmp] = 1
        values = [[value] for value in counter.values()]
        return pd.DataFrame(data=values, columns=['Values'], index=list(counter.keys()))
    result_df = pd.concat([_shape(df), _dtypes_freq(df)])
    return result_df

def display_summary(df: pd.DataFrame) -> None:
    """
    Function define to print out the result of the data summary
    """
    result_df = True
    message = '---- Data summary ----'
    print(message, result_df, sep='\n')
```

Run our test again:

```bash
poetry run pytest -v
=============================================== test session starts ===============================================================
platform linux -- Python 3.8.7, pytest-5.4.3, py-1.10.0, pluggy-0.13.1 -- /home/fbraza/.cache/pypoetry/virtualenvs/summarize-dataframe-SO-g_7pj-py3.8/bin/python
cachedir: .pytest_cache
rootdir: /home/fbraza/Documents/python_project/summarize_dataframe
collected 1 item

tests/test_summarize_dataframe.py::TestDataSummary::test_data_summary PASSED [100%]
=============================================== 1 passed in 0.28s =================================================================
```

One last thing here. In our tests, we did not test the actual output. Our module is designed to output a string representation of our DataFrame summary. There are solutions to achieve this goal with `unittest`. However we are going to use `pytest` for this test. Surprising isn't it? As said before `pytest` interpolates very well with `unittest` and we are going to illustrate it now. Here the code for this test:

```python
import unittest
import pytest
import pandas as pd
from summarize_dataframe.summarize_df import data_summary, display_summary


class TestDataSummary(unittest.TestCase):
    def setUp(self):
        # initialize dataframe to test
        df_data = [[1, 'a'], [2, 'b'], [3, 'c']]
        df_cols = ['numbers', 'letters']
        self.df = pd.DataFrame(data=df_data, columns=df_cols)
        # initialize expected dataframe
        exp_col = ['Values']
        exp_idx = ['Number of rows', 'Number of columns', 'int64', 'object']
        exp_data = [[3], [2], [1], [1]]
        self.exp_df = pd.DataFrame(data=exp_data, columns=exp_col, index=exp_idx)

    @pytest.fixture(autouse=True)
    def _pass_fixture(self, capsys):
        self.capsys = capsys

    def test_data_summary(self):
        expected_df = self.exp_df
        result_df = data_summary(self.df)
        self.assertTrue(expected_df.equals(result_df))

    def test_display(self):
        print('---- Data summary ----', self.exp_df, sep='\n')
        expected_stdout = self.capsys.readouterr()
        display_summary(self.df)
        result_stdout = self.capsys.readouterr()
        self.assertEqual(expected_stdout, result_stdout)

if __name__ == '__main__':
    unittest.main()
```

Notice the decorator `@pytest.fixture(autouse=True)` and the function it encapsulates (`_pass_fixture`). In the unit test terminology, this method is called a [fixture](https://docs.pytest.org/en/stable/fixture.html). Fixtures are functions (or methods if you use an OOP approach), which will run before each test to which it is applied. Fixtures are used to feed some data to the tests. They fill the same objective as the `setUp()` method we used before. Here we are using a predefined fixture called `capsys` to capture the standard output (`stdout`) and reuse it in our test. We can then modify our code `display_summary()` accordingly:

```python
import pandas as pd


def data_summary(df: pd.DataFrame) -> pd.DataFrame:
    """
    Function defined to output details about the number
    of rows and columns and the column dtype frequency of
    the passed pandas DataFrame
    """
    def _shape(df: pd.DataFrame) -> pd.DataFrame:
        """
        Function defined to return a dataframe with details about
        the number of row and columns
        """
        row, col = df.shape
        return pd.DataFrame(data=[[row], [col]], columns=['Values'], index=['Number of rows', 'Number of columns'])

    def _dtypes_freq(df: pd.DataFrame) -> pd.DataFrame:
        """
        Function defined to return a dataframe with details about
        the pandas dtypes frequency
        """
        counter, types = {}, df.dtypes
        for dtype in types:
            tmp = str(dtype)
            if tmp in counter.keys():
                counter[tmp] += 1
            else:
                counter[tmp] = 1
        values = [[value] for value in counter.values()]
        return pd.DataFrame(data=values, columns=['Values'], index=list(counter.keys()))
    result_df = pd.concat([_shape(df), _dtypes_freq(df)])
    return result_df

def display_summary(df: pd.DataFrame) -> None:
    """
    Function define to print out the result of the data summary
    """
    result_df = data_summary(df)
    message = '---- Data summary ----'
    print(message, result_df, sep='\n')

```

Then run the tests again:

```bash
poetry run pytest -v
=============================================== test session starts ===============================================================
platform linux -- Python 3.8.7, pytest-5.4.3, py-1.10.0, pluggy-0.13.1 -- /home/fbraza/.cache/pypoetry/virtualenvs/summarize-dataframe-SO-g_7pj-py3.8/bin/python
cachedir: .pytest_cache
rootdir: /home/fbraza/Documents/python_project/summarize_dataframe
collected 2 items
tests/test_summarize_dataframe.py::TestDataSummary::test_data_summary PASSED [ 50%]
tests/test_summarize_dataframe.py::TestDataSummary::test_display PASSED      [100%]

=============================================== 2 passed in 0.29s =================================================================
```

The tests now succeed. It is time to commit and share our work, for example by publishing it to [GitHub](https://github.com/). Before that, let's take a close look at how to properly communicate about our work with Git commit messages while respecting and enforcing a common standard.

## Enforce Git commit messages rules in your Python project

Writing optimal Git commit messages is not an easy task. Messages need to be clear, readable, and understandable in the long term. **[The Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)** proposes a set of rules for creating explicit commit histories.

### Using `commitizen`

In our series about [JavaScript monorepos](/en/2021/02/02/js-monorepos-commits-changelog/), we saw how to integrate these conventions to enforce good practices regarding commit messages. Applied to Python, we are going to use a package called [commitizen](https://commitizen-tools.github.io/commitizen/) to achieve this. Let's add this package to our developer dependencies:

```bash
poetry add -D commitizen

Using version ^2.17.0 for commitizen

Updating dependencies
Resolving dependencies... (3.1s)

Writing lock file

Package operations: 11 installs, 0 updates, 0 removals

  • Installing markupsafe (1.1.1)
  • Installing prompt-toolkit (3.0.18)
  • Installing argcomplete (1.12.2)
  • Installing colorama (0.4.4)
  • Installing decli (0.5.2)
  • Installing jinja2 (2.11.3)
  • Installing pyyaml (5.4.1)
  • Installing questionary (1.6.0)
  • Installing termcolor (1.1.0)
  • Installing tomlkit (0.7.0)
  • Installing commitizen (2.17.0)
```

To setup `commitizen` for your project, run the command `cz init`. It prompts us with a set of questions:

```bash
cz init
? Please choose a supported config file: (default: pyproject.toml)  (Use arrow keys)
 » pyproject.toml
   .cz.toml
   .cz.json
   cz.json
   .cz.yaml
   cz.yaml

? Please choose a cz (commit rule): (default: cz_conventional_commits)  (Use arrow keys)
 » cz_conventional_commits
   cz_jira
   cz_customize

? Please enter the correct version format: (default: "$version")

? Do you want to install pre-commit hook?  (Y/n)
```

Choose all default choices here as they fit perfectly with our actual situation. The last question asks us if we want to use [pre-commit](https://pre-commit.com/) hook. We are going to come back to this later on. So just answer `no` for now. If we look at our `pyproject.toml` file we can see that a new entry named `[tool.commitizen]` has been added:

```ini
[...]

[tool.commitizen]
name = "cz_conventional_commits" # commit rule chosen
version = "0.0.1"
tag_format = "$version"
```

To check your commit message, you can use the following command:

```bash
cz check -m "all summarize_data tests now succeed"

commit validation: failed!
please enter a commit message in the commitizen format.
commit "": "all summarize_data tests now succeed"
pattern: (build|ci|docs|feat|fix|perf|refactor|style|test|chore|revert|bump)!?(\(\S+\))?:(\s.*)
```

Our message is rejected because it does not respect the commit rules. The last line suggests some patterns to use. Take some time to read the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) documentation and run the command `cz info` to print a short documentation:

```bash
cz info
The commit contains the following structural elements, to communicate intent to the consumers of your library:

fix: a commit of the type fix patches a bug in your codebase
(this correlates with PATCH in semantic versioning).

feat: a commit of the type feat introduces a new feature to the codebase
(this correlates with MINOR in semantic versioning).

BREAKING CHANGE: a commit that has the text BREAKING CHANGE: at the beginning of
its optional body or footer section introduces a breaking API change
(correlating with MAJOR in semantic versioning).
A BREAKING CHANGE can be part of commits of any type.

Others: commit types other than fix: and feat: are allowed,
like chore:, docs:, style:, refactor:, perf:, test:, and others.
[...]
```

This command guides you on how to write your commit message. Here the format should be `"[pattern]: [MESSAGE]"`. For us, this leads to:

```bash
cz check -m "test: all summarize_data tests now succeed"
Commit validation: successful!
```

Very good, our commit message is valid. But hold on. Checking our messages each time with `commitizen` might be cumbersome and doesn't provide the garanty to be applied. It would be better to check automatically the message each time we use the `git commit` command. That is where the `pre-commit` hook takes action.

### Automatically enforce Git message conventions with `pre-commit`

Git hooks are useful to automate and perform some actions at specific place during the Git lifecycle. The `pre-commit` hook permits to run scripts before a Git commit is issued. We can use the hook to validate the commit messages and prevent Git from using a message which doesn't match our expectations. The hook is active from the command line as well as from any tools interacting with the Git repository where the hook is registered, including your favoride IDE.

[pre-commit](https://pre-commit.com/index.html) is a framework for managing and maintaining multi-language pre-commit hooks. If you want to know more about the inner workings and the spectrum of possibilities opened by the `pre-commit` hook, you can read its [usage documentation](https://pre-commit.com/index.html#usage).

To install `pre-commit` just run:

```bash
peotry add -D pre-commit
```

To automate the Git commit verification we first need to create a configuration file `.pre-commit-config.yaml` as followed:

```yaml
---
repos:
  - repo: https://github.com/commitizen-tools/commitizen
    rev: master
    hooks:
      - id: commitizen
        stages: [commit-msg]
```

Next we can install the hook with its source defined in the `repo` property:

```bash
pre-commit install --hook-type commit-msg
```

Now that everything is set, we can use our Git hook:

```bash
git commit -m "test: all summarize_data tests now succeed"
[INFO] Initializing environment for https://github.com/commitizen-tools/commitizen.
[INFO] Installing environment for https://github.com/commitizen-tools/commitizen.
[INFO] Once installed this environment will be reused.
[INFO] This may take a few minutes...
commitizen check.........................................................Passed
[INFO] Restored changes from /home/fbraza/.cache/pre-commit/patch1617970841.
[master 1e64d0a] test: all summarize_data tests now succeed
 2 files changed, 48 insertions(+), 5 deletions(-)
 rewrite tests/test_summarize_dataframe.py (98%)
```

`pre-commit` installs an environment to run its checks. As you can see here the commit message assessment passed. To finish we can commit and push the modifications made on the build files (`poetry.lock`, `pyproject.toml`) and our module:

```bash
git commit -m "build: add developer dependencies" -m "commitizen and pre-commit added to our dev dependencies"

commitizen check.........................................................Passed
[master 1c6457c] build: add developer dependencies
 2 files changed, 585 insertions(+), 1 deletion(-)

 git commit -m "feat: implementation of the summary function to summarize dataframe"

commitizen check.........................................................Passed
[master 5c053ad] build: add developer dependencies
 1 file changed, 94 insertions(+)
```

We can now push everything to our GitHub repository:

```bash
git push origin master
```

## Conclusion

We covered a few topics:

- On the first hand, we saw how to write unit tests for your code. You shall always start to write tests before coding. It helps you affinate your API and expectations before implementing them. You will definitively benefit from it. We used `unittest` which is already available in the Python standard library. I actually like its simple design and object-oriented approach but others prefer using the [`pytest` library](https://docs.pytest.org/en/stable/) which is definitively worth checking. One very convenient aspect is that `pytest` supports the `unittest.TestCase` class from the beginning. You can then write your tests with either of the two libraries or even mix both depending on your needs and have one common command to run them all.
- We saw how to enforce good practices when writing Git commit messages. Our proposed solution relies on the use of two distinct Python packages: [commitizen](https://commitizen-tools.github.io/commitizen/) and [pre-commit](https://pre-commit.com/). The first one provides with the tools to check if a message validate the conventions you have chosen. The second one automates the process using a Git hook.

In our next and last article, we are going to go one step further. We automate testing using `tox` and integrate it inside a [CI/CD](/en/tag/ci-cd/) pipeline. Once done we will show how to prepare our package and finally publish it on [PyPi](https://pypi.org/) using `poetry`.

## Cheat sheet

### `poetry`

- Add project dependencies:

  ```bash
  poetry add [package_name]
  ```

- Add developer dependencies:

  ```bash
  poetry add -D [package_name]
  ```

  ```bash
  poetry add --dev [package_name]
  ```

- Run test:

  ```bash
  poetry run pytest
  ```

### `commitizen`

- Initialize `commitizen`:

  ```bash
  cz init
  ```

- Check your commit:

  ```bash
  cz check -m "YOUR MESSAGE"
  ```

### `pre-commit`

- Generate a default configuration file:

  ```bash
  pre-commit sample-config
  ```

- Install git hook:

  ```bash
  pre-commit install --hook-type [hook_name]
  ```

## Acknowledgments

This article was first published in Adaltas [blog](https://www.adaltas.com/en/articles/) and kindly reviewed by the CEO David Worms and one consultant Barthelemy NGOM.
