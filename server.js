import path from "path";
import express from "express";
import compression from "compression";
import webpack from "webpack";
import middleware from "./src/middleware";
import apiRoutes from "./src/api/routes";
import config from "./src/config";

const app = express();

if (process.env.NODE_ENV === "development") {
	const config = require("./webpack.config.dev");
	const compiler = webpack(config);
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
		stats: {
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}
	}));
	app.use(require("webpack-hot-middleware")(compiler));
	app.use(express.static(path.resolve(__dirname, "src")));
} else if (process.env.NODE_ENV === "production") {
	app.use(compression());
	app.use(express.static(path.resolve(__dirname, "dist")));
}


app.use("/api", apiRoutes);
app.get("*", middleware);

app.listen(config.serverPort, "0.0.0.0", (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(`Listening at http://0.0.0.0:${config.serverPort}`);
	}
});
