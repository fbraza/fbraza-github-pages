Solving the "Optional Fields Problem" in Python with Refined Types Pattern

  The Problem: Making Invalid States Unrepresentable

  We encountered a classic type safety challenge while building a FastAPI biomarker processing service. Our system needed to support multiple algorithms (SCORE2 and
  SCORE2-Diabetes) that required different sets of biomarkers.

  The Design Challenge

  The SCORE2 algorithm needs basic biomarkers:
  - Age, blood pressure, cholesterol, smoking status

  The SCORE2-Diabetes algorithm needs everything from SCORE2 plus diabetes-specific data:
  - Diabetes status, age at diagnosis, HbA1c, eGFR

  Our initial approach used a unified Pydantic model with optional fields:

  class Markers(BaseModel):
      """Unified biomarkers for all SCORE2 variants."""
      age: float
      systolic_blood_pressure: float
      total_cholesterol: float
      hdl_cholesterol: float
      smoking: bool
      is_male: bool
      # Optional diabetes fields
      diabetes: bool | None = None
      age_at_diabetes_diagnosis: float | None = None
      hba1c: float | None = None
      egfr: float | None = None

  The Type Safety Problem

  When implementing the SCORE2-Diabetes algorithm, we faced mypy type errors:

  def compute_diabetes(biomarkers: Markers) -> RiskResult:
      # 💥 Type error: biomarkers.diabetes could be None!
      diabetes: float = float(biomarkers.diabetes)

      # 💥 Type error: None - int is invalid!
      age_at_diagnosis = biomarkers.age_at_diabetes_diagnosis - 50

      # 💥 Type error: log(None) is invalid!
      egfr_log = math.log(biomarkers.egfr)

  The API layer validated that diabetes fields were present before calling the function, but the type system didn't know this guarantee existed. We had created what
  functional programmers call an "illegal state" - a state that should be impossible but the type system allows.

  Solutions from Strongly Typed Languages

  Rust: Non-Nullable Types + Validation

  // Separate types for different requirements
  struct BasicMarkers {
      age: f64,
      cholesterol: f64,
      // ... basic fields
  }

  struct DiabetesMarkers {
      base: BasicMarkers,
      diabetes: bool,        // Not Option<bool>!
      hba1c: f64,           // Not Option<f64>!
      egfr: f64,            // Not Option<f64>!
  }

  impl DiabetesMarkers {
      // Factory function that can fail
      fn try_from(markers: UnifiedMarkers) -> Option<Self> {
          if let (Some(diabetes), Some(hba1c), Some(egfr)) =
             (markers.diabetes, markers.hba1c, markers.egfr) {
              Some(DiabetesMarkers {
                  base: BasicMarkers::from(markers),
                  diabetes,
                  hba1c,
                  egfr,
              })
          } else {
              None
          }
      }
  }

  // Function signature guarantees all fields are present
  fn compute_diabetes(markers: DiabetesMarkers) -> RiskResult {
      let diabetes_float = if markers.diabetes { 1.0 } else { 0.0 };
      let age_at_diagnosis = markers.base.age - 50.0;
      let egfr_log = markers.egfr.ln();  // No null checks needed!
      // ... rest of calculation
  }

  F#: Refined Types

  // Private constructor ensures validation
  type ValidatedDiabetesMarkers =
      private ValidatedDiabetesMarkers of UnifiedMarkers

  module DiabetesMarkers =
      let validate (markers: UnifiedMarkers) : ValidatedDiabetesMarkers option =
          match markers.diabetes, markers.hba1c, markers.egfr with
          | Some d, Some h, Some e -> Some(ValidatedDiabetesMarkers markers)
          | _ -> None

  // Function can only accept validated markers
  let compute (ValidatedDiabetesMarkers markers) =
      let diabetesFloat = if markers.diabetes.Value then 1.0 else 0.0
      // All diabetes fields guaranteed to be Some(value)

  TypeScript: Discriminated Unions

  type BasicMarkers = {
      age: number;
      cholesterol: number;
      smoking: boolean;
  }

  type DiabetesMarkers = BasicMarkers & {
      diabetes: true;           // Literal type, not boolean!
      hba1c: number;           // Not number | undefined
      egfr: number;            // Not number | undefined
  }

  type Markers = BasicMarkers | DiabetesMarkers;

  function isDiabetesMarkers(m: Markers): m is DiabetesMarkers {
      return 'diabetes' in m && m.diabetes === true &&
             'hba1c' in m && 'egfr' in m;
  }

  function computeDiabetes(markers: DiabetesMarkers): RiskResult {
      const diabetesFloat = markers.diabetes ? 1.0 : 0.0;  // Type-safe!
      const ageAtDiagnosis = markers.age - 50;
      const egfrLog = Math.log(markers.egfr);  // No undefined possible!
  }

  Our Python Solution: The Refined Types Pattern

  Inspired by these strongly typed approaches, we implemented what's known as the Refined Types Pattern - using inheritance and factory methods to create type-safe validated
   models.

  The Implementation

  from typing import Optional
  from pydantic import BaseModel

  class Markers(BaseModel):
      """Unified biomarkers with optional diabetes fields."""
      age: float
      systolic_blood_pressure: float
      total_cholesterol: float
      hdl_cholesterol: float
      smoking: bool
      is_male: bool
      # Optional fields
      diabetes: bool | None = None
      age_at_diabetes_diagnosis: float | None = None
      hba1c: float | None = None
      egfr: float | None = None

  class DiabetesMarkers(Markers):
      """Refined type: Markers with guaranteed non-None diabetes fields."""

      # Override optional fields to be required
      diabetes: bool                    # Not bool | None!
      age_at_diabetes_diagnosis: float  # Not float | None!
      hba1c: float                     # Not float | None!
      egfr: float                      # Not float | None!

      @classmethod
      def try_from_markers(cls, markers: Markers) -> Optional['DiabetesMarkers']:
          """Factory method: safe construction with validation."""
          marker_dict = markers.model_dump()

          # Validate all diabetes fields are present and not None
          diabetes_fields = ['diabetes', 'age_at_diabetes_diagnosis', 'hba1c', 'egfr']
          if all(marker_dict.get(field) is not None for field in diabetes_fields):
              return cls(**marker_dict)  # Safe construction
          return None  # Validation failed

  Type-Safe Algorithm Implementation

  def compute_diabetes(biomarkers: DiabetesMarkers) -> tuple[float, float, RiskCategory]:
      """
      SCORE2-Diabetes calculation with guaranteed non-None diabetes fields.

      The DiabetesMarkers type guarantees all diabetes fields are present!
      """
      # No more type errors! 🎉
      diabetes: float = float(biomarkers.diabetes)
      age_at_diagnosis = biomarkers.age_at_diabetes_diagnosis - 50
      hba1c_normalized = (biomarkers.hba1c - 31) / 9.34
      egfr_log = math.log(biomarkers.egfr) - 4.5

      # ... rest of algorithm calculation
      return (age, calibrated_risk, risk_category)

  Smart API Layer

  @app.post("/process_data")
  async def process_data(data: RawBiomarkerData) -> BiomarkerResponse:
      # Convert and validate raw biomarkers
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

  Why This Solution Works

  ✅ Benefits

  1. Type Safety: MyPy can verify all diabetes fields are non-None
  2. Runtime Safety: Pydantic validates data at runtime
  3. Single Source of Truth: One unified Markers class
  4. Clean API: The refined type emerges naturally from validation
  5. Impossible States: Can't construct DiabetesMarkers with None values
  6. Zero Runtime Cost: No performance penalty for type safety

  ✅ Pattern Advantages

  - Fail Fast: Validation happens at construction time
  - Self-Documenting: Function signatures clearly show requirements
  - Maintainable: Easy to add new algorithms with different requirements
  - Testable: Can easily test both successful and failed validations

  Real-World Usage

  # This will succeed if all diabetes fields are present
  diabetes_markers = DiabetesMarkers.try_from_markers(raw_markers)
  if diabetes_markers is not None:
      # Guaranteed type-safe computation
      risk_result = compute_diabetes(diabetes_markers)

  # This will be None if any diabetes field is missing
  insufficient_markers = DiabetesMarkers.try_from_markers(incomplete_data)
  assert insufficient_markers is None  # Validation correctly failed

  The Design Pattern: Refined Types

  This pattern is known as Refined Types or Smart Constructors:

  - Refined Types: Types that add additional constraints to base types
  - Smart Constructors: Factory functions that ensure invariants are maintained
  - Parse, Don't Validate: Transform untyped data into well-typed data once

  The pattern makes illegal states unrepresentable at the type level, moving runtime errors to compile-time (or in Python's case, to validation time with clear error
  messages).

  Alternative Solutions We Considered

  ❌ Type Ignores

  # Suppress type checker - not safe!
  diabetes = float(biomarkers.diabetes)  # type: ignore[arg-type]

  ❌ Assert Statements

  # Can be disabled with -O flag
  assert biomarkers.diabetes is not None
  diabetes = float(biomarkers.diabetes)

  ❌ Separate Classes (Duplication)

  # Code duplication between BasicMarkers and DiabetesMarkers
  class BasicMarkers(BaseModel): ...
  class DiabetesMarkers(BaseModel): ...  # Duplicates all basic fields

  Conclusion

  By applying the Refined Types Pattern with Pydantic inheritance, we achieved the type safety of strongly typed languages while maintaining Python's flexibility. The
  solution elegantly handles the "optional fields problem" by making validation explicit and type-safe.

  The pattern is particularly powerful for:
  - API validation where different endpoints need different field sets
  - Multi-algorithm systems with varying requirements
  - Progressive data enrichment pipelines
  - Domain modeling where business rules determine valid states

  This approach transforms a common Python/dynamic typing pain point into an opportunity for better design, showing how we can borrow the best ideas from functional and
  systems programming languages.
