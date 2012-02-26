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
import java.io.Reader;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.transaction.annotation.Transactional;

/**
 * SQL実行機能.
 */
public interface SqlExecutor {

	/**
	 * SQLを実行する.
	 *
	 * @param reader
	 *            SQL文の読込み元
	 * @param paramMap
	 *            SQLに受渡すパラメタ
	 * @param continueOnError
	 *            SQL実行エラーで継続するか否か
	 * @throws IOException
	 *             SQL文の読込みでエラー
	 */
	@Transactional(rollbackFor = { DataAccessException.class, IOException.class })
	void execute(Reader reader, Map<String, ?> paramMap, boolean continueOnError)
			throws IOException;

}