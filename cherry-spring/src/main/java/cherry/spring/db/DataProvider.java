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
import java.util.Map;

/**
 * データ取込み機能におけるデータ取得元.
 */
public interface DataProvider {

	/**
	 * 次のデータが存在するか判定する.
	 *
	 * @return 次のデータが存在するか否か
	 * @throws IOException
	 *             データの取得でエラー
	 */
	boolean hasNext() throws IOException;

	/**
	 * データを取得する.
	 *
	 * @return 取得したデータ
	 * @throws IOException
	 *             データの取得でエラー
	 */
	Map<String, ?> nextData() throws IOException;

}
