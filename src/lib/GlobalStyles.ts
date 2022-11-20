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
`;

export default GlobalStyles;
