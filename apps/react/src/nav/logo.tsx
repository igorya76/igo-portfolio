import React from "react";

export function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 60"
      width="600"
      height="70"
    >
      <rect width="600" height="70" fill="none" />

      <g transform="translate(42.5, 35)">
        <text x="0" font-family="monospace" font-size="25" fill="white">
          &lt;
        </text>

        <text x="14.5" font-family="monospace" font-size="25" fill="#e5674c">
          Portfolio
        </text>

        <text x="150.5" font-family="monospace" font-size="25" fill="#76fc5b">
          name
        </text>
        <text x="207.5" font-family="monospace" font-size="25" fill="#e5674c">
          =
        </text>
        <text x="219.5" font-family="monospace" font-size="25" fill="#e9f357">
          'Ryan Igo'
        </text>

        <text x="353" font-family="monospace" font-size="25" fill="white">
          /&gt;
        </text>
      </g>

      {/* <rect x="250" y="22.5" width="1" height="16" fill="#ffffff">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect> */}
    </svg>
  );
}
