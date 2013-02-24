/*
 *   Copyright 2012 agwlvssainokuni
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

package cherry.scala.io

import java.io.StringReader
import org.scalatest.FunSuite
import scala.io.Source

/**
 * {@link CsvParser}の試験.
 */
class CsvParserTest extends FunSuite {

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE001</dd>
   * <dt>テスト内容</dt>
   * <dd>
   * 空文字列 ("") を解析する。</dd>
   * </dl>
   */
  run_parser("CASE001", "") { parser =>
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE002</dd>
   * <dt>テスト内容</dt>
   * <dd>
   * 改行のみ ([LF]) を解析する。</dd>
   * </dl>
   */
  run_parser("CASE002", "\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array(""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE003</dd>
   * <dt>テスト内容</dt>
   * <dd>
   * 改行のみ ([CR][LF]) を解析する。</dd>
   * </dl>
   */
  run_parser("CASE003", "\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array(""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE004</dd>
   * <dt>テスト内容</dt>
   * <dd>
   * 改行のみ ([CR]) を解析する。</dd>
   * </dl>
   */
  run_parser("CASE004", "\r") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array(""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE005</dd>
   * <dt>テスト内容</dt>
   * <dd>
   * 改行のみ ([CR][CR]) を解析する。</dd>
   * </dl>
   */
  run_parser("CASE005", "\r\r") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array(""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE006</dd>
   * <dt>テスト内容</dt>
   * <dd>
   * 改行のみ ([CR][CR][LF]) を解析する。</dd>
   * </dl>
   */
  run_parser("CASE006", "\r\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array(""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE007</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * ,
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE007", ",") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("", ""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE008</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * ,[LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE008", ",\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("", ""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE009</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * ,[CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE009", ",\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("", ""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE010</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * ,[CR]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE010", ",\r") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("", ""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE011</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * ,[CR][CR]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE011", ",\r\r") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("", ""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE012</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * ,[CR][CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE012", ",\r\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("", ""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE013</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * ,,[CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE013", ",,\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("", "", ""))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE014</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * [CR],
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE014", "\r,") { parser =>
    parser.read() match {
      case Left(_) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE015</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * [CR]"
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE015", "\r\"") { parser =>
    parser.read() match {
      case Left(_) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE016</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * [CR]a
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE016", "\ra") { parser =>
    parser.read() match {
      case Left(_) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE100</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * aa,bb
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE100", "aa,bb") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE101</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * aa,bb[CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE101", "aa,bb\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE102</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * aa,bb[LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE102", "aa,bb\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE103</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * aa,bb[CR][LF]
   * cc,dd
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE103", "aa,bb\r\ncc,dd") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("cc", "dd"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE104</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * aa,bb[CR][LF]
   * cc,dd[CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE104", "aa,bb\r\ncc,dd\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("cc", "dd"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE105</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * a"a,b""b[CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE105", "a\"a,b\"\"b\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("a\"a", "b\"\"b"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE200</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * "aa","bb"
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE200", "\"aa\",\"bb\"") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE201</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * "aa","bb"[CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE201", "\"aa\",\"bb\"\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE202</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * "aa","bb"[LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE202", "\"aa\",\"bb\"\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE203</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * "aa","bb"[CR][LF]
   * "cc","dd"
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE203", "\"aa\",\"bb\"\r\ncc,dd") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("cc", "dd"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE204</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * "aa","bb"[CR][LF]
   * "cc","dd"[CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE204", "\"aa\",\"bb\"\r\ncc,dd\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("aa", "bb"))
      case _ => fail()
    }
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("cc", "dd"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE205</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * "a""a","b,b"[CR][LF]
   * "c[CR]c","d[LF]d"[CR][LF]
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE205", "\"a\"\"a\",\"b,b\"\r\n\"c\rc\",\"d\nd\"\r\n") { parser =>
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("a\"a", "b,b"))
      case _ => fail()
    }
    parser.read() match {
      case Right(Some(record)) =>
        assert(record === Array("c\rc", "d\nd"))
      case _ => fail()
    }
    parser.read() match {
      case Right(None) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE206</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * "a"a"
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE206", "\"a\"a\"") { parser =>
    parser.read() match {
      case Left(_) => Unit
      case _ => fail()
    }
  }

  /**
   * <dl>
   * <dt>テストID</dt>
   * <dd>CASE207</dd>
   * <dt>テスト内容</dt>
   * <dd>
   *
   * <pre>
   * "a
   * </pre>
   *
   * </dd>
   * </dl>
   */
  run_parser("CASE207", "\"a") { parser =>
    parser.read() match {
      case Left(_) => Unit
      case _ => fail()
    }
  }

  def run_parser(name: String, data: String)(ptest: (CsvParser) => Unit) {
    test(name) {
      val parser = new CsvParser(Source.fromString(data))
      try {
        ptest(parser)
      } finally {
        parser.close()
      }
    }
  }

}
