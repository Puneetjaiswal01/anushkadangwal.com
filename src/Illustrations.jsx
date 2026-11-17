import React from "react";
export function Icon({ name, ...props }) {
  const paths = {
    heart:
      "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    moon: "M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z",
    close: "m6 6 12 12M6 18 18 6",
    leaf: "M20 3C9 2 2 7 5 15c8 5 16-2 15-12ZM4 21l11-12",
    star: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg
      width="20"
      height="20"
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
export function Garden() {
  return (
    <svg
      className="garden"
      viewBox="0 0 580 540"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="sky"
          x1="290"
          y1="30"
          x2="290"
          y2="485"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#392b50" />
          <stop offset=".55" stopColor="#765371" />
          <stop offset="1" stopColor="#d7acb0" />
        </linearGradient>
        <radialGradient id="moon">
          <stop stopColor="#fffef4" />
          <stop offset="1" stopColor="#fdf3df" />
        </radialGradient>
        <linearGradient id="hill">
          <stop stopColor="#a699ba" />
          <stop offset="1" stopColor="#c4b9d5" />
        </linearGradient>
        <clipPath id="arch">
          <path d="M103 482V223a187 187 0 0 1 374 0v259Z" />
        </clipPath>
      </defs>
      <path
        d="M85 482V221a205 205 0 0 1 410 0v261"
        stroke="#d4c6e3"
        strokeWidth="1"
      />
      <g clipPath="url(#arch)">
        <path fill="url(#sky)" d="M103 30h374v452H103z" />
        <circle cx="306" cy="166" r="63" fill="#fffaf0" opacity=".1" />
        <circle cx="306" cy="166" r="48" fill="#fffaf0" opacity=".16" />
        <circle cx="306" cy="166" r="34" fill="url(#moon)" />
        <path
          d="M73 410c91-79 149-35 213-6 74-90 151-95 214-21v125H73Z"
          fill="#cabbd5"
        />
        <path
          d="M72 449c88-109 196-19 262-19 69-40 128-31 170-5v84H72Z"
          fill="url(#hill)"
        />
        <path
          d="M103 475c67-27 135-14 203-3 70-21 125-12 171-2v18H103Z"
          fill="#90869e"
          opacity=".5"
        />
        <g stroke="#fff8ed" strokeLinecap="round">
          <path d="M183 153v9m-4.5-4.5h9m210 90v11m-5.5-5.5h11M228 284v7m-3.5-3.5h7M379 104v6m-3-3h6" />
          <path d="m156 254 2 3 2-3-2-3Zm265-69 2 3 2-3-2-3Z" fill="#fff8ed" />
        </g>
        <g fill="#fffaf1" opacity=".8">
          <circle cx="231" cy="104" r="1.5" />
          <circle cx="352" cy="268" r="1.5" />
          <circle cx="164" cy="321" r="1" />
          <circle cx="424" cy="306" r="1.5" />
          <circle cx="345" cy="79" r="1" />
        </g>
      </g>
      <g stroke="#7e8d78" strokeWidth="1.7" strokeLinecap="round">
        <path d="M101 482c-12-55-31-95-55-122m50 98c-40-29-57-65-58-93m51 73c-4-31-19-59-41-80" />
        <path
          d="M72 408c-18 2-36-15-36-28 18 1 32 10 36 28Zm13 24c-4-23 6-43 16-48 8 21 2 40-16 48ZM54 382c-16-1-31-15-33-30 18 2 30 12 33 30Zm45 80c-30 0-47-12-51-27 25-3 43 6 51 27Z"
          fill="#a9b49b"
          stroke="none"
        />
        <path d="M463 482c8-57 38-101 65-125m-49 87c2-43 16-67 36-89m-24 61c26-7 42-23 55-44" />
        <path
          d="M487 425c-17-20-13-38-5-48 14 12 19 30 5 48Zm22-34c-6-27 3-43 14-48 8 19 8 35-14 48Zm-32 67c24-1 43-14 47-30-22-1-40 9-47 30Zm52-80c16-2 31-20 30-33-20 4-30 15-30 33Z"
          fill="#b0bba2"
          stroke="none"
        />
      </g>
      <g stroke="#bba0c5" strokeWidth="1.4">
        <path d="M133 484c1-52 6-79 16-103m-9 51-21-20m16 42 25-20M438 484c-2-32-10-54-19-71" />
        <path
          d="M149 382c-22-2-20-17-9-17-3-15 12-19 15-5 12-9 22 5 9 12 13 5 4 19-8 11-1 12-14 12-14 2"
          fill="#d5b5c9"
          stroke="none"
        />
        <circle cx="151" cy="374" r="3" fill="#f8ebcb" />
        <path
          d="M420 415c-15-2-14-12-6-12-2-11 9-13 11-4 9-6 15 4 6 9 9 3 3 13-6 7-1 9-10 9-10 1"
          fill="#c4b4d5"
          stroke="none"
        />
      </g>
      <path d="m367 331 7-6 9 1-7 5-4 8-1-6Z" fill="#fff7ee" />
      <path d="m213 218 5-4 6 1-5 3-2 6-1-5Z" fill="#fff7ee" />
      <path d="M92 488h397" stroke="#cabcd5" />
      <text
        x="290"
        y="522"
        textAnchor="middle"
        fill="#84728f"
        fontSize="17"
        fontFamily="Caveat, cursive"
      >
        a little place where you can just be.
      </text>
    </svg>
  );
}
