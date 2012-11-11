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
  @throws(classOf[CsvException])
  def read(): Array[String] =
    read_main(RECORD_BEGIN, new StringBuilder, new ArrayBuffer[String])

  /**
   * CSVレコード読取りの処理本体.
   */
  private def read_main(state: State,
    field: StringBuilder,
    record: ArrayBuffer[String]): Array[String] =
    if (state == RECORD_END) {
      if (record.isEmpty) null else record.toArray[String]
    } else {
      val ch = reader.read()
      val trans = state(ch)
      trans.action match {
        case 'APPEND => read_main(trans.state,
          field + ch.toChar,
          record)
        case 'FLUSH => read_main(trans.state,
          new StringBuilder,
          record + field.toString)
        case 'NONE => read_main(trans.state,
          field,
          record)
        case 'ERROR => throw new CsvException("Invalid CSV format")
        case _ => read_main(trans.state,
          field,
          record)
      }
    }

  /**
   * データ読取り元をクローズする.<br>
   */
  def close() = reader.close()

  /**
   * 状態遷移機械における「状態」を表す。
   */
  private type State = Int => Trans

  /**
   * 状態繊維機械においてイベント (文字入力) に対する応答 (「アクション」と遷移先の「状態」) を表す。
   */
  private class Trans(val action: Symbol, val state: State)
  private object Trans {
    def apply(action: Symbol, state: State) = new Trans(action, state)
  }

  /** 状態: RECORD_BEGIN */
  private val RECORD_BEGIN: State =
    (ch: Int) => ch match {
      case ',' => Trans('FLUSH, FIELD_BEGIN)
      case '"' => Trans('NONE, ESCAPED)
      case '\r' => Trans('FLUSH, CR)
      case '\n' => Trans('FLUSH, RECORD_END)
      case -1 => Trans('NONE, RECORD_END)
      case _ => Trans('APPEND, NONESCAPED)
    }

  /** 状態: FIELD_BEGIN */
  private val FIELD_BEGIN: State =
    (ch: Int) => ch match {
      case ',' => Trans('FLUSH, FIELD_BEGIN)
      case '"' => Trans('NONE, ESCAPED)
      case '\r' => Trans('FLUSH, CR)
      case '\n' => Trans('FLUSH, RECORD_END)
      case -1 => Trans('FLUSH, RECORD_END)
      case _ => Trans('APPEND, NONESCAPED)
    }

  /** 状態: NONESCAPED */
  private val NONESCAPED: State =
    (ch: Int) => ch match {
      case ',' => Trans('FLUSH, FIELD_BEGIN)
      case '"' => Trans('APPEND, NONESCAPED)
      case '\r' => Trans('FLUSH, CR)
      case '\n' => Trans('FLUSH, RECORD_END)
      case -1 => Trans('FLUSH, RECORD_END)
      case _ => Trans('APPEND, NONESCAPED)
    }

  /** 状態: ESCAPED */
  private val ESCAPED: State =
    (ch: Int) => ch match {
      case ',' => Trans('APPEND, ESCAPED)
      case '"' => Trans('NONE, DQUOTE)
      case '\r' => Trans('APPEND, ESCAPED)
      case '\n' => Trans('APPEND, ESCAPED)
      case -1 => Trans('ERROR, null)
      case _ => Trans('APPEND, ESCAPED)
    }

  /** 状態: DQUOTE */
  private val DQUOTE: State =
    (ch: Int) => ch match {
      case ',' => Trans('FLUSH, FIELD_BEGIN)
      case '"' => Trans('APPEND, ESCAPED)
      case '\r' => Trans('FLUSH, CR)
      case '\n' => Trans('FLUSH, RECORD_END)
      case -1 => Trans('FLUSH, RECORD_END)
      case _ => Trans('ERROR, null)
    }

  /** 状態: CR */
  private val CR: State =
    (ch: Int) => ch match {
      case ',' => Trans('ERROR, null)
      case '"' => Trans('ERROR, null)
      case '\r' => Trans('NONE, CR)
      case '\n' => Trans('NONE, RECORD_END)
      case -1 => Trans('NONE, RECORD_END)
      case _ => Trans('ERROR, null)
    }

  /** 状態: RECORD_END */
  private val RECORD_END: State =
    (ch: Int) => null

}