import React from "react";
export function Icon({ name = "heart", size = 20, ...props }) {
  const paths = {
    heart:
      "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
    home: "m3 10 9-7 9 7v10H15v-7H9v7H3Z",
    letter: "M3 5h18v14H3Zm0 1 9 7 9-7",
    flower:
      "M12 10c-8-12-14-2-5 3-13 1-7 12 2 4-2 13 10 10 6 0 10 8 14-4 3-5 9-7-1-15-6-2Z",
    leaf: "M20 3C9 2 2 7 5 15c8 5 16-2 15-12ZM4 21l11-12",
    pen: "m16 3 5 5-12 12-6 1 1-6Zm-9 11 5 5M14 5l5 5",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    left: "M19 12H5m6-6-6 6 6 6",
    close: "m6 6 12 12M6 18 18 6",
    pause: "M9 5v14M15 5v14",
    play: "m8 4 12 8-12 8Z",
    moon: "M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z",
    lock: "M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5Z",
    check: "m5 12 4 4L19 6",
    music:
      "M9 18V5l12-2v13M9 9l12-2M9 18c0 2-2 3-4 3s-3-1-3-2 2-3 4-3 3 1 3 2Zm12-2c0 2-2 3-4 3s-3-1-3-2 2-3 4-3 3 1 3 2Z",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.heart} />
    </svg>
  );
}
export function PaperGarden() {
  return (
    <div className="paper-garden" aria-hidden="true">
      <svg viewBox="0 0 450 420" fill="none">
        <defs>
          <linearGradient id="petal">
            <stop stopColor="#e5d0e7" />
            <stop offset="1" stopColor="#baa1c9" />
          </linearGradient>
          <linearGradient id="garden-paper">
            <stop stopColor="#fffdf8" />
            <stop offset="1" stopColor="#f2e9df" />
          </linearGradient>
        </defs>
        <circle cx="233" cy="190" r="150" stroke="#e4d8df" />
        <circle
          cx="233"
          cy="190"
          r="132"
          stroke="#eadfe5"
          strokeDasharray="2 7"
        />
        <g transform="rotate(9 242 221)">
          <rect
            x="129"
            y="86"
            width="222"
            height="263"
            rx="4"
            fill="#c7b6cc"
            fillOpacity=".16"
            transform="translate(8 13)"
          />
          <rect
            x="129"
            y="86"
            width="222"
            height="263"
            rx="4"
            fill="url(#garden-paper)"
            stroke="#decfd9"
          />
          <path
            d="M151 117h177M151 139h177M151 161h177M151 183h177M151 205h177M151 227h177M151 249h177M151 271h177M151 293h177M151 315h177"
            stroke="#cdb9cf"
            strokeOpacity=".21"
          />
          <rect
            x="199"
            y="70"
            width="80"
            height="29"
            fill="#d7bfd980"
            transform="rotate(-6 239 85)"
          />
          <text
            x="238"
            y="155"
            textAnchor="middle"
            fontFamily="Caveat,cursive"
            fontSize="26"
            fill="#93779d"
          >
            on the rough days,
          </text>
          <text
            x="238"
            y="185"
            textAnchor="middle"
            fontFamily="Caveat,cursive"
            fontSize="26"
            fill="#93779d"
          >
            on the ordinary days,
          </text>
          <text
            x="238"
            y="234"
            textAnchor="middle"
            fontFamily="Cormorant Garamond,Georgia,serif"
            fontSize="29"
            fill="#755b7d"
          >
            I still choose
          </text>
          <text
            x="238"
            y="270"
            textAnchor="middle"
            fontFamily="Cormorant Garamond,Georgia,serif"
            fontStyle="italic"
            fontSize="38"
            fill="#a27ea7"
          >
            you.
          </text>
          <path
            d="M232 302c-16-11-10-20-3-16l4 4 4-4c8-4 13 6-5 16Z"
            fill="#c8a4ba"
          />
        </g>
        <path
          d="M92 355c-15-74-13-127 17-183M91 308c-42-12-61-33-64-57 37 1 58 22 64 57Zm-6-40c-8-38 9-64 29-72 13 30 4 57-29 72ZM99 333c30-34 56-36 73-28-14 28-40 39-73 28Z"
          stroke="#9cac89"
          strokeWidth="1.8"
          fill="#c0cbae"
          fillOpacity=".8"
        />
        <path
          d="M104 178c-28-9-20-33-3-24-4-22 20-28 21-8 18-17 35 6 16 19 22 3 16 29-4 22 1 22-25 26-30-9Z"
          fill="url(#petal)"
        />
        <circle cx="119" cy="169" r="9" fill="#ead7a6" />
        <path
          d="M339 373c20-42 32-72 39-105m-25 72c33-3 47-16 51-33-30-2-44 14-51 33Zm17-37c-26-17-29-36-23-49 21 12 29 27 23 49Z"
          stroke="#9fae8c"
          strokeWidth="1.5"
          fill="#c3cdb5"
        />
        <path
          d="M376 269c-14-7-10-21 0-17-1-13 13-17 15-5 11-9 19 6 8 12 13 4 7 18-4 13-1 13-17 12-19-3Z"
          fill="#d6b8c9"
        />
        <circle cx="388" cy="261" r="5" fill="#e8d3a6" />
        <path d="m348 59 2 9 9 2-9 2-2 9-2-9-9-2 9-2Z" fill="#cbb58d" />
        <path d="m62 118 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" fill="#c4a8ca" />
        <circle cx="332" cy="369" r="3" fill="#d4bcc9" />
      </svg>
      <div className="garden-tag">
        <Icon name="heart" size={16} />
        <span>
          for the person you are.<small>not just the things you achieve.</small>
        </span>
      </div>
    </div>
  );
}
export function Envelope({ symbol = "♡" }) {
  return (
    <svg viewBox="0 0 95 70" fill="none" aria-hidden="true">
      <path d="M7 12h81v50H7Z" fill="#fffaf4" stroke="currentColor" />
      <path
        d="m7 13 40.5 28L88 13M7 62l27-25m54 25L61 37"
        stroke="currentColor"
      />
      <circle cx="47" cy="41" r="10" fill="currentColor" stroke="none" />
      <text x="47" y="45" textAnchor="middle" fill="#fffaf7" fontSize="12">
        {symbol}
      </text>
    </svg>
  );
}
