---
title: Solving the "Optional Fields Problem" in Python with Refined Types
summary: "Solving the 'Optional Fields Problem' in Python with Refined Types"
date: "2025-08-01"
tags:
    - Python
---

I'm developing a health metrics app that calculates cardiovascular risk scores from blood markers. While building the FastAPI processing service, I hit a classic type safety challenge that many developers face: the "optional fields problem." Here's how I solved it using the refined type pattern, and why this approach creates cleaner, safer code.

## The problem: when different algorithms need different data

My application needs to compute multiple variants of the SCORE2 algorithm, which predicts cardiovascular risk over 10 years. Each variant requires different sets of blood markers:

- **SCORE2 algorithm** needs `age`, `blood pressure`, `cholesterol`, and `smoking status`
- **SCORE2-Diabetes algorithm** needs everything from SCORE2 *plus* `diabetes status`, `age at diagnosis`, `HbA1c`, and `eGFR`

This is a common scenario: you have a base set of required data, and some algorithms need additional fields that others don't use.

My initial approach used a unified Pydantic model with optional fields:

```python
class Markers(BaseModel):
"""Unified biomarkers for all SCORE2 variants."""
    age: float
    systolic_blood_pressure: float
    total_cholesterol: float
    hdl_cholesterol: float
    smoking: bool
    is_male: bool
    diabetes: bool | None = None # Optional diabetes fields
    age_at_diabetes_diagnosis: float | None = None # Optional diabetes fields
    hba1c: float | None = None # Optional diabetes fields
    egfr: float | None = None # Optional diabetes fields
```

This seemed reasonable at first—one class to rule them all. But it created a much bigger problem.

## The Type Safety Nightmare

When I tried to implement the diabetes algorithm, `mypy` immediately started throwing errors:

```python
def compute(biomarkers: Markers) -> RiskResult:
    # 💥 Type error: biomarkers.diabetes could be None!
    diabetes: float = float(biomarkers.diabetes)
    # 💥 Type error: None - int is invalid!
    age_at_diagnosis = biomarkers.age_at_diabetes_diagnosis - 50
    # 💥 Type error: log(None) is invalid!
    egfr_log = math.log(biomarkers.egfr)
```

`mypy` was right to complain. According to my class definition, `biomarkers.diabetes` could be `None`, making `float(biomarkers.diabetes)` a potential runtime error.

The traditional solution is defensive programming. Check everything:

```python
def compute(biomarkers: Markers) -> RiskResult:
    diabetes: float | None
    if diabetes is not None:
        diabetes: float = float(biomarkers.diabetes)
```

But this approach scales terribly. I'd need `None` checks for every optional field in every function that uses them. The code becomes cluttered with defensive checks, and it's easy to forget one, creating hidden bugs.

The situation I am facing is what functional programmers call an "illegal state". It is a state that should be impossible in your domain logic but that the type system allows to exist.

## The root cause: mixed responsibilities

The real problem isn't the optional fields themselves—it's that I was trying to use one data structure for two different purposes:

1. **General data flow**: Moving biomarkers around the system
2. **Algorithm-specific processing**: Guaranteeing all required fields for specific calculations

These are fundamentally different responsibilities. The data layer needs flexibility (some fields might be missing), while the algorithm layer needs guarantees (all required fields must be present).

## Enter the refined type pattern

The [refined type pattern](https://rockthejvm.com/articles/refined-types-in-scala) solves this by creating types that add constraints to existing base types. Instead of one class trying to handle all scenarios, we create specialized types that guarantee specific conditions are met.

Here's a simple example to illustrate the concept:

```python
class Email:
    def __init__(self, value: str):
        if "@" not in value or "." not in value:
            raise ValueError("Invalid email format")
        self._value = value

    def __str__(self):
        return self._value

class Age:
    def __init__(self, value: int):
        if value < 0 or value > 150:
            raise ValueError("Age must be between 0 and 150")
        self._value = value

    def __str__(self):
        return str(self._value)

# Usage
def send_birthday_card(email: Email, age: Age):
    print(f"Sending birthday card to {email} for {age}th birthday")

# This works:
valid_email = Email("john@example.com")
valid_age = Age(25)
send_birthday_card(valid_email, valid_age)

# This fails immediately when creating the objects:
# invalid_email = Email("not-an-email")  # Raises ValueError
# invalid_age = Age(-5)  # Raises ValueError
```

The key insight: instead of checking constraints everywhere we use the data, we build the constraints into the types themselves. This makes invalid states impossible to represent. Here for example, we cannot have an email address without the `@` character or having a client with an age of 0 or less.

## Applying refined types to my problem

I split my unified class into two types with different guarantees:

```python
class Markers(BaseModel):
    """Unified biomarkers with optional diabetes fields."""
    age: float
    systolic_blood_pressure: float
    total_cholesterol: float
    hdl_cholesterol: float
    smoking: bool
    is_male: bool


class DiabetesMarkers(Markers):
    """Refined type: Markers with guaranteed non-None diabetes fields."""
          diabetes: bool                    # Not bool | None!
          age_at_diabetes_diagnosis: float  # Not float | None!
          hba1c: float                      # Not float | None!
          egfr: float                       # Not float | None!
```

Now `DiabetesMarkers` inherits from `Markers` but adds required diabetes fields. The type system now knows that if you have a `DiabetesMarkers` instance, all diabetes fields are guaranteed to be present. But there's still one piece missing: how do we safely construct `DiabetesMarkers` instances when some fields might be missing in the source data?

## Safe construction with factory methods

The solution is a factory method that validates all required fields before construction:

```python
from pydantic import BaseModel

class Markers(BaseModel):
"""Unified biomarkers with optional diabetes fields."""
    age: float
    systolic_blood_pressure: float
    total_cholesterol: float
    hdl_cholesterol: float
    smoking: bool
    is_male: bool


class DiabetesMarkers(Markers):
"""Refined type: Markers with guaranteed non-None diabetes fields."""
     diabetes: bool                    # Not bool | None!
     age_at_diabetes_diagnosis: float  # Not float | None!
     hba1c: float                     # Not float | None!
     egfr: float                       # Not float | None!

     @classmethod
     def try_from_markers(cls, markers: Markers) -> Optional['DiabetesMarkers']:
         """Factory method: safe construction with validation."""
         marker_dict = markers.model_dump()

         # Validate all diabetes fields are present and not None
         diabetes_fields = ['diabetes', 'age_at_diabetes_diagnosis', 'hba1c', 'egfr']
         if all(marker_dict.get(field) is not None for field in diabetes_fields):
             return cls(**marker_dict)  # Safe construction
         return None  # Validation failed
```

The `try_from_markers` method attempts to create a `DiabetesMarkers` instance but returns `None` if any required fields are missing. This gives us safe construction with explicit failure handling.

## The payoff: clean, safe algorithm code

Now my algorithm implementations are clean and type-safe:

```python
def compute_diabetes(biomarkers: DiabetesMarkers) -> tuple[float, float, RiskCategory]:
      # No more type errors! 🎉
      diabetes: float = float(biomarkers.diabetes)
      age_at_diagnosis = biomarkers.age_at_diabetes_diagnosis - 50
      hba1c_normalized = (biomarkers.hba1c - 31) / 9.34
      egfr_log = math.log(biomarkers.egfr) - 4.5
      # ... rest of algorithm calculation
      return (age, calibrated_risk, risk_category)
```

No `None` checks needed. No defensive programming. The type (hint in python) system guarantees that if this function is called, all required fields are present.

## Putting it all together

At the API layer, the allows me to fallback to the right pydantic class and execute the right algorithm:

```python
@app.post("/process_data")
async def process_data(data: RawBiomarkerData) -> BiomarkerResponse: # Convert and validate raw biomarkers
    converted_biomarkers = add_converted_biomarkers(data.raw_biomarkers)
    markers = validate_biomarkers_for_algorithm(
    converted_biomarkers, Markers, Units()
    )

    if markers is not None:
        age = markers.age
        if 40 <= age <= 69:
            # Try to create refined DiabetesMarkers
            diabetes_markers = DiabetesMarkers.try_from_markers(markers)

        if diabetes_markers is not None:
            # Use diabetes algorithm - guaranteed type safety!
            result = score2_diabetes.compute(diabetes_markers)
            return create_diabetes_result(result)
        else:
            # Fall back to standard algorithm
            result = score2.compute(markers)
            return create_standard_result(result)
```

The code reads naturally: try to use the more specific algorithm, and if the required data isn't available, fall back to the general one. The type system ensures each algorithm gets exactly the data it expects.

## Why This Solution Works

**The Benefits:**

✅ **Type Safety**: MyPy can verify all diabetes fields are non-None at compile time
✅ **Runtime Safety**: Pydantic validates data structure at runtime
✅ **Clean API**: Refined types emerge naturally from validation logic
✅ **Impossible States**: Can't construct DiabetesMarkers with None values

**The Pattern Advantages:**

- **Fail Fast**: Validation happens at construction time, not deep in algorithm logic
- **Self-Documenting**: Function signatures clearly show what data is required
- **Maintainable**: Easy to add new algorithms with different data requirements
- **Testable**: Can easily test both successful construction and validation failures

The refined type pattern really helped transforming a common source of bug linked to optional types and required data into a compile-time guarantee. By encoding business rules directly into the type system, I can make entire classes of errors impossible while keeping the code clean and readable. Ouf! That was quite an adventure but very rewarding.
