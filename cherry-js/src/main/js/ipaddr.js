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
		return new IpAddr.V4(addrS);
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
	version : function() {
		return "IPv4";
	},
	toNumber : function() {
		var octet = this.addr.split(".");
		var result = 0;
		for ( var i = 0; i < octet.length; i++) {
			result = result + 0x100 * Number(octet[i]);
		}
		return result;
	},
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
		var result = new Array();
		for ( var i = 0; i < prefix.length; i++) {
			result.push(prefix[i]);
		}
		for ( var i = prefix.length; i < size - suffix.length; i++) {
			result[i].push(null);
		}
		for ( var i = size - suffix.length; i < size; i++) {
			result[i].push(suffix[i - (size - suffix.length)]);
		}
		return result;
	};

	if (addr.match(/^.*:[0-9]{1,3}(\\.[0-9]{1,3}){3}$/)) {

		var colon = addr.lastIndexOf(":");
		this.v4 = addr.substring(colon + 1);

		var addrv6 = addr.substring(0, colon);
		if (addrv6 == ":") {
			this.v6 = padding(6, [], []);
		} else if (addrv6.startsWith("::")) {
			this.v6 = padding(6, [], addrv6.substring(2).split(":"));
		} else if (addrv6.endsWith(":")) {
			this.v6 = padding(6, addrv6.substring(0, addrv6.length() - 1)
					.split(":"), []);
		} else if (addrv6.indexOf("::") >= 0) {
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
		} else if (addrv6.startsWith("::")) {
			this.v6 = padding(8, [], addrv6.substring(2).split(":"));
		} else if (addrv6.endsWith("::")) {
			this.v6 = padding(8, addrv6.substring(0, addrv6.length() - 2)
					.split(":"), []);
		} else if (addrv6.indexOf("::") >= 0) {
			var part = addrv6.split("::");
			this.v6 = padding(8, part[0].split(":"), part[1].split(":"));
		} else {
			this.v6 = padding(8, addrv6.split(":"), []);
		}
	}
};

IpAddr.V6.prototype = {
	version : function() {
		return "IPv6";
	},
	compress : function() {

	},
	decompress : function() {

	},
	toNumber : function() {
		var result = 0;
		for ( var i = 0; i < this.v6.length; i++) {
			result = result + 0x10000
					* (this.v6[i] === null ? 0 : Number(this.v6[i], 16));
		}
		if (this.v4) {
			var octet = this.v4.split(".");
			for ( var i = 0; i < octet.length; i++) {
				result = result + 0x100 * Number(octet[i]);
			}
		}
		return result;
	},
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
 * @returns {Number} ビットマスクの数値表現。
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
	var base = (1 << size);
	var mask = (1 << (size - length));
	return base - mask;
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
		return IpAddr.getMask(32, 32);
	}
	if (maskLength < 0) {
		return IpAddr.getMask(32, 0);
	}
	return IpAddr.getMask(32, maskLength);
};

/**
 * IPv6アドレスプレフィクスマスク数値表現.<br>
 * IPv6アドレスのプレフィクスマスクの数値表現を取得する。
 *
 * @param {Number}
 *            prefixLength プレフィクス長。0から128の範囲で指定する。
 * @returns {Number} IPv6アドレスのプレフィクスマスクの数値表現。
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
