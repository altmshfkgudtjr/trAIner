import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	html,
	body {
		min-height: 100vh;
		padding: 0;
		margin: 0;
	}
	
	html {
		font-size: 16px;
	}

	body {
		font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Roboto', 'Segoe UI',sans-serif;
		background-color: ${({ theme }) => theme.background.bg1};
		transition: background-color 0.2s ease-in, color 0.2s ease-in;
	}
 
	* {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;

		&::before,
		&::after {
			box-sizing: inherit;
		}
	}

	article,
	aside,
	details,
	figcaption,
	figure,
	header,
	hgroup,
	menu,
	Nav,
	section {
		display: block;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
	}

	button {
		padding: 0;
		background-color: rgba(0, 0, 0, 0);
		outline: none;
		border: 0;
		cursor: pointer;
		font-family: inherit;
	}

	dd {
		-webkit-margin-start: 0;
	}

	ul {
		list-style-position: inside;
		margin: 0;
	}

	li,
	ol,
	ul {
		-webkit-padding-start: 0;
		list-style: none;
	}

	a {
		margin: 0;
		padding: 0;
		font-size: 100%;
		text-decoration: none;
		color: inherit;
		background: rgba(0, 0, 0, 0);
		cursor: pointer;
	}

	img {
		max-width: 100%;
	}

	b,
	span {
		font-size: inherit;
		color: inherit;
		font-weight: inherit;
	}

	strong {
		font-size: inherit;
		font-weight: bold;
		color: inherit;
	}

	br {
		line-height: inherit;
	}

	footer {
		padding: 0;
	}

	input,
	textarea {
		padding: 0;
		appearance: none;
		border: none;
		outline: none;
		font-family: inherit;
	}

	div[contenteditable="true"]:focus {
		outline: none;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
	}

	dialog {
		position: relative;
		display: block;
		padding: 0;
		border: none;
		background: inherit;
	}

	.noselect {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	p {
		margin: 0;
	}

	i {
		font-style: normal;
	}

	mark {
		background-color: rgba(0,0,0,0);
	}

	::selection {
		background-color: #8a95a144;
		color: #000000;
	}



	/* TODO 라이브러리으로 옮기기 */
.google-marker-positioner {
  position: absolute;
  height: 0;
  width: 200px; /* 최대 길이 */
}

.google-marker-positioner:hover {
  z-index: 10;
}

.googel-property-layout {
  position: absolute;
  width: 100%;
  bottom: 8px;
  left: 0;
}

.google-property-box {
  position: absolute;
  top: 0;
  left: 0;
  max-height: 60px;
  padding: 4px 8px 8px;
  background-color: #0c88fa;
  border: 1px solid #0c1b51;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.1s ease;
  transform: translate(0, -100%);
}

.google-property-box::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 50%;
  left: 0;
  bottom: -8px;
  z-index: -1;
  border-radius: 8px 8px 8px 0;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(67, 220, 147, 0) 0%,
    rgba(6, 51, 43, 0.4) 100%
  );
}

.google-property-box::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background-color: #0c88fa;
  border-radius: 8px;
  box-sizing: border-box;
  z-index: -1;
  transition: 0.1s ease;
}

.google-property-box:hover,
.google-property-box:hover::after {
  background-color: #162eb1;
}

.google-property-box:hover .google-property-box-arrow::before {
  border-color: transparent transparent transparent #162eb1;
}

.google-property-box:hover .google-property-tooltip {
  display: flex;
}

.google-property-box-icon {
  width: 24px;
  height: 24px;
  margin: auto;
}

.google-property-box-arrow {
  position: absolute;
  bottom: -14px;
  left: -1px;
  width: 26px;
  height: 26px;
  border: 26px solid;
  border-color: transparent transparent transparent #0c1b51;
  z-index: -1;
}

.google-property-box-arrow::before {
  content: "";
  position: absolute;
  bottom: -23.5px;
  left: -25px;
  width: 16px;
  height: 16px;
  border: 16px solid;
  border-color: transparent transparent transparent #0c88fa;
  transition: 0.1s ease;
}

.google-property-box-name {
  display: flex;
  align-items: center;
  margin-top: 4px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 0.105em;
  font-feature-settings: "ss01" on, "ss02" on, "ss03" on, "ss05" on, "salt" on,
    "ss06" on, "ss07" on, "ss08" on, "cv01" on, "cv02" on, "cv03" on, "cv04" on,
    "cv05" on, "cv07" on, "cv08" on, "cv09" on, "cv10" on, "cv11" on, "cv12" on,
    "case" on, "cpsp" on;
  color: #ffffff;
}

.google-property-tooltip {
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: fit-content;
  height: 100%;
  padding: 20px 12px;
  border-radius: 8px;
  border: 1px solid #0c1b51;
  background-color: #ffffff;
  cursor: auto;
  transform: translateX(calc(100% + 4px));

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.105em;
  font-feature-settings: "ss01" on, "ss02" on, "ss03" on, "ss05" on, "salt" on,
    "ss06" on, "ss07" on, "ss08" on, "cv01" on, "cv02" on, "cv03" on, "cv04" on,
    "cv05" on, "cv07" on, "cv08" on, "cv09" on, "cv10" on, "cv11" on, "cv12" on,
    "case" on, "cpsp" on;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.87);
}

.google-property-tooltip::before {
  content: "";
  position: absolute;
  top: 0;
  left: -6px;
  height: 100%;
  width: 8px;
  background-color: transparent;
  z-index: -1;
}

.google-cluster-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-direction: column;
  width: 80px;
  height: 80px;
  background: rgba(12, 136, 250, 0.8);
  border: 2px solid #90d7ff;
  border-radius: 39px;
  transform: translate(-50%, -50%);
}

.google-cluster-box-name {
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.105em;
  font-feature-settings: "ss01" on, "ss02" on, "ss03" on, "ss05" on, "salt" on,
    "ss06" on, "ss07" on, "ss08" on, "cv01" on, "cv02" on, "cv03" on, "cv04" on,
    "cv05" on, "cv07" on, "cv08" on, "cv09" on, "cv10" on, "cv11" on, "cv12" on,
    "case" on, "cpsp" on;
  color: #ffffff;
}

.google-cluster-box-count {
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: -0.03em;
  font-feature-settings: "tnum" on, "lnum" on, "cpsp" on, "case" on, "salt" on,
    "ss01" on, "ss02" on, "ss03" on, "ss05" on, "ss06" on, "ss07" on, "ss08" on,
    "cv01" on, "cv02" on, "cv03" on, "cv04" on, "cv05" on, "cv07" on, "cv08" on,
    "cv09" on, "cv10" on, "cv11" on, "cv12" on;
  color: #ffffff;
}




`;

export default GlobalStyles;
