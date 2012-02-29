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

package cherry.spring.db;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import cherry.util.io.CsvCreator;

/**
 * データ抽出機能でCSVファイルをデータ格納先とする.
 */
public class CsvDataConsumer implements DataConsumer {

	/** CSVデータ生成機能. */
	private CsvCreator creator;

	/** ヘッダを出力するか否か. */
	private boolean withHeader;

	/**
	 * CSVデータ格納機能を生成する.
	 *
	 * @param writer
	 *            データ書込み先
	 * @param withHeader
	 *            ヘッダを出力するか否か
	 */
	public CsvDataConsumer(Writer writer, boolean withHeader) {
		this(writer, "\n", withHeader);
	}

	/**
	 * CSVデータ格納機能を生成する.
	 *
	 * @param writer
	 *            データ書込み先
	 * @param recordSeparator
	 *            レコードセパレータ
	 * @param withHeader
	 *            ヘッダを出力するか否か
	 */
	public CsvDataConsumer(Writer writer, String recordSeparator,
			boolean withHeader) {
		this.creator = new CsvCreator(writer, recordSeparator);
		this.withHeader = withHeader;
	}

	/**
	 * データの格納を開始する.
	 *
	 * @param col
	 *            カラムの情報
	 * @throws IOException
	 *             データ格納エラー
	 */
	@Override
	public void begin(Column[] col) throws IOException {

		if (!withHeader) {
			return;
		}

		List<String> list = new ArrayList<String>(col.length);
		for (Column c : col) {
			list.add(c.getLabel());
		}

		creator.write(list);
	}

	/**
	 * 1レコードのデータを格納する.
	 *
	 * @param record
	 *            1レコードのデータ
	 * @throws IOException
	 *             データ格納エラー
	 */
	@Override
	public void consume(Object[] record) throws IOException {

		List<String> list = new ArrayList<String>(record.length);
		for (Object field : record) {
			if (field == null) {
				list.add(null);
			} else {
				list.add(field.toString());
			}
		}

		creator.write(list);
	}

	/**
	 * データの格納を終了する.
	 *
	 * @throws IOException
	 *             データ格納エラー
	 */
	@Override
	public void end() throws IOException {
		creator.close();
	}

}
