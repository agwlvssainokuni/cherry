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
    readMain(RecordBeginState, new StringBuilder, new ArrayBuffer[String])

  /**
   * CSVレコード読取りの処理本体.
   */
  private def readMain(curState: State,
    field: StringBuilder,
    record: ArrayBuffer[String]): Either[String, Option[Array[String]]] = {
    curState match {
      case RecordEndState =>
        Right(if (record.isEmpty) None else Some(record.toArray[String]))
      case _ =>
        val ch = reader.read()
        curState(ch) match {
          case (Action.NONE, nextState) =>
            readMain(nextState,
              field,
              record)
          case (Action.APPEND, nextState) =>
            readMain(nextState,
              field + ch.toChar,
              record)
          case (Action.FLUSH, nextState) =>
            readMain(nextState,
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
   * 状態遷移機械における「アクション」を表す。
   */
  private object Action extends Enumeration {
    val NONE, APPEND, FLUSH, ERROR = Value
  }

  /**
   * 状態遷移機械における「状態」を表す。
   */
  private trait State {
    def apply(ch: Int): (Action.Value, State)
  }

  /** 状態: RECORD_BEGIN */
  private object RecordBeginState extends State {
    def apply(ch: Int) = ch match {
      case ',' => (Action.FLUSH, FieldBeginState)
      case '"' => (Action.NONE, EscapedState)
      case '\r' => (Action.FLUSH, CrState)
      case '\n' => (Action.FLUSH, RecordEndState)
      case -1 => (Action.NONE, RecordEndState)
      case _ => (Action.APPEND, NonEscapedState)
    }
  }

  /** 状態: FIELD_BEGIN */
  private object FieldBeginState extends State {
    def apply(ch: Int) = ch match {
      case ',' => (Action.FLUSH, FieldBeginState)
      case '"' => (Action.NONE, EscapedState)
      case '\r' => (Action.FLUSH, CrState)
      case '\n' => (Action.FLUSH, RecordEndState)
      case -1 => (Action.FLUSH, RecordEndState)
      case _ => (Action.APPEND, NonEscapedState)
    }
  }

  /** 状態: NONESCAPED */
  private object NonEscapedState extends State {
    def apply(ch: Int) = ch match {
      case ',' => (Action.FLUSH, FieldBeginState)
      case '"' => (Action.APPEND, NonEscapedState)
      case '\r' => (Action.FLUSH, CrState)
      case '\n' => (Action.FLUSH, RecordEndState)
      case -1 => (Action.FLUSH, RecordEndState)
      case _ => (Action.APPEND, NonEscapedState)
    }
  }

  /** 状態: ESCAPED */
  private object EscapedState extends State {
    def apply(ch: Int) = ch match {
      case ',' => (Action.APPEND, EscapedState)
      case '"' => (Action.NONE, DquoteState)
      case '\r' => (Action.APPEND, EscapedState)
      case '\n' => (Action.APPEND, EscapedState)
      case -1 => (Action.ERROR, null)
      case _ => (Action.APPEND, EscapedState)
    }
  }

  /** 状態: DQUOTE */
  private object DquoteState extends State {
    def apply(ch: Int) = ch match {
      case ',' => (Action.FLUSH, FieldBeginState)
      case '"' => (Action.APPEND, EscapedState)
      case '\r' => (Action.FLUSH, CrState)
      case '\n' => (Action.FLUSH, RecordEndState)
      case -1 => (Action.FLUSH, RecordEndState)
      case _ => (Action.ERROR, null)
    }
  }

  /** 状態: CR */
  private object CrState extends State {
    def apply(ch: Int) = ch match {
      case ',' => (Action.ERROR, null)
      case '"' => (Action.ERROR, null)
      case '\r' => (Action.NONE, CrState)
      case '\n' => (Action.NONE, RecordEndState)
      case -1 => (Action.NONE, RecordEndState)
      case _ => (Action.ERROR, null)
    }
  }

  /** 状態: RECORD_END */
  private object RecordEndState extends State {
    def apply(ch: Int) = (Action.NONE, null)
  }

}
