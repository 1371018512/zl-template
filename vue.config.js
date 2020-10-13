const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
	lintOnSave: false,
	chainWebpack(config) {
		config.module
			.rule("svg")
			.exclude.add(resolve("src/icons"))
			.end();
		config.module
			.rule("icons")
			.test(/\.svg$/)
			.include.add(resolve("src/icons"))
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]"
			})
			.end();
	},
	/*  // 老版本配置方法
		proxyTable: {
		'/apis': {
			target: 'http://localhost:3000/',
			changeOrigin: true,
			parthRewrite: {
				'^/apis': ''
			}
		}
	} */
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000/',
				changeOrigin: true,
				pathRewrite: {
					"^/api": "/", // rewrite path
				},
			}
		}
	}
};
