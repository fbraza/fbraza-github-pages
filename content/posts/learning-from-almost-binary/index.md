---
title: STDIN with almost binary input
summary: "Hackattic Kata I: STDIN and almost binary"
date: "2025-07-10"
tags:
    - Python
    - Javascript
    - GO
---

I started to play with Kata from [Hackattic](https://hackattic.com/kata). I was looking for some backend challenges to re-sharpen again my skills in programming and start explore other new languages notably Elixir. I always wanted to dabble into functional programming.

There are two things that I want to explore here:

- How to read STDIN in these languages
- How to handle binary and transform into base10 numbers

These investigations are interesting because they allow us to explore different ways of handling input and transforming data in various programming languages. Additionally, they provide a good opportunity to practice problem-solving skills and gain a deeper understanding of the underlying concepts. Finally, they help me realise that having work on data kind of encloses you in some level of comfort doing always the same thing and forgetting about even the basics of some operations.

I want to expand my skills and start working as a backend engineer. As such my objective is to become polyglot and start building a portfolio of projects that showcase my ability to work with different programming languages and frameworks. But let's start over with some basics.

## Problem statement

The kata to solved is straigth forward. We receive a list of strings of `#` and `.` which respectively correspond to `1` and `0`. We need to transform each string into a `base2` and next into `base10` number.

## STDIN

For each problem proposed on the platform we need to deal with the `STDIN` input. So the first step was to read the stream of information coming as input.

### In Python

I have to admit that I needed to check the doc. I knew I could use the `input()` function to read the input from the standard input from users but did not remember how to do this with `STDIN`. It revealed to be quite simple. Python as a module called `stdin` that we can find in the `sys` module. Looking at the documentation we can see that `stdin` is a file-like object that we can use to read from the standard input. Calling the `__dir__()` method on `stdin` will give us a list of all the attributes and methods available for this object.

```python
import sys

sys.stdin.__dir__()
```

Executing such code on your favorite python REPL should return something like this:

```text
# shorten for readability
['mode',
 '__new__',
 '__repr__',
 '__next__',
 '__init__',
 # ...
 'read',
 'readline',
 # ...
 'readlines',
 'writelines',
 # ...
 '__dir__',
 '__class__']
```

Glancing through the list we can quickly identify the needed method `readlines()` that will return a list of strings. Next we can glance through each line, strip them and apply our processing to transform the line into `base10` number.

```python
import sys

def to_decimal(input: str):
    binary = "".join(
        ["0" if char == "." else "1" for char in input]
    )
    return int(binary, base=2)


def main():
    for line in sys.stdin.readlines():
        decimal = to_decimal(line.strip())
        print(decimal)


if __name__ == "__main__":
    main()
```

Notice that for transforming binary into decimals we just use the very convenient `int()` function that takes a string and a base as arguments and returns the corresponding integer.

### In Ruby

The approach with Ruby was very similar to python. In Ruby `$stdin` is an important objects based from the `IO` class.

```Ruby
def to_number(line)
  line
    .each_char
    .map { |char| char == '.' ? 0 : 1 }
    .join
    .to_i(2)
end

def main()
  $stdin.each_line { |line| puts to_number(line.strip) }
end

main()
```

>I am still hooked by the expressiveness of Ruby.

### In Go

I tried the kata in Go. Let me be honest. It was my first line of code in Go. SO I add to read documentation and some nice stackoverflow posts to get this working. That being said, I was surprised how verbose the approach. Definetly does not give me the will to dive into the GO language.

```Go
package main

import (
    "fmt"
    "strconv"
    "bufio"
    "os"
)


func to_decimal(line string) int64 {
    var binary string = ""
    for i := 0; i < len(line); i++ {
        if line[i] == byte('.') {
            binary += "0"
        } else {
            binary += "1"
        }
    }

    if result, err := strconv.ParseInt(binary, 2, 64); err == nil {
        return result
    }
    return 0
}


func main() {
    scanner := bufio.NewScanner(os.Stdin)

    if err := scanner.Err(); err != nil {
        fmt.Fprintln(os.Stderr, "reading standard input:", err)
    }

    var result []int64

    for scanner.Scan() {
        input := scanner.Text()
        result = append(result, to_decimal(input))
    }

    for i := 0; i < len(result); i++ {
        fmt.Println(result[i])
    }
}
```

>I am not an expert in Go at all!!! SO I will not comment to much on this code. But it was complicated to get there. And I have absolutely no idea about all these "scanner" objects and functions. As I will start learning this language soon, I may be able to describe a bit more what is happening here.

### In Javascript

Javascript is a must. It is everywhere on the web. Typescript is the "typed" version of javascript so to speak. A lot of framework are written in Typescript notably the AI SDK that I want to get proficiency in. So let's go and learn it.

```Javascript
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
 });

function to_decimal(line) {
    var binary = ""
    for (let i = 0; i < line.length; i++) {
        if (line[i] === ".") {
            binary += "0"
        } else {
            binary += "1"
        }
    }

    return parseInt(binary, 2);
}

rl.on('line', function(line) {
    console.log(to_decimal(line.trim()))
})
```

Alright that was just the first Hackattic Kata. Pretty easy. Will take the opporutnity of such exercise to consolidate my learning with GO. Let's see how far I will go!
