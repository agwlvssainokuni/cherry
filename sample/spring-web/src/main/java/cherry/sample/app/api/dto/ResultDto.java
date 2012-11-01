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
import javax.xml.bind.annotation.XmlSeeAlso;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * API の結果データ構造.
 *
 * @param <T>
 *            結果データの主体
 */
@JsonAutoDetect(JsonMethod.NONE)
@XmlRootElement(name = "Result")
@XmlAccessorType(XmlAccessType.NONE)
@XmlSeeAlso({ MemberDto.class, MemberListDto.class })
public class ResultDto<T> {

	/** APIの結果コード. */
	@JsonProperty("code")
	@XmlElement(name = "Code")
	private Integer code;

	/** APIの結果データ. */
	@JsonProperty("data")
	@XmlElement(name = "Data")
	private T data;

	/**
	 * APIの結果コード を取得する.
	 *
	 * @return APIの結果コード
	 */
	public Integer getCode() {
		return code;
	}

	/**
	 * APIの結果コード を設定する.
	 *
	 * @param code
	 *            APIの結果コード
	 */
	public void setCode(Integer code) {
		this.code = code;
	}

	/**
	 * APIの結果データ を取得する.
	 *
	 * @return APIの結果データ
	 */
	public T getData() {
		return data;
	}

	/**
	 * APIの結果データ を設定する.
	 *
	 * @param data
	 *            APIの結果データ
	 */
	public void setData(T data) {
		this.data = data;
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
