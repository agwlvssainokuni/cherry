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
	equal(sprintf("%s", "ABCDE"), "ABCDE", "%s, ABCDE");
	equal(sprintf("%10s", "ABCDE"), "     ABCDE", "%10s, ABCDE");
	equal(sprintf("%10.3s", "ABCDE"), "       ABC", "%10.3s, ABCDE");
	equal(sprintf("%10.7s", "ABCDE"), "     ABCDE", "%10.7s, ABCDE");
	equal(sprintf("%010s", "ABCDE"), "00000ABCDE", "%010s, ABCDE");
	equal(sprintf("%010.3s", "ABCDE"), "0000000ABC", "%010.3s, ABCDE");
	equal(sprintf("%010.7s", "ABCDE"), "00000ABCDE", "%010.7s, ABCDE");
	equal(sprintf("%-10s", "ABCDE"), "ABCDE     ", "%-10s, ABCDE");
	equal(sprintf("%-10.3s", "ABCDE"), "ABC       ", "%-10.3s, ABCDE");
	equal(sprintf("%-10.7s", "ABCDE"), "ABCDE     ", "%-10.7s, ABCDE");
});

test("sprintf - %d", function() {

	equal(sprintf("%d", 12345), "12345", "%d, 12345");
	equal(sprintf("%d", -12345), "-12345", "%d, -12345");

	equal(sprintf("%10d", 12345), "     12345", "%10d, 12345");
	equal(sprintf("%10d", -12345), "    -12345", "%10d, -12345");

	equal(sprintf("%010d", 12345), "0000012345", "%010d, 12345");
	equal(sprintf("%010d", -12345), "-000012345", "%010d, -12345");

	equal(sprintf("% 010d", 12345), " 000012345", "% 010d, 12345");
	equal(sprintf("% 010d", -12345), "-000012345", "% 010d, -12345");

	equal(sprintf("%+10d", 12345), "    +12345", "%+10d, 12345");
	equal(sprintf("%+10d", -12345), "    -12345", "%+10d, -12345");

	equal(sprintf("%+010d", 12345), "+000012345", "%+010d, 12345");
	equal(sprintf("%+010d", -12345), "-000012345", "%+010d, -12345");

	equal(sprintf("%-10d", 12345), "12345     ", "%-10d, 12345");
	equal(sprintf("%-10d", -12345), "-12345    ", "%-10d, -12345");

	equal(sprintf("%- 10d", 12345), " 12345    ", "%- 10d, 12345");
	equal(sprintf("%- 10d", -12345), "-12345    ", "%- 10d, -12345");

	equal(sprintf("%-+10d", 12345), "+12345    ", "%-+10d, 12345");
	equal(sprintf("%-+10d", -12345), "-12345    ", "%-+10d, -12345");

	equal(sprintf("%10.3d", 12345), "     12345", "%10.3d, 12345");
	equal(sprintf("%10.3d", -12345), "    -12345", "%10.3d, -12345");

	equal(sprintf("%10.7d", 12345), "   0012345", "%10.7d, 12345");
	equal(sprintf("%10.7d", -12345), "  -0012345", "%10.7d, -12345");

	equal(sprintf("%-10.7d", 12345), "0012345   ", "%-10.7d, 12345");
	equal(sprintf("%-10.7d", -12345), "-0012345  ", "%-10.7d, -12345");
});

test("sprintf - %f", function() {

	equal(sprintf("%.2f", 12.345), "12.34", "%.2f, 12.345");
	equal(sprintf("%.2f", -12.345), "-12.34", "%.2f, -12.345");
	equal(sprintf("%.4f", 12.345), "12.3450", "%.4f, 12.345");
	equal(sprintf("%.4f", -12.345), "-12.3450", "%.4f, -12.345");

	equal(sprintf("%10.2f", 12.345), "     12.34", "%10.2f, 12.345");
	equal(sprintf("%10.2f", -12.345), "    -12.34", "%10.2f, -12.345");
	equal(sprintf("%10.4f", 12.345), "   12.3450", "%10.4f, 12.345");
	equal(sprintf("%10.4f", -12.345), "  -12.3450", "%10.4f, -12.345");

	equal(sprintf("%010.2f", 12.345), "0000012.34", "%010.2f, 12.345");
	equal(sprintf("%010.2f", -12.345), "-000012.34", "%010.2f, -12.345");
	equal(sprintf("%010.4f", 12.345), "00012.3450", "%010.4f, 12.345");
	equal(sprintf("%010.4f", -12.345), "-0012.3450", "%010.4f, -12.345");

	equal(sprintf("% 010.2f", 12.345), " 000012.34", "% 010.2f, 12.345");
	equal(sprintf("% 010.2f", -12.345), "-000012.34", "% 010.2f, -12.345");
	equal(sprintf("% 010.4f", 12.345), " 0012.3450", "% 010.4f, 12.345");
	equal(sprintf("% 010.4f", -12.345), "-0012.3450", "% 010.4f, -12.345");

	equal(sprintf("%+10.2f", 12.345), "    +12.34", "%+10.2f, 12.345");
	equal(sprintf("%+10.2f", -12.345), "    -12.34", "%+10.2f, -12.345");

	equal(sprintf("%+010.2f", 12.345), "+000012.34", "%+010.2f, 12.345");
	equal(sprintf("%+010.2f", -12.345), "-000012.34", "%+010.2f, -12.345");
	equal(sprintf("%+010.4f", 12.345), "+0012.3450", "%+010.4f, 12.345");
	equal(sprintf("%+010.4f", -12.345), "-0012.3450", "%+010.4f, -12.345");

	equal(sprintf("%-10.2f", 12.345), "12.34     ", "%-10.2f, 12.345");
	equal(sprintf("%-10.2f", -12.345), "-12.34    ", "%-10.2f, -12.345");
	equal(sprintf("%-10.4f", 12.345), "12.3450   ", "%-10.4f, 12.345");
	equal(sprintf("%-10.4f", -12.345), "-12.3450  ", "%-10.4f, -12.345");

	equal(sprintf("%- 10.2f", 12.345), " 12.34    ", "%- 10.2f, 12.345");
	equal(sprintf("%- 10.2f", -12.345), "-12.34    ", "%- 10.2f, -12.345");
	equal(sprintf("%- 10.4f", 12.345), " 12.3450  ", "%- 10.4f, 12.345");
	equal(sprintf("%- 10.4f", -12.345), "-12.3450  ", "%- 10.4f, -12.345");

	equal(sprintf("%-+10.2f", 12.345), "+12.34    ", "%-+10.2f, 12.345");
	equal(sprintf("%-+10.2f", -12.345), "-12.34    ", "%-+10.2f, -12.345");
	equal(sprintf("%-+10.4f", 12.345), "+12.3450  ", "%-+10.4f, 12.345");
	equal(sprintf("%-+10.4f", -12.345), "-12.3450  ", "%-+10.4f, -12.345");
});
