---
title: "Manipulating bytes: Python's cryptic approach vs Crystal's clarity"
summary: "A practical journey through bytes manipulation comparing Python's powerful but mysterious `struct.unpack` with Crystal's elegant and explicit approach"
date: "2025-06-10"
tags:
    - Python
    - Crystal
    - Programming Language
---

# When real work meets binary mystery

During my time at Sunrise, we encountered one of those problems that perfectly illustrates why understanding binary data manipulation matters. Our sleep technicians were analysing manually over 2000 polysomnography recordings from clinical studies that needed to be exported from proprietary software to CSV files, one by one. Each night's analysis looked something like this when exported:

```text
AWAKE  22:00:00
AWAKE  22:00:30
[...]
N1     01:00:00
N1     01:00:30
[...]
N2     03:10:30
N2     03:11:00
[...]
REM    04:15:30
[...]
```

When the technicians approached my lead and me asking if there was any way to extract data directly from the proprietary files, I knew we had to enter the fascinating (and sometimes frustrating) world of binary data manipulation. This experience led me to discover Python's `struct.unpack` function: a powerful tool that is both incredibly useful and surprisingly cryptic.

## The Python Enigma: Powerful but Puzzling

Let me show you what I mean by "cryptic." Imagine you're handed this sequence of bytes:

```text
b'\xcdDa\x85\x9a\x1cn\xf5\x1b}\x00\x00\xcf\xf7\xc2B\xf0\xb5{\xba\xd4Qt@@tQ\xd4\xba{\xb5\xf0'
```

Your task is to extract, in this specific order:
- A regular signed integer
- An unsigned integer
- A signed short
- A float
- A double
- A double in big endian

>This exercise comes from [Hackattic]((https://hackattic.com/challenges/help_me_unpack)).

If you're not familiar with `struct.unpack`, this might seem impossible. But here's how Python handles it:

```python
import struct

def decode_bytes(to_decode: bytes):
    return {
        "int": struct.unpack('<i', to_decode[0:4])[0],
        "uint": struct.unpack('<I', to_decode[4:8])[0],
        "short": struct.unpack('<h', to_decode[8:10])[0],
        "float": struct.unpack('<f', to_decode[12:16])[0],
        "double": struct.unpack('<d', to_decode[16:24])[0],
        "big_endian_double": struct.unpack('>d', to_decode[24:32])[0]
    }
```

This works, but let's be frank. Without documentation, I would be completely lost. What does `<i` even mean? And why `[0:4]`? The magic lies in understanding two key concepts: format strings and byte slicing.

### Decoding the mystery: format strings

The `struct.unpack` method takes two parameters: a `format` string that describes how to interpret your bytes, and the `buffer` of bytes to convert. The format string is where things get cryptic. Here's the essential reference [table](https://docs.python.org/3/library/struct.html#format-characters):

| Format | C Type | Python Type | Size (bytes) |
|--------|--------|-------------|--------------|
| b | signed char | integer | 1 |
| B | unsigned char | integer | 1 |
| h | short | integer | 2 |
| H | unsigned short | integer | 2 |
| i | int | integer | 4 |
| I | unsigned int | integer | 4 |
| f | float | float | 4 |
| d | double | float | 8 |

The `<` and `>` symbols control byte order (endianness):

- `<` = little-endian (least significant byte first)
- `>` = big-endian (most significant byte first)

### The art of byte slicing

Understanding how to extract the right-sized chunks is crucial. Let's explore our example bytes:

```python
bytes_data = b'\xcdDa\x85\x9a\x1cn\xf5\x1b}\x00\x00\xcf\xf7\xc2B\xf0\xb5{\xba\xd4Qt@@tQ\xd4\xba{\xb5\xf0'

# Individual bytes
bytes_data[0:4]   # => b'\xcdDa\x85' (4 bytes for int)
bytes_data[4:8]   # => b'\x9a\x1cn\xf5' (next 4 bytes for uint)
bytes_data[8:10]  # => b'\x1b}' (2 bytes for short)
```

`bytes_data[0]` returns `205` (the integer value), but `bytes_data[0:1]` returns `b'\xcd'` (a bytes object). Python's indexing vs. slicing behavior with bytes can trip you up if you are not careful.

## Crystal's elegant solution

After months of wrestling with Ruby's beauty at Launch School, I discovered Crystal: a language that captures Ruby's elegance while adding static typing and impressive performance. Crystal's approach to byte manipulation showcases its elegance.

Here's how Crystal handles the same byte conversion task:

```crystal
bytes = Bytes[205, 68, 97, 133, 154, 28, 110, 245]
io = IO::Memory.new(bytes)
integer = io.read_bytes(UInt32, IO::ByteFormat::LittleEndian)
```

That's it. Three lines that handle:

- **Memory management**: no manual buffer allocation needed
- **Type safety**: explicit integer type specification (`UInt32`)
- **Endianness control**: clear, readable byte order specification
- **Error handling**: built-in bounds checking

### Why Crystal wins on readability

Compare these two approaches:

**Python (cryptic but compact):**
```python
struct.unpack('<I', buffer[0:4])[0]
```

**Crystal (explicit and self-documenting):**
```crystal
io.read_bytes(UInt32, IO::ByteFormat::LittleEndian)
```

In Crystal, `UInt32` immediately tells you what you're getting. Python's `<I` requires memorizing that `<` means little-endian and `I` means unsigned integer. Crystal's enum-based approach makes intent crystal clear!

```crystal
IO::ByteFormat::LittleEndian
IO::ByteFormat::BigEndian
```

### A Note on Representation

One interesting difference is how each language represents bytes:

- **Python** uses mixed representation showing printable ASCII as characters (`D`, `a`) and non-printable as hex escapes (`\xcd`, `\x85`)
- **Crystal** uses array of decimal integers: `Bytes[205, 68, 97, 133]`

In Crystal, `Bytes` is an alias for `Slice(UInt8)`, making the type system's role explicit each element being a `UInt8` (unsigned 8-bit integer).

## Conclusion

I do not have enough experience at all with the Crystal language. But I really like its approach for this particular problem. By providing explicit types with a clear API, Crystal makes binary data manipulation more readable than Python. The elegance lies not just in the conciseness, but in how the solution naturally guides developers toward correct and maintainable code.
