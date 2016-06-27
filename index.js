/*                                                                       *
 * This is free software; you can redistribute it and/or modify it under *
 * the terms of the MIT- / X11 - License                                 *
 *                                                                       */


module.exports = function(opt) {
	var through     = require("through2");
	var gutil       = require("gulp-util");
	var path        = require("path");
	var PluginError = gutil.PluginError;
	var File        = gutil.File;
	var merge       = require("merge");
	var files       = [];
	var firstFile   = null;

	var options = merge({
		linksPerPage: 10,
		baseUrl: "/",
		minimize: true,
		paginationSuffix: "/page-{{ PAGE }}",
		tagPagePrefix: "tags/",
		categoryPagePrefix: "categories/",
		layouts: "./layouts/**.*",
		defaultLayout: "default",
		listLayout: "list",
		partials: "./partials/**.*",
		helpers: "./helpers/**.*",
		generateSitemap: true,
		sitemap: {
			frequency: {
				list: "monthly",
				index: "weekly",
				post: "yearly"
			},
			priority: {
				list: 0.8,
				index: 0.9,
				post: 1
			},
			target: "sitemap.xml"
		}
	}, opt);


	function bufferFiles(file, encoding, callback) {
		if (file.isNull()) {
			return;
		}

		if (file.isStream()) {
			return this.emit("error", new PluginError("gulp-juicepress",  "Streaming not supported"));
		}

		if (!firstFile) {
			firstFile = file;
		}

		files.push({
			from: file.relative,
			content: file.contents
		});
		callback();
	}

	function runJuicepress(cb) {
		var me = this;
		var juicepress = require("juicepress");

		juicepress(options, files, function(err, htmls) {
			if (err) {
				cb(new PluginError("gulp-juicepress", err.toString()));
			} else {
				htmls.forEach(function(html) {
					var file = new File({
						cwd: firstFile.cwd,
						base: firstFile.base,
						path: path.join(firstFile.base, html.file),
						contents: new Buffer(html.content)
					});
					me.push(file);
				});
				cb();
			}
		});
	}

	return through.obj(bufferFiles, runJuicepress);
};
