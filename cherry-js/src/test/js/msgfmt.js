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

test("msgfmt - index", function() {

	equal(msgfmt("NONE", []), "NONE", "NONE; []");

	equal(msgfmt("{0}", [ "A", "B", "C" ]), "A", "{0}, [ A, B, C ]");
	equal(msgfmt("{1}", [ "A", "B", "C" ]), "B", "{1}, [ A, B, C ]");
	equal(msgfmt("{2}", [ "A", "B", "C" ]), "C", "{2}, [ A, B, C ]");

	equal(msgfmt("{0} {1} {2}", [ "A", "B", "C" ]), "A B C",
			"{0} {1} {2}, [ A, B, C ]");
	equal(msgfmt("{1} {2} {0}", [ "A", "B", "C" ]), "B C A",
			"{1} {2} {0}, [ A, B, C ]");
	equal(msgfmt("{2} {0} {1}", [ "A", "B", "C" ]), "C A B",
			"{2} {0} {1}, [ A, B, C ]");

	equal(msgfmt("{0} {1} {2}", [ "A", "B" ]), "A B ",
			"{0} {1} {2}, [ A, B ]");
	equal(msgfmt("{1} {2} {0}", [ "A", "B" ]), "B  A",
			"{1} {2} {0}, [ A, B ]");
	equal(msgfmt("{2} {0} {1}", [ "A", "B" ]), " A B",
			"{2} {0} {1}, [ A, B ]");
});

test("msgfmt - name", function() {

	equal(msgfmt("NONE", {}), "NONE", "NONE; {}");

	equal(msgfmt("${aa}", {
		aa : "AA",
		bb : "BB",
		cc : "CC"
	}), "AA", "${aa}; {aa:AA,bb:BB,cc:CC}");
	equal(msgfmt("${bb}", {
		aa : "AA",
		bb : "BB",
		cc : "CC"
	}), "BB", "${bb}; {aa:AA,bb:BB,cc:CC}");
	equal(msgfmt("${cc}", {
		aa : "AA",
		bb : "BB",
		cc : "CC"
	}), "CC", "${cc}; {aa:AA,bb:BB,cc:CC}");

	equal(msgfmt("${aa} ${bb} ${cc}", {
		aa : "AA",
		bb : "BB",
		cc : "CC"
	}), "AA BB CC", "${aa} ${bb} ${cc}; {aa:AA,bb:BB,cc:CC}");
	equal(msgfmt("${bb} ${cc} ${aa}", {
		aa : "AA",
		bb : "BB",
		cc : "CC"
	}), "BB CC AA", "${bb} ${cc} ${aa}; {aa:AA,bb:BB,cc:CC}");
	equal(msgfmt("${cc} ${aa} ${bb}", {
		aa : "AA",
		bb : "BB",
		cc : "CC"
	}), "CC AA BB", "${cc} ${aa} ${bb}; {aa:AA,bb:BB,cc:CC}");

	equal(msgfmt("${aa} ${bb} ${cc}", {
		aa : "AA",
		bb : "BB"
	}), "AA BB ", "${aa} ${bb} ${cc}; {aa:AA,bb:BB}");
	equal(msgfmt("${bb} ${cc} ${aa}", {
		aa : "AA",
		bb : "BB"
	}), "BB  AA", "${bb} ${cc} ${aa}; {aa:AA,bb:BB}");
	equal(msgfmt("${cc} ${aa} ${bb}", {
		aa : "AA",
		bb : "BB"
	}), " AA BB", "${cc} ${aa} ${bb}; {aa:AA,bb:BB}");
});
