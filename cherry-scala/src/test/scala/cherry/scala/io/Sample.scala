/*
 * Copyright 2012 agwlvssainokuni
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package cherry.scala.io

import java.io._

/**
 * CSVパーサコマンドライン実行サンプル.
 */
object Sample {

  /**
   * CSVパーサコマンドライン実行サンプル.
   *
   * @param args
   *            コマンドライン引数
   */
  def main(args: Array[String]) {
    val parser: CsvParser = new CsvParser(new BufferedReader(new FileReader(args(0))))
    try {
      read_loop(parser)
    } catch {
      case ex: CsvParser => println("error: " + ex.getMessage)
    } finally {
      parser.close()
    }
  }

  /**
   * レコード読込みの本体
   */
  def read_loop(parser: CsvParser) {
    val record: Array[String] = parser.read();
    if (record != null) {
      print("<R>")
      for (field <- record) {
        print("<F>")
        print(field)
        print("</F>")
      }
      print("</R>")
      read_loop(parser)
    }
  }

}
