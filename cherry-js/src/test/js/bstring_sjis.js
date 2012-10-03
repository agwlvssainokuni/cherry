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

test("bstring_sjis - blength", function() {

	equal("".blength(), 0, "''");

	equal("A".blength(), 1, "A");
	equal("ABCDE".blength(), 5, "ABCDE");

	equal("ｱ".blength(), 1, "ｱ");
	equal("ｱｲｳｴｵ".blength(), 5, "ｱｲｳｴｵ");

	equal("ア".blength(), 2, "ア");
	equal("アイウエオ".blength(), 10, "アイウエオ");
});

test("bstring_sjis - bposition", function() {

	equal("".bposition(0), undefined, "'', 0");
	equal("".bposition(1), undefined, "'', 1");

	equal("A".bposition(0), 0, "A, 0");
	equal("A".bposition(1), undefined, "A, 1");
	equal("ABCDE".bposition(0), 0, "ABCDE, 0");
	equal("ABCDE".bposition(4), 4, "ABCEE, 4");
	equal("ABCDE".bposition(5), undefined, "ABCEE, 5");

	equal("ｱ".bposition(0), 0, "ｱ, 0");
	equal("ｱ".bposition(1), undefined, "ｱ, 1");
	equal("ｱ".bposition(2), undefined, "ｱ, 2");
	equal("ｱ".bposition(3), undefined, "ｱ, 3");
	equal("ｱｲｳｴｵ".bposition(0), 0, "ｱｲｳｴｵ, 0");
	equal("ｱｲｳｴｵ".bposition(1), 1, "ｱｲｳｴｵ, 1");
	equal("ｱｲｳｴｵ".bposition(2), 2, "ｱｲｳｴｵ, 2");
	equal("ｱｲｳｴｵ".bposition(3), 3, "ｱｲｳｴｵ, 3");
	equal("ｱｲｳｴｵ".bposition(4), 4, "ｱｲｳｴｵ, 4");
	equal("ｱｲｳｴｵ".bposition(5), undefined, "ｱｲｳｴｵ, 5");

	equal("ア".bposition(0), 0, "ア, 0");
	equal("ア".bposition(1), 0, "ア, 1");
	equal("ア".bposition(2), undefined, "ア, 2");
	equal("アイウエオ".bposition(0), 0, "アイウエオ, 0");
	equal("アイウエオ".bposition(1), 0, "アイウエオ, 1");
	equal("アイウエオ".bposition(2), 1, "アイウエオ, 2");
	equal("アイウエオ".bposition(3), 1, "アイウエオ, 3");
	equal("アイウエオ".bposition(4), 2, "アイウエオ, 4");
	equal("アイウエオ".bposition(7), 3, "アイウエオ, 7");
	equal("アイウエオ".bposition(8), 4, "アイウエオ, 8");
	equal("アイウエオ".bposition(9), 4, "アイウエオ, 9");
	equal("アイウエオ".bposition(10), undefined, "アイウエオ, 10");
});

test("bstring_sjis - bsubstring", function() {

	equal("".bsubstring(0, 5), "", "'', 0, 5");

	equal("A".bsubstring(0, 0), "", "A, 0, 0");
	equal("A".bsubstring(0, 1), "A", "A, 0, 1");
	equal("A".bsubstring(0, 2), "A", "A, 0, 2");
	equal("ABCD".bsubstring(0, 5), "ABCD", "ABCD, 0, 5");
	equal("ABCDE".bsubstring(0, 5), "ABCDE", "ABCDE, 0, 5");
	equal("ABCDEF".bsubstring(0, 5), "ABCDE", "ABCDEF, 0, 5");
	equal("ABCDEFG".bsubstring(0, 5), "ABCDE", "ABCDEFG, 0, 5");
	equal("ABCDEFG".bsubstring(1, 5), "BCDE", "ABCDEFG, 1, 5");
	equal("ABCDEFG".bsubstring(2, 5), "CDE", "ABCDEFG, 2, 5");

	equal("ｱ".bsubstring(0, 0), "", "ｱ, 0, 0");
	equal("ｱ".bsubstring(0, 1), "ｱ", "ｱ, 0, 1");
	equal("ｱ".bsubstring(0, 2), "ｱ", "ｱ, 0, 2");
	equal("ｱｲｳｴｵ".bsubstring(0, 3), "ｱｲｳ", "ｱｲｳｴｵ, 0, 3");
	equal("ｱｲｳｴｵ".bsubstring(0, 4), "ｱｲｳｴ", "ｱｲｳｴｵ, 0, 4");
	equal("ｱｲｳｴｵ".bsubstring(0, 5), "ｱｲｳｴｵ", "ｱｲｳｴｵ, 0, 5");
	equal("ｱｲｳｴｵ".bsubstring(1, 4), "ｲｳｴ", "ｱｲｳｴｵ, 1, 4");
	equal("ｱｲｳｴｵ".bsubstring(2, 4), "ｳｴ", "ｱｲｳｴｵ, 2, 4");

	equal("ア".bsubstring(0, 0), "", "ア, 0, 0");
	equal("ア".bsubstring(0, 1), "", "ア, 0, 1");
	equal("ア".bsubstring(0, 2), "ア", "ア, 0, 2");
	equal("ア".bsubstring(0, 3), "ア", "ア, 0, 3");
	equal("アイウエオ".bsubstring(0, 6), "アイウ", "アイウエオ, 0, 6");
	equal("アイウエオ".bsubstring(0, 7), "アイウ", "アイウエオ, 0, 7");
	equal("アイウエオ".bsubstring(0, 8), "アイウエ", "アイウエオ, 0, 8");
	equal("アイウエオ".bsubstring(0, 9), "アイウエ", "アイウエオ, 0, 9");
	equal("アイウエオ".bsubstring(0, 10), "アイウエオ", "アイウエオ, 0, 10");
	equal("アイウエオ".bsubstring(1, 8), "アイウエ", "アイウエオ, 1, 8");
	equal("アイウエオ".bsubstring(2, 8), "イウエ", "アイウエオ, 2, 8");
	equal("アイウエオ".bsubstring(3, 8), "イウエ", "アイウエオ, 3, 8");
});
