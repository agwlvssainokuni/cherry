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

test("bstring_utf8 - blength", function() {

	equal("".blength(), 0, "''");

	equal("A".blength(), 1, "A");
	equal("ABCDE".blength(), 5, "ABCDE");

	equal("ｱ".blength(), 3, "ｱ");
	equal("ｱｲｳｴｵ".blength(), 15, "ｱｲｳｴｵ");

	equal("ア".blength(), 3, "ア");
	equal("アイウエオ".blength(), 15, "アイウエオ");
});

test("bstring_utf8 - bposition", function() {

	equal("".bposition(0), undefined, "'', 0");
	equal("".bposition(1), undefined, "'', 1");

	equal("A".bposition(0), 0, "A, 0");
	equal("A".bposition(1), undefined, "A, 1");
	equal("ABCDE".bposition(0), 0, "ABCDE, 0");
	equal("ABCDE".bposition(4), 4, "ABCEE, 4");
	equal("ABCDE".bposition(5), undefined, "ABCEE, 5");

	equal("ｱ".bposition(0), 0, "ｱ, 0");
	equal("ｱ".bposition(1), 0, "ｱ, 1");
	equal("ｱ".bposition(2), 0, "ｱ, 2");
	equal("ｱ".bposition(3), undefined, "ｱ, 3");
	equal("ｱｲｳｴｵ".bposition(0), 0, "ｱｲｳｴｵ, 0");
	equal("ｱｲｳｴｵ".bposition(1), 0, "ｱｲｳｴｵ, 1");
	equal("ｱｲｳｴｵ".bposition(2), 0, "ｱｲｳｴｵ, 2");
	equal("ｱｲｳｴｵ".bposition(3), 1, "ｱｲｳｴｵ, 3");
	equal("ｱｲｳｴｵ".bposition(12), 4, "ｱｲｳｴｵ, 12");
	equal("ｱｲｳｴｵ".bposition(13), 4, "ｱｲｳｴｵ, 13");
	equal("ｱｲｳｴｵ".bposition(14), 4, "ｱｲｳｴｵ, 14");
	equal("ｱｲｳｴｵ".bposition(15), undefined, "ｱｲｳｴｵ, 15");

	equal("ア".bposition(0), 0, "ア, 0");
	equal("ア".bposition(1), 0, "ア, 1");
	equal("ア".bposition(2), 0, "ア, 2");
	equal("ア".bposition(3), undefined, "ア, 3");
	equal("アイウエオ".bposition(0), 0, "アイウエオ, 0");
	equal("アイウエオ".bposition(1), 0, "アイウエオ, 1");
	equal("アイウエオ".bposition(2), 0, "アイウエオ, 2");
	equal("アイウエオ".bposition(3), 1, "アイウエオ, 3");
	equal("アイウエオ".bposition(12), 4, "アイウエオ, 12");
	equal("アイウエオ".bposition(13), 4, "アイウエオ, 13");
	equal("アイウエオ".bposition(14), 4, "アイウエオ, 14");
	equal("アイウエオ".bposition(15), undefined, "アイウエオ, 15");
});

test("bstring_utf8 - bsubstring", function() {

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
	equal("ｱ".bsubstring(0, 1), "", "ｱ, 0, 1");
	equal("ｱ".bsubstring(0, 2), "", "ｱ, 0, 2");
	equal("ｱ".bsubstring(0, 3), "ｱ", "ｱ, 0, 3");
	equal("ｱｲｳｴｵ".bsubstring(0, 11), "ｱｲｳ", "ｱｲｳｴｵ, 0, 11");
	equal("ｱｲｳｴｵ".bsubstring(0, 12), "ｱｲｳｴ", "ｱｲｳｴｵ, 0, 12");
	equal("ｱｲｳｴｵ".bsubstring(0, 13), "ｱｲｳｴ", "ｱｲｳｴｵ, 0, 13");
	equal("ｱｲｳｴｵ".bsubstring(0, 14), "ｱｲｳｴ", "ｱｲｳｴｵ, 0, 14");
	equal("ｱｲｳｴｵ".bsubstring(0, 15), "ｱｲｳｴｵ", "ｱｲｳｴｵ, 0, 15");
	equal("ｱｲｳｴｵ".bsubstring(1, 12), "ｱｲｳｴ", "ｱｲｳｴｵ, 1, 12");
	equal("ｱｲｳｴｵ".bsubstring(2, 12), "ｱｲｳｴ", "ｱｲｳｴｵ, 2, 12");
	equal("ｱｲｳｴｵ".bsubstring(3, 12), "ｲｳｴ", "ｱｲｳｴｵ, 3, 12");

	equal("ア".bsubstring(0, 0), "", "ア, 0, 0");
	equal("ア".bsubstring(0, 1), "", "ア, 0, 1");
	equal("ア".bsubstring(0, 2), "", "ア, 0, 2");
	equal("ア".bsubstring(0, 3), "ア", "ア, 0, 3");
	equal("アイウエオ".bsubstring(0, 11), "アイウ", "アイウエオ, 0, 11");
	equal("アイウエオ".bsubstring(0, 12), "アイウエ", "アイウエオ, 0, 12");
	equal("アイウエオ".bsubstring(0, 13), "アイウエ", "アイウエオ, 0, 13");
	equal("アイウエオ".bsubstring(0, 14), "アイウエ", "アイウエオ, 0, 14");
	equal("アイウエオ".bsubstring(0, 15), "アイウエオ", "アイウエオ, 0, 15");
	equal("アイウエオ".bsubstring(1, 12), "アイウエ", "アイウエオ, 1, 12");
	equal("アイウエオ".bsubstring(2, 12), "アイウエ", "アイウエオ, 2, 12");
	equal("アイウエオ".bsubstring(3, 12), "イウエ", "アイウエオ, 3, 12");
});
