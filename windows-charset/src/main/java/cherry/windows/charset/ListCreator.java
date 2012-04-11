/*
 *   Copyright 2011 Norio Agawa
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

package cherry.windows.charset;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

public class ListCreator {

	public static void main(String[] args) throws Exception {
		(new ListCreator()).outputList();
	}

	public void outputList() throws IOException {

		Charset ms932 = Charset.forName("MS932");
		Charset cp943 = Charset.forName("CP943");
		Charset win31j = Charset.forName("Windows-31J");

		System.out.println("WIN\tMS932\tCP943\tWin31J\tCOMMENT");

		List<Entry> list = readDef();
		for (Entry entry : list) {

			System.out.print(entry.getWinCode());
			System.out.print("\t");

			BigInteger winCode = new BigInteger(entry.getWinCode(), 16);

			BigInteger bi932 = new BigInteger((new String(
					winCode.toByteArray(), ms932)).getBytes(ms932));
			System.out.print(winCode.equals(bi932));
			System.out.print("\t");

			BigInteger bi943 = new BigInteger((new String(
					winCode.toByteArray(), cp943)).getBytes(cp943));
			System.out.print(winCode.equals(bi943));
			System.out.print("\t");

			BigInteger bi31j = new BigInteger((new String(
					winCode.toByteArray(), win31j)).getBytes(win31j));
			System.out.print(winCode.equals(bi31j));
			System.out.print("\t");

			System.out.print(entry.getComment());
			System.out.println();
		}
	}

	public List<Entry> readDef() throws IOException {
		InputStream in = getClass().getClassLoader().getResourceAsStream(
				"CP932.TXT");
		Reader reader = new InputStreamReader(in);
		try {
			return parse(reader);
		} finally {
			reader.close();
		}
	}

	public List<Entry> parse(Reader reader) throws IOException {

		List<Entry> list = new ArrayList<ListCreator.Entry>();

		BufferedReader br = new BufferedReader(reader);
		String line;
		while ((line = br.readLine()) != null) {

			String[] token = line.split("\t");
			if (token.length < 2) {
				continue;
			}

			if (!token[0].matches("0x[0-9A-F]{2,4}")) {
				continue;
			}

			if (!token[1].matches("0x[0-9A-F]{2,4}")) {
				continue;
			}

			Entry entry = new Entry();
			entry.setWinCode(token[0].substring(2));
			entry.setUniCode(token[1].substring(2));
			if (token.length >= 3) {
				entry.setComment(token[2]);
			}
			list.add(entry);
		}

		return list;
	}

	static class Entry {

		private String winCode;

		private String uniCode;

		private String comment;

		public String getWinCode() {
			return winCode;
		}

		public void setWinCode(String winCode) {
			this.winCode = winCode;
		}

		public String getUniCode() {
			return uniCode;
		}

		public void setUniCode(String uniCode) {
			this.uniCode = uniCode;
		}

		public String getComment() {
			return comment;
		}

		public void setComment(String comment) {
			this.comment = comment;
		}
	}

}
