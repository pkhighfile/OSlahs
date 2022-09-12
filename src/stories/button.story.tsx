import React from "react";
import { storiesOf } from "@storybook/react";
import ShareButton from "../buttons/ShareButton";

storiesOf("Button", module)
  .add("Share Button", () => <ShareButton />)
  .add("with emoji", () => (
    <button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </button>
  ));
