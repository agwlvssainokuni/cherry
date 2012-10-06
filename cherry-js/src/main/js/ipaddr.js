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
 * IPアドレスオブジェクトを生成する。
 *
 * @param {String}
 *            addr IPアドレスの文字列表記。
 * @returns {Object} IPアドレスオブジェクト。
 */
function IpAddr(addr) {
	if (typeof addr != "string") {
		return undefined;
	}
	if (RegExp(IpAddr.IPV4_PATTERN, "i").test(addr)) {
		return new IpAddr.V4(addr);
	}
	if (RegExp(IpAddr.IPV6_PATTERN, "i").test(addr)) {
		return new IpAddr.V6(addr);
	}
	return undefined;
}

/** IPv4アドレス形式の正規表現. */
IpAddr.IPV4_PATTERN = "^"
		+ "(25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})){3}"
		+ "$";

/** IPv6アドレス形式の正規表現. */
IpAddr.IPV6_PATTERN = "^"
		+ "("
		// (1) IPv4混在なし
		+ "("
		// ・省略なし
		+ "[0-9a-f]{1,4}(:[0-9a-f]{1,4}){7}"
		// ・全省略
		+ "|::"
		// ・前省略
		+ "|:(:[0-9a-f]{1,4}){1,7}"
		// ・後省略
		+ "|([0-9a-f]{1,4}:){1,7}:"
		// ・中省略
		+ "|([0-9a-f]{1,4}:){1}(:[0-9a-f]{1,4}){1,6}"
		+ "|([0-9a-f]{1,4}:){2}(:[0-9a-f]{1,4}){1,5}"
		+ "|([0-9a-f]{1,4}:){3}(:[0-9a-f]{1,4}){1,4}"
		+ "|([0-9a-f]{1,4}:){4}(:[0-9a-f]{1,4}){1,3}"
		+ "|([0-9a-f]{1,4}:){5}(:[0-9a-f]{1,4}){1,2}"
		+ "|([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}){1}"
		+ ")"
		// (2) IPv4混在あり]
		+ "|("
		// ・省略なし
		+ "[0-9a-f]{1,4}(:[0-9a-f]{1,4}){5}"
		// ・全省略
		+ "|:"
		// ・前省略
		+ "|:(:[0-9a-f]{1,4}){1,5}"
		// ・後省略
		+ "|([0-9a-f]{1,4}:){1,5}"
		// ・中省略
		+ "|([0-9a-f]{1,4}:){1}(:[0-9a-f]{1,4}){1,4}"
		+ "|([0-9a-f]{1,4}:){2}(:[0-9a-f]{1,4}){1,3}"
		+ "|([0-9a-f]{1,4}:){3}(:[0-9a-f]{1,4}){1,2}"
		+ "|([0-9a-f]{1,4}:){4}(:[0-9a-f]{1,4}){1}"
		// ・共通末尾 (IPv4部)
		+ "):(25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})){3}"
		+ ")"
		//
		+ "$";

/**
 * IPアドレス形式判定 (IPv4).<br>
 * 文字列がIPv4アドレス形式であるか否か判定する。
 *
 * @param {String}
 *            addr 判定対象の文字列。
 * @return {Boolean} IPv4アドレス形式ならばtrue、さもなくばfalse。
 */
IpAddr.isIpv4Addr = function(addr) {
	if (typeof addr != "string") {
		return false;
	}
	return RegExp(IpAddr.IPV4_PATTERN, "i").test(addr);
};

/**
 * IPアドレス形式判定 (IPv6).<br>
 * 文字列がIPv6アドレス形式であるか否かを判定する。
 *
 * @param {String}
 *            addr 判定対象の文字列。
 * @return {Boolean} IPv6アドレス形式ならばtrue、さもなくばfalse。
 */
IpAddr.isIpv6Addr = function(addr) {
	if (typeof addr != "string") {
		return false;
	}
	return RegExp(IpAddr.IPV6_PATTERN, "i").test(addr);
};

/**
 * IPv4アドレスオブジェクトを生成する。
 *
 * @param {String}
 *            addr IPアドレスの文字列表記。
 * @returns {IpAddr.V4} IPアドレスオブジェクト。
 */
IpAddr.V4 = function(addr) {
	this.addr = addr;
};

IpAddr.V4.prototype = {

	/**
	 * IPアドレスのバージョン。
	 *
	 * @returns {String} バージョン ("IPv4"固定)。
	 */
	version : function() {
		return "IPv4";
	},

	/**
	 * IPアドレスの数値表現を取得する。
	 *
	 * @returns {Number} IPアドレスの数値表現。
	 */
	toNumber : function() {
		var octet = this.addr.split(".");
		var result = 0;
		for ( var i = 0; i < octet.length; i++) {
			result = 0x100 * result + Number(octet[i], 10);
		}
		return result;
	},

	/**
	 * IPアドレスの文字列表現を取得する。
	 *
	 * @returns {Number} IPアドレスの文字列表現。
	 */
	toString : function() {
		return this.addr;
	}

};

/**
 * IPv4アドレスオブジェクトを生成する。
 *
 * @param {String}
 *            addr IPアドレスの文字列表記。
 * @returns {IpAddr.V4} IPアドレスオブジェクト。
 */
IpAddr.V6 = function(addr) {

	this.addr = addr;

	var padding = function(size, prefix, suffix) {
		var result = [];
		for ( var i = 0; i < prefix.length; i++) {
			result.push(prefix[i]);
		}
		for ( var i = prefix.length; i < size - suffix.length; i++) {
			result.push(null);
		}
		for ( var i = size - suffix.length; i < size; i++) {
			result.push(suffix[i - (size - suffix.length)]);
		}
		return result;
	};

	if (addr.match(/^.*:[0-9]{1,3}(\.[0-9]{1,3}){3}$/)) {

		var colon = addr.lastIndexOf(":");
		this.v4 = addr.substring(colon + 1);

		var addrv6 = addr.substring(0, colon);
		if (addrv6 == ":") {
			this.v6 = padding(6, [], []);
		} else if (addrv6.match(/^::/)) {
			this.v6 = padding(6, [], addrv6.substring(2).split(":"));
		} else if (addrv6.match(/:$/)) {
			this.v6 = padding(6, addrv6.substring(0, addrv6.length - 1).split(
					":"), []);
		} else if (addrv6.match(/::/)) {
			var part = addrv6.split("::");
			this.v6 = padding(6, part[0].split(":"), part[1].split(":"));
		} else {
			this.v6 = padding(6, addrv6.split(":"), []);
		}
	} else {

		this.v4 = null;

		var addrv6 = addr;
		if (addrv6 == "::") {
			this.v6 = padding(8, [], []);
		} else if (addrv6.match(/^::/)) {
			this.v6 = padding(8, [], addrv6.substring(2).split(":"));
		} else if (addrv6.match(/::$/)) {
			this.v6 = padding(8, addrv6.substring(0, addrv6.length - 2).split(
					":"), []);
		} else if (addrv6.match(/::/)) {
			var part = addrv6.split("::");
			this.v6 = padding(8, part[0].split(":"), part[1].split(":"));
		} else {
			this.v6 = padding(8, addrv6.split(":"), []);
		}
	}
};

IpAddr.V6.prototype = {

	/**
	 * IPアドレスのバージョン。
	 *
	 * @returns {String} バージョン ("IPv6"固定)。
	 */
	version : function() {
		return "IPv6";
	},

	/**
	 * IPアドレスの圧縮表現を取得する。
	 *
	 * @returns {String} IPアドレスの圧縮表現。
	 */
	compress : function() {

		var adjust = function(text) {
			if (text === null) {
				return "0";
			} else if (text.match(/^0+$/)) {
				return "0";
			} else {
				var index = 0;
				for (; index < text.length; index++) {
					if (text.charAt(index) != "0") {
						break;
					}
				}
				var val = "";
				for (; index < text.length; index++) {
					val = val + text.charAt(index);
				}
				return val;
			}
		};

		var curBegin = -1;
		var curEnd = -1;
		var range = {
			begin : -1,
			end : -1
		};

		for ( var i = 0; i < this.v6.length; i++) {

			if (this.v6[i] && !this.v6[i].match(/^0+$/)) {
				curBegin = -1;
				curEnd = -1;
				continue;
			}

			if (curBegin < 0) {
				curBegin = i;
				curEnd = i;
			} else {
				curEnd = i;
			}

			if (range.begin < 0) {
				range.begin = curBegin;
				range.end = curEnd;
			} else {
				if (range.end - range.begin < curEnd - curBegin) {
					range.begin = curBegin;
					range.end = curEnd;
				}
			}
		}

		var result = "";

		if ((range.begin == -1) || (range.begin == range.end)) {
			// 省略なし
			result = adjust(this.v6[0]);
			for ( var i = 1; i < this.v6.length; i++) {
				result = result + ":" + adjust(this.v6[i]);
			}
		} else if (range.begin == 0) {
			if (range.end == this.v6.length - 1) {
				// 全省略
				result = "::";
			} else {
				// 前省略
				result = ":";
				for ( var i = range.end + 1; i < this.v6.length; i++) {
					result = result + ":" + adjust(this.v6[i]);
				}
			}
		} else {
			if (range.end == this.v6.length - 1) {
				// 後省略
				result = "";
				for ( var i = 0; i < range.begin; i++) {
					result = result + adjust(this.v6[i]) + ":";
				}
				result = result + ":";
			} else {
				// 中省略
				result = "";
				for ( var i = 0; i < range.begin; i++) {
					result = result + adjust(this.v6[i]) + ":";
				}
				for ( var i = range.end + 1; i < this.v6.length; i++) {
					result = result + ":" + adjust(this.v6[i]);
				}
			}
		}

		if (this.v4) {
			if (!result.match(/:$/)) {
				result = result + ":";
			}
			result = result + this.v4;
		}

		return result;
	},

	/**
	 * IPアドレスの展開表現を取得する。
	 *
	 * @returns {String} IPアドレスの展開表現。
	 */
	decompress : function() {

		var adjust = function(text) {
			if (text === null) {
				return "0000";
			} else {
				var val = "";
				for ( var i = text.length; i < 4; i++) {
					val = val + "0";
				}
				return val + text;
			}
		};

		var result = adjust(this.v6[0]);
		for ( var i = 1; i < this.v6.length; i++) {
			result = result + ":" + adjust(this.v6[i]);
		}

		if (this.v4) {
			result = result + ":" + this.v4;
		}

		return result;
	},

	/**
	 * IPアドレスの数値表現を取得する。
	 *
	 * @returns {Array} IPアドレスの数値表現。
	 */
	toNumber : function() {

		var result = [];

		for ( var i = 0; i < this.v6.length; i += 2) {
			var val = 0;
			for ( var j = 0; j < 2; j++) {
				val = 0x10000 * val;
				if (this.v6[i + j] !== null) {
					val += Number(this.v6[i + j], 16);
				}
			}
			result.push(val);
		}

		if (this.v4) {
			var val = 0;
			var octet = this.v4.split(".");
			for ( var j = 0; j < octet.length; j++) {
				val = 0x100 * val + Number(octet[j], 10);
			}
			result.push(val);
		}

		return result;
	},

	/**
	 * IPアドレスの文字列表現を取得する。
	 *
	 * @returns {Number} IPアドレスの文字列表現。
	 */
	toString : function() {
		return this.addr;
	}

};

/**
 * IPアドレスマスク数値表現.<br>
 * IPアドレスのサイズとプレフィクス長からビットマスクの数値表現を取得する。
 *
 * @param {Number}
 *            size IPアドレスのサイズ。
 * @param {Number}
 *            length プレフィクス長。
 * @returns {Array} ビットマスクの数値表現。
 */
IpAddr.getMask = function(size, length) {
	// [考え方]
	// -------- <---------------(size)---------------->
	// -------- <-----(length)----> <-(size - length)->
	// --------+-------------------+--------------------
	// base = 1 0 0 0 0 ... 0 0 0 0 0 0 0 0 ... 0 0 0 0
	// mask = . . . . . . . . . . 1 0 0 0 0 ... 0 0 0 0
	// --------+-------------------+--------------------
	// return = 1 1 1 1 ... 1 1 1 1 0 0 0 0 ... 0 0 0 0

	var unit = 32;
	var base = 0x100000000;
	var base1 = 0x80000000;

	var width = Math.floor(size / unit);
	var div = Math.floor(length / unit);
	var mod = length % unit;

	var result = [];
	var i = 0;
	for (; i < div; i++) {
		result.push(base - 1);
	}
	if (mod !== 0) {
		var mask = (base1 >>> (mod - 1));
		result.push(base - mask);
		i++;
	}
	for (; i < width; i++) {
		result.push(0);
	}

	return result;
};

/**
 * IPv4アドレスネットマスク数値表現.<br>
 * IPv4アドレスのネットマスクの数値表現を取得する。
 *
 * @param {Number}
 *            maskLength ネットマスク長。0から32の範囲で指定する。
 * @returns {Number} IPv4アドレスのネットマスクの数値表現。
 */
IpAddr.V4.getMask = function(maskLength) {
	if (maskLength > 32) {
		return IpAddr.getMask(32, 32)[0];
	}
	if (maskLength < 0) {
		return IpAddr.getMask(32, 0)[0];
	}
	return IpAddr.getMask(32, maskLength)[0];
};

/**
 * IPv6アドレスプレフィクスマスク数値表現.<br>
 * IPv6アドレスのプレフィクスマスクの数値表現を取得する。
 *
 * @param {Number}
 *            prefixLength プレフィクス長。0から128の範囲で指定する。
 * @returns {Array} IPv6アドレスのプレフィクスマスクの数値表現。
 */
IpAddr.V6.getMask = function(prefixLength) {
	if (prefixLength > 128) {
		return IpAddr.getMask(128, 128);
	}
	if (prefixLength < 0) {
		return IpAddr.getMask(128, 0);
	}
	return IpAddr.getMask(128, prefixLength);
};
