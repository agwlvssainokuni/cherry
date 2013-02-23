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

import java.io.Reader

import scala.collection.mutable.ArrayBuffer

/**
 * CSVパーサ.<br>
 * CSV形式データを解析して、レコード (文字列のリスト) 単位で取得する。サポートするCSV形式は RFC 4180
 * (http://www.ietf.org/rfc/rfc4180.txt) を基本とする。ただし、下記の点が RFC 4180 と異なる (RFC
 * 4180 の上位互換)。
 * <ul>
 * <li>文字データ (TEXTDATA) の範囲はUnicode (Javaが文字として扱うもの) とする。(RFC 4180
 * はASCIIの範囲に限定している)</li>
 * <li>引用無しフィールド (non-escaped) は、データ内に引用符 (DQUOTE)
 * を含んでもエラーとしない。引用符も文字データの1文字と同じように扱う。</li>
 * <li>LF, CRLF, CRCRLF, ... を一つの改行として扱う。(RFC 4180 はCRLFを改行とする)</li>
 * <li>データの最後 (end of file) はLFが無くてもエラーとはしない。(引用データ (escaped) 中を除く)</li>
 * </ul>
 */
class CsvParser(reader: Reader) {

  /**
   * CSVレコード読取り.<br>
   * データ読取り元からCSVデータを1レコード読取る。
   *
   * @return CSVデータの1レコード。
   * @throws CsvException
   *             CSV形式不正。
   */
  def read(): Either[String, Option[Array[String]]] =
    read_main(RECORD_BEGIN, new StringBuilder, new ArrayBuffer[String])

  /**
   * CSVレコード読取りの処理本体.
   */
  private def read_main(state: State,
    field: StringBuilder,
    record: ArrayBuffer[String]): Either[String, Option[Array[String]]] = {
    state match {
      case RECORD_END =>
        Right(if (record.isEmpty) None else Some(record.toArray[String]))
      case _ =>
        val ch = reader.read()
        state(ch) match {
          case (Action.NONE, Some(nextState: State)) =>
            read_main(nextState,
              field,
              record)
          case (Action.APPEND, Some(nextState: State)) =>
            read_main(nextState,
              field + ch.toChar,
              record)
          case (Action.FLUSH, Some(nextState: State)) =>
            read_main(nextState,
              new StringBuilder,
              record += field.toString)
          case (_, _) =>
            Left("Invalid CSV format")
        }
    }
  }

  /**
   * データ読取り元をクローズする.<br>
   */
  def close() = reader.close()

  /**
   * 状態遷移機械における「状態」を表す。
   */
  private type State = Int => Tuple2[Action.Value, Option[_]]

  /**
   * 状態遷移機械における「アクション」を表す。
   */
  private object Action extends Enumeration {
    val NONE, APPEND, FLUSH, ERROR = Value
  }

  /** 状態: RECORD_BEGIN */
  private val RECORD_BEGIN: State =
    (ch: Int) => ch match {
      case ',' => (Action.FLUSH, Some(FIELD_BEGIN))
      case '"' => (Action.NONE, Some(ESCAPED))
      case '\r' => (Action.FLUSH, Some(CR))
      case '\n' => (Action.FLUSH, Some(RECORD_END))
      case -1 => (Action.NONE, Some(RECORD_END))
      case _ => (Action.APPEND, Some(NONESCAPED))
    }

  /** 状態: FIELD_BEGIN */
  private val FIELD_BEGIN: State =
    (ch: Int) => ch match {
      case ',' => (Action.FLUSH, Some(FIELD_BEGIN))
      case '"' => (Action.NONE, Some(ESCAPED))
      case '\r' => (Action.FLUSH, Some(CR))
      case '\n' => (Action.FLUSH, Some(RECORD_END))
      case -1 => (Action.FLUSH, Some(RECORD_END))
      case _ => (Action.APPEND, Some(NONESCAPED))
    }

  /** 状態: NONESCAPED */
  private val NONESCAPED: State =
    (ch: Int) => ch match {
      case ',' => (Action.FLUSH, Some(FIELD_BEGIN))
      case '"' => (Action.APPEND, Some(NONESCAPED))
      case '\r' => (Action.FLUSH, Some(CR))
      case '\n' => (Action.FLUSH, Some(RECORD_END))
      case -1 => (Action.FLUSH, Some(RECORD_END))
      case _ => (Action.APPEND, Some(NONESCAPED))
    }

  /** 状態: ESCAPED */
  private val ESCAPED: State =
    (ch: Int) => ch match {
      case ',' => (Action.APPEND, Some(ESCAPED))
      case '"' => (Action.NONE, Some(DQUOTE))
      case '\r' => (Action.APPEND, Some(ESCAPED))
      case '\n' => (Action.APPEND, Some(ESCAPED))
      case -1 => (Action.ERROR, None)
      case _ => (Action.APPEND, Some(ESCAPED))
    }

  /** 状態: DQUOTE */
  private val DQUOTE: State =
    (ch: Int) => ch match {
      case ',' => (Action.FLUSH, Some(FIELD_BEGIN))
      case '"' => (Action.APPEND, Some(ESCAPED))
      case '\r' => (Action.FLUSH, Some(CR))
      case '\n' => (Action.FLUSH, Some(RECORD_END))
      case -1 => (Action.FLUSH, Some(RECORD_END))
      case _ => (Action.ERROR, None)
    }

  /** 状態: CR */
  private val CR: State =
    (ch: Int) => ch match {
      case ',' => (Action.ERROR, None)
      case '"' => (Action.ERROR, None)
      case '\r' => (Action.NONE, Some(CR))
      case '\n' => (Action.NONE, Some(RECORD_END))
      case -1 => (Action.NONE, Some(RECORD_END))
      case _ => (Action.ERROR, None)
    }

  /** 状態: RECORD_END */
  private val RECORD_END: State =
    (ch: Int) => (Action.NONE, None)

}
