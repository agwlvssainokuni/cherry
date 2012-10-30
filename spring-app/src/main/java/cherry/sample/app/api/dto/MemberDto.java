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

package cherry.sample.app.api.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * メンバデータ.
 */
@JsonAutoDetect({ JsonMethod.NONE })
@XmlRootElement(name = "Member")
@XmlAccessorType(XmlAccessType.NONE)
public class MemberDto {

	/** 主キー. */
	@JsonProperty("id")
	@XmlElement(name = "Id")
	private String id;

	/** ログインID. */
	@JsonProperty("login")
	@XmlElement(name = "Login")
	private String login;

	/** パスワード. */
	@JsonProperty("passwd")
	@XmlElement(name = "Passwd")
	private String passwd;

	/** 氏名. */
	@JsonProperty("name")
	@XmlElement(name = "Name")
	private String name;

	/** メモ. */
	@JsonProperty("memo")
	@XmlElement(name = "Memo")
	private String memo;

	/**
	 * 主キー を取得する.
	 *
	 * @return 主キー
	 */
	public String getId() {
		return id;
	}

	/**
	 * 主キー を設定する.
	 *
	 * @param id
	 *            主キー
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * ログインID を取得する.
	 *
	 * @return ログインID
	 */
	public String getLogin() {
		return login;
	}

	/**
	 * ログインID を設定する.
	 *
	 * @param login
	 *            ログインID
	 */
	public void setLogin(String login) {
		this.login = login;
	}

	/**
	 * パスワード を取得する.
	 *
	 * @return パスワード
	 */
	public String getPasswd() {
		return passwd;
	}

	/**
	 * パスワード を設定する.
	 *
	 * @param passwd
	 *            パスワード
	 */
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	/**
	 * 氏名 を取得する.
	 *
	 * @return 氏名
	 */
	public String getName() {
		return name;
	}

	/**
	 * 氏名 を設定する.
	 *
	 * @param name
	 *            氏名
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * メモ を取得する.
	 *
	 * @return メモ
	 */
	public String getMemo() {
		return memo;
	}

	/**
	 * メモ を設定する.
	 *
	 * @param memo
	 *            メモ
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}

	/**
	 * 文字列表記を取得する.
	 *
	 * @return 文字列表記
	 */
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this,
				ToStringStyle.SHORT_PREFIX_STYLE);
	}

}
