import React from "react";
import { svgName } from "./enums";
interface ISvggenerator {
  name: string;
  className?:string
}
function Svggenerator({ name }: ISvggenerator) {
  switch (name) {
    case svgName.ARROW_DOWN:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#242a3a"
        >
          <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
        </svg>
      );
    case svgName.BRIEFCASE:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#242a3a"
          
        >
          <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-4 2v11H8V8h8zm-1-4v2H9V4h6zM4 8h2v11H4V8zm14 11V8h2l.001 11H18z"></path>
        </svg>
      );
    case svgName.CALENDAR:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#242a3a"
        >
          <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
          <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
        </svg>
      );
    case svgName.HEART:
      return (
        <svg
          width="21"
          height="16"
          viewBox="0 0 21 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
        >
          <path d="M18.6796 1.42083C17.6521 0.478818 16.2896 0.0078125 14.927 0.0078125C13.5645 0.0078125 12.2019 0.478818 11.1744 1.42083L10.3033 2.21949L9.40983 1.42083C8.38233 0.478818 7.01979 0.0078125 5.65725 0.0078125C4.25003 0.0078125 2.86515 0.519775 1.81532 1.52322C-0.194989 3.4482 -0.060968 6.51997 1.99402 8.40399L9.67787 15.4486C10.0353 15.7762 10.5937 15.7762 10.9287 15.4486L18.6796 8.34256C20.7346 6.41758 20.7346 3.32533 18.6796 1.42083Z" />
        </svg>
      );
    case svgName.SEARCH:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#242a3a"
        >
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
        </svg>
      );
    case svgName.USER:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#242a3a"
        >
          <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
        </svg>
      );
    default: return<svg></svg>
    }
}

export default Svggenerator;
