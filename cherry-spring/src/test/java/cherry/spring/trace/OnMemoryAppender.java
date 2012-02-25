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

package cherry.spring.trace;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.AppenderSkeleton;
import org.apache.log4j.spi.LoggingEvent;

/**
 * テスト用ログイベント蓄積機能.
 */
public class OnMemoryAppender extends AppenderSkeleton {

	/** 蓄積したログイベント. */
	private static List<LoggingEvent> loggingEvent = null;

	/**
	 * 蓄積を開始する.
	 */
	public static void begin() {
		loggingEvent = new ArrayList<LoggingEvent>();
	}

	/**
	 * 蓄積を終了する.
	 */
	public static void end() {
		loggingEvent = null;
	}

	/**
	 * 蓄積したログイベントを取得する.
	 *
	 * @return 蓄積したログイベント
	 */
	public static List<LoggingEvent> getEvents() {
		return loggingEvent;
	}

	/**
	 * ログ出力を終了する.
	 */
	@Override
	public void close() {
	}

	/**
	 * レイアウトが必要か指定する.
	 *
	 * @return false固定
	 */
	@Override
	public boolean requiresLayout() {
		return false;
	}

	/**
	 * ログイベントを蓄積する.
	 *
	 * @param event
	 *            ログイベント
	 */
	@Override
	protected void append(LoggingEvent event) {
		if (loggingEvent != null) {
			loggingEvent.add(event);
		}
	}

}
