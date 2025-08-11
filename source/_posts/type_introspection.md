---
title: Unlocking Python's type system: a brief overview of `inspect` and `typing` modules
summary: "Inspect Python's types"
date: "2025-08-09"
tags:
    - Python
---
Python's type system has evolved significantly over the years, and with it, powerful tools for introspection and type manipulation have
emerged. In this article, I'll explore some of the functions from the `inspect` and `typing` modules I have been using to build type-aware applications. Indeed if you app needs to understand function signatures and types at runtime, Python's `inspect` and `typing`
modules become invaluable.

## inspect.signature()

The `inspect.signature()` function is literally a detective. It reveals everything about a function's parameters and their characteristics.

```python
import inspect

def example_function(user_id: int, name: str = "guest", is_active: bool = True):
    pass

inspect.signature(example_function)


# Return: <Signature (user_id: int, name: str = 'guest', is_active: bool = True)>
```

This function powerful is that it returns an [Signature](https://docs.python.org/3/library/inspect.html#inspect.Signature) object containing detailed information about each parameter:

```python
for param_name, param in sig.parameters.items():
    print(f"Parameter: {param_name}")
    print(f"Type: {param.annotation}")
    print(f"Default: {param.default}")
    print(f"Kind: {param.kind}")
```

The Signature object gives you access to:

- Parameter names: the names of all parameters
- Type annotations: the type hints for each parameter
- Default values: whether parameters have defaults and what they are
- Parameter kinds:`POSITIONAL_ONLY`, `POSITIONAL_OR_KEYWORD`, `VAR_POSITIONAL`

## `typing.get_type_hints()`

While `inspect.signature()` gives you parameter information, `typing.get_type_hints()` goes a step further by resolving all type hints,
including forward references and string annotations:

```python
from typing import get_type_hints

def process_data(data: list[str], config: dict[str, Any]) -> bool:
    pass

get_type_hints(process_data)

# Return: {'data': list[str], 'config': dict[str, Any], 'return': bool}
```

This function is particularly useful because:

- It return a dictionnary which makes it very easy to manipulate or parse
- It resolves forward references (types defined as strings)
- It handles complex generic types properly
- It includes the return type annotation
- It works with classes, not just functions

## `typing.get_origin()` and `typing.get_args()` for generic type instrospection

The typing module provides additional functions for working with generic types, which are essential for modern Python type annotations.
These functions help you understand the structure of generic types like `list[str]`, `dict[str, int]`, or `Optional[int]`.

```python
from typing import get_origin, get_args, List, Dict, Optional

# Working with list[str]
list_type = list[str]
print(get_origin(list_type))  # <class 'list'>
print(get_args(list_type))    # (<class 'str'>,)

# Working with Dict[str, int]
dict_type = dict[str, int]
print(get_origin(dict_type))  # <class 'dict'>
print(get_args(dict_type))    # (<class 'str'>, <class 'int'>)

# Working with Optional[User]
from typing import Union
optional_type = Union[str, None]
print(get_origin(optional_type))  # typing.Union
print(get_args(optional_type))    # (<class 'str'>, <class 'NoneType'>)
```

These functions are quite useful and helped me for:

• Schema generation: converting Python types to JSON Schema or other formats
• Validation: building runtime type checkers
• Serialization: converting between Python objects and other formats

## Some tips from my personal usage:

1. Use `get_type_hints()` instead of direct annotation access: it properly resolves forward references and string annotations.
2. Handle `inspect.Parameter.empty` correctly: This special value indicates that a parameter has no default value.
3. Consider performance: introspection has a cost, so cache results when possible.
4. Handle edge cases: not all types can be easily introspected, so provide fallbacks.

## Conclusion

The `inspect` and `typing` modules provide powerful tools for runtime type introspection and manipulation. By combining `inspect.signature()`, `typing.get_type_hints()`, `typing.get_origin()`, and `typing.get_args()`, you can build sophisticated frameworks that understand and work with Python's type system dynamically. So if you need to understand function signatures or work with types at runtime, remember these powerful tools that Python provides right out of the box!

