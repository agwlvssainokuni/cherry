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
 * バイト単位の長さを取得する。
 *
 * @returns {Number} バイト単位の長さ。
 */
String.prototype.blength = function() {
	var len = 0;
	for ( var i = 0; i < this.length; i++) {
		len += this.unitNumAt(i);
	}
	return len;
};

/**
 * バイト単位の位置に対応する文字単位の位置を取得する。
 *
 * @param {Number}
 *            pos バイト単位の位置。
 * @returns {Number} 文字単位の位置。
 */
String.prototype.bposition = function(pos) {

	var bpos = 0;
	var cpos = 0;
	while (cpos < this.length) {
		if (bpos >= pos) {
			return cpos;
		}
		var unit = this.unitNumAt(cpos);
		if (unit - 1 + bpos >= pos) {
			return cpos;
		}
		bpos += unit;
		cpos += 1;
	}

	return undefined;
};

/**
 * バイト単位で範囲を指定して部分文字列を取得する。
 *
 * @param {Number}
 *            start 開始位置。
 * @param {Number}
 *            end 終了位置。
 * @returns {String} 部分文字列。
 */
String.prototype.bsubstring = function(start, end) {

	var cstart = 0;
	var cend = this.length;

	var bpos = 0;
	var cpos = 0;
	while (cpos < this.length) {
		if (bpos >= start) {
			cstart = cpos;
			break;
		}
		var unit = this.unitNumAt(cpos);
		if (unit - 1 + bpos >= start) {
			cstart = cpos;
			break;
		}
		bpos += unit;
		cpos += 1;
	}
	while (cpos < this.length) {
		if (bpos >= end) {
			cend = cpos;
			break;
		}
		var unit = this.unitNumAt(cpos);
		if (unit - 1 + bpos >= end) {
			cend = cpos;
			break;
		}
		bpos += unit;
		cpos += 1;
	}

	return this.substring(cstart, cend);
};

/**
 * 指定位置の文字のサイズを決定する。
 *
 * @param {Number}
 *            pos 文字位置を指定する。
 * @returns {Number} 文字のサイズ。
 */
String.prototype.unitNumAt = function(pos) {
	return 1;
};
