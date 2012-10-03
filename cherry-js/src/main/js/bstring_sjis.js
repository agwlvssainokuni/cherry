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
 * 指定位置の文字のサイズ (Shift_JISエンコーディング換算のバイト長) を決定する。
 *
 * @param {Number}
 *            pos 文字位置を指定する。
 * @returns {Number} 文字のサイズ。
 */
String.prototype.unitNumAt = function(pos) {
	var code = this.charCodeAt(pos);
	if (0x00 <= code && code <= 0x7F) {
		return 1;
	}
	if (0xFF61 <= code && code <= 0xFF9F) {
		return 1;
	}
	return 2;
};
