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

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.dao.DataAccessException;
import org.springframework.transaction.annotation.Transactional;

/**
 * データ取込み機能.
 */
public interface DataLoader {

	/**
	 * データを取込む.
	 *
	 * @param provider
	 *            データの取得元
	 * @return 取込みの結果
	 * @throws IOException
	 *             データ取得でエラー
	 */
	@Transactional(rollbackFor = { DataAccessException.class, IOException.class })
	Result load(DataProvider provider) throws IOException;

	/**
	 * データ取込みの結果を保持する.
	 */
	public static class Result {

		/** 読込んだデータの件数. */
		private int totalCount;

		/** 取込みに成功したデータの件数. */
		private int successCount;

		/** 取込みに失敗したデータの件数. */
		private int failedCount;

		/**
		 * 読込んだデータの件数 を取得する.
		 *
		 * @return 読込んだデータの件数
		 */
		public int getTotalCount() {
			return totalCount;
		}

		/**
		 * 読込んだデータの件数 を設定する.
		 *
		 * @param totalCount
		 *            読込んだデータの件数
		 */
		public void setTotalCount(int totalCount) {
			this.totalCount = totalCount;
		}

		/**
		 * 取込みに成功したデータの件数 を取得する.
		 *
		 * @return 取込みに成功したデータの件数
		 */
		public int getSuccessCount() {
			return successCount;
		}

		/**
		 * 取込みに成功したデータの件数 を設定する.
		 *
		 * @param successCount
		 *            取込みに成功したデータの件数
		 */
		public void setSuccessCount(int successCount) {
			this.successCount = successCount;
		}

		/**
		 * 取込みに失敗したデータの件数 を取得する.
		 *
		 * @return 取込みに失敗したデータの件数
		 */
		public int getFailedCount() {
			return failedCount;
		}

		/**
		 * 取込みに失敗したデータの件数 を設定する.
		 *
		 * @param failedCount
		 *            取込みに失敗したデータの件数
		 */
		public void setFailedCount(int failedCount) {
			this.failedCount = failedCount;
		}

		/**
		 * 文字列表現を取得する.
		 *
		 * @return 文字列表現
		 */
		@Override
		public String toString() {
			return ToStringBuilder.reflectionToString(this,
					ToStringStyle.SHORT_PREFIX_STYLE);
		}
	}

}