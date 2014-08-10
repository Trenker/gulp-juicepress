
This is a [gulp](http://gulpjs.com/) task for blog generation using [juicepress](https://github.com/trenker/juicepress)

A fully working example can be seen at <https://github.com/trenker/juicepress-example>

## Installation

Have the `gulp` package already installed and write

```bash
npm install --save gulp-juicepress
```

## Usage

Require the module *gulp-juicepress* and pipe markdown posts to it

```js
var juicepress = require("gulp-juicepress");
var options = {
  baseUrl: "http://localhost:8000/"
};

gulp.task("juicepress", function() {
  return gulp
    .src("./posts/**/*.md")
    .pipe(juicepress(options))
    .pipe(gulp.dest("./_build/"));
});

```

This example sets up the task `juicepress` and the generated pages will contain the base URL *http://localhost:800/*

For a full list of supported options, please see <https://github.com/trenker/juicepress>

:bangbang: IMPORTANT: gulp-juicepress ignores the "buildDirectory" setting of juicepress. Instead you have to pipe the result to gulp.dest, pointing to a folder.

:bangbang: IMPORTANT: gulp-juicepress only works with buffers, not with streams. It will warn you though, if you pipe a stream to it.

## License

Copyright (c) 2014 Georg Großberger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
