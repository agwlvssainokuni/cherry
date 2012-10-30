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

package cherry.sample.app.api.controller;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cherry.sample.app.api.dto.MemberDto;
import cherry.sample.app.api.dto.MemberListDto;
import cherry.sample.app.api.dto.ResultDto;

/**
 * メンバ管理API.
 */
@RequestMapping("/api/member")
public interface MemberController {

	/**
	 * メンバデータ作成.
	 *
	 * @param memberDto
	 *            メンバデータ
	 * @return 作成したデータの主キー
	 */
	@RequestMapping(method = { POST })
	ResultDto<String> create(@RequestBody MemberDto memberDto);

	/**
	 * メンバデータ一覧取得.
	 *
	 * @param offset
	 *            一覧の取得開始番号
	 * @param pageSize
	 *            一覧の取得件数
	 * @return メンバデータの一覧
	 */
	@RequestMapping(method = { GET })
	ResultDto<MemberListDto> list(
			@RequestParam(value = "offset", defaultValue = "0") Integer offset,
			@RequestParam(value = "pageSize", required = false) Integer pageSize);

	/**
	 * メンバデータ取得.
	 *
	 * @param id
	 *            取得するデータの主キー
	 * @return メンバデータ
	 */
	@RequestMapping(value = "{id}", method = { GET })
	ResultDto<MemberDto> get(@PathVariable("id") String id);

	/**
	 * メンバデータ更新.
	 *
	 * @param id
	 *            更新対象のデータの主キー
	 * @param memberDto
	 *            更新するメンバデータ
	 * @return 更新したか否か
	 */
	@RequestMapping(value = "{id}", method = { PUT })
	ResultDto<Boolean> update(@PathVariable("id") String id,
			@RequestBody MemberDto memberDto);

	/**
	 * メンバデータ削除
	 *
	 * @param id
	 *            削除対象のデータの主キー
	 * @return 削除したか否か
	 */
	@RequestMapping(value = "{id}", method = { DELETE })
	ResultDto<Boolean> delete(@PathVariable("id") String id);

}
