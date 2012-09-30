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

test("numfmt - string", function() {
	equal(numfmt("ABCD"), "NaN", "ABCD");
});

test("numfmt - integer", function() {

	equal(numfmt(0), "0", "0");
	equal(numfmt(1), "1", "1");
	equal(numfmt(9), "9", "9");
	equal(numfmt(10), "10", "10");
	equal(numfmt(99), "99", "99");
	equal(numfmt(100), "100", "100");
	equal(numfmt(999), "999", "999");
	equal(numfmt(1000), "1,000", "1000");
	equal(numfmt(9999), "9,999", "9999");
	equal(numfmt(10000), "10,000", "10000");
	equal(numfmt(99999), "99,999", "99,999");
	equal(numfmt(100000), "100,000", "100000");
	equal(numfmt(999999), "999,999", "999999");
	equal(numfmt(1000000), "1,000,000", "1000000");
	equal(numfmt(9999999), "9,999,999", "9999999");
	equal(numfmt(10000000), "10,000,000", "10000000");
	equal(numfmt(99999999), "99,999,999", "99999999");

	equal(numfmt(-1), "-1", "-1");
	equal(numfmt(-9), "-9", "-9");
	equal(numfmt(-10), "-10", "-10");
	equal(numfmt(-99), "-99", "-99");
	equal(numfmt(-100), "-100", "-100");
	equal(numfmt(-999), "-999", "-999");
	equal(numfmt(-1000), "-1,000", "-1000");
	equal(numfmt(-9999), "-9,999", "-9999");
	equal(numfmt(-10000), "-10,000", "-10000");
	equal(numfmt(-99999), "-99,999", "-99,999");
	equal(numfmt(-100000), "-100,000", "-100000");
	equal(numfmt(-999999), "-999,999", "-999999");
	equal(numfmt(-1000000), "-1,000,000", "-1000000");
	equal(numfmt(-9999999), "-9,999,999", "-9999999");
	equal(numfmt(-10000000), "-10,000,000", "-10000000");
	equal(numfmt(-99999999), "-99,999,999", "-99999999");
});

test("numfmt - double", function() {

	equal(numfmt(0.5), "0", "0.5");
	equal(numfmt(1.5), "1", "1.5");
	equal(numfmt(9.5), "9", "9.5");
	equal(numfmt(10.5), "10", "10.5");
	equal(numfmt(99.5), "99", "99.5");
	equal(numfmt(100.5), "100", "100.5");
	equal(numfmt(999.5), "999", "999.5");
	equal(numfmt(1000.5), "1,000", "1000.5");
	equal(numfmt(9999.5), "9,999", "9999.5");
	equal(numfmt(10000.5), "10,000", "10000.5");
	equal(numfmt(99999.5), "99,999", "99,999.5");
	equal(numfmt(100000.5), "100,000", "100000.5");
	equal(numfmt(999999.5), "999,999", "999999.5");
	equal(numfmt(1000000.5), "1,000,000", "1000000.5");
	equal(numfmt(9999999.5), "9,999,999", "9999999.5");
	equal(numfmt(10000000.5), "10,000,000", "10000000.5");
	equal(numfmt(99999999.5), "99,999,999", "99999999.5");

	equal(numfmt(-0.5), "0", "-0.5");
	equal(numfmt(-1.5), "-1", "-1.5");
	equal(numfmt(-9.5), "-9", "-9.5");
	equal(numfmt(-10.5), "-10", "-10.5");
	equal(numfmt(-99.5), "-99", "-99.5");
	equal(numfmt(-100.5), "-100", "-100.5");
	equal(numfmt(-999.5), "-999", "-999.5");
	equal(numfmt(-1000.5), "-1,000", "-1000.5");
	equal(numfmt(-9999.5), "-9,999", "-9999.5");
	equal(numfmt(-10000.5), "-10,000", "-10000.5");
	equal(numfmt(-99999.5), "-99,999", "-99,999.5");
	equal(numfmt(-100000.5), "-100,000", "-100000.5");
	equal(numfmt(-999999.5), "-999,999", "-999999.5");
	equal(numfmt(-1000000.5), "-1,000,000", "-1000000.5");
	equal(numfmt(-9999999.5), "-9,999,999", "-9999999.5");
	equal(numfmt(-10000000.5), "-10,000,000", "-10000000.5");
	equal(numfmt(-99999999.5), "-99,999,999", "-99999999.5");
});
