import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import { IActionIconProps } from "./ActionIconProps";
// 新增的icon
function Icon({ isActive = false, fontSize = 180 }: IActionIconProps) {
  return (
    <SvgIcon sx={{ fontSize }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="none"
        version="1.1"
        width="180"
        height="180"
        viewBox="0 0 180 180"
      >
        <defs>
          <radialGradient
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            id="master_svg0_276_7405"
            gradientTransform="translate(90 90.00001525878906) rotate(45.000004857022994) scale(127.27923140317223 127.27920982398763)"
          >
            <stop offset="0%" stopColor="#EAFF00" stopOpacity="1" />
            <stop offset="100%" stopColor="#C7B300" stopOpacity="1" />
          </radialGradient>
        </defs>
        <g>
          <g>
            <rect
              x="0"
              y="0"
              width="180"
              height="180.00003051757812"
              rx="30"
              fill="url(#master_svg0_276_7405)"
              fillOpacity="1"
            />
          </g>
          <g>
            <g>
              <path
                d="M86.99421635742188,122.47210791015625L58.587486357421874,94.06530791015625C56.634861357421876,92.11270791015625,56.634861357421876,88.94690791015626,58.587486357421874,86.99430791015625L86.99421635742188,58.58756791015625C88.94681635742188,56.63495291015625,92.11261635742187,56.63495291015625,94.06521635742187,58.58757791015625L122.47201635742188,86.99430791015625C124.42461635742187,88.94690791015626,124.42461635742187,92.11270791015625,122.47201635742188,94.06530791015625L94.06521635742187,122.47210791015625C92.11261635742187,124.42470791015624,88.94681635742188,124.42470791015624,86.99421635742188,122.47210791015625Z"
                fillRule="evenodd"
                fill="#786000"
                fillOpacity="1"
              />
            </g>
            <g>
              <path
                d="M134.10424868164063,56.4999C135.24464868164063,57.6402,137.1962486816406,57.0379,137.49544868164062,55.4532L139.96404868164063,42.3803C140.22634868164062,40.99122,139.00864868164064,39.773532,137.61954868164062,40.0358357L124.54674868164062,42.50441C122.96204868164062,42.80366,122.35964868164062,44.75523,123.50004868164062,45.8956L126.67344868164062,49.069069999999996L110.70864868164062,65.0341L114.96589868164062,69.2913L130.9308486816406,53.3264L134.10424868164063,56.4999Z"
                fillRule="evenodd"
                fill="#786000"
                fillOpacity="1"
              />
            </g>
            <g transform="matrix(0,-0.9999999403953552,0.9999999403953552,0,-29.291469258578218,109.29147100448608)">
              <path
                d="M63.3959,85.79137338867187C64.53620000000001,86.93167338867187,66.4878,86.32937338867188,66.787,84.74467338867187L69.2556,71.67177338867188C69.5179,70.28269338867187,68.3002,69.06500538867188,66.91120000000001,69.32730908867188L53.838300000000004,71.79588338867188C52.2536,72.09513338867187,51.6512,74.04670338867187,52.7916,75.18707338867188L55.9651,78.36054338867187L40,94.32577338867188L44.25743,98.58317338867187L60.2224,82.61787338867188L63.3959,85.79137338867187Z"
                fillRule="evenodd"
                fill="#786000"
                fillOpacity="1"
              />
            </g>
            <g transform="matrix(1,0,0,-1,0,280)">
              <path
                d="M134.10426557617188,156.4999C135.24456557617188,157.6402,137.19616557617186,157.0379,137.49536557617188,155.4532L139.9639655761719,142.3803C140.22626557617187,140.99122,139.00856557617186,139.773532,137.61956557617188,140.0358357L124.54666557617188,142.50441C122.96196557617188,142.80366,122.35956557617187,144.75523,123.49996557617187,145.8956L126.67336557617188,149.06907L110.70846557617188,165.0341L114.96595557617188,169.29149999999998L130.93076557617186,153.3264L134.10426557617188,156.4999Z"
                fillRule="evenodd"
                fill="#786000"
                fillOpacity="1"
              />
            </g>
            <g transform="matrix(0,0.9999999403953552,0.9999999403953552,0,-70.70855053016203,70.70855951309204)">
              <path
                d="M63.3959,127.20845712890625C64.53620000000001,128.34875712890624,66.4878,127.74645712890626,66.787,126.16175712890625L69.2556,113.08885712890626C69.5179,111.69977712890625,68.3002,110.48208912890625,66.91120000000001,110.74439282890626L53.838300000000004,113.21296712890626C52.2536,113.51221712890624,51.6512,115.46378712890625,52.7916,116.60415712890625L55.9651,119.77762712890625L40,135.74285712890625L44.25725,140.00025712890624L60.2224,124.03495712890626L63.3959,127.20845712890625Z"
                fillRule="evenodd"
                fill="#786000"
                fillOpacity="1"
              />
            </g>
          </g>
        </g>
      </svg>
    </SvgIcon>
  );
}

export default Icon;
