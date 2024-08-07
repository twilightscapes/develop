import * as React from "react";
import { BiLeftArrow } from "react-icons/bi";
import { navigate } from "@reach/router";

const GoBack = () => {
  const [canGoBack, setCanGoBack] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      setCanGoBack(true);
    }
  }, []);

  if (!canGoBack) {
    return null;
  }

  return (
    <button
      id="gobacker"
      className="back button"
      onClick={() => { navigate(-1) }}
    >
      <span className="icon -left" style={{ paddingRight: '' }}>
        <BiLeftArrow />
      </span>
      {" "} Back
    </button>
  );
}

export default GoBack;
