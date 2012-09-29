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

test("sprintf - %s", function() {
	equal("ABCDE", sprintf("%s", "ABCDE"), "%s, ABCDE");
	equal("     ABCDE", sprintf("%10s", "ABCDE"), "%10s, ABCDE");
	equal("       ABC", sprintf("%10.3s", "ABCDE"), "%10.3s, ABCDE");
	equal("     ABCDE", sprintf("%10.7s", "ABCDE"), "%10.7s, ABCDE");
	equal("00000ABCDE", sprintf("%010s", "ABCDE"), "%010s, ABCDE");
	equal("0000000ABC", sprintf("%010.3s", "ABCDE"), "%010.3s, ABCDE");
	equal("00000ABCDE", sprintf("%010.7s", "ABCDE"), "%010.7s, ABCDE");
	equal("ABCDE     ", sprintf("%-10s", "ABCDE"), "%-10s, ABCDE");
	equal("ABC       ", sprintf("%-10.3s", "ABCDE"), "%-10.3s, ABCDE");
	equal("ABCDE     ", sprintf("%-10.7s", "ABCDE"), "%-10.7s, ABCDE");
});

test("sprintf - %d", function() {

	equal("12345", sprintf("%d", 12345), "%d, 12345");
	equal("-12345", sprintf("%d", -12345), "%d, -12345");

	equal("     12345", sprintf("%10d", 12345), "%10d, 12345");
	equal("    -12345", sprintf("%10d", -12345), "%10d, -12345");

	equal("0000012345", sprintf("%010d", 12345), "%010d, 12345");
	equal("-000012345", sprintf("%010d", -12345), "%010d, -12345");

	equal(" 000012345", sprintf("% 010d", 12345), "% 010d, 12345");
	equal("-000012345", sprintf("% 010d", -12345), "% 010d, -12345");

	equal("    +12345", sprintf("%+10d", 12345), "%+10d, 12345");
	equal("    -12345", sprintf("%+10d", -12345), "%+10d, -12345");

	equal("+000012345", sprintf("%+010d", 12345), "%+010d, 12345");
	equal("-000012345", sprintf("%+010d", -12345), "%+010d, -12345");

	equal("12345     ", sprintf("%-10d", 12345), "%-10d, 12345");
	equal("-12345    ", sprintf("%-10d", -12345), "%-10d, -12345");

	equal(" 12345    ", sprintf("%- 10d", 12345), "%- 10d, 12345");
	equal("-12345    ", sprintf("%- 10d", -12345), "%- 10d, -12345");

	equal("+12345    ", sprintf("%-+10d", 12345), "%-+10d, 12345");
	equal("-12345    ", sprintf("%-+10d", -12345), "%-+10d, -12345");

	equal("     12345", sprintf("%10.3d", 12345), "%10.3d, 12345");
	equal("    -12345", sprintf("%10.3d", -12345), "%10.3d, -12345");

	equal("   0012345", sprintf("%10.7d", 12345), "%10.7d, 12345");
	equal("  -0012345", sprintf("%10.7d", -12345), "%10.7d, -12345");

	equal("0012345   ", sprintf("%-10.7d", 12345), "%-10.7d, 12345");
	equal("-0012345  ", sprintf("%-10.7d", -12345), "%-10.7d, -12345");
});

test("sprintf - %f", function() {

	equal("12.34", sprintf("%.2f", 12.345), "%.2f, 12.345");
	equal("-12.34", sprintf("%.2f", -12.345), "%.2f, -12.345");
	equal("12.3450", sprintf("%.4f", 12.345), "%.4f, 12.345");
	equal("-12.3450", sprintf("%.4f", -12.345), "%.4f, -12.345");

	equal("     12.34", sprintf("%10.2f", 12.345), "%10.2f, 12.345");
	equal("    -12.34", sprintf("%10.2f", -12.345), "%10.2f, -12.345");
	equal("   12.3450", sprintf("%10.4f", 12.345), "%10.4f, 12.345");
	equal("  -12.3450", sprintf("%10.4f", -12.345), "%10.4f, -12.345");

	equal("0000012.34", sprintf("%010.2f", 12.345), "%010.2f, 12.345");
	equal("-000012.34", sprintf("%010.2f", -12.345), "%010.2f, -12.345");
	equal("00012.3450", sprintf("%010.4f", 12.345), "%010.4f, 12.345");
	equal("-0012.3450", sprintf("%010.4f", -12.345), "%010.4f, -12.345");

	equal(" 000012.34", sprintf("% 010.2f", 12.345), "% 010.2f, 12.345");
	equal("-000012.34", sprintf("% 010.2f", -12.345), "% 010.2f, -12.345");
	equal(" 0012.3450", sprintf("% 010.4f", 12.345), "% 010.4f, 12.345");
	equal("-0012.3450", sprintf("% 010.4f", -12.345), "% 010.4f, -12.345");

	equal("    +12.34", sprintf("%+10.2f", 12.345), "%+10.2f, 12.345");
	equal("    -12.34", sprintf("%+10.2f", -12.345), "%+10.2f, -12.345");

	equal("+000012.34", sprintf("%+010.2f", 12.345), "%+010.2f, 12.345");
	equal("-000012.34", sprintf("%+010.2f", -12.345), "%+010.2f, -12.345");
	equal("+0012.3450", sprintf("%+010.4f", 12.345), "%+010.4f, 12.345");
	equal("-0012.3450", sprintf("%+010.4f", -12.345), "%+010.4f, -12.345");

	equal("12.34     ", sprintf("%-10.2f", 12.345), "%-10.2f, 12.345");
	equal("-12.34    ", sprintf("%-10.2f", -12.345), "%-10.2f, -12.345");
	equal("12.3450   ", sprintf("%-10.4f", 12.345), "%-10.4f, 12.345");
	equal("-12.3450  ", sprintf("%-10.4f", -12.345), "%-10.4f, -12.345");

	equal(" 12.34    ", sprintf("%- 10.2f", 12.345), "%- 10.2f, 12.345");
	equal("-12.34    ", sprintf("%- 10.2f", -12.345), "%- 10.2f, -12.345");
	equal(" 12.3450  ", sprintf("%- 10.4f", 12.345), "%- 10.4f, 12.345");
	equal("-12.3450  ", sprintf("%- 10.4f", -12.345), "%- 10.4f, -12.345");

	equal("+12.34    ", sprintf("%-+10.2f", 12.345), "%-+10.2f, 12.345");
	equal("-12.34    ", sprintf("%-+10.2f", -12.345), "%-+10.2f, -12.345");
	equal("+12.3450  ", sprintf("%-+10.4f", 12.345), "%-+10.4f, 12.345");
	equal("-12.3450  ", sprintf("%-+10.4f", -12.345), "%-+10.4f, -12.345");
});
