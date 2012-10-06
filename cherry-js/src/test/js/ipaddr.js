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

test("IpAddr", function() {
	equal(IpAddr(), undefined, "undefined");
	equal(IpAddr(""), undefined, "''");
	equal(IpAddr(1234), undefined, "undefined");
	equal(IpAddr("NONE"), undefined, "NONE");
	equal(IpAddr("127.0.0.1").version(), "IPv4", "127.0.0.1");
	equal(IpAddr("::1").version(), "IPv6", "::1");
});

test("IpAddr.V4, toString, toNumber", function() {
	equal(IpAddr("127.0.0.1").toString(), "127.0.0.1", "127.0.0.1#toString");
	equal(IpAddr("127.0.0.1").toNumber(), 0x7F000001, "127.0.0.1#toNumber");
});

test("IpAddr.V6, toString, toNumber", function() {

	equal(IpAddr("1:2:3:4:5:6:7:8").toString(), "1:2:3:4:5:6:7:8",
			"1:2:3:4:5:6:7:8#toString");
	var num = IpAddr("1:2:3:4:5:6:7:8").toNumber();
	equal(num.length, 4, "1:2:3:4:5:6:7:8#toNumber.length");
	equal(num[0], 0x00010002, "1:2:3:4:5:6:7:8#toNumber[0]");
	equal(num[1], 0x00030004, "1:2:3:4:5:6:7:8#toNumber[1]");
	equal(num[2], 0x00050006, "1:2:3:4:5:6:7:8#toNumber[2]");
	equal(num[3], 0x00070008, "1:2:3:4:5:6:7:8#toNumber[3]");

	equal(IpAddr("1:2:3:4:5:6:127.0.0.1").toString(), "1:2:3:4:5:6:127.0.0.1",
			"1:2:3:4:5:6:127.0.0.1#toString");
	var num = IpAddr("1:2:3:4:5:6:127.0.0.1").toNumber();
	equal(num.length, 4, "1:2:3:4:5:6:127.0.0.1#toNumber.length");
	equal(num[0], 0x00010002, "1:2:3:4:5:6:127.0.0.1#toNumber[0]");
	equal(num[1], 0x00030004, "1:2:3:4:5:6:127.0.0.1#toNumber[1]");
	equal(num[2], 0x00050006, "1:2:3:4:5:6:127.0.0.1#toNumber[2]");
	equal(num[3], 0x7F000001, "1:2:3:4:5:6:127.0.0.1#toNumber[3]");
});

test("IpAddr.isIpv4Addr", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv4Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check(null, false);
	check("0.0.0.0", true);
	check("00.00.00.00", true);
	check("000.000.000.000", true);
	check("255.255.255.255", true);
	check("127.0.0.1", true);
	check("10.0.0.1", true);
	check("192.168.0.1", true);
	check("", false);
	check("0", false);
	check("0.", false);
	check("0.0", false);
	check("0.0.", false);
	check("0.0.0", false);
	check("0.0.0.", false);
	check("0000.0.0.0", false);
	check("0.0000.0.0", false);
	check("0.0.0000.0", false);
	check("0.0.0.0000", false);
	check("z.z.z.z", false);
	check("z.0.0.0", false);
	check("0.z.0.0", false);
	check("0.0.z.0", false);
	check("0.0.0.z", false);

	check("0.0.0.0", true);
	check("9.0.0.0", true);
	check("00.0.0.0", true);
	check("99.0.0.0", true);
	check("000.0.0.0", true);
	check("099.0.0.0", true);
	check("100.0.0.0", true);
	check("199.0.0.0", true);
	check("200.0.0.0", true);
	check("209.0.0.0", true);
	check("240.0.0.0", true);
	check("249.0.0.0", true);
	check("250.0.0.0", true);
	check("255.0.0.0", true);
	check("256.0.0.0", false);
	check("260.0.0.0", false);
	check("270.0.0.0", false);
	check("280.0.0.0", false);
	check("290.0.0.0", false);

	check("0.0.0.0", true);
	check("0.0.0.9", true);
	check("0.0.0.00", true);
	check("0.0.0.99", true);
	check("0.0.0.000", true);
	check("0.0.0.099", true);
	check("0.0.0.100", true);
	check("0.0.0.199", true);
	check("0.0.0.200", true);
	check("0.0.0.209", true);
	check("0.0.0.240", true);
	check("0.0.0.249", true);
	check("0.0.0.250", true);
	check("0.0.0.255", true);
	check("0.0.0.256", false);
	check("0.0.0.260", false);
	check("0.0.0.270", false);
	check("0.0.0.280", false);
	check("0.0.0.290", false);

});

test("IpAddr.isIpv6Addr", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check(null, false);
	check("", false);
	check("2001:0db8:0020:0003:1000:0100:0020:0003", true);
	check("2001:db8:20:3:1000:100:20:3", true);
	check("::", true);
	check("::1.1.1.1", true);
});

test("IpAddr.isIpv6Addr, 省略無し", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check("0:0:0:0:0:0:0:0", true);
	check("00:00:00:00:00:00:00:00", true);
	check("000:000:000:000:000:000:000:000", true);
	check("0000:0000:0000:0000:0000:0000:0000:0000", true);
	check("1111:1111:1111:1111:1111:1111:1111:1111", true);
	check("2222:2222:2222:2222:2222:2222:2222:2222", true);
	check("3333:3333:3333:3333:3333:3333:3333:3333", true);
	check("4444:4444:4444:4444:4444:4444:4444:4444", true);
	check("5555:5555:5555:5555:5555:5555:5555:5555", true);
	check("6666:6666:6666:6666:6666:6666:6666:6666", true);
	check("7777:7777:7777:7777:7777:7777:7777:7777", true);
	check("8888:8888:8888:8888:8888:8888:8888:8888", true);
	check("9999:9999:9999:9999:9999:9999:9999:9999", true);
	check("aaaa:aaaa:aaaa:aaaa:aaaa:aaaa:aaaa:aaaa", true);
	check("bbbb:bbbb:bbbb:bbbb:bbbb:bbbb:bbbb:bbbb", true);
	check("cccc:cccc:cccc:cccc:cccc:cccc:cccc:cccc", true);
	check("dddd:dddd:dddd:dddd:dddd:dddd:dddd:dddd", true);
	check("eeee:eeee:eeee:eeee:eeee:eeee:eeee:eeee", true);
	check("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", true);
	check("AAAA:AAAA:AAAA:AAAA:AAAA:AAAA:AAAA:AAAA", true);
	check("BBBB:BBBB:BBBB:BBBB:BBBB:BBBB:BBBB:BBBB", true);
	check("CCCC:CCCC:CCCC:CCCC:CCCC:CCCC:CCCC:CCCC", true);
	check("DDDD:DDDD:DDDD:DDDD:DDDD:DDDD:DDDD:DDDD", true);
	check("EEEE:EEEE:EEEE:EEEE:EEEE:EEEE:EEEE:EEEE", true);
	check("FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF", true);
	check("00000:0:0:0:0:0:0:0", false);
	check("0:00000:0:0:0:0:0:0", false);
	check("0:0:00000:0:0:0:0:0", false);
	check("0:0:0:00000:0:0:0:0", false);
	check("0:0:0:0:00000:0:0:0", false);
	check("0:0:0:0:0:00000:0:0", false);
	check("0:0:0:0:0:0:00000:0", false);
	check("0:0:0:0:0:0:0:00000", false);
	check("0", false);
	check("0:", false);
	check("0:0", false);
	check("0:0:", false);
	check("0:0:0", false);
	check("0:0:0:", false);
	check("0:0:0:0", false);
	check("0:0:0:0:", false);
	check("0:0:0:0:0", false);
	check("0:0:0:0:0:", false);
	check("0:0:0:0:0:0", false);
	check("0:0:0:0:0:0:", false);
	check("0:0:0:0:0:0:0", false);
	check("0:0:0:0:0:0:0:", false);
	check("0:0:0:0:0:0:0:0:", false);
	check("0:0:0:0:0:0:0:0:0", false);
	check("z:z:z:z:z:z:z:z", false);
	check("z:0:0:0:0:0:0:0", false);
	check("0:z:0:0:0:0:0:0", false);
	check("0:0:z:0:0:0:0:0", false);
	check("0:0:0:z:0:0:0:0", false);
	check("0:0:0:0:z:0:0:0", false);
	check("0:0:0:0:0:z:0:0", false);
	check("0:0:0:0:0:0:z:0", false);
	check("0:0:0:0:0:0:0:z", false);
});

test("IpAddr.isIpv6Addr, 前省略", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check("::1", true);
	check("::1:1", true);
	check("::1:1:1", true);
	check("::1:1:1:1", true);
	check("::1:1:1:1:1", true);
	check("::1:1:1:1:1:1", true);
	check("::1:1:1:1:1:1:1", true);
	check("::1:1:1:1:1:1:1:1", false);
	check("::z:z:z:z:z:z:z", false);
	check("::z:1:1:1:1:1:1", false);
	check("::1:z:1:1:1:1:1", false);
	check("::1:1:z:1:1:1:1", false);
	check("::1:1:1:z:1:1:1", false);
	check("::1:1:1:1:z:1:1", false);
	check("::1:1:1:1:1:z:1", false);
	check("::1:1:1:1:1:1:z", false);
});

test("IpAddr.isIpv6Addr, 後省略", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check("1::", true);
	check("1:1::", true);
	check("1:1:1::", true);
	check("1:1:1:1::", true);
	check("1:1:1:1:1::", true);
	check("1:1:1:1:1:1::", true);
	check("1:1:1:1:1:1:1::", true);
	check("1:1:1:1:1:1:1:1::", false);
	check("z:z:z:z:z:z:z::", false);
	check("z:1:1:1:1:1:1::", false);
	check("1:z:1:1:1:1:1::", false);
	check("1:1:z:1:1:1:1::", false);
	check("1:1:1:z:1:1:1::", false);
	check("1:1:1:1:z:1:1::", false);
	check("1:1:1:1:1:z:1::", false);
	check("1:1:1:1:1:1:z::", false);
});

test("IpAddr.isIpv6Addr, 中省略", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check("1::1", true);
	check("1::1:1", true);
	check("1::1:1:1", true);
	check("1::1:1:1:1", true);
	check("1::1:1:1:1:1", true);
	check("1::1:1:1:1:1:1", true);
	check("1::1:1:1:1:1:1:1", false);
	check("z::z:z:z:z:z:z", false);
	check("z::1:1:1:1:1:1", false);
	check("1::z:1:1:1:1:1", false);
	check("1::1:z:1:1:1:1", false);
	check("1::1:1:z:1:1:1", false);
	check("1::1:1:1:z:1:1", false);
	check("1::1:1:1:1:z:1", false);
	check("1::1:1:1:1:1:z", false);

	check("2:2::2", true);
	check("2:2::2:2", true);
	check("2:2::2:2:2", true);
	check("2:2::2:2:2:2", true);
	check("2:2::2:2:2:2:2", true);
	check("2:2::2:2:2:2:2:2", false);
	check("z:z::z:z:z:z:z", false);
	check("z:2::2:2:2:2:2", false);
	check("2:z::2:2:2:2:2", false);
	check("2:2::z:2:2:2:2", false);
	check("2:2::2:z:2:2:2", false);
	check("2:2::2:2:z:2:2", false);
	check("2:2::2:2:2:z:2", false);
	check("2:2::2:2:2:2:z", false);

	check("3:3:3::3", true);
	check("3:3:3::3:3", true);
	check("3:3:3::3:3:3", true);
	check("3:3:3::3:3:3:3", true);
	check("3:3:3::3:3:3:3:3", false);
	check("z:z:z::z:z:z:z", false);
	check("z:3:3::3:3:3:3", false);
	check("3:z:3::3:3:3:3", false);
	check("3:3:z::3:3:3:3", false);
	check("3:3:3::z:3:3:3", false);
	check("3:3:3::3:z:3:3", false);
	check("3:3:3::3:3:z:3", false);
	check("3:3:3::3:3:3:z", false);

	check("4:4:4:4::4", true);
	check("4:4:4:4::4:4", true);
	check("4:4:4:4::4:4:4", true);
	check("4:4:4:4::4:4:4:4", false);
	check("z:z:z:z::z:z:z", false);
	check("z:4:4:4::4:4:4", false);
	check("4:z:4:4::4:4:4", false);
	check("4:4:z:4::4:4:4", false);
	check("4:4:4:z::4:4:4", false);
	check("4:4:4:4::z:4:4", false);
	check("4:4:4:4::4:z:4", false);
	check("4:4:4:4::4:4:z", false);

	check("5:5:5:5:5::5", true);
	check("5:5:5:5:5::5:5", true);
	check("5:5:5:5:5::5:5:5", false);
	check("z:z:z:z:z::z:z", false);
	check("z:5:5:5:5::5:5", false);
	check("5:z:5:5:5::5:5", false);
	check("5:5:z:5:5::5:5", false);
	check("5:5:5:z:5::5:5", false);
	check("5:5:5:5:z::5:5", false);
	check("5:5:5:5:5::z:5", false);
	check("5:5:5:5:5::5:z", false);

	check("6:6:6:6:6:6::6", true);
	check("6:6:6:6:6:6::6:6", false);
	check("z:z:z:z:z:z::z", false);
	check("z:6:6:6:6:6::6", false);
	check("6:z:6:6:6:6::6", false);
	check("6:6:z:6:6:6::6", false);
	check("6:6:6:z:6:6::6", false);
	check("6:6:6:6:z:6::6", false);
	check("6:6:6:6:6:z::6", false);
	check("6:6:6:6:6:6::z", false);

	check("7:7:7:7:7:7:7::7", false);
});

test("IpAddr.isIpv6Addr, 後IPv4省略無し", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check("0:0:0:0:0:0:0.0.0.0", true);
	check("00:00:00:00:00:00:00.00.00.00", true);
	check("000:000:000:000:000:000:000.000.000.000", true);
	check("0000:0000:0000:0000:0000:0000:000.000.000.000", true);
	check("1111:1111:1111:1111:1111:1111:1.1.1.1", true);
	check("2222:2222:2222:2222:2222:2222:2.2.2.2", true);
	check("3333:3333:3333:3333:3333:3333:3.3.3.3", true);
	check("4444:4444:4444:4444:4444:4444:4.4.4.4", true);
	check("5555:5555:5555:5555:5555:5555:5.5.5.5", true);
	check("6666:6666:6666:6666:6666:6666:6.6.6.6", true);
	check("7777:7777:7777:7777:7777:7777:7.7.7.7", true);
	check("8888:8888:8888:8888:8888:8888:8.8.8.8", true);
	check("9999:9999:9999:9999:9999:9999:9.9.9.9", true);
	check("aaaa:aaaa:aaaa:aaaa:aaaa:aaaa:10.10.10.10", true);
	check("bbbb:bbbb:bbbb:bbbb:bbbb:bbbb:11.11.11.11", true);
	check("cccc:cccc:cccc:cccc:cccc:cccc:12.12.12.12", true);
	check("dddd:dddd:dddd:dddd:dddd:dddd:13.13.13.13", true);
	check("eeee:eeee:eeee:eeee:eeee:eeee:14.14.14.14", true);
	check("ffff:ffff:ffff:ffff:ffff:ffff:15.15.15.15", true);
	check("AAAA:AAAA:AAAA:AAAA:AAAA:AAAA:10.10.10.10", true);
	check("BBBB:BBBB:BBBB:BBBB:BBBB:BBBB:11.11.11.11", true);
	check("CCCC:CCCC:CCCC:CCCC:CCCC:CCCC:12.12.12.12", true);
	check("DDDD:DDDD:DDDD:DDDD:DDDD:DDDD:13.13.13.13", true);
	check("EEEE:EEEE:EEEE:EEEE:EEEE:EEEE:14.14.14.14", true);
	check("FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:15.15.15.15", true);
	check("00000:0:0:0:0:0:0.0.0.0", false);
	check("0:00000:0:0:0:0:0.0.0.0", false);
	check("0:0:00000:0:0:0:0.0.0.0", false);
	check("0:0:0:00000:0:0:0.0.0.0", false);
	check("0:0:0:0:00000:0:0.0.0.0", false);
	check("0:0:0:0:0:00000:0.0.0.0", false);
	check("0:0:0:0:0:0:256.256.256.256", false);
	check("0:0:0:0:0:0:256.0.0.0", false);
	check("0:0:0:0:0:0:0.256.0.0", false);
	check("0:0:0:0:0:0:0.0.256.0", false);
	check("0:0:0:0:0:0:0.0.0.256", false);
	check("0:0.0.0.0", false);
	check("0:0:0.0.0.0", false);
	check("0:0:0:0.0.0.0", false);
	check("0:0:0:0:0.0.0.0", false);
	check("0:0:0:0:0:0.0.0.0", false);
	check("0:0:0:0:0:0:0:0.0.0.0", false);
	check("z:z:z:z:z:z:z.z.z.z", false);
	check("z:0:0:0:0:0:0.0.0.0", false);
	check("0:z:0:0:0:0:0.0.0.0", false);
	check("0:0:z:0:0:0:0.0.0.0", false);
	check("0:0:0:z:0:0:0.0.0.0", false);
	check("0:0:0:0:z:0:0.0.0.0", false);
	check("0:0:0:0:0:z:0.0.0.0", false);
	check("0:0:0:0:0:0:z.0.0.0", false);
	check("0:0:0:0:0:0:0.z.0.0", false);
	check("0:0:0:0:0:0:0.0.z.0", false);
	check("0:0:0:0:0:0:0.0.0.z", false);
});

test("IpAddr.isIpv6Addr, 後IPv4前省略", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check("::1:1.1.1.1", true);
	check("::1:1:1.1.1.1", true);
	check("::1:1:1:1.1.1.1", true);
	check("::1:1:1:1:1.1.1.1", true);
	check("::1:1:1:1:1:1.1.1.1", true);
	check("::1:1:1:1:1:1:1.1.1.1", false);
	check("::z:z:z:z:z:1.1.1.1", false);
	check("::z:1:1:1:1:1.1.1.1", false);
	check("::1:z:1:1:1:1.1.1.1", false);
	check("::1:1:z:1:1:1.1.1.1", false);
	check("::1:1:1:z:1:1.1.1.1", false);
	check("::1:1:1:1:z:1.1.1.1", false);
});

test("IpAddr.isIpv6Addr, 後IPv4後省略", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check("1::1.1.1.1", true);
	check("1:1::1.1.1.1", true);
	check("1:1:1::1.1.1.1", true);
	check("1:1:1:1::1.1.1.1", true);
	check("1:1:1:1:1::1.1.1.1", true);
	check("1:1:1:1:1:1::1.1.1.1", false);
	check("z:z:z:z:z::1.1.1.1", false);
	check("z:1:1:1:1::1.1.1.1", false);
	check("1:z:1:1:1::1.1.1.1", false);
	check("1:1:z:1:1::1.1.1.1", false);
	check("1:1:1:z:1::1.1.1.1", false);
	check("1:1:1:1:z::1.1.1.1", false);
});

test("IpAddr.isIpv6Addr, 後IPv4中省略", function() {

	var check = function(addr, expected) {
		equal(IpAddr.isIpv6Addr(addr), expected, (addr == null ? "null"
				: (addr == "" ? "''" : addr)));
	};

	check("1::1:1.1.1.1", true);
	check("1::1:1:1.1.1.1", true);
	check("1::1:1:1:1.1.1.1", true);
	check("1::1:1:1:1:1.1.1.1", true);
	check("1::1:1:1:1:1:1.1.1.1", false);
	check("z::z:z:z:z:1.1.1.1", false);
	check("z::1:1:1:1:1.1.1.1", false);
	check("1::z:1:1:1:1.1.1.1", false);
	check("1::1:z:1:1:1.1.1.1", false);
	check("1::1:1:z:1:1.1.1.1", false);
	check("1::1:1:1:z:1.1.1.1", false);

	check("2:2::2:2.2.2.2", true);
	check("2:2::2:2:2.2.2.2", true);
	check("2:2::2:2:2:2.2.2.2", true);
	check("2:2::2:2:2:2:2.2.2.2", false);
	check("z:z::z:z:z:2.2.2.2", false);
	check("z:2::2:2:2:2.2.2.2", false);
	check("2:z::2:2:2:2.2.2.2", false);
	check("2:2::z:2:2:2.2.2.2", false);
	check("2:2::2:z:2:2.2.2.2", false);
	check("2:2::2:2:z:2.2.2.2", false);

	check("3:3:3::3:3.3.3.3", true);
	check("3:3:3::3:3:3.3.3.3", true);
	check("3:3:3::3:3:3:3.3.3.3", false);
	check("z:z:z::z:z:3.3.3.3", false);
	check("z:3:3::3:3:3.3.3.3", false);
	check("3:z:3::3:3:3.3.3.3", false);
	check("3:3:z::3:3:3.3.3.3", false);
	check("3:3:3::z:3:3.3.3.3", false);
	check("3:3:3::3:z:3.3.3.3", false);

	check("4:4:4:4::4:4.4.4.4", true);
	check("4:4:4:4::4:4:4.4.4.4", false);
	check("z:z:z:z::z:4.4.4.4", false);
	check("z:4:4:4::4:4.4.4.4", false);
	check("4:z:4:4::4:4.4.4.4", false);
	check("4:4:z:4::4:4.4.4.4", false);
	check("4:4:4:z::4:4.4.4.4", false);
	check("4:4:4:4::z:4.4.4.4", false);

	check("5:5:5:5:5::5:5.5.5.5", false);
});

test("IpAddr.V6.decompress",
		function() {

			var check = function(addr, expected) {
				equal(IpAddr(addr).decompress(), expected, addr);
			};

			check("2001:db8:20:3:1000:100:20:3",
					"2001:0db8:0020:0003:1000:0100:0020:0003");
			check("2001:db8::1234:0:0:9abc",
					"2001:0db8:0000:0000:1234:0000:0000:9abc");
			check("2001:db8::9abc", "2001:0db8:0000:0000:0000:0000:0000:9abc");
			check("1::1:0:0:0:1", "0001:0000:0000:0001:0000:0000:0000:0001");
			check("1:0:0:1::1:1", "0001:0000:0000:0001:0000:0000:0001:0001");
		});

test("IpAddr.V6.compress, 全省略", function() {

	var check = function(comped, decomped) {
		equal(IpAddr(comped).decompress(), decomped, comped);
		equal(IpAddr(decomped).decompress(), decomped, decomped);
		equal(IpAddr(decomped).compress(), comped, decomped);
		equal(IpAddr(comped).compress(), comped, comped);
	};

	check("::", "0000:0000:0000:0000:0000:0000:0000:0000");
});

test(
		"IpAddr.V6.compress, 省略無し",
		function() {

			var check = function(comped, decomped) {
				equal(IpAddr(comped).decompress(), decomped, comped);
				equal(IpAddr(decomped).decompress(), decomped, decomped);
				equal(IpAddr(decomped).compress(), comped, decomped);
				equal(IpAddr(comped).compress(), comped, comped);
			};

			check("1:2:3:4:5:6:7:8", "0001:0002:0003:0004:0005:0006:0007:0008");
			check("11:22:33:44:55:66:77:88",
					"0011:0022:0033:0044:0055:0066:0077:0088");
			check("111:222:333:444:555:666:777:888",
					"0111:0222:0333:0444:0555:0666:0777:0888");
			check("1111:2222:3333:4444:5555:6666:7777:8888",
					"1111:2222:3333:4444:5555:6666:7777:8888");
		});

test("IpAddr.V6.compress, 前省略", function() {

	var check = function(comped, decomped) {
		equal(IpAddr(comped).decompress(), decomped, comped);
		equal(IpAddr(decomped).decompress(), decomped, decomped);
		equal(IpAddr(decomped).compress(), comped, decomped);
		equal(IpAddr(comped).compress(), comped, comped);
	};

	check("::1", "0000:0000:0000:0000:0000:0000:0000:0001");
	check("::1:1", "0000:0000:0000:0000:0000:0000:0001:0001");
	check("::1:1:1", "0000:0000:0000:0000:0000:0001:0001:0001");
	check("::1:1:1:1", "0000:0000:0000:0000:0001:0001:0001:0001");
	check("::1:1:1:1:1", "0000:0000:0000:0001:0001:0001:0001:0001");
	check("::1:1:1:1:1:1", "0000:0000:0001:0001:0001:0001:0001:0001");

	equal(IpAddr("::1:1:1:1:1:1:1").decompress(),
			"0000:0001:0001:0001:0001:0001:0001:0001");
	equal(IpAddr("0000:0001:0001:0001:0001:0001:0001:0001").decompress(),
			"0000:0001:0001:0001:0001:0001:0001:0001");
	equal(IpAddr("0000:0001:0001:0001:0001:0001:0001:0001").compress(),
			"0:1:1:1:1:1:1:1");
	equal(IpAddr("::1:1:1:1:1:1:1").compress(), "0:1:1:1:1:1:1:1");
});

test("IpAddr.V6.compress, 後省略", function() {

	var check = function(comped, decomped) {
		equal(IpAddr(comped).decompress(), decomped, comped);
		equal(IpAddr(decomped).decompress(), decomped, decomped);
		equal(IpAddr(decomped).compress(), comped, decomped);
		equal(IpAddr(comped).compress(), comped, comped);
	};

	check("1::", "0001:0000:0000:0000:0000:0000:0000:0000");
	check("1:1::", "0001:0001:0000:0000:0000:0000:0000:0000");
	check("1:1:1::", "0001:0001:0001:0000:0000:0000:0000:0000");
	check("1:1:1:1::", "0001:0001:0001:0001:0000:0000:0000:0000");
	check("1:1:1:1:1::", "0001:0001:0001:0001:0001:0000:0000:0000");
	check("1:1:1:1:1:1::", "0001:0001:0001:0001:0001:0001:0000:0000");

	equal(IpAddr("1:1:1:1:1:1:1::").decompress(),
			"0001:0001:0001:0001:0001:0001:0001:0000", "1:1:1:1:1:1:1::");
	equal(IpAddr("0001:0001:0001:0001:0001:0001:0001:0000").decompress(),
			"0001:0001:0001:0001:0001:0001:0001:0000",
			"0001:0001:0001:0001:0001:0001:0001:0000");
	equal(IpAddr("0001:0001:0001:0001:0001:0001:0001:0000").compress(),
			"1:1:1:1:1:1:1:0", "0001:0001:0001:0001:0001:0001:0001:0000");
	equal(IpAddr("1:1:1:1:1:1:1::").compress(), "1:1:1:1:1:1:1:0",
			"1:1:1:1:1:1:1::");
});

test("IpAddr.V6.compress, 中省略", function() {

	var check = function(comped, decomped) {
		equal(IpAddr(comped).decompress(), decomped, comped);
		equal(IpAddr(decomped).decompress(), decomped, decomped);
		equal(IpAddr(decomped).compress(), comped, decomped);
		equal(IpAddr(comped).compress(), comped, comped);
	};

	check("1::1", "0001:0000:0000:0000:0000:0000:0000:0001");
	check("1::1:1", "0001:0000:0000:0000:0000:0000:0001:0001");
	check("1::1:1:1", "0001:0000:0000:0000:0000:0001:0001:0001");
	check("1::1:1:1:1", "0001:0000:0000:0000:0001:0001:0001:0001");
	check("1::1:1:1:1:1", "0001:0000:0000:0001:0001:0001:0001:0001");
	equal(IpAddr("1::1:1:1:1:1:1").decompress(),
			"0001:0000:0001:0001:0001:0001:0001:0001", "1::1:1:1:1:1:1");
	equal(IpAddr("0001:0000:0001:0001:0001:0001:0001:0001").decompress(),
			"0001:0000:0001:0001:0001:0001:0001:0001",
			"0001:0000:0001:0001:0001:0001:0001:0001");
	equal(IpAddr("0001:0000:0001:0001:0001:0001:0001:0001").compress(),
			"1:0:1:1:1:1:1:1", "0001:0000:0001:0001:0001:0001:0001:0001");
	equal(IpAddr("1::1:1:1:1:1:1").compress(), "1:0:1:1:1:1:1:1",
			"1::1:1:1:1:1:1");

	check("2:2::2", "0002:0002:0000:0000:0000:0000:0000:0002");
	check("2:2::2:2", "0002:0002:0000:0000:0000:0000:0002:0002");
	check("2:2::2:2:2", "0002:0002:0000:0000:0000:0002:0002:0002");
	check("2:2::2:2:2:2", "0002:0002:0000:0000:0002:0002:0002:0002");
	equal(IpAddr("2:2::2:2:2:2:2").decompress(),
			"0002:0002:0000:0002:0002:0002:0002:0002", "2:2::2:2:2:2:2");
	equal(IpAddr("0002:0002:0000:0002:0002:0002:0002:0002").decompress(),
			"0002:0002:0000:0002:0002:0002:0002:0002",
			"0002:0002:0000:0002:0002:0002:0002:0002");
	equal(IpAddr("0002:0002:0000:0002:0002:0002:0002:0002").compress(),
			"2:2:0:2:2:2:2:2", "0002:0002:0000:0002:0002:0002:0002:0002");
	equal(IpAddr("2:2::2:2:2:2:2").compress(), "2:2:0:2:2:2:2:2",
			"2:2::2:2:2:2:2");

	check("3:3:3::3", "0003:0003:0003:0000:0000:0000:0000:0003");
	check("3:3:3::3:3", "0003:0003:0003:0000:0000:0000:0003:0003");
	check("3:3:3::3:3:3", "0003:0003:0003:0000:0000:0003:0003:0003");
	equal(IpAddr("3:3:3::3:3:3:3").decompress(),
			"0003:0003:0003:0000:0003:0003:0003:0003", "3:3:3::3:3:3:3");
	equal(IpAddr("0003:0003:0003:0000:0003:0003:0003:0003").decompress(),
			"0003:0003:0003:0000:0003:0003:0003:0003",
			"0003:0003:0003:0000:0003:0003:0003:0003");
	equal(IpAddr("0003:0003:0003:0000:0003:0003:0003:0003").compress(),
			"3:3:3:0:3:3:3:3", "0003:0003:0003:0000:0003:0003:0003:0003");
	equal(IpAddr("3:3:3::3:3:3:3").compress(), "3:3:3:0:3:3:3:3",
			"3:3:3::3:3:3:3");

	check("4:4:4:4::4", "0004:0004:0004:0004:0000:0000:0000:0004");
	check("4:4:4:4::4:4", "0004:0004:0004:0004:0000:0000:0004:0004");
	equal(IpAddr("4:4:4:4::4:4:4").decompress(),
			"0004:0004:0004:0004:0000:0004:0004:0004", "4:4:4:4::4:4:4");
	equal(IpAddr("0004:0004:0004:0004:0000:0004:0004:0004").decompress(),
			"0004:0004:0004:0004:0000:0004:0004:0004",
			"0004:0004:0004:0004:0000:0004:0004:0004");
	equal(IpAddr("0004:0004:0004:0004:0000:0004:0004:0004").compress(),
			"4:4:4:4:0:4:4:4", "0004:0004:0004:0004:0000:0004:0004:0004");
	equal(IpAddr("4:4:4:4::4:4:4").compress(), "4:4:4:4:0:4:4:4");

	check("5:5:5:5:5::5", "0005:0005:0005:0005:0005:0000:0000:0005");
	equal(IpAddr("5:5:5:5:5::5:5").decompress(),
			"0005:0005:0005:0005:0005:0000:0005:0005", "5:5:5:5:5::5:5");
	equal(IpAddr("0005:0005:0005:0005:0005:0000:0005:0005").decompress(),
			"0005:0005:0005:0005:0005:0000:0005:0005",
			"0005:0005:0005:0005:0005:0000:0005:0005");
	equal(IpAddr("0005:0005:0005:0005:0005:0000:0005:0005").compress(),
			"5:5:5:5:5:0:5:5", "0005:0005:0005:0005:0005:0000:0005:0005");
	equal(IpAddr("5:5:5:5:5::5:5").compress(), "5:5:5:5:5:0:5:5",
			"5:5:5:5:5::5:5");

	equal(IpAddr("6:6:6:6:6:6::6").decompress(),
			"0006:0006:0006:0006:0006:0006:0000:0006", "6:6:6:6:6:6::6");
	equal(IpAddr("0006:0006:0006:0006:0006:0006:0000:0006").decompress(),
			"0006:0006:0006:0006:0006:0006:0000:0006",
			"0006:0006:0006:0006:0006:0006:0000:0006");
	equal(IpAddr("0006:0006:0006:0006:0006:0006:0000:0006").compress(),
			"6:6:6:6:6:6:0:6", "0006:0006:0006:0006:0006:0006:0000:0006");
	equal(IpAddr("6:6:6:6:6:6::6").compress(), "6:6:6:6:6:6:0:6",
			"6:6:6:6:6:6::6");
});

test("IpAddr.V6.compress, 後IPv4全省略", function() {

	var check = function(comped, decomped) {
		equal(IpAddr(comped).decompress(), decomped, comped);
		equal(IpAddr(decomped).decompress(), decomped, decomped);
		equal(IpAddr(decomped).compress(), comped, decomped);
		equal(IpAddr(comped).compress(), comped, comped);
	};

	check("::1.1.1.1", "0000:0000:0000:0000:0000:0000:1.1.1.1");
});

test("IpAddr.V6.compress, 後IPv4省略無",
		function() {

			var check = function(comped, decomped) {
				equal(IpAddr(comped).decompress(), decomped, comped);
				equal(IpAddr(decomped).decompress(), decomped, decomped);
				equal(IpAddr(decomped).compress(), comped, decomped);
				equal(IpAddr(comped).compress(), comped, comped);
			};

			check("1:2:3:4:5:6:1.1.1.1",
					"0001:0002:0003:0004:0005:0006:1.1.1.1");
			check("11:22:33:44:55:66:1.1.1.1",
					"0011:0022:0033:0044:0055:0066:1.1.1.1");
			check("111:222:333:444:555:666:1.1.1.1",
					"0111:0222:0333:0444:0555:0666:1.1.1.1");
			check("1111:2222:3333:4444:5555:6666:1.1.1.1",
					"1111:2222:3333:4444:5555:6666:1.1.1.1");
		});

test("IpAddr.V6.compress, 後IPv4前省略", function() {

	var check = function(comped, decomped) {
		equal(IpAddr(comped).decompress(), decomped, comped);
		equal(IpAddr(decomped).decompress(), decomped, decomped);
		equal(IpAddr(decomped).compress(), comped, decomped);
		equal(IpAddr(comped).compress(), comped, comped);
	};

	check("::1:1.1.1.1", "0000:0000:0000:0000:0000:0001:1.1.1.1");
	check("::1:1:1.1.1.1", "0000:0000:0000:0000:0001:0001:1.1.1.1");
	check("::1:1:1:1.1.1.1", "0000:0000:0000:0001:0001:0001:1.1.1.1");
	check("::1:1:1:1:1.1.1.1", "0000:0000:0001:0001:0001:0001:1.1.1.1");
	equal(IpAddr("::1:1:1:1:1:1.1.1.1").decompress(),
			"0000:0001:0001:0001:0001:0001:1.1.1.1", "::1:1:1:1:1:1.1.1.1");
	equal(IpAddr("0000:0001:0001:0001:0001:0001:1.1.1.1").decompress(),
			"0000:0001:0001:0001:0001:0001:1.1.1.1",
			"0000:0001:0001:0001:0001:0001:1.1.1.1");
	equal(IpAddr("0000:0001:0001:0001:0001:0001:1.1.1.1").compress(),
			"0:1:1:1:1:1:1.1.1.1", "0000:0001:0001:0001:0001:0001:1.1.1.1");
	equal(IpAddr("::1:1:1:1:1:1.1.1.1").compress(), "0:1:1:1:1:1:1.1.1.1",
			"::1:1:1:1:1:1.1.1.1");
});

test("IpAddr.V6.compress, 後IPv4後省略", function() {

	var check = function(comped, decomped) {
		equal(IpAddr(comped).decompress(), decomped, comped);
		equal(IpAddr(decomped).decompress(), decomped, decomped);
		equal(IpAddr(decomped).compress(), comped, decomped);
		equal(IpAddr(comped).compress(), comped, comped);
	};

	check("1::1.1.1.1", "0001:0000:0000:0000:0000:0000:1.1.1.1");
	check("1:1::1.1.1.1", "0001:0001:0000:0000:0000:0000:1.1.1.1");
	check("1:1:1::1.1.1.1", "0001:0001:0001:0000:0000:0000:1.1.1.1");
	check("1:1:1:1::1.1.1.1", "0001:0001:0001:0001:0000:0000:1.1.1.1");
	equal(IpAddr("1:1:1:1:1::1.1.1.1").decompress(),
			"0001:0001:0001:0001:0001:0000:1.1.1.1", "1:1:1:1:1::1.1.1.1");
	equal(IpAddr("0001:0001:0001:0001:0001:0000:1.1.1.1").decompress(),
			"0001:0001:0001:0001:0001:0000:1.1.1.1",
			"0001:0001:0001:0001:0001:0000:1.1.1.1");
	equal(IpAddr("0001:0001:0001:0001:0001:0000:1.1.1.1").compress(),
			"1:1:1:1:1:0:1.1.1.1", "0001:0001:0001:0001:0001:0000:1.1.1.1");
	equal(IpAddr("1:1:1:1:1::1.1.1.1").compress(), "1:1:1:1:1:0:1.1.1.1",
			"1:1:1:1:1::1.1.1.1");
});

test("IpAddr.V6.compress, 後IPv4中省略", function() {

	var check = function(comped, decomped) {
		equal(IpAddr(comped).decompress(), decomped, comped);
		equal(IpAddr(decomped).decompress(), decomped, decomped);
		equal(IpAddr(decomped).compress(), comped, decomped);
		equal(IpAddr(comped).compress(), comped, comped);
	};

	check("1::1:1.1.1.1", "0001:0000:0000:0000:0000:0001:1.1.1.1");
	check("1::1:1:1.1.1.1", "0001:0000:0000:0000:0001:0001:1.1.1.1");
	check("1::1:1:1:1.1.1.1", "0001:0000:0000:0001:0001:0001:1.1.1.1");
	equal(IpAddr("1::1:1:1:1:1.1.1.1").decompress(),
			"0001:0000:0001:0001:0001:0001:1.1.1.1", "1::1:1:1:1:1.1.1.1");
	equal(IpAddr("0001:0000:0001:0001:0001:0001:1.1.1.1").decompress(),
			"0001:0000:0001:0001:0001:0001:1.1.1.1",
			"0001:0000:0001:0001:0001:0001:1.1.1.1");
	equal(IpAddr("0001:0000:0001:0001:0001:0001:1.1.1.1").compress(),
			"1:0:1:1:1:1:1.1.1.1", "0001:0000:0001:0001:0001:0001:1.1.1.1");
	equal(IpAddr("1::1:1:1:1:1.1.1.1").compress(), "1:0:1:1:1:1:1.1.1.1",
			"1::1:1:1:1:1.1.1.1");

	check("2:2::2:2.2.2.2", "0002:0002:0000:0000:0000:0002:2.2.2.2");
	check("2:2::2:2:2.2.2.2", "0002:0002:0000:0000:0002:0002:2.2.2.2");
	equal(IpAddr("2:2::2:2:2:2.2.2.2").decompress(),
			"0002:0002:0000:0002:0002:0002:2.2.2.2", "2:2::2:2:2:2.2.2.2");
	equal(IpAddr("0002:0002:0000:0002:0002:0002:2.2.2.2").decompress(),
			"0002:0002:0000:0002:0002:0002:2.2.2.2",
			"0002:0002:0000:0002:0002:0002:2.2.2.2");
	equal(IpAddr("0002:0002:0000:0002:0002:0002:2.2.2.2").compress(),
			"2:2:0:2:2:2:2.2.2.2", "0002:0002:0000:0002:0002:0002:2.2.2.2");
	equal(IpAddr("2:2::2:2:2:2.2.2.2").compress(), "2:2:0:2:2:2:2.2.2.2",
			"2:2::2:2:2:2.2.2.2");

	check("3:3:3::3:3.3.3.3", "0003:0003:0003:0000:0000:0003:3.3.3.3");
	equal(IpAddr("3:3:3::3:3:3.3.3.3").decompress(),
			"0003:0003:0003:0000:0003:0003:3.3.3.3", "3:3:3::3:3:3.3.3.3");
	equal(IpAddr("0003:0003:0003:0000:0003:0003:3.3.3.3").decompress(),
			"0003:0003:0003:0000:0003:0003:3.3.3.3",
			"0003:0003:0003:0000:0003:0003:3.3.3.3");
	equal(IpAddr("0003:0003:0003:0000:0003:0003:3.3.3.3").compress(),
			"3:3:3:0:3:3:3.3.3.3", "0003:0003:0003:0000:0003:0003:3.3.3.3");
	equal(IpAddr("3:3:3::3:3:3.3.3.3").compress(), "3:3:3:0:3:3:3.3.3.3",
			"3:3:3::3:3:3.3.3.3");

	equal(IpAddr("4:4:4:4::4:4.4.4.4").decompress(),
			"0004:0004:0004:0004:0000:0004:4.4.4.4", "4:4:4:4::4:4.4.4.4");
	equal(IpAddr("0004:0004:0004:0004:0000:0004:4.4.4.4").decompress(),
			"0004:0004:0004:0004:0000:0004:4.4.4.4",
			"0004:0004:0004:0004:0000:0004:4.4.4.4");
	equal(IpAddr("0004:0004:0004:0004:0000:0004:4.4.4.4").compress(),
			"4:4:4:4:0:4:4.4.4.4", "0004:0004:0004:0004:0000:0004:4.4.4.4");
	equal(IpAddr("4:4:4:4::4:4.4.4.4").compress(), "4:4:4:4:0:4:4.4.4.4",
			"4:4:4:4::4:4.4.4.4");
});
