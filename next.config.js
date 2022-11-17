/** @type {import('next').NextConfig} */

/* Recoil 설정 */
const intercept = require('intercept-stdout');
intercept((text) => {
	if (text.includes('Duplicate atom key')) {
		return '';
	}
	return text;
});

/* Next Plugins */
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/** Monaco Editor Plugins */
const withTM = require('next-transpile-modules')(['@monaco-editor/react']);

/* Production 환경 여부 */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Build Directory 경로 설정
  distDir: process.env.BUILD_DIR || "build",

  // Build 식별값 설정 (Default: Current git commit hash value)
  generateBuildId: async () => {
    if (process.env.NEXT_PUBLIC_BUILD_ID) {
      return process.env.NEXT_PUBLIC_BUILD_ID;
    }

    return new Promise((resolve, reject) => {
      require("child_process").exec(
        "git rev-parse --verify HEAD",
        (err, stdout) => {
          if (err) {
            reject(err);
          } else {
            resolve(stdout);
          }
        }
      );
    });
  },

	// 실험기능
	experimental: {
		// [베타] app 디렉토리
		appDir: false,
		// 스크롤 복원 기능
		scrollRestoration: true,
	},

  // 폰트 최적화 여부
  optimizeFonts: true,

  // 압축 여부
  compress: true,

  // Production에서 Sourcemap Off
  productionBrowserSourceMaps: false,

  // Base Path 설정
  basePath: isProd ? "" : "",

  // Assets Prefix 설정
  assetPrefix: isProd ? "" : "",

  // 이미지 최적화 Domain List
  images: {
    domains: [],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [400, 828, 1200, 1920],
  },

	// 컴파일러 설정
	compiler: {
		styledComponents: true
	},

  // Webpack 5 설정
  webpack: (config) => {
    return {
      ...config,
      mode: isProd ? "production" : "development",
      devtool: isProd ? "cheap-module-source-map" : "eval-source-map",
    };
  },

  // React StrictMode 여부
  reactStrictMode: true,

  // X-Powered-By(Header) 활성화 여부
  poweredByHeader: !isProd,

  // Next.js 지원 Eslint 비활성화
  eslint: {
    ignoreDuringBuilds: false,
  },
	
	// Security Header 설정
	async headers () {
		return [
			{
				source: '/:path*',
				headers: [
					// DNS Prefetch
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'off'
					},
					// XSS 공격 방어 (for 구형브라우저)
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block'
					},
				]
			}
		]
	},

  async rewrites() {
    const proxy = [
			// API 서버
			{
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_SERVER}/api/:path*`,
      },
    ];

    // 페이지 리다이렉션 설정
    const redirection = [];

    return [...proxy];
  },
};

module.exports = withPlugins([withBundleAnalyzer, withTM], nextConfig);