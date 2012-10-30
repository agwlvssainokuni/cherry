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

import java.util.List;

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
 * メンバデータの一覧.
 */
@JsonAutoDetect({ JsonMethod.NONE })
@XmlRootElement(name = "MemberList")
@XmlAccessorType(XmlAccessType.NONE)
public class MemberListDto {

	/** 対象データの全件数. */
	@JsonProperty("totalCount")
	@XmlElement(name = "TotalCount")
	private Integer totalCount;

	/** 一覧の取得開始番号. */
	@JsonProperty("offset")
	@XmlElement(name = "Offset")
	private Integer offset;

	/** メンバデータの一覧. */
	@JsonProperty("member")
	@XmlElement(name = "Member")
	private List<MemberDto> memberList;

	/**
	 * 対象データの全件数 を取得する.
	 *
	 * @return 対象データの全件数
	 */
	public Integer getTotalCount() {
		return totalCount;
	}

	/**
	 * 対象データの全件数 を設定する.
	 *
	 * @param totalCount
	 *            対象データの全件数
	 */
	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	/**
	 * 一覧の取得開始番号 を取得する.
	 *
	 * @return 一覧の取得開始番号
	 */
	public Integer getOffset() {
		return offset;
	}

	/**
	 * 一覧の取得開始番号 を設定する.
	 *
	 * @param offset
	 *            一覧の取得開始番号
	 */
	public void setOffset(Integer offset) {
		this.offset = offset;
	}

	/**
	 * メンバデータの一覧 を取得する.
	 *
	 * @return メンバデータの一覧
	 */
	public List<MemberDto> getMemberList() {
		return memberList;
	}

	/**
	 * メンバデータの一覧 を設定する.
	 *
	 * @param memberList
	 *            メンバデータの一覧
	 */
	public void setMemberList(List<MemberDto> memberList) {
		this.memberList = memberList;
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
