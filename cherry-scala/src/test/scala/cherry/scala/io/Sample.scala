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

import scala.io.Source

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
    val parser: CsvParser = new CsvParser(Source.fromFile(args(0)))
    try {
      readLoop(parser)
    } finally {
      parser.close()
    }
  }

  /**
   * レコード読込みの本体
   */
  def readLoop(parser: CsvParser) {
    parser.read() match {
      case Right(Some(record)) =>
        print("<R>")
        for (field <- record) {
          print("<F>")
          print(field)
          print("</F>")
        }
        print("</R>")
        readLoop(parser)
      case Right(None) => Unit
      case Left(err) => println("error: " + err)
    }
  }

}
