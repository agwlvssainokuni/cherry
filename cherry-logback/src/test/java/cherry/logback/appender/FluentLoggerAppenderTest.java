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

package cherry.logback.appender;

import static org.junit.Assert.fail;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

/**
 * {@link FluentLoggerAppender}のテスト.
 */
public class FluentLoggerAppenderTest {

	/** ログ出力. */
	private Logger log = LoggerFactory.getLogger(getClass());

	/**
	 * テストの前処理.<br>
	 * MDCに値を格納する。
	 */
	@Before
	public void setUp() {
		for (int i = 0; i < 5; i++) {
			MDC.put("KEY." + i, "VALUE" + i);
		}
	}

	/**
	 * テストの後処理.<br>
	 * MDCの値を消去する。
	 */
	@After
	public void tearDown() {
		MDC.clear();
	}

	/**
	 * 通常ログ出力.
	 */
	@Test
	public void testNormal() {
		try {
			log.info("通常メッセージ: {}, {}, {}, {}, {}", 1, 2, 3, 4, 5);
		} catch (Exception ex) {
			ex.printStackTrace();
			fail("例外が発生してはならない");
		}
	}

	/**
	 * {@link Throwable}ありログ出力.
	 */
	@Test
	public void testThrowable() {
		try {
			log.error("エラーメッセージ", new Throwable("例外メッセージ"));
		} catch (Exception ex) {
			ex.printStackTrace();
			fail("例外が発生してはならない");
		}
	}

	/**
	 * {@link Throwable}のネストありログ出力.
	 */
	@Test
	public void testNestedThrowable() {
		try {
			Throwable cause = new Throwable("元の例外");
			log.error("エラーメッセージ", new Throwable("例外メッセージ", cause));
		} catch (Exception ex) {
			ex.printStackTrace();
			fail("例外が発生してはならない");
		}
	}

	/**
	 * {@link Throwable}のネストありログ出力 (二段ネスト).
	 */
	@Test
	public void testNestedNestedThrowable() {
		try {
			Throwable causeOfCause = new Throwable("元の元の例外");
			Throwable cause = new Throwable("元の例外", causeOfCause);
			log.error("エラーメッセージ", new Throwable("例外メッセージ", cause));
		} catch (Exception ex) {
			ex.printStackTrace();
			fail("例外が発生してはならない");
		}
	}

	/**
	 * 100回繰り返し.
	 */
	@Test
	public void testPerf100() {
		perf(100L);
	}

	/**
	 * 1,000回繰り返し.
	 */
	@Test
	public void testPerf1000() {
		perf(1000L);
	}

	/**
	 * 10,000回繰り返し.
	 */
	@Test
	public void testPerf10000() {
		perf(10000L);
	}

	/**
	 * 100,000回繰り返し.
	 */
	@Test
	public void testPerf100000() {
		perf(100000L);
	}

	/**
	 * 1,000,000回繰り返し.
	 */
	@Test
	public void testPerf1000000() {
		perf(1000000L);
	}

	/**
	 * 処理性能測定.
	 *
	 * @param count
	 *            繰り返し回数
	 */
	private void perf(long count) {
		long before = System.currentTimeMillis();
		for (long i = 0; i < count; i++) {
			log.debug("デバッグ: {},{},{},{},{}", i, i + 1, i + 2, i + 3, i + 4);
		}
		long after = System.currentTimeMillis();
		log.info("PERF: 件数: {}, 処理時間: {}, 件数/秒: {}", count, (after - before),
				(count * 1000) / (after - before));
	}

}
