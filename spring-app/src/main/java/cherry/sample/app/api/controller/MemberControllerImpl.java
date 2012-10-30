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

import javax.annotation.Resource;
import javax.script.ScriptException;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cherry.sample.app.api.dto.MemberDto;
import cherry.sample.app.api.dto.MemberListDto;
import cherry.sample.app.api.dto.ResultDto;
import cherry.sample.app.api.service.MemberService;
import cherry.util.js.ObjectExtractor;

/**
 * メンバ管理API.
 */
@RequestMapping("/api/member")
@Controller("memberController")
public class MemberControllerImpl implements MemberController, InitializingBean {

	/** メンバデータ管理サービス. */
	@Autowired
	private MemberService memberService;

	/** 設定データ抽出機能. */
	@Resource
	@Qualifier("configObjectExtractor")
	private ObjectExtractor configObjectExtractor;

	/** データ取得件数のデフォルト値. */
	private Integer defaultPageSize;

	/**
	 * メンバ管理API初期化.
	 */
	public void afterPropertiesSet() throws ScriptException {
		Double value = configObjectExtractor.toJavaObject("DEFAULT_PAGE_SIZE");
		defaultPageSize = value.intValue();
	}

	/**
	 * メンバデータ作成.
	 *
	 * @param memberDto
	 *            メンバデータ
	 * @return 作成したデータの主キー
	 */
	@RequestMapping(method = { POST })
	@Override
	public ResultDto<String> create(@RequestBody MemberDto memberDto) {
		String key = memberService.create(memberDto);
		ResultDto<String> resultDto = new ResultDto<String>();
		resultDto.setCode(0);
		resultDto.setData(key);
		return resultDto;
	}

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
	@Override
	public ResultDto<MemberListDto> list(
			@RequestParam(value = "offset", defaultValue = "0") Integer offset,
			@RequestParam(value = "pageSize", required = false) Integer pageSize) {
		MemberListDto listDto = memberService.list(offset,
				(pageSize == null ? defaultPageSize : pageSize));
		ResultDto<MemberListDto> resultDto = new ResultDto<MemberListDto>();
		resultDto.setCode(0);
		resultDto.setData(listDto);
		return resultDto;
	}

	/**
	 * メンバデータ取得.
	 *
	 * @param id
	 *            取得するデータの主キー
	 * @return メンバデータ
	 */
	@RequestMapping(value = "{id}", method = { GET })
	@Override
	public ResultDto<MemberDto> get(@PathVariable("id") String id) {
		MemberDto member = memberService.get(id);
		ResultDto<MemberDto> resultDto = new ResultDto<MemberDto>();
		resultDto.setCode(0);
		resultDto.setData(member);
		return resultDto;
	}

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
	@Override
	public ResultDto<Boolean> update(@PathVariable("id") String id,
			@RequestBody MemberDto memberDto) {
		memberDto.setId(id);
		Boolean b = memberService.update(memberDto);
		ResultDto<Boolean> resultDto = new ResultDto<Boolean>();
		resultDto.setCode(0);
		resultDto.setData(b);
		return resultDto;
	}

	/**
	 * メンバデータ削除
	 *
	 * @param id
	 *            削除対象のデータの主キー
	 * @return 削除したか否か
	 */
	@RequestMapping(value = "{id}", method = { DELETE })
	@Override
	public ResultDto<Boolean> delete(@PathVariable("id") String id) {
		Boolean b = memberService.delete(id);
		ResultDto<Boolean> resultDto = new ResultDto<Boolean>();
		resultDto.setCode(0);
		resultDto.setData(b);
		return resultDto;
	}

}
