import React, { lazy, Suspense, useState } from "react";

const ExplanationButtons = () => {
  const [ExplanationComponent, setExplanationComponent] = useState(null);
  const [explanations, setExplanations] = useState(["Stocks"]);
  //const DynamicComponent = lazy(() => import(`./${componentName}`));

  const handleClick = (e) => {
    const val = e.currentTarget.getAttribute("expl");
    const DynamicComponent = lazy(() => import(`./${val}`));
    setExplanationComponent(DynamicComponent);
  };

  var explanationButtons = explanations.map((expl) => (
    <button
      className="button buttonExplanation"
      key="hi"
      onClick={handleClick}
      expl={expl}
    >
      {expl}
    </button>
  ));

  return (
    <>
      {ExplanationComponent && (
        <Suspense fallback="">
          <ExplanationComponent
            onClose={() => {
              setExplanationComponent(null);
            }}
          />
        </Suspense>
      )}
      <div>{explanationButtons}</div>
    </>
  );
};

export default ExplanationButtons;
