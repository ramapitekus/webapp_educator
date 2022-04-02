import React, { lazy, Suspense, useState } from "react";

const ExplanationButtons = () => {
  const [DynComponent, setDynComponent] = useState(null);
  var explanations = ["Stocks"];
  //const DynamicComponent = lazy(() => import(`./${componentName}`));

  const handleClick = (e) => {
    const val = e.currentTarget.getAttribute("expl");
    const DynamicComponent = lazy(() => import(`./${val}`));
    setDynComponent(DynamicComponent);
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
      {DynComponent && (
        <Suspense fallback="Loading">
          <DynComponent
            onClose={() => {
              setDynComponent(null);
            }}
          />
        </Suspense>
      )}
      <div>{explanationButtons}</div>
    </>
  );
};

export default ExplanationButtons;
