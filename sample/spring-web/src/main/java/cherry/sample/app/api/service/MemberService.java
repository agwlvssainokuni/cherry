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

package cherry.sample.app.api.service;

import org.springframework.transaction.annotation.Transactional;

import cherry.sample.app.api.dto.MemberDto;
import cherry.sample.app.api.dto.MemberListDto;

/**
 * メンバデータ管理サービス.
 */
public interface MemberService {

	/**
	 * メンバデータ作成.
	 *
	 * @param memberDto
	 *            メンバデータ
	 * @return 作成したデータの主キー
	 */
	@Transactional
	String create(MemberDto memberDto);

	/**
	 * /** メンバデータ一覧取得.
	 *
	 * @param offset
	 *            一覧の取得開始番号
	 * @param pageSize
	 *            一覧の取得件数
	 * @return メンバデータの一覧
	 */
	@Transactional
	MemberListDto list(int offset, int pageSize);

	/**
	 * メンバデータ取得.
	 *
	 * @param id
	 *            取得するデータの主キー
	 * @return メンバデータ
	 */
	@Transactional
	MemberDto get(String id);

	/**
	 * メンバデータ更新.
	 *
	 * @param memberDto
	 *            更新するメンバデータ(主キーを含む)
	 * @return 更新したか否か
	 */
	@Transactional
	Boolean update(MemberDto memberDto);

	/**
	 * メンバデータ削除
	 *
	 * @param id
	 *            削除対象のデータの主キー
	 * @return 削除したか否か
	 */
	@Transactional
	Boolean delete(String id);

}
