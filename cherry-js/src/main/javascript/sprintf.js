/*
 *   Copyright 2012 Norio Agawa
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

/**
 * 文字列書式整形。
 *
 * @param {String}
 *            template テンプレート文字列。
 * @param {Object}
 *            args... 可変長引数。テンプレートに埋込む値を指定する。
 * @returns {String} 整形した結果文字列。
 */
function sprintf(template) {

	var genpad = function(ch, len) {
		var pad = "";
		for ( var i = 0; i < len; i++) {
			pad += ch;
		}
		return pad;
	};

	var index = 1;
	return template.replace(
			/%([-+0 ]*)([1-9][0-9]*)?(\.([1-9][0-9]*))?([dfs%])/g, function(m,
					flag, widthS, dmy0, precS, type, o, t) {

				if (type == "%") {
					return "%";
				}

				var width = (widthS == undefined ? 0 : Number(widthS));
				var prec = (precS == undefined ? 0 : Number(precS));

				var src = sprintf.arguments[index++];
				if (type == "s") {

					var val = src.toString();

					if (prec != 0 && val.length > prec) {
						val = val.substring(0, prec);
					}

					if (width == 0) {
						return val;
					}
					if (val.length >= width) {
						return val;
					}

					if (flag.indexOf("-") >= 0) {
						return val + genpad(" ", width - val.length);
					} else if (flag.indexOf("0") >= 0) {
						return genpad("0", width - val.length) + val;
					} else {
						return genpad(" ", width - val.length) + val;
					}
				}

				if (typeof src != "number") {
					return "NaN";
				}

				var val;
				if (type == "d") {
					val = Math.floor(src >= 0 ? src : -src).toString();
					if (prec != 0 && val.length < prec) {
						val = genpad("0", prec - val.length) + val;
					}
				} else {
					var absVal = (src >= 0 ? src : -src);
					var intVal = Math.floor(absVal);
					var fracVal = absVal - intVal;
					val = intVal.toString();
					if (prec != 0) {
						var v = Math.floor(fracVal * Math.pow(10, prec))
								.toString();
						val = val + "." + genpad("0", prec - v.length) + v;
					} else {
						var v = fracVal.toString();
						if (v == "0") {
							val = val + ".0";
						} else {
							val = val + v.substring(1, v.length);
						}
					}
				}

				if (width == 0) {
					return (src >= 0 ? val : "-" + val);
				}
				if (val.length + (src >= 0 ? 0 : 1) >= width) {
					return (src >= 0 ? val : "-" + val);
				}

				if (src >= 0) {
					if (flag.indexOf("-") >= 0) {
						if (flag.indexOf("+") >= 0) {
							return "+" + val
									+ genpad(" ", width - val.length - 1);
						} else if (flag.indexOf(" ") >= 0) {
							return " " + val
									+ genpad(" ", width - val.length - 1);
						} else {
							return val + genpad(" ", width - val.length);
						}
					} else if (flag.indexOf("0") >= 0) {
						if (flag.indexOf("+") >= 0) {
							return "+" + genpad("0", width - val.length - 1)
									+ val;
						} else if (flag.indexOf(" ") >= 0) {
							return " " + genpad("0", width - val.length - 1)
									+ val;
						} else {
							return genpad("0", width - val.length) + val;
						}
					} else {
						if (flag.indexOf("+") >= 0) {
							return genpad(" ", width - val.length - 1) + "+"
									+ val;
						} else if (flag.indexOf(" ") >= 0) {
							return genpad(" ", width - val.length) + val;
						} else {
							return genpad(" ", width - val.length) + val;
						}
					}
				} else {
					if (flag.indexOf("-") >= 0) {
						return "-" + val + genpad(" ", width - val.length - 1);
					} else if (flag.indexOf("0") >= 0) {
						return "-" + genpad("0", width - val.length - 1) + val;
					} else {
						return genpad(" ", width - val.length - 1) + "-" + val;
					}
				}
			});
}
