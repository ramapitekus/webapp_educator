import React, { lazy, Suspense, useState } from "react";

const ExplanationButtons = ({ topics }) => {
  const [ExplanationComponent, setExplanationComponent] = useState(null);

  const handleClick = (e) => {
    const val = e.currentTarget.getAttribute("expl");
    const DynamicComponent = lazy(() => import(`./explanations/${val}`));
    setExplanationComponent(DynamicComponent);
  };

  const capitalize = (string) => {
    const firstLetter = string[0].toUpperCase();
    const otherLetter = string.slice(1);
    const capitalized = firstLetter.concat(otherLetter);
    return capitalized;
  };

  var explanationButtons = topics.map((expl) => (
    <button
      className="button buttonExplanation"
      //TODO: Add reasonable keys
      key={Math.random()}
      onClick={handleClick}
      expl={capitalize(expl)}
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
