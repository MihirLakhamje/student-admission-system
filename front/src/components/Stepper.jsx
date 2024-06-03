import React from "react";

export default function Stepper({ steps }) {
  const stepArray = ["one", "two", "three"];
  return (
    <>
      <ul className="steps steps-vertical sm:steps-horizontal w-full my-5">
        {steps === "one" ? (
          <>
            <li className="step step-primary">Step 1</li>
            <li className="step">Step 2</li>
            <li className="step">Step 3</li>
          </>
        ): (steps === "two")? (
          <>
          <li className="step step-primary">Step 1</li>
          <li className="step step-primary">Step 2</li>
          <li className="step">Step 3</li>
          </>
        ): (steps === "three")? (
          <>
            <li className="step step-primary">Step 1</li>
            <li className="step step-primary">Step 2</li>
            <li className="step step-primary">Step 3</li>
          </>
        ): (
          <>
            <li className="step">Step 1</li>
            <li className="step">Step 2</li>
            <li className="step">Step 3</li>
          </>
        )}
      </ul>
    </>
  );
}
