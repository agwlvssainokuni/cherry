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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import cherry.sample.app.api.dto.MemberDto;
import cherry.sample.app.api.dto.MemberListDto;

/**
 * メンバデータ管理サービス.
 */
@Component("memberService")
public class MemberServiceImpl extends NamedParameterJdbcDaoSupport implements
		MemberService {

	/** 検索用行マッパ. */
	private final RowMapper<MemberDto> rowMapper = new BeanPropertyRowMapper<MemberDto>(
			MemberDto.class);

	/**
	 * データソースを設定する.<br>
	 * セッタは親クラスに定義されているが、Autowireするために定義する。
	 *
	 * @param dataSource
	 *            データソース
	 */
	@Autowired
	public void setDataSourceX(DataSource dataSource) {
		super.setDataSource(dataSource);
	}

	/**
	 * メンバデータ作成.
	 *
	 * @param memberDto
	 *            メンバデータ
	 * @return 作成したデータの主キー
	 */
	@Transactional
	@Override
	public String create(MemberDto memberDto) {
		SqlParameterSource paramSource = new BeanPropertySqlParameterSource(
				memberDto);
		KeyHolder keyHolder = new GeneratedKeyHolder();
		getNamedParameterJdbcTemplate()
				.update("INSERT INTO member (login, passwd, name, memo) VALUES (:login, :passwd, :name, :memo)",
						paramSource, keyHolder);
		return String.valueOf(keyHolder.getKey());
	}

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
	@Override
	public MemberListDto list(int offset, int pageSize) {

		int totalCount = getNamedParameterJdbcTemplate().queryForInt(
				"SELECT COUNT(*) FROM member", new HashMap<String, String>());
		MemberListDto listDto = new MemberListDto();
		listDto.setTotalCount(totalCount);
		listDto.setOffset(offset);

		if (totalCount <= 0) {
			listDto.setMemberList(new ArrayList<MemberDto>());
			return listDto;
		}

		Map<String, Integer> paramMap = new HashMap<String, Integer>();
		paramMap.put("offset", offset);
		paramMap.put("pageSize", pageSize);
		List<MemberDto> memberList = getNamedParameterJdbcTemplate()
				.query("SELECT * FROM member ORDER BY id OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY",
						paramMap, rowMapper);
		listDto.setMemberList(memberList);
		return listDto;
	}

	/**
	 * メンバデータ取得.
	 *
	 * @param id
	 *            取得するデータの主キー
	 * @return メンバデータ
	 */
	@Transactional
	@Override
	public MemberDto get(String id) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("id", id);
		return getNamedParameterJdbcTemplate().queryForObject(
				"SELECT * FROM member WHERE id=:id", paramMap, rowMapper);
	}

	/**
	 * メンバデータ更新.
	 *
	 * @param memberDto
	 *            更新するメンバデータ(主キーを含む)
	 * @return 更新したか否か
	 */
	@Transactional
	@Override
	public Boolean update(MemberDto memberDto) {
		SqlParameterSource paramSource = new BeanPropertySqlParameterSource(
				memberDto);
		int count = getNamedParameterJdbcTemplate()
				.update("UPDATE member SET login=:login, passwd=:passwd, name=:name, memo=:memo WHERE id=:id",
						paramSource);
		if (count <= 0) {
			return false;
		}
		return true;
	}

	/**
	 * メンバデータ削除
	 *
	 * @param id
	 *            削除対象のデータの主キー
	 * @return 削除したか否か
	 */
	@Transactional
	@Override
	public Boolean delete(String id) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("id", id);
		int count = getNamedParameterJdbcTemplate().update(
				"DELETE FROM member WHERE id=:id", paramMap);
		if (count <= 0) {
			return false;
		}
		return true;
	}

}
